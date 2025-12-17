# Render Deployment Checklist

## 📋 Before Deploying:

1. **Push all files to GitHub:**
   ```bash
   git add .
   git commit -m "Backend deployment ready"
   git push origin main
   ```

2. **Verify repository structure:**
   - ✅ config/database.js
   - ✅ controllers/
   - ✅ middleware/
   - ✅ models/
   - ✅ routes/
   - ✅ server.js
   - ✅ package.json

3. **Environment Variables in Render:**
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = your JWT secret key
   - `NODE_ENV` = production
   - `PORT` = 10000 (auto-set by Render)

## 🚀 Deployment Steps:

1. Go to Render Dashboard
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add environment variables
6. Deploy!

## 🔗 After Deployment:

Update your frontend API_BASE_URL to:
`https://your-render-app-name.onrender.com/api`