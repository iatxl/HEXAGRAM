# HEXAGRAM - Social Media Platform

A full-stack social media application built with React, Node.js, Express, and MongoDB.

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel CLI installed (`npm i -g vercel`)
- MongoDB Atlas account (for database)
- Cloudinary account (for image uploads)

### Step 1: Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your actual values:
   - MongoDB connection string
   - JWT secret
   - Cloudinary credentials
   - Email configuration

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Using GitHub Integration
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy

### Step 3: Database Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Update the `MONGODB_URI` in your environment variables

### Step 4: Domain Configuration
- Set up your custom domain in Vercel dashboard
- Update the frontend API calls to use your deployed URL

## 📁 Project Structure

```
HEXAGRAM/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── api/              # Vercel API routes
├── vercel.json       # Vercel configuration
└── package.json
```

## 🛠️ Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `api/index.js` - API route handler for Vercel
- `.env.example` - Environment variables template

## 📝 Notes

- The backend API routes are handled by `api/index.js` on Vercel
- Frontend is built and served as static files
- Database connections need to be configured for production
- Image uploads require Cloudinary configuration

## 🚨 Important

Make sure to:
1. Set all environment variables in Vercel dashboard
2. Configure MongoDB Atlas for production
3. Set up Cloudinary for image uploads
4. Update API URLs in frontend code for production
