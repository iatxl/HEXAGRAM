#!/bin/bash

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Create dist directory if it doesn't exist
mkdir -p dist

# Copy frontend build to dist
cp -r frontend/dist/* dist/

echo "Build completed successfully!"
