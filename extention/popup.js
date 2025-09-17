// WebSweep Extension Popup - JWT Authentication & Real-Time Sync
// DOM elements
const authSection = document.getElementById('authSection');
const appSection = document.getElementById('appSection');
const loginForm = document.getElementById('loginForm');
const authLoading = document.getElementById('authLoading');
const loginFormElement = document.getElementById('loginFormElement');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');

// App elements
const syncStatus = document.getElementById('syncStatus');
const domainsList = document.getElementById('domainsList');
const totalCountSpan = document.getElementById('totalCount');
const uniqueCountSpan = document.getElementById('uniqueCount');
const lastSyncSpan = document.getElementById('lastSync');
const pendingCountSpan = document.getElementById('pendingCount');

// State
let domainsData = [];
let isAuthenticated = false;
let jwtToken = null;
let syncStatusData = { pending: 0, lastSync: null };

// Initialize popup
document.addEventListener('DOMContentLoaded', function() {
    // Start with app section for demo purposes
    showApp();
    loadDomains();
    updateSyncStatus();
    
    setupEventListeners();
    checkAuthenticationStatus();
});

// Initialize popup
async function initializePopup() {
    try {
        // Check if user is authenticated
        const result = await chrome.storage.local.get(['jwtToken', 'isAuthenticated', 'userEmail']);
        
        if (result.jwtToken && result.isAuthenticated) {
            isAuthenticated = true;
            jwtToken = result.jwtToken;
            showApp();
            loadDomains();
            updateSyncStatus();
        } else {
            // For demo purposes, show app section even without authentication
            // This allows you to see the Recent Domains section
            showApp();
            loadDomains();
            updateSyncStatus();
        }
    } catch (error) {
        console.error('Initialization error:', error);
        // For demo purposes, show app section even on error
        showApp();
        loadDomains();
        updateSyncStatus();
    }
}

