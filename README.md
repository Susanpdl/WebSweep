# DataSweepr

A comprehensive data management and analysis platform designed to help users track their digital footprint and manage their online privacy.

## 🎯 Project Overview

DataSweepr consists of two main components:
- **Chrome Extension** - Real-time domain tracking with JWT authentication
- **Web Application** - React-based dashboard for data analysis and management

## ✅ Stage 1: Frontend Extension for Real-Time Sync - COMPLETED

### **Real-Time Navigation Tracking**
- ✅ Fully functional Chrome browser extension developed
- ✅ Uses `chrome.webNavigation` and `chrome.history` APIs for comprehensive monitoring
- ✅ Intelligently captures domains of websites visited in real-time
- ✅ Implements filtering and consolidation logic for clean domain lists

### **JWT Authentication System**
- ✅ Integrated JWT (JSON Web Token) authentication system
- ✅ Secure token storage and management in Chrome's local storage
- ✅ All backend communications authenticated with JWT tokens
- ✅ Maintains user sessions across extension restarts

### **Secure Backend Communication**
- ✅ HTTPS communication with TLS encryption for all data transmission
- ✅ Reliable mechanism to push captured domains to backend endpoints
- ✅ Successfully tested against mock API endpoints
- ✅ Robust error handling and retry mechanisms

### **Minimalist UI Design**
- ✅ Clean, intuitive popup interface
- ✅ Provides essential status information without disrupting browsing
- ✅ Real-time sync status and domain tracking display
- ✅ Responsive design optimized for extension popup

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Chrome browser
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/datasweepr.git
   cd datasweepr
   ```

2. **Set up the Chrome Extension:**
   ```bash
   cd extention
   ```
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `extention` folder

3. **Set up the Web Application:**
   ```bash
   cd webapp
   npm install
   npm start
   ```

## 📁 Project Structure

```
datasweepr/
├── extention/                 # Chrome extension
│   ├── manifest.json         # Extension configuration
│   ├── background.js         # Service worker for real-time tracking
│   ├── popup.html           # Extension popup UI
│   ├── popup.css            # Popup styling
│   ├── popup.js             # JWT authentication and UI logic
│   ├── README.md            # Extension documentation
│   └── icons/               # Extension icons
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
├── webapp/                   # React web application
│   ├── src/                 # Source code
│   ├── public/              # Public assets
│   ├── package.json         # Dependencies
│   └── README.md            # Web app documentation
└── README.md                # This file
```

## 🔧 Technical Implementation

### Chrome Extension APIs
- `chrome.webNavigation` - Real-time navigation tracking
- `chrome.history` - Historical data analysis
- `chrome.storage` - Local data storage
- `chrome.tabs` - Tab management

### Authentication Flow
```javascript
// JWT authentication with backend
const response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwtToken}`
  },
  body: JSON.stringify({ email, password })
});
```

### Real-Time Sync
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

## 🎨 Features

### Chrome Extension
- **Real-time domain tracking** - Captures domains as you browse
- **JWT authentication** - Secure login system
- **Local storage** - Stores domains locally
- **Minimalist UI** - Clean, non-intrusive interface
- **Click to visit** - Click domains to open in new tabs

### Web Application
- **User dashboard** - View browsing statistics
- **Data visualization** - Charts and graphs
- **Sweep functionality** - Request data removal from websites
- **User management** - Account creation and management

## 🔒 Security & Privacy

- **TLS Encryption** - All communications encrypted in transit
- **JWT Tokens** - Secure authentication without storing passwords
- **Local Processing** - Domain extraction happens locally
- **Permission-Based** - Minimal required permissions
- **No Third-Party Tracking** - Extension doesn't send data to external services

## 🧪 Testing

### Extension Testing
- ✅ Real-time tracking functionality
- ✅ JWT authentication flow
- ✅ Error handling mechanisms
- ✅ Data integrity during transmission
- ✅ Mock API endpoint testing

### Browser Compatibility
- ✅ Chrome (Primary target)
- ✅ Edge (Chromium-based)
- ✅ Other Chromium-based browsers

## 📈 Next Steps (Future Stages)

### Stage 2: Backend Development
- API server implementation
- Database schema design
- User management system
- Data analysis endpoints

### Stage 3: Advanced Features
- Data visualization dashboard
- Privacy controls and settings
- Export/import functionality
- Multi-browser support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Chrome Extension API documentation
- React.js community
- Firebase documentation
- All contributors and testers

---

**Stage 1 Status: ✅ COMPLETED SUCCESSFULLY**

*All deliverables have been implemented, tested, and documented according to the project requirements. The extension is ready for integration with backend services in Stage 2.*
