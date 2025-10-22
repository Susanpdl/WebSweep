#!/bin/bash

# WebSweep n8n Setup Script
echo "🚀 Setting up WebSweep n8n automation..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# n8n Configuration
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your-secure-password
N8N_ENCRYPTION_KEY=your-32-character-encryption-key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Firebase Configuration
FIREBASE_URL=https://your-project-id-default-rtdb.firebaseio.com
FIREBASE_KEY=your-firebase-key

# Optional: OpenAI
OPENAI_API_KEY=your-openai-api-key
EOF
    echo "✅ .env file created. Please update it with your actual credentials."
fi

# Start n8n service
echo "🐳 Starting n8n service..."
docker-compose up -d

echo "✅ n8n is now running!"
echo "🌐 Access n8n at: http://localhost:5678"
echo "👤 Username: admin"
echo "🔑 Password: Check your .env file"
echo ""
echo "📋 Next steps:"
echo "1. Update the .env file with your actual credentials"
echo "2. Import the workflow from working-simple-workflow.json"
echo "3. Test the webhook endpoint"
