# 🏍️ CyberRide - Setup Instructions

## ⚠️ Important: Node.js Version Requirement

**Your current Node.js version: 18.20.4**
**Required version: 20.9.0 or higher**

You need to upgrade Node.js to run this application.

## 🔧 Upgrading Node.js

### Option 1: Using NVM (Recommended)

If you have NVM installed:

```bash
# Install Node.js 20
nvm install 20

# Use Node.js 20
nvm use 20

# Set as default
nvm alias default 20

# Verify
node --version  # Should show v20.x.x
```

### Option 2: Install NVM First

If you don't have NVM:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.bashrc

# Then follow Option 1 steps above
```

### Option 3: Direct Installation

Download Node.js 20+ from: https://nodejs.org/

## 🚀 Running the App

After upgrading Node.js:

```bash
cd /home/bishal/Work/Motorcycle-maintenance/motorcycle-app

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The app will be available at: **http://localhost:3000**

## 📦 What's Included

✅ **Complete Features:**
- Home Dashboard with stats and quick actions
- Maintenance tracking (tasks + component checks)
- Mileage logging with charts
- Achievement system (10 achievements)
- Riding gear wishlist manager
- Interactive 3D bike model viewer
- Progressive Web App (PWA) support
- Offline functionality
- Cyberpunk theme with neon effects

✅ **Tech Stack:**
- Next.js 14 with App Router
- TypeScript
- TailwindCSS (custom cyberpunk theme)
- Three.js + React Three Fiber (3D)
- Framer Motion (animations)
- Recharts (data visualization)
- LocalStorage (data persistence)
- Service Worker (offline support)

## 📱 Mobile Installation

Once the app is running:

1. Open http://localhost:3000 on your phone (use your computer's IP address)
2. Add to home screen
3. Use like a native app!

For production deployment, you'll need to:
1. Deploy to a hosting service (Vercel, Netlify, etc.)
2. Get HTTPS enabled
3. Then PWA features will work fully

## 🎨 Customization

### Change Colors
Edit `app/globals.css` to modify the cyberpunk color scheme:
- `--cyan`: Main accent color
- `--magenta`: Secondary accent
- `--neon-blue`, `--neon-pink`, `--neon-purple`: Various UI elements

### Replace 3D Model
Edit `components/BikeModel.tsx` to add your actual bike model:
1. Export your model as .glb or .gltf
2. Use `useGLTF` from `@react-three/drei`
3. Replace the placeholder geometry

### Add More Maintenance Tasks
Edit `lib/defaultData.ts` to add custom maintenance tasks

## 📚 Documentation

- **README.md**: Project overview and features
- **USAGE_GUIDE.md**: Detailed user guide
- **SETUP.md**: This file - setup instructions

## 🐛 Known Issues

1. **Node.js Version**: Requires Node 20+
2. **Icon Files**: Placeholder icons are included. For production, create proper 192x192 and 512x512 PNG icons
3. **3D Model**: Using a simple placeholder. Replace with actual bike model for best results

## 🎯 Next Steps

1. ✅ Upgrade Node.js to version 20+
2. ✅ Run `npm install` (if needed)
3. ✅ Run `npm run dev`
4. ✅ Open http://localhost:3000
5. ✅ Start tracking your motorcycle maintenance!

## 📞 Need Help?

Check the terminal output for specific errors. Most issues are resolved by:
- Ensuring Node.js 20+ is installed
- Running `npm install` to get all dependencies
- Clearing browser cache if the app doesn't load

---

**Happy Riding! 🏍️💨**

