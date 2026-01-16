# 🏍️ CyberRide - Motorcycle Maintenance Tracker

A cyberpunk-themed Progressive Web App (PWA) for tracking motorcycle maintenance, logging mileage, and unlocking achievements. Built with Next.js 14, TypeScript, TailwindCSS, and Three.js.

## ✨ Features

### 🔧 Maintenance Tracking
- Track regular maintenance tasks (washing, chain lubrication, chain cleaning)
- Component health checks (engine, brakes, tires, lights, fluids)
- Get notifications for overdue maintenance
- Build maintenance streaks

### 📊 Mileage Logging
- Log daily rides with notes
- Visualize your riding activity with interactive charts
- Track total kilometers and riding statistics
- Average distance calculations

### 🏆 Achievement System
- Unlock achievements as you ride and maintain your bike
- Track progress towards goals
- Gamified experience with multiple achievement categories:
  - Mileage milestones
  - Maintenance dedication
  - Gear collection
  - Special achievements

### 🛍️ Riding Gear Wishlist
- Keep track of gear you own and want to buy
- Set priorities for purchases
- Organize by category (helmet, jacket, gloves, boots, pants, accessories)
- Add prices and notes

### 🎨 3D Bike Viewer
- Interactive 3D model of your motorcycle
- Full camera controls (rotate, pan, zoom)
- Real-time lighting and shadows
- Placeholder model ready to be replaced with your actual bike

### 📱 Progressive Web App
- Install on your phone or desktop
- Works offline
- Fast loading with service worker caching
- Native app-like experience

## 🎨 Design

The app features a stunning **cyberpunk aesthetic** with:
- Neon color palette (cyan, magenta, purple, yellow)
- Glowing effects and animations
- Dark themed interface
- Smooth transitions with Framer Motion

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
cd motorcycle-app
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📱 Installing as PWA

### On Mobile (Android/iOS)
1. Open the app in your mobile browser
2. Tap the "Add to Home Screen" option
3. The app will install like a native app

### On Desktop (Chrome/Edge)
1. Click the install icon in the address bar
2. Or use the browser menu: More Tools → Install CyberRide

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS with custom cyberpunk theme
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Context API + LocalStorage
- **PWA:** Custom Service Worker

## 📁 Project Structure

```
motorcycle-app/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── maintenance/       # Maintenance tracking
│   ├── mileage/          # Mileage logging
│   ├── achievements/     # Achievement gallery
│   ├── gear/             # Riding gear management
│   └── bike/             # 3D bike viewer
├── components/            # Reusable components
│   ├── Navigation.tsx
│   ├── Header.tsx
│   └── BikeModel.tsx
├── contexts/             # React contexts
│   └── AppContext.tsx
├── types/                # TypeScript types
│   └── index.ts
├── lib/                  # Utilities and default data
│   └── defaultData.ts
└── public/              # Static assets
    ├── manifest.json
    └── sw.js
```

## 🎯 Future Enhancements

- [ ] Cloud sync (Firebase/Supabase)
- [ ] Export/import data
- [ ] Reminder notifications
- [ ] Photo uploads for maintenance logs
- [ ] Service history tracking
- [ ] Expense tracking
- [ ] Multiple bike support
- [ ] Community features
- [ ] Import actual 3D bike models (.glb/.gltf)

## 🎮 Data Storage

All data is stored locally in your browser's LocalStorage. Your data stays on your device and is never sent to any server.

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

MIT License - feel free to use this project as you wish.

## 🎉 Enjoy!

Happy riding and stay safe! 🏍️💨

---

Built with ❤️ for motorcycle enthusiasts