// Setup event listeners
function setupEventListeners() {
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', handleLogin);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Check authentication status with background script
async function checkAuthenticationStatus() {
    try {
        const response = await chrome.runtime.sendMessage({ action: 'getStatus' });
        isAuthenticated = response.isAuthenticated;
        syncStatusData.pending = response.pendingDomains;
        syncStatusData.lastSync = response.lastSync;
        
        // For demo purposes, always show app section
        showApp();
        loadDomains();
        updateSyncStatus();
    } catch (error) {
        console.error('Error checking auth status:', error);
        // For demo purposes, show app section even on error
        showApp();
        loadDomains();
        updateSyncStatus();
    }
}

// Show authentication section
function showAuth() {
    if (authSection) authSection.style.display = 'block';
    if (appSection) appSection.style.display = 'none';
    clearAuthMessages();
}

// Show app section
function showApp() {
    console.log('Showing app section');
    if (authSection) {
        authSection.style.display = 'none';
        console.log('Auth section hidden');
    }
    if (appSection) {
        appSection.style.display = 'block';
        console.log('App section shown');
    }
    
    // Get user email from storage or show demo user
    chrome.storage.local.get(['userEmail']).then(result => {
        if (userName) {
            userName.textContent = result.userEmail || 'Demo User';
        }
    });
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showAuthError('Please fill in all fields');
        return;
    }
    
    showAuthLoading(true);
    
    try {
        const response = await chrome.runtime.sendMessage({
            action: 'authenticate',
            email: email,
            password: password
        });
        
        if (response.success) {
            isAuthenticated = true;
            jwtToken = response.token;
            showAuthSuccess('Login successful!');
            setTimeout(() => {
                showApp();
                loadDomains();
                updateSyncStatus();
            }, 1000);
        } else {
            showAuthError(response.error || 'Authentication failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAuthError('Login failed. Please try again.');
    } finally {
        showAuthLoading(false);
    }
}

// Handle logout
async function handleLogout() {
    try {
        await chrome.runtime.sendMessage({ action: 'logout' });
        isAuthenticated = false;
        jwtToken = null;
        showAuthSuccess('Logged out successfully!');
        setTimeout(() => {
            showAuth();
        }, 1000);
    } catch (error) {
        console.error('Logout error:', error);
        showAuthError('Failed to logout');
    }
}

// Load domains from local storage
async function loadDomains() {
    try {
        const result = await chrome.storage.local.get(['domains']);
        const domains = result.domains || [];
        
        domainsData = domains;
        displayDomains(domains);
        updateStats(domains);
    } catch (error) {
        console.error('Error loading domains:', error);
        showError('Failed to load domains');
    }
}

// Display domains in the UI
function displayDomains(domains) {
    if (!domainsList) return;
    
    domainsList.innerHTML = '';
    
    if (domains.length === 0) {
        showEmptyState();
        return;
    }
    
    // Sort by last visit time (newest first)
    const sortedDomains = domains.sort((a, b) => b.lastVisit - a.lastVisit);
    
    // Show only last 20 domains for popup
    const displayDomains = sortedDomains.slice(0, 20);
    
    displayDomains.forEach((domainData, index) => {
        const listItem = createDomainListItem(domainData, index);
        domainsList.appendChild(listItem);
    });
}

// Create a domain list item element
function createDomainListItem(domainData, index) {
    const li = document.createElement('li');
    li.className = 'domain-item';
    li.dataset.domain = domainData.domain;
    
    // Create domain icon
    const icon = document.createElement('div');
    icon.className = 'domain-icon';
    icon.textContent = domainData.domain.charAt(0).toUpperCase();
    
    // Create domain name
    const name = document.createElement('span');
    name.className = 'domain-name';
    name.textContent = domainData.domain;
    
    // Create visit count badge
    const count = document.createElement('span');
    count.className = 'domain-count';
    count.textContent = domainData.visitCount || 1;
    
    // Add click handler to open domain
    li.addEventListener('click', () => {
        openDomain(domainData.domain);
    });
    
    li.appendChild(icon);
    li.appendChild(name);
    li.appendChild(count);
    
    return li;
}

// Open domain in new tab
function openDomain(domain) {
    const url = `https://${domain}`;
    chrome.tabs.create({ url: url });
}

// Update statistics
function updateStats(domains) {
    const totalVisits = domains.reduce((sum, domain) => sum + (domain.visitCount || 1), 0);
    const uniqueDomains = domains.length;
    
    if (totalCountSpan) totalCountSpan.textContent = totalVisits;
    if (uniqueCountSpan) uniqueCountSpan.textContent = uniqueDomains;
}

// Update sync status
function updateSyncStatus() {
    if (pendingCountSpan) {
        pendingCountSpan.textContent = syncStatusData.pending;
    }
    
    if (lastSyncSpan) {
        if (syncStatusData.lastSync) {
            const lastSync = new Date(syncStatusData.lastSync);
            lastSyncSpan.textContent = lastSync.toLocaleTimeString();
        } else {
            lastSyncSpan.textContent = 'Never';
        }
    }
    
    // Update sync status indicator
    if (syncStatus) {
        if (syncStatusData.pending > 0) {
            syncStatus.className = 'sync-status syncing';
            syncStatus.textContent = 'Syncing...';
        } else {
            syncStatus.className = 'sync-status synced';
            syncStatus.textContent = 'Synced';
        }
    }
}

// Show auth loading
function showAuthLoading(show) {
    if (authLoading) {
        authLoading.style.display = show ? 'flex' : 'none';
    }
    if (show && loginForm) {
        loginForm.style.display = 'none';
    } else if (loginForm) {
        loginForm.style.display = 'block';
    }
}

// Show auth error message
function showAuthError(message) {
    clearAuthMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (loginForm) {
        loginForm.insertBefore(errorDiv, loginForm.firstChild);
    }
}

// Show auth success message
function showAuthSuccess(message) {
    clearAuthMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    if (loginForm) {
        loginForm.insertBefore(successDiv, loginForm.firstChild);
    }
}

// Clear auth messages
function clearAuthMessages() {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => msg.remove());
}

// Show empty state
function showEmptyState() {
    if (domainsList) {
        domainsList.innerHTML = `
            <div class="empty-state">
                <div class="icon">🌐</div>
                <p>No domains tracked yet</p>
                <small>Start browsing to see your domains here</small>
            </div>
        `;
    }
}

// Show error state
function showError(message) {
    if (domainsList) {
        domainsList.innerHTML = `
            <div class="empty-state">
                <div class="icon">⚠️</div>
                <p>Error</p>
                <small>${message}</small>
            </div>
        `;
    }
}

// Force sync with backend
async function forceSync() {
    try {
        await chrome.runtime.sendMessage({ action: 'forceSync' });
        updateSyncStatus();
    } catch (error) {
        console.error('Force sync error:', error);
    }
}

// Refresh domains
async function refreshDomains() {
    await loadDomains();
    await checkAuthenticationStatus();
}

// Auto-refresh sync status every 5 seconds
setInterval(() => {
    if (isAuthenticated) {
        checkAuthenticationStatus();
    }
}, 5000);