# WebSweep

WebSweep is a privacy-focused application that helps users analyze and clean their digital footprint. It consists of a Chrome extension and React web application that work together to provide browsing history analytics and data removal requests.

## Features

- **Browser History Analysis**: Chrome extension analyzes browsing patterns and domain visits
- **User Authentication**: Secure Firebase authentication for both extension and web app
- **Dashboard Analytics**: React web app displays comprehensive browsing statistics
- **Data Removal Requests**: Integration with n8n for automated data removal from third parties
- **Privacy-First Design**: All data processing happens locally, only analysis results are stored

## Architecture

### Chrome Extension
- Analyzes browser history using Chrome APIs
- Extracts unique domains and visit counts
- Syncs data to Firebase for web app access
- Modern UI with authentication and domain display

### React Web Application
- User dashboard with browsing analytics
- Top visits and recent activity tracking
- Data removal request functionality
- Responsive design with Tailwind CSS

### Backend Services
- Firebase Authentication for user management
- Firestore Database for data storage
- n8n webhook integration for data removal

## Quick Start

### Prerequisites
- Node.js 14+
- Chrome browser
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WebSweep.git
   cd WebSweep
   ```

2. **Setup the web application**
   ```bash
   cd webapp
   npm install
   npm start
   ```

3. **Load the Chrome extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `extention` folder

4. **Configure Firebase**
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Update `firebase-config.js` with your project credentials

### Usage

1. **Sign up** in the web application
2. **Open the extension** and sign in with the same account
3. **Click "Refresh History"** to analyze your browsing data
4. **View analytics** in the web application dashboard
5. **Request data removal** from companies using the sweep functionality

## Project Structure

```
WebSweep/
├── extention/           # Chrome extension
│   ├── manifest.json   # Extension configuration
│   ├── popup.html      # Extension UI
│   ├── popup.js        # Extension logic
│   └── firebase-*.js   # Firebase integration
├── webapp/             # React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Application pages
│   │   ├── contexts/   # Authentication context
│   │   └── services/   # API services
│   └── package.json    # Dependencies
└── README.md
```

## Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Email/Password authentication
3. Create a Firestore database
4. Update configuration files with your project credentials

### Environment Variables
Create a `.env` file in the webapp directory:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Development

### Extension Development
- Edit files in the `extention` folder
- Reload the extension in Chrome
- Test changes in the browser

### Web App Development
- Run `npm start` in the webapp directory
- Make changes to React components
- Test in the browser at `http://localhost:3000`

## Security & Privacy

- All browsing history processing happens locally
- Only analysis results are stored in Firebase
- User authentication is handled securely
- No personal data is collected without consent

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests.