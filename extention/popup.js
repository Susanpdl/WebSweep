// DOM elements
const authSection = document.getElementById('authSection');
const appSection = document.getElementById('appSection');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const authLoading = document.getElementById('authLoading');
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');

// Add landing page logic
const landingSection = document.getElementById('landingSection');
const getStartedBtn = document.getElementById('getStartedBtn');

// App elements
const refreshBtn = document.getElementById('refreshBtn');
const loadingDiv = document.getElementById('loading');
const historyErrorDiv = document.getElementById('historyError');
const retryBtn = document.getElementById('retryBtn');
const domainsList = document.getElementById('domainsList');
const totalCountSpan = document.getElementById('totalCount');
const uniqueCountSpan = document.getElementById('uniqueCount');

// State
let domainsData = [];
let currentUser = null;
let lastSavedTimestamp = null;

// On DOMContentLoaded, show landing page by default
// Hide auth/app sections
function showLanding() {
    landingSection.style.display = 'flex';
    authSection.style.display = 'none';
    appSection.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    showLanding();
    initializeAuth();
    setupEventListeners();
});

// When Get Started is clicked, show auth section
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function() {
        landingSection.style.display = 'none';
        authSection.style.display = 'block';
    });
}

// Initialize Firebase Authentication
function initializeAuth() {
    // Listen for auth state changes
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            currentUser = user;
            showApp();
            loadHistory();
        } else {
            // User is signed out
            currentUser = null;
            showAuth();
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Auth form listeners
    loginFormElement.addEventListener('submit', handleLogin);
    signupFormElement.addEventListener('submit', handleSignup);
    showSignupLink.addEventListener('click', showSignupForm);
    showLoginLink.addEventListener('click', showLoginForm);
    logoutBtn.addEventListener('click', handleLogout);
    
    // App listeners
    refreshBtn.addEventListener('click', loadHistory);
    retryBtn.addEventListener('click', loadHistory);
}

// Show authentication section
function showAuth() {
    landingSection.style.display = 'none';
    authSection.style.display = 'block';
    appSection.style.display = 'none';
    clearAuthMessages();
}

// Show app section
function showApp() {
    landingSection.style.display = 'none';
    authSection.style.display = 'none';
    appSection.style.display = 'block';
    if (currentUser) {
        userName.textContent = currentUser.displayName || currentUser.email;
        // Set up auto-save when user logs in
        setupAutoSave();
    }
}

// Show signup form
function showSignupForm(e) {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    clearAuthMessages();
}

// Show login form
function showLoginForm(e) {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    clearAuthMessages();
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
        await auth.signInWithEmailAndPassword(email, password);
        showAuthSuccess('Login successful!');
        
        // Save initial user data to Firebase
        const userData = {
            userId: auth.currentUser.uid,
            userEmail: auth.currentUser.email,
            userName: auth.currentUser.displayName || 'Unknown User',
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            deviceInfo: {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language
            }
        };
        
        await db.collection('user_info').doc(auth.currentUser.uid).set(userData, { merge: true });
        console.log('Initial user data saved to Firebase');
        
    } catch (error) {
        console.error('Login error:', error);
        showAuthError(getAuthErrorMessage(error.code));
    } finally {
        showAuthLoading(false);
    }
}

// Handle signup
async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const street = document.getElementById('signupStreet').value;
    const city = document.getElementById('signupCity').value;
    const state = document.getElementById('signupState').value;
    const zip = document.getElementById('signupZip').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (!name || !email || !street || !city || !state || !zip || !password || !confirmPassword) {
        showAuthError('Please fill in all fields');
        return;
    }
    
    if (password.length < 6) {
        showAuthError('Password must be at least 6 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthError('Passwords do not match');
        return;
    }
    
    showAuthLoading(true);
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({
            displayName: name
        });
        showAuthSuccess('Account created successfully!');
        
        // Save user data to Firestore in 'users' collection with address as a map
        const userData = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            name: name,
            address: {
                street: street,
                city: city,
                state: state,
                zip: zip
            }
        };
        
        await db.collection('users').doc(userCredential.user.uid).set(userData, { merge: true });
        console.log('New user data saved to Firebase (users collection)');
    } catch (error) {
        console.error('Signup error:', error);
        showAuthError(getAuthErrorMessage(error.code));
    } finally {
        showAuthLoading(false);
    }
}

