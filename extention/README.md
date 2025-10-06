# Browser History Domain Parser Chrome Extension

A Chrome extension that parses your browser history and displays the last 100 unique domains you've visited, with Firebase authentication for secure access.

## Features

- **🔐 Firebase Authentication**: Secure login and signup with email/password
- **👤 User Management**: Create accounts and manage user profiles
- **🔒 Protected Access**: Only authenticated users can access browser history
- **🌐 Domain Extraction**: Extracts unique domains from browser history URLs
- **📊 Visit Counting**: Shows how many times you've visited each domain
- **🎨 Modern Interface**: Clean, responsive design with smooth animations
- **🖱️ Click to Visit**: Click on any domain to open it in a new tab
- **📈 Real-time Stats**: Displays total visits and unique domain counts
- **🔍 Smart Filtering**: Automatically filters out invalid URLs (localhost, chrome://, etc.)

## Authentication

The extension uses Firebase Authentication to provide secure access to browser history data:

- **Email/Password Login**: Traditional authentication method
- **User Registration**: Create new accounts with email verification
- **Session Management**: Automatic login state persistence
- **Secure Logout**: Proper session termination
- **Error Handling**: User-friendly error messages for authentication issues

## Installation

### Method 1: Load as Unpacked Extension (Recommended for Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right
3. Click "Load unpacked" and select the `extention` folder
4. The extension should now appear in your extensions list
5. Click the extension icon in the toolbar to open it

### Method 2: Install from Chrome Web Store (When Available)

1. Visit the Chrome Web Store
2. Search for "Browser History Domain Parser"
3. Click "Add to Chrome"
4. Confirm the installation

## Usage

### First Time Setup

1. **Open the Extension**: Click the extension icon in your Chrome toolbar
2. **Create Account**: Click "Sign up" and fill in your details
   - Full Name (required)
   - Email address (required)
   - Password (minimum 6 characters)
3. **Verify Email**: Check your email for verification (if enabled in Firebase)
4. **Login**: Use your credentials to access the extension

### Daily Usage

1. **Login**: Enter your email and password
2. **View Domains**: The extension will automatically load and display your last 100 unique domains
3. **Refresh History**: Click "Refresh History" to reload the data
4. **Visit Domains**: Click on any domain name to open it in a new tab
5. **Logout**: Click the logout button when finished

## Firebase Configuration

The extension is configured with the following Firebase project:

- **Project ID**: websweep
- **Authentication**: Email/Password enabled
- **Security**: Content Security Policy configured for Firebase domains

### Firebase Setup Requirements

To use this extension with your own Firebase project:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Update the `firebase-config.js` file with your project credentials
4. Configure Firebase Security Rules as needed

## Permissions

The extension requires the following permissions:

- **`history`**: To access your browser history and extract domain information
- **`activeTab`**: To open domains in new tabs when clicked

## How It Works

1. **Authentication**: Users must sign in with Firebase before accessing data
2. **History Access**: Uses Chrome's `chrome.history.search()` API to retrieve browser history
3. **Domain Parsing**: Extracts hostnames from URLs using the URL API
4. **Filtering**: Removes invalid domains (localhost, chrome://, etc.)
5. **Deduplication**: Groups visits by domain and counts total visits
6. **Sorting**: Orders domains by most recent visit
7. **Display**: Shows the last 100 unique domains with visit counts

## File Structure

```
extention/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface with auth forms
├── popup.css             # Styling for the popup and auth forms
├── popup.js              # JavaScript functionality with Firebase auth
├── firebase-config.js    # Firebase configuration and initialization
├── icon16.png            # 16x16 icon
├── icon48.png            # 48x48 icon
├── icon128.png           # 128x128 icon
├── package.json          # Project configuration
└── README.md             # This file
```

## Privacy & Security

- **🔐 Secure Authentication**: Firebase handles all authentication securely
- **🔒 Local Processing**: All data processing happens locally in your browser
- **📊 No Data Collection**: The extension does not collect or transmit any data
- **🛡️ History Access**: Only accesses your browser history when authenticated
- **💾 No Storage**: Does not store any data persistently
- **🔑 Session Management**: Proper session handling and logout functionality

## Troubleshooting

### Authentication Issues

- **Login Failed**: Check your email and password
- **Account Not Found**: Make sure you've created an account first
- **Weak Password**: Password must be at least 6 characters
- **Email Already in Use**: Try logging in instead of creating a new account

### Extension Not Loading
- Make sure Developer mode is enabled in Chrome extensions
- Check that all files are present in the extension folder
- Try reloading the extension from `chrome://extensions/`

### No Domains Showing
- Ensure you're logged in
- Check that you have browser history
- Verify the extension has permission to access history
- Try clicking "Refresh History"

### Permission Errors
- Go to `chrome://extensions/`
- Find the extension and click "Details"
- Ensure all required permissions are granted

## Development

To modify the extension:

1. Edit the source files in the `extention` folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Firebase Development

To use your own Firebase project:

1. Replace the Firebase config in `firebase-config.js`
2. Update the Content Security Policy in `manifest.json` if needed
3. Configure Firebase Authentication settings in the Firebase Console

## Browser Compatibility

- Chrome 88+ (Manifest V3)
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests! 