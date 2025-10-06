const fs = require('fs');
const path = require('path');

// Generate PNG icons using a simple base64 approach
// This creates a basic PNG conversion without external dependencies

function createPngFromSvg(svgContent, size) {
  // This is a simplified approach - in production, you'd want to use a proper SVG to PNG converter
  // For now, we'll create a placeholder that shows the conversion is needed
  
  const pngHeader = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
    0x00, 0x00, 0x00, size & 0xFF, (size >> 8) & 0xFF, 0x00, 0x00, // Width
    0x00, 0x00, 0x00, size & 0xFF, (size >> 8) & 0xFF, 0x00, 0x00, // Height
    0x08, 0x02, 0x00, 0x00, 0x00, // Bit depth, color type, compression, filter, interlace
    0x00, 0x00, 0x00, 0x00, // CRC
    0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82  // IEND chunk
  ]);
  
  return pngHeader;
}

function generateIcons() {
  const sizes = [
    { name: 'icon16', size: 16 },
    { name: 'icon48', size: 48 },
    { name: 'icon128', size: 128 }
  ];

  console.log('🎨 WebSweep Icon Generator');
  console.log('==========================\n');

  sizes.forEach(({ name, size }) => {
    const svgPath = path.join(__dirname, `${name}.svg`);
    const pngPath = path.join(__dirname, `${name}.png`);
    const htmlPath = path.join(__dirname, `${name}.html`);
    
    if (fs.existsSync(svgPath)) {
      console.log(`📁 Processing ${name}.svg (${size}x${size})`);
      
      // Create HTML file for browser-based conversion
      const svgContent = fs.readFileSync(svgPath, 'utf8');
      const htmlContent = createHtmlConverter(svgContent, name, size);
      fs.writeFileSync(htmlPath, htmlContent);
      
      console.log(`✅ Created ${name}.html`);
      console.log(`   → Open in browser to convert to PNG`);
    } else {
      console.log(`❌ ${name}.svg not found`);
    }
  });

  console.log('\n🚀 Next Steps:');
  console.log('1. Open each HTML file in your browser');
  console.log('2. Use the "Download PNG" button to save as PNG');
  console.log('3. Save the files as icon16.png, icon48.png, icon128.png');
  console.log('4. Place the PNG files in the extension folder');
  
  console.log('\n📋 Alternative: Use online SVG to PNG converters');
  console.log('• https://convertio.co/svg-png/');
  console.log('• https://cloudconvert.com/svg-to-png');
  console.log('• https://www.freeconvert.com/svg-to-png');
}

function createHtmlConverter(svgContent, name, size) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - WebSweep Icon Converter</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        
        .icon-preview {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
            border: 2px dashed #dee2e6;
        }
        
        .icon {
            width: ${size}px;
            height: ${size}px;
            margin: 0 auto;
            display: block;
        }
        
        .title {
            color: #333;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #666;
            font-size: 16px;
            margin-bottom: 30px;
        }
        
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .btn-secondary {
            background: #6c757d;
        }
        
        .btn-secondary:hover {
            background: #5a6268;
        }
        
        .instructions {
            background: #e3f2fd;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            text-align: left;
        }
        
        .instructions h3 {
            color: #1976d2;
            margin-bottom: 10px;
        }
        
        .instructions ol {
            color: #555;
            line-height: 1.6;
        }
        
        .instructions li {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">WebSweep Icon Converter</h1>
        <p class="subtitle">Convert SVG to PNG (${size}x${size}px)</p>
        
        <div class="icon-preview">
            ${svgContent}
        </div>
        
        <button class="btn" onclick="downloadPNG()">📥 Download PNG</button>
        <button class="btn btn-secondary" onclick="copySVG()">📋 Copy SVG</button>
        
        <div class="instructions">
            <h3>📋 Instructions:</h3>
            <ol>
                <li>Click "Download PNG" to save the icon as PNG</li>
                <li>Save the file as <strong>${name}.png</strong></li>
                <li>Place it in your extension folder</li>
                <li>Or right-click the icon above and "Save image as..."</li>
            </ol>
        </div>
    </div>

    <script>
        function downloadPNG() {
            const svg = document.querySelector('svg');
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            canvas.width = ${size};
            canvas.height = ${size};
            
            img.onload = function() {
                ctx.drawImage(img, 0, 0, ${size}, ${size});
                const pngData = canvas.toDataURL('image/png');
                
                const link = document.createElement('a');
                link.download = '${name}.png';
                link.href = pngData;
                link.click();
            };
            
            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        }
        
        function copySVG() {
            const svg = document.querySelector('svg');
            const svgData = new XMLSerializer().serializeToString(svg);
            navigator.clipboard.writeText(svgData).then(() => {
                alert('SVG copied to clipboard!');
            });
        }
    </script>
</body>
</html>`;
}

// Run the generator
generateIcons();