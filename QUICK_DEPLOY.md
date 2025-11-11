# Quick Deploy Guide 🚀

## Easiest Way: Deploy with Vercel (No Build Needed!)

Vercel can build directly from your GitHub repo!

### Step 1: Push to GitHub (Already Done ✅)
Your code is at: https://github.com/JyotiPrakashPanda98/PetShare

### Step 2: Deploy to Vercel
1. Go to: https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import: `JyotiPrakashPanda98/PetShare`
5. Configure:
   - Framework Preset: **Other**
   - Build Command: `npx expo export:web`
   - Output Directory: `web-build`
   - Install Command: `npm install`
6. Click "Deploy"

Vercel will automatically:
- Build your app
- Deploy it
- Give you a live URL!

### Step 3: Share Your Live App
Once deployed, you'll get a URL like:
`https://petshare-xyz.vercel.app`

Share this URL to showcase all your screens! 🎉

---

## Alternative: Use Expo Snack (Instant Preview)

1. Go to: https://snack.expo.dev
2. Click "Import from GitHub"
3. Enter: `JyotiPrakashPanda98/PetShare`
4. Share the Snack URL

---

## Local Web Preview

To test locally first:
```powershell
cd D:\Pet
npx expo start --web
```

Then press `w` in the terminal to open in browser.

