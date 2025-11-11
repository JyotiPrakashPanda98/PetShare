# Deploy PetShare to Showcase All Screens 🌐

This guide will help you deploy your PetShare app so you can showcase all screens online.

## Option 1: Deploy with Expo Web (Easiest) ⭐

### Step 1: Build for Web
```powershell
cd D:\Pet
npx expo export:web
```

### Step 2: Deploy to Vercel (Recommended)
1. Install Vercel CLI:
```powershell
npm install -g vercel
```

2. Deploy:
```powershell
cd D:\Pet
npx expo export:web
vercel
```

3. Follow the prompts - it will give you a live URL!

### Step 3: Deploy to Netlify (Alternative)
1. Install Netlify CLI:
```powershell
npm install -g netlify-cli
```

2. Build and deploy:
```powershell
cd D:\Pet
npx expo export:web
netlify deploy --prod --dir web-build
```

## Option 2: Deploy with GitHub Pages

### Step 1: Build for Web
```powershell
cd D:\Pet
npx expo export:web
```

### Step 2: Push web-build to GitHub
```powershell
git add web-build
git commit -m "Add web build for deployment"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to: https://github.com/JyotiPrakashPanda98/PetShare/settings/pages
2. Source: Deploy from a branch
3. Branch: `main` / `web-build` folder
4. Save

Your app will be live at: `https://jyotiprakashpanda98.github.io/PetShare/`

## Option 3: Use Expo Snack (Quick Preview)

1. Go to https://snack.expo.dev
2. Import from GitHub: `JyotiPrakashPanda98/PetShare`
3. Share the Snack URL

## Quick Deploy Commands

### Vercel (Fastest):
```powershell
cd D:\Pet
npx expo export:web
npx vercel --prod
```

### Netlify:
```powershell
cd D:\Pet
npx expo export:web
npx netlify deploy --prod --dir web-build
```

## Showcase All Screens

Once deployed, your app will showcase:
- ✅ Splash Screen
- ✅ Login Screen
- ✅ Feed Screen (with posts)
- ✅ Add Post Screen
- ✅ Profile Screen
- ✅ Settings Screen

All screens will be accessible through navigation!

## Troubleshooting

### If web build fails:
```powershell
npm install
npx expo install expo-linear-gradient
npx expo export:web
```

### If you get routing errors:
Make sure your navigation is set up for web routing in `App.tsx`

