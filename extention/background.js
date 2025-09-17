// DataSweepr Background Script - Real-Time Domain Tracking
// Listens for navigation events and syncs with backend

// Configuration
const BACKEND_BASE_URL = 'https://api.datasweepr.com'; // Replace with actual backend URL
const SYNC_INTERVAL = 30000; // 30 seconds
const MAX_DOMAINS_PER_SYNC = 50;

// State management
let isAuthenticated = false;
let jwtToken = null;
let pendingDomains = new Set();
let lastSyncTime = 0;

// Initialize background script
chrome.runtime.onInstalled.addListener(() => {
  console.log('DataSweepr extension installed');
  initializeExtension();
});

// Listen for navigation events
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId === 0) { // Main frame only
    handleNavigation(details);
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    handleTabUpdate(tab);
  }
});

// Handle navigation events
async function handleNavigation(details) {
  try {
    const url = new URL(details.url);
    const domain = url.hostname;
    
    // Filter out invalid domains
    if (isValidDomain(domain)) {
      const domainData = {
        domain: domain,
        timestamp: Date.now(),
        url: details.url,
        tabId: details.tabId
      };
      
      // Add to pending domains
      pendingDomains.add(JSON.stringify(domainData));
      
      // Store locally
      await storeDomainLocally(domainData);
      
      // Trigger sync if authenticated
      if (isAuthenticated && jwtToken) {
        await syncWithBackend();
      }
    }
  } catch (error) {
    console.error('Error handling navigation:', error);
  }
}

// Handle tab updates
async function handleTabUpdate(tab) {
  try {
    const url = new URL(tab.url);
    const domain = url.hostname;
    
    if (isValidDomain(domain)) {
      const domainData = {
        domain: domain,
        timestamp: Date.now(),
        url: tab.url,
        tabId: tab.id
      };
      
      pendingDomains.add(JSON.stringify(domainData));
      await storeDomainLocally(domainData);
      
      if (isAuthenticated && jwtToken) {
        await syncWithBackend();
      }
    }
  } catch (error) {
    console.error('Error handling tab update:', error);
  }
}

// Validate domain
function isValidDomain(domain) {
  const invalidPatterns = [
    'localhost',
    '127.0.0.1',
    'chrome://',
    'chrome-extension://',
    'moz-extension://',
    'edge://',
    'about:',
    'file://',
    'data:',
    'blob:'
  ];
  
  return !invalidPatterns.some(pattern => domain.includes(pattern)) && 
         domain.includes('.') && 
         domain.length > 3;
}

// Store domain locally
async function storeDomainLocally(domainData) {
  try {
    const result = await chrome.storage.local.get(['domains']);
    const domains = result.domains || [];
    
    // Add new domain or update existing
    const existingIndex = domains.findIndex(d => d.domain === domainData.domain);
    if (existingIndex >= 0) {
      domains[existingIndex].lastVisit = domainData.timestamp;
      domains[existingIndex].visitCount = (domains[existingIndex].visitCount || 1) + 1;
    } else {
      domains.push({
        domain: domainData.domain,
        firstVisit: domainData.timestamp,
        lastVisit: domainData.timestamp,
        visitCount: 1
      });
    }
    
    // Keep only last 1000 domains
    if (domains.length > 1000) {
      domains.splice(0, domains.length - 1000);
    }
    
    await chrome.storage.local.set({ domains: domains });
  } catch (error) {
    console.error('Error storing domain locally:', error);
  }
}

// Sync with backend
async function syncWithBackend() {
  if (!isAuthenticated || !jwtToken || pendingDomains.size === 0) {
    return;
  }
  
  try {
    const domainsToSync = Array.from(pendingDomains).slice(0, MAX_DOMAINS_PER_SYNC);
    const domainObjects = domainsToSync.map(d => JSON.parse(d));
    
    const response = await fetch(`${BACKEND_BASE_URL}/api/domains/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
        'X-Requested-With': 'DataSweepr-Extension'
      },
      body: JSON.stringify({
        domains: domainObjects,
        timestamp: Date.now(),
        version: '2.0'
      })
    });
    
    if (response.ok) {
      // Remove synced domains from pending
      domainsToSync.forEach(domain => pendingDomains.delete(domain));
      lastSyncTime = Date.now();
      
      // Update sync status
      await chrome.storage.local.set({ 
        lastSync: lastSyncTime,
        syncStatus: 'success'
      });
      
      console.log('Successfully synced domains with backend');
    } else {
      console.error('Backend sync failed:', response.status);
      await chrome.storage.local.set({ syncStatus: 'error' });
    }
  } catch (error) {
    console.error('Error syncing with backend:', error);
    await chrome.storage.local.set({ syncStatus: 'error' });
  }
}

// JWT Authentication
async function authenticateUser(email, password) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'DataSweepr-Extension'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      jwtToken = data.token;
      isAuthenticated = true;
      
      // Store token securely
      await chrome.storage.local.set({ 
        jwtToken: jwtToken,
        isAuthenticated: true,
        userEmail: email
      });
      
      // Start periodic sync
      startPeriodicSync();
      
      return { success: true, token: jwtToken };
    } else {
      return { success: false, error: 'Authentication failed' };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: error.message };
  }
}

// Logout
async function logout() {
  try {
    if (jwtToken) {
      await fetch(`${BACKEND_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'X-Requested-With': 'DataSweepr-Extension'
        }
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    jwtToken = null;
    isAuthenticated = false;
    pendingDomains.clear();
    
    await chrome.storage.local.remove(['jwtToken', 'isAuthenticated', 'userEmail']);
  }
}

// Start periodic sync
function startPeriodicSync() {
  setInterval(async () => {
    if (isAuthenticated && pendingDomains.size > 0) {
      await syncWithBackend();
    }
  }, SYNC_INTERVAL);
}

// Initialize extension
async function initializeExtension() {
  try {
    const result = await chrome.storage.local.get(['jwtToken', 'isAuthenticated', 'userEmail']);
    
    if (result.jwtToken && result.isAuthenticated) {
      jwtToken = result.jwtToken;
      isAuthenticated = true;
      startPeriodicSync();
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

// Message handling from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'authenticate':
      authenticateUser(request.email, request.password)
        .then(result => sendResponse(result));
      return true; // Keep message channel open for async response
      
    case 'logout':
      logout().then(() => sendResponse({ success: true }));
      return true;
      
    case 'getStatus':
      sendResponse({
        isAuthenticated,
        pendingDomains: pendingDomains.size,
        lastSync: lastSyncTime
      });
      break;
      
    case 'forceSync':
      syncWithBackend().then(() => sendResponse({ success: true }));
      return true;
  }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  initializeExtension();
});
