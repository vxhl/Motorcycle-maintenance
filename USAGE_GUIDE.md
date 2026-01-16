# 🏍️ CyberRide Usage Guide

## Quick Start

### Running the App

```bash
cd motorcycle-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Features Overview

### 1. Home Dashboard
The home page shows you:
- **Quick Stats**: Total kilometers, maintenance tasks, achievements, and overdue items
- **Alerts**: Overdue maintenance tasks and critical component issues
- **Recent Activity**: Your latest rides and unlocked achievements
- **Quick Actions**: Fast access to main features

### 2. 🔧 Maintenance Hub

#### Maintenance Tasks Tab
Track recurring maintenance:
- **Wash Motorcycle** (Monthly)
- **Chain Lubrication** (Bi-weekly)
- **Chain Cleaning** (Bi-weekly)

Each task shows:
- Frequency schedule
- Last completed date
- Next due date
- Maintenance streak

**How to use:**
1. Click "Mark as Complete" when you finish a task
2. The app automatically calculates the next due date
3. Build streaks by completing tasks regularly

#### Component Checks Tab
Monitor your bike's health:
- Engine Oil
- Brake Pads
- Tire Pressure
- Headlight
- Coolant Level

**Status Indicators:**
- 🟢 **Good**: Component is healthy
- 🟡 **Warning**: Needs attention soon
- 🔴 **Critical**: Immediate action required

**How to use:**
1. Inspect each component
2. Click the appropriate status button (Good/Warning/Critical)
3. The app records the check date automatically

### 3. 📊 Mileage Tracker

Log your daily rides and track progress:

**Features:**
- Total distance traveled
- Number of rides
- Average distance per ride
- Interactive chart showing recent activity
- Complete ride history

**How to log a ride:**
1. Click "Add Entry"
2. Enter kilometers traveled
3. Add optional notes (e.g., "Highway ride to the coast")
4. Click "Save Entry"

**Tips:**
- Log rides regularly to unlock mileage achievements
- Use notes to remember special trips
- The chart shows your last 10 rides

### 4. 🏆 Achievement Gallery

Unlock achievements by using the app:

**Achievement Categories:**

#### 🏍️ Mileage Achievements
- **First Ride**: Log your first kilometer
- **Century Club**: Ride 100 kilometers
- **Thousand Miles**: Ride 1000 kilometers
- **Road Warrior**: Ride 5000 kilometers

#### 🔧 Maintenance Achievements
- **Clean Machine**: Wash your bike 5 times
- **Chain Master**: Lube chain 10 times
- **Safety First**: Complete all component checks

#### 🧥 Gear Achievements
- **Gear Up**: Add 3 riding gear items
- **Fully Equipped**: Own all essential riding gear

#### ⚡ Special Achievements
- **Maintenance Streak**: Complete maintenance 7 days in a row

**Progress Tracking:**
- Unlocked achievements show in full color with unlock date
- Locked achievements show progress bars
- Each achievement displays current progress vs. target

### 5. 🛍️ Riding Gear Manager

Track gear you own and plan future purchases:

**Categories:**
- Helmet
- Jacket
- Gloves
- Boots
- Pants
- Accessories

**How to add gear:**
1. Click "Add Gear"
2. Fill in details:
   - Name (e.g., "AGV K6 Helmet")
   - Category
   - Priority (High/Medium/Low)
   - Estimated price
   - Notes
3. Click "Add Gear"

**Managing gear:**
- **Wishlist items**: Show with priority colors
  - Red border = High priority
  - Yellow border = Medium priority
  - Green border = Low priority
- **Owned items**: Show with green border and checkmark
- Click "Mark Owned" to move from wishlist to owned
- Click trash icon to delete items

### 6. 🎨 3D Bike Viewer

Interactive 3D model of your motorcycle:

**Controls:**
- **Left click + drag**: Rotate the view
- **Right click + drag**: Pan the camera
- **Scroll wheel**: Zoom in/out

**Features:**
- Real-time lighting and shadows
- Cyberpunk neon styling
- Smooth animations
- Grid floor for reference

**Customization:**
The current model is a placeholder. You can replace it with your actual bike's 3D model:
1. Export your bike model as .glb or .gltf format
2. Replace the code in `components/BikeModel.tsx`
3. Use tools like Blender or download models from Sketchfab

## 💾 Data Storage

**All data is stored locally in your browser:**
- Data persists between sessions
- No internet required after first load
- Your data never leaves your device
- Works offline as a PWA

**Backup your data:**
Currently, data is stored in browser LocalStorage. To backup:
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Copy the `cyberride-data` value
4. Save it somewhere safe

**Restore data:**
1. Open DevTools → Application → Local Storage
2. Paste your saved data into `cyberride-data`
3. Refresh the page

## 📱 Installing as PWA

### Android
1. Open the app in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home screen"
4. Tap "Add"
5. The app appears on your home screen like a native app

### iOS
1. Open the app in Safari
2. Tap the Share button
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"

### Desktop (Chrome/Edge)
1. Look for the install icon in the address bar
2. Click it and select "Install"
3. Or: Menu → More Tools → Install CyberRide

**Benefits of PWA:**
- Works offline
- Faster loading
- Full-screen experience
- No app store needed
- Updates automatically

## 🎮 Tips & Tricks

1. **Build Streaks**: Complete maintenance regularly to build impressive streaks
2. **Set Reminders**: Check the app weekly to stay on top of maintenance
3. **Log Daily**: Log your rides daily to track progress accurately
4. **Use Notes**: Add notes to mileage entries for memorable trips
5. **Plan Gear**: Use priority levels to plan your next gear purchase
6. **Check Components**: Do a full component check before long rides
7. **Unlock All**: Try to unlock all achievements for the complete experience

## 🎨 Cyberpunk Theme

The app features:
- **Neon Colors**: Cyan (#00ffff), Magenta (#ff00ff), Purple (#8b5cf6), Yellow (#ffff00)
- **Glowing Effects**: Text and borders glow with neon light
- **Dark Theme**: Easy on the eyes, perfect for night viewing
- **Smooth Animations**: Powered by Framer Motion
- **Futuristic UI**: Inspired by cyberpunk aesthetics

## 🐛 Troubleshooting

**App not loading?**
- Clear browser cache and reload
- Check if JavaScript is enabled
- Try a different browser

**Data disappeared?**
- Check if you're using the same browser
- Browser cache might have been cleared
- Restore from backup if available

**3D model not showing?**
- Wait a few seconds for it to load
- Check if WebGL is supported in your browser
- Try refreshing the page

**PWA not installing?**
- Make sure you're using HTTPS or localhost
- Check if your browser supports PWA
- Try using Chrome or Edge

## 🚀 Future Features

Coming soon:
- Cloud sync
- Reminder notifications
- Photo uploads
- Service history
- Expense tracking
- Multiple bikes
- Export/import data

## 📞 Support

This is a personal project. For issues or suggestions, check the GitHub repository.

---

**Ride safe and keep your bike maintained! 🏍️💨**