// Handle logout
async function handleLogout() {
    try {
        await auth.signOut();
        showAuthSuccess('Logged out successfully!');
    } catch (error) {
        console.error('Logout error:', error);
        showAuthError('Failed to logout');
    }
}

// Show auth loading
function showAuthLoading(show) {
    authLoading.style.display = show ? 'flex' : 'none';
    if (show) {
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
}

// Show auth error message
function showAuthError(message) {
    clearAuthMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const currentForm = signupForm.style.display === 'none' ? loginForm : signupForm;
    currentForm.insertBefore(errorDiv, currentForm.firstChild);
}

// Show auth success message
function showAuthSuccess(message) {
    clearAuthMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const currentForm = signupForm.style.display === 'none' ? loginForm : signupForm;
    currentForm.insertBefore(successDiv, currentForm.firstChild);
}

// Clear auth messages
function clearAuthMessages() {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => msg.remove());
}

// Get user-friendly auth error messages
function getAuthErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/user-not-found':
            return 'No account found with this email address';
        case 'auth/wrong-password':
            return 'Incorrect password';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists';
        case 'auth/weak-password':
            return 'Password is too weak';
        case 'auth/invalid-email':
            return 'Invalid email address';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later';
        default:
            return 'Authentication failed. Please try again';
    }
}

// Load browser history and parse domains
async function loadHistory() {
    if (!currentUser) {
        console.log('User not authenticated');
        return;
    }
    
    showLoading(true);
    hideHistoryError();
    
    try {
        // Get browser history (last 1000 items to ensure we have enough unique domains)
        const historyItems = await chrome.history.search({
            text: '',
            maxResults: 1000,
            startTime: 0
        });
        
        // Check if we got any history items
        if (!historyItems || historyItems.length === 0) {
            showHistoryError('No browsing history found. Start browsing to see your domains here.');
            return;
        }
        
        // Parse domains from URLs
        const domains = parseDomainsFromHistory(historyItems);
        
        // Check if we have any valid domains
        if (domains.length === 0) {
            showHistoryError('No valid domains found in your browsing history.');
            return;
        }
        
        // Get unique domains with visit counts
        const uniqueDomains = getUniqueDomainsWithCounts(domains);
        
        // Take only the last 100 unique domains
        const last100Domains = uniqueDomains.slice(-100);
        
        // Update state and display
        domainsData = last100Domains;
        displayDomains(last100Domains);
        updateStats(historyItems.length, last100Domains.length);
        
        // Save to Firebase
        await saveDomainsToFirebase(last100Domains, historyItems.length);
        
    } catch (error) {
        console.error('Error loading history:', error);
        
        // Check if it's a permission error
        if (error.message && error.message.includes('permission')) {
            showHistoryError('History access denied. Please enable history permissions for this extension.');
        } else {
            showHistoryError('Failed to load browser history. Please try again.');
        }
    } finally {
        showLoading(false);
    }
}

// Parse domains from history items
function parseDomainsFromHistory(historyItems) {
    const domains = [];
    
    historyItems.forEach(item => {
        try {
            const url = new URL(item.url);
            const domain = url.hostname;
            
            // Skip localhost, file://, chrome://, etc.
            if (isValidDomain(domain)) {
                domains.push({
                    domain: domain,
                    lastVisitTime: item.lastVisitTime,
                    visitCount: item.visitCount
                });
            }
        } catch (error) {
            // Skip invalid URLs
            console.warn('Invalid URL:', item.url);
        }
    });
    
    return domains;
}

// Check if domain is valid (not localhost, chrome://, etc.)
function isValidDomain(domain) {
    const invalidPatterns = [
        'localhost',
        '127.0.0.1',
        'chrome://',
        'chrome-extension://',
        'moz-extension://',
        'edge://',
        'about:',
        'file://'
    ];
    
    return !invalidPatterns.some(pattern => domain.includes(pattern));
}

