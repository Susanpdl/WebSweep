# WebSweep

A simple app that shows your browsing data and helps you delete it from websites.

## What it does

- Shows your browsing history in a dashboard
- Helps you ask websites to delete your data
- Works with Chrome browser

## How to use

1. **Start the web app**
   ```bash
   cd webapp
   npm install
   npm start
   ```

2. **Add the Chrome extension**
   - Open Chrome
   - Go to `chrome://extensions/`
   - Turn on "Developer mode"
   - Click "Load unpacked" and pick the `extention` folder

3. **Sign up and use**
   - Create an account in the web app
   - Sign in to the extension
   - Click "Refresh History" to see your data
   - Use "Sweep Data" to ask websites to delete your info

## Files

- `webapp/` - The main website
- `extention/` - Chrome extension
- `n8n_automation/` - Backend for deleting data

That's it!