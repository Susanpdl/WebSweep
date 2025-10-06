# WebSweep Extension Icons

## Current Status
✅ SVG icons created with WebSweep design
✅ HTML converter files generated for easy conversion
✅ Automated conversion scripts created
⏳ PNG conversion needed for browser extension

## Icon Design
The WebSweep icon features:
- **Purple gradient circular background** (#a855f7 to #7c3aed)
- **White border** for contrast
- **Central white rectangle** representing data core
- **8 orbiting white circles** representing data analysis
- **Glowing effect** for modern appearance

## Files Created
- `websweep-icon.svg` - Master SVG icon (128x128)
- `icon16.svg`, `icon48.svg`, `icon128.svg` - Size-specific variants
- `icon16.html`, `icon48.html`, `icon128.html` - Browser converters
- `generate-png-icons.js` - Automated icon generator
- `convert-svg-to-png.js` - Alternative conversion script

## Converting to PNG

### Method 1: Automated Browser Conversion (Recommended)
1. Run the icon generator:
   ```bash
   npm run generate-icons
   # or
   node generate-png-icons.js
   ```
2. Open each HTML file in your browser:
   - `icon16.html`
   - `icon48.html` 
   - `icon128.html`
3. Click the "📥 Download PNG" button
4. Save as `icon16.png`, `icon48.png`, `icon128.png`

### Method 2: Manual Browser Screenshot
1. Open each HTML file in your browser
2. Right-click on the icon and "Save image as..."
3. Save as `icon16.png`, `icon48.png`, `icon128.png`

### Method 3: Online Converters
1. Go to https://convertio.co/svg-png/
2. Upload the SVG files
3. Download as PNG files
4. Rename to `icon16.png`, `icon48.png`, `icon128.png`

### Method 4: Command Line (if you have ImageMagick)
```bash
convert icon16.svg icon16.png
convert icon48.svg icon48.png
convert icon128.svg icon128.png
```

## Scripts Available
- `npm run generate-icons` - Generate HTML converters
- `npm run convert-icons` - Alternative conversion method

## Testing
After creating the PNG files:
1. Load the extension in Chrome/Edge
2. Check that the icon appears correctly in the browser toolbar
3. Verify the icon shows in the extensions management page

## Branding Consistency
The extension now uses the same WebSweep icon design as the web application, ensuring consistent branding across all touchpoints.

## Troubleshooting
- If PNG files are not generated, use the HTML files in your browser
- Make sure to save files with exact names: `icon16.png`, `icon48.png`, `icon128.png`
- Check that PNG files are in the extension root directory
- Verify file permissions allow reading the PNG files