// Get unique domains with visit counts, sorted by last visit time
function getUniqueDomainsWithCounts(domains) {
    const domainMap = new Map();
    
    domains.forEach(item => {
        const existing = domainMap.get(item.domain);
        
        if (!existing || item.lastVisitTime > existing.lastVisitTime) {
            domainMap.set(item.domain, {
                domain: item.domain,
                lastVisitTime: item.lastVisitTime,
                visitCount: (existing ? existing.visitCount : 0) + item.visitCount
            });
        } else {
            existing.visitCount += item.visitCount;
        }
    });
    
    // Convert to array and sort by last visit time (newest first)
    return Array.from(domainMap.values())
        .sort((a, b) => b.lastVisitTime - a.lastVisitTime);
}

// Display domains in the UI
function displayDomains(domains) {
    domainsList.innerHTML = '';
    
    if (domains.length === 0) {
        showEmptyState();
        return;
    }
    
    domains.forEach((domainData, index) => {
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
    count.textContent = domainData.visitCount;
    
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

// Show loading state
function showLoading(show) {
    loadingDiv.style.display = show ? 'flex' : 'none';
    if (show) {
        domainsList.innerHTML = '';
        hideHistoryError();
    }
}

// Show history error
function showHistoryError(message) {
    historyErrorDiv.style.display = 'block';
    domainsList.innerHTML = '';
    
    // Update the error message if provided
    if (message) {
        const errorText = historyErrorDiv.querySelector('p');
        if (errorText) {
            errorText.textContent = message;
        }
    }
}

// Hide history error
function hideHistoryError() {
    historyErrorDiv.style.display = 'none';
}

// Show empty state
function showEmptyState() {
    domainsList.innerHTML = `
        <div class="empty-state">
            <div class="icon">📂</div>
            <p>No domains found</p>
            <small>Your browser history might be empty or cleared</small>
        </div>
    `;
}

// Show error state
function showError(message) {
    domainsList.innerHTML = `
        <div class="empty-state">
            <div class="icon">⚠️</div>
            <p>Error</p>
            <small>${message}</small>
        </div>
    `;
}

// Update statistics
function updateStats(totalVisits, uniqueDomains) {
    totalCountSpan.textContent = `Total: ${totalVisits}`;
    uniqueCountSpan.textContent = `Unique: ${uniqueDomains}`;
}

// Clear display (removed - no longer needed)
function clearDisplay() {
    // This function is no longer used since we removed the clear button
    console.log('Clear display function removed');
}

// Save domains to Firebase
async function saveDomainsToFirebase(domains, totalVisits) {
    if (!currentUser) {
        console.log('No user logged in, skipping Firebase save');
        return;
    }
    
    try {
        const userId = currentUser.uid;
        const userEmail = currentUser.email;
        const userName = currentUser.displayName || 'Unknown User';
        
        // Create the data object to save
        const userData = {
            userId: userId,
            userEmail: userEmail,
            userName: userName,
            domains: domains,
            totalVisits: totalVisits,
            uniqueDomains: domains.length,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            deviceInfo: {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language
            }
        };
        
        // Save to Firestore under 'user_info' collection
        await db.collection('user_info').doc(userId).set(userData, { merge: true });
        
        console.log('Successfully saved user data to Firebase');
        lastSavedTimestamp = new Date();
        
        // Show success indicator (optional)
        showSaveSuccess();
        
    } catch (error) {
        console.error('Error saving to Firebase:', error);
        // Don't show error to user as this is background operation
    }
}

// Show save success indicator
function showSaveSuccess() {
    // Create a subtle success indicator
    const successIndicator = document.createElement('div');
    successIndicator.className = 'save-success-indicator';
    successIndicator.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"/>
        </svg>
        <span>Data synced</span>
    `;
    
    // Add to the stats section
    const statsSection = document.querySelector('.stats');
    statsSection.appendChild(successIndicator);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (successIndicator.parentNode) {
            successIndicator.parentNode.removeChild(successIndicator);
        }
    }, 3000);
}

// Auto-save function for periodic updates
async function autoSaveDomains() {
    if (currentUser && domainsData.length > 0) {
        await saveDomainsToFirebase(domainsData, domainsData.reduce((sum, domain) => sum + domain.visitCount, 0));
    }
}

// Set up auto-save every 5 minutes when user is logged in
function setupAutoSave() {
    if (currentUser) {
        // Auto-save every 5 minutes
        setInterval(autoSaveDomains, 5 * 60 * 1000);
    }
}

// Format date for display
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
} 