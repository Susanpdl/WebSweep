const fs = require('fs');
const path = require('path');

// Simple SVG to PNG converter using canvas (requires node-canvas)
// Alternative: Use puppeteer for more reliable conversion

async function convertSvgToPng() {
  try {
    // Check if we have the required dependencies
    let canvas;
    try {
      canvas = require('canvas');
    } catch (error) {
      console.log('Canvas not available. Installing puppeteer for conversion...');
      // Fallback to a simpler approach - create HTML files for manual conversion
      createHtmlFiles();
      return;
    }

    const sizes = [
      { name: 'icon16', size: 16 },
      { name: 'icon48', size: 48 },
      { name: 'icon128', size: 128 }
    ];

    for (const { name, size } of sizes) {
      const svgPath = path.join(__dirname, `${name}.svg`);
      const pngPath = path.join(__dirname, `${name}.png`);
      
      if (fs.existsSync(svgPath)) {
        const svgContent = fs.readFileSync(svgPath, 'utf8');
        
        // Create canvas
        const canvasInstance = canvas.createCanvas(size, size);
        const ctx = canvasInstance.getContext('2d');
        
        // Load SVG and convert to PNG
        const img = new canvas.Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size);
          const buffer = canvasInstance.toBuffer('image/png');
          fs.writeFileSync(pngPath, buffer);
          console.log(`✅ Converted ${name}.svg to ${name}.png`);
        };
        img.onerror = (err) => {
          console.error(`❌ Error converting ${name}.svg:`, err);
        };
        
        // Convert SVG to data URL
        const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
        img.src = svgDataUrl;
      }
    }
  } catch (error) {
    console.error('Error in conversion:', error);
    console.log('Falling back to HTML file creation for manual conversion...');
    createHtmlFiles();
  }
}

function createHtmlFiles() {
  const sizes = [
    { name: 'icon16', size: 16 },
    { name: 'icon48', size: 48 },
    { name: 'icon128', size: 128 }
  ];

  sizes.forEach(({ name, size }) => {
    const svgPath = path.join(__dirname, `${name}.svg`);
    const htmlPath = path.join(__dirname, `${name}.html`);
    
    if (fs.existsSync(svgPath)) {
      const svgContent = fs.readFileSync(svgPath, 'utf8');
      
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>${name} - WebSweep Icon</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #f0f0f0;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
        }
        .icon-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .icon {
            width: ${size}px;
            height: ${size}px;
        }
        .instructions {
            text-align: center;
            max-width: 400px;
        }
        .instructions h2 {
            color: #333;
            margin-bottom: 10px;
        }
        .instructions p {
            color: #666;
            line-height: 1.5;
        }
        .download-btn {
            background: #4f46e5;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
        }
        .download-btn:hover {
            background: #4338ca;
        }
    </style>
</head>
<body>
    <div class="icon-container">
        ${svgContent}
    </div>
    
    <div class="instructions">
        <h2>Convert to PNG</h2>
        <p>Right-click on the icon above and select "Save image as..." to save it as a PNG file.</p>
        <p>Make sure to save it as <strong>${name}.png</strong> in the extension folder.</p>
        <button class="download-btn" onclick="downloadIcon()">Download Icon</button>
    </div>

    <script>
        function downloadIcon() {
            const svg = document.querySelector('svg');
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            canvas.width = ${size};
            canvas.height = ${size};
            
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                const pngData = canvas.toDataURL('image/png');
                
                const link = document.createElement('a');
                link.download = '${name}.png';
                link.href = pngData;
                link.click();
            };
            
            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        }
    </script>
</body>
</html>`;

      fs.writeFileSync(htmlPath, htmlContent);
      console.log(`✅ Created ${name}.html for manual conversion`);
    }
  });
  
  console.log('\n📋 Manual Conversion Instructions:');
  console.log('1. Open each HTML file in your browser');
  console.log('2. Right-click on the icon and "Save image as..."');
  console.log('3. Save as icon16.png, icon48.png, icon128.png');
  console.log('4. Or use the "Download Icon" button for automatic conversion');
}

// Run the conversion
convertSvgToPng();