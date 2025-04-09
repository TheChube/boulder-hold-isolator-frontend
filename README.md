# Climbing Hold Isolator (Frontend)

This is the React frontend for uploading images and selecting hold colors to isolate.

## 🖼️ What It Does

- Uploads an image to the backend
- Selects a color (pink, green, blue, etc.)
- Displays the result with selected color in full, rest in grayscale

## 🌐 How to Deploy (Vercel Recommended)

### Step 1: Go to [https://vercel.com](https://vercel.com)

1. Click "New Project"
2. Import this repo (must be public or linked to your GitHub)
3. It will auto-detect as a Vite React app

### Step 2: Update API URL

In `App.jsx`, replace:
```js
https://YOUR-BACKEND-URL.onrender.com/isolate
```

With the URL of your deployed backend (e.g. from Render.com)

### Step 3: Deploy 🚀

Vercel will handle the build and give you a live frontend URL like:

```
https://climbing-hold-isolator.vercel.app
```

## 🧪 Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.