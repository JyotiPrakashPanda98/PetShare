# 🎤 PetShare Demo Script for Interview

## Quick 2-Minute Demo

### Introduction (15 seconds)
"I built PetShare - a React Native social media app for sharing pet moments. It's similar to Instagram but focused on pets. Let me show you the key features."

---

### Screen 1: Splash & Login (20 seconds)
"App starts with an animated splash screen, then navigates to login. I have Firebase integration ready for authentication."

**What to show:**
- Splash animation
- Login screen UI
- Mention: "Type-safe navigation with React Navigation"

---

### Screen 2: Feed Screen (40 seconds)
"This is the main feed - shows all pet posts with images, captions, and hashtags."

**What to demonstrate:**
- Scroll through posts
- Click like button → "See the animation and count update"
- Open comments → "Comments stored in SQLite database"
- Show a post with hashtags

**What to say:**
- "Posts are stored locally in SQLite"
- "Real-time like updates"
- "Clean, Instagram-inspired UI"

---

### Screen 3: Add Post (30 seconds)
"Users can upload pet photos and add captions with hashtags."

**What to demonstrate:**
- Navigate to Add Post tab
- Show the upload interface
- Explain: "Image picker from Expo, saves to local database"

**What to say:**
- "Image handling with Expo Image Picker"
- "Data persistence with SQLite"
- "Form validation and error handling"

---

### Screen 4: Profile (20 seconds)
"User profile shows stats and a grid of all their posts."

**What to show:**
- Profile stats (posts, followers, following)
- Post grid layout
- Clean UI design

---

### Screen 5: Settings (15 seconds)
"Settings screen with dark mode toggle that persists user preference."

**What to demonstrate:**
- Toggle dark mode
- Show theme change
- Mention: "Uses AsyncStorage for persistence"

---

### Technical Summary (20 seconds)
"Built with React Native and Expo for cross-platform development. Uses TypeScript for type safety, React Navigation for routing, SQLite for local data, and Context API for state management. The code is on GitHub if you'd like to review it."

---

## Key Points to Emphasize

✅ **Cross-platform** - Works on iOS, Android, Web  
✅ **Type-safe** - Full TypeScript implementation  
✅ **Data persistence** - SQLite database  
✅ **Modern UI** - Clean, responsive design  
✅ **Best practices** - Component architecture, service layer  
✅ **Scalable** - Ready for Firebase backend integration  

---

## If Asked Technical Questions

**Q: Why React Native?**  
A: "Cross-platform development, code reuse, large community, and Expo makes development fast."

**Q: Why SQLite instead of a backend?**  
A: "For this demo, I focused on local-first architecture. In production, I'd integrate Firebase for real-time sync and cloud storage."

**Q: How would you improve this?**  
A: "Add user authentication, cloud image storage, real-time updates, push notifications, and user search functionality."

**Q: What was challenging?**  
A: "Learning React Navigation routing, handling image loading states, and implementing proper TypeScript types for navigation."

---

## Backup Plans

1. **If app doesn't load:** Show GitHub code, explain architecture
2. **If deployment fails:** Use Expo Snack or local demo
3. **If time is short:** Focus on Feed and Add Post screens
4. **If asked for code:** Have key files ready to show (AppNavigator, database service)

---

**Remember:** Confidence and clear explanation matter more than perfect execution!

