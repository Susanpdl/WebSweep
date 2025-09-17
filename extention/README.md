# DataSweepr - Real-Time Domain Tracker Extension

A Chrome extension that provides real-time domain tracking with JWT authentication and secure backend synchronization.

## Stage 1: Building the Frontend Extension for Real-Time Sync

### ✅ Completed Features

#### 1. **Real-Time Navigation Tracking**
- **Chrome APIs Integration**: Uses `chrome.webNavigation` and `chrome.history` APIs for comprehensive navigation monitoring
- **Intelligent Domain Capture**: Listens for user navigation events and intelligently captures domains of websites visited
- **Domain Filtering & Consolidation**: Implements logic to filter and consolidate domains, creating a clean list of unique services
- **Background Processing**: Service worker handles real-time tracking without disrupting user experience

#### 2. **JWT Authentication System**
- **Secure Token Management**: Integrated JWT (JSON Web Token) authentication system
- **Token Storage**: Securely stores JWT tokens in Chrome's local storage
- **Authenticated Communications**: All backend communications include JWT tokens for secure authentication
- **User Session Management**: Maintains authenticated sessions across extension restarts

#### 3. **Secure Backend Communication**
- **HTTPS Communication**: All data synchronization occurs over HTTPS with TLS encryption
- **Real-Time Sync**: Implements reliable mechanism to push captured domains to backend endpoints
- **Error Handling**: Robust error handling and retry mechanisms for failed sync attempts
- **Batch Processing**: Efficiently batches domain data for optimal backend communication

#### 4. **Minimalist UI Design**
- **Intuitive Interface**: Clean, minimalist popup design that doesn't disrupt browsing experience
- **Essential Information**: Provides users with key status information and controls
- **Real-Time Status**: Shows sync status, pending domains, and last sync time
- **Responsive Design**: Optimized for extension popup dimensions

## Technical Implementation

### Chrome Extension APIs Used

```javascript
// Real-time navigation tracking
chrome.webNavigation.onCompleted.addListener(handleNavigation);
chrome.tabs.onUpdated.addListener(handleTabUpdate);

// History access for comprehensive data
chrome.history.search({ text: '', maxResults: 1000 });

// Secure storage for JWT tokens
chrome.storage.local.set({ jwtToken: token });
```

### JWT Authentication Flow

```javascript
// Authentication with backend
const response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwtToken}`
  },
  body: JSON.stringify({ email, password })
});
```

### Real-Time Sync Implementation

```javascript
// Background sync with backend
async function syncWithBackend() {
  const response = await fetch(`${BACKEND_BASE_URL}/api/domains/sync`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      domains: domainObjects,
      timestamp: Date.now()
    })
  });
}
```

## Installation & Setup

### 1. Load Extension in Chrome
```bash
# Navigate to extension directory
cd extention

# Load in Chrome
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the extention folder
```

### 2. Configure Backend Endpoint
Update the backend URL in `background.js`:
```javascript
const BACKEND_BASE_URL = 'https://your-backend-api.com';
```

### 3. Authentication
- Click extension icon
- Enter email and password
- JWT token is automatically stored and used for all communications

## Extension Permissions

```json
{
  "permissions": [
    "history",           // Access browser history
    "activeTab",         // Open domains in new tabs
    "webNavigation",     // Real-time navigation tracking
    "storage",           // Store JWT tokens
    "identity"           // User identity management
  ],
  "host_permissions": [
    "https://*/*",       // HTTPS communication
    "http://localhost:*/*" // Local development
  ]
}
```

## Data Flow

1. **Navigation Event** → Background script captures domain
2. **Domain Processing** → Filter and validate domain
3. **Local Storage** → Store domain locally
4. **JWT Authentication** → Verify user session
5. **Backend Sync** → Push domains to secure backend
6. **UI Update** → Update popup with latest data

## Security Features

- **TLS Encryption**: All communications encrypted in transit
- **JWT Tokens**: Secure authentication without storing passwords
- **Local Processing**: Domain extraction happens locally
- **Permission-Based**: Minimal required permissions
- **No Third-Party Tracking**: Extension doesn't send data to external services

## Testing

### Mock API Endpoint Testing
The extension has been successfully tested against mock API endpoints, confirming:
- ✅ Real-time sync reliability
- ✅ JWT authentication flow
- ✅ Error handling mechanisms
- ✅ Data integrity during transmission

### Browser Compatibility
- ✅ Chrome (Primary target)
- ✅ Edge (Chromium-based)
- ✅ Other Chromium-based browsers

## Project Structure

```
extention/
├── manifest.json          # Extension configuration with webNavigation permissions
├── background.js          # Service worker for real-time tracking
├── popup.html            # Minimalist UI design
├── popup.css             # Clean, responsive styles
├── popup.js              # JWT authentication and UI logic
└── icons/                # Extension icons
```

## Next Steps (Future Stages)

- Backend API development
- Database schema design
- Data analysis and reporting features
- Advanced privacy controls
- Multi-browser support

## License

MIT License - See LICENSE file for details