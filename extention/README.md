# WebSweep Chrome Extension

A Chrome extension that analyzes browser history and provides domain analytics with Firebase authentication.

## Features

- Firebase Authentication for secure access
- Browser history analysis and domain extraction
- Visit counting and statistics
- Modern interface with smooth animations
- Click to visit domains in new tabs
- Smart filtering of invalid URLs

## Installation

### Development Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right
3. Click "Load unpacked" and select this folder
4. The extension should now appear in your extensions list

## Usage

### First Time Setup

1. Click the extension icon in your Chrome toolbar
2. Create an account with your details:
   - Full Name (required)
   - Email address (required)
   - Password (minimum 6 characters)
   - Address information
3. Sign in to access the extension

### Daily Usage

1. Sign in with your credentials
2. The extension automatically loads your last 100 unique domains
3. Click "Refresh History" to reload the data
4. Click on any domain name to open it in a new tab
5. Use the logout button when finished

## Configuration

The extension uses Firebase for authentication and data storage:

- Project ID: websweep-2b20e
- Authentication: Email/Password enabled
- Database: Firestore for user data storage

### Firebase Setup

To use with your own Firebase project:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Create a Firestore database
4. Update `firebase-config.js` with your project credentials

## Permissions

The extension requires:
- `history`: To access browser history and extract domain information
- `activeTab`: To open domains in new tabs when clicked

## How It Works

1. User authentication through Firebase
2. Chrome history API retrieves browsing data
3. Domain parsing extracts hostnames from URLs
4. Invalid domains (localhost, chrome://) are filtered out
5. Domains are deduplicated and visit counts are calculated
6. Results are sorted by most recent visit
7. Data is displayed with visit counts

## File Structure

```
extention/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.css             # Styling
├── popup.js              # JavaScript functionality
├── firebase-config.js    # Firebase configuration
├── firebase-*.js         # Firebase SDK files
├── icon*.png             # Extension icons
└── package.json          # Project configuration
```

## Privacy & Security

- Secure authentication through Firebase
- All data processing happens locally in your browser
- No data collection or transmission
- Only accesses browser history when authenticated
- Proper session management and logout functionality

## Troubleshooting

### Authentication Issues
- Check your email and password
- Ensure you've created an account first
- Password must be at least 6 characters
- Try logging in instead of creating a new account if email is already in use

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

1. Edit the source files in this folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## Browser Compatibility

- Chrome 88+ (Manifest V3)
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers

## License

This project is open source and available under the MIT License.