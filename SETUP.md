# PetShare Setup Guide

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **For Firebase (Optional - for authentication):**
   - Create a Firebase project at https://console.firebase.google.com
   - Copy your Firebase config
   - Update `src/services/firebase.ts` with your Firebase configuration

## Features Implemented

### Core Requirements ✅

1. **User Feed**
   - Display all posts with photo + caption + hashtags
   - Scrollable feed with newest posts first
   - Pull-to-refresh functionality

2. **Upload Post**
   - Upload pet photo from gallery or camera
   - Add caption (optional)
   - Add hashtags (optional, separated by spaces)
   - Posts persist in SQLite database

3. **Like Feature**
   - Toggle like button (heart icon)
   - Updates like count in real-time
   - Likes persist in database

4. **Data Handling**
   - SQLite database for local storage
   - Posts, comments, and likes persist after app restart
   - Database initialized on app start

5. **UI**
   - Clean, Instagram-inspired layout
   - Username, timestamp, captions, and hashtags displayed
   - Responsive design

### Bonus Features ✅

1. **Comment Section**
   - Add comments to posts
   - View all comments in modal
   - Comment count updates in real-time

2. **User Authentication (UI Ready)**
   - Login screen with email/password
   - Form validation
   - Firebase setup ready (needs config)
   - Sign up screen can be added

3. **Dark Mode**
   - Toggle dark/light theme
   - Settings screen accessible from Profile
   - Theme persists across app restarts

## Database Schema

### Posts Table
- id (TEXT PRIMARY KEY)
- petName (TEXT)
- petImage (TEXT - URI)
- ownerName (TEXT)
- caption (TEXT)
- hashtags (TEXT)
- likes (INTEGER)
- comments (INTEGER)
- isLiked (INTEGER - 0 or 1)
- createdAt (TEXT - ISO string)
- timestamp (TEXT - human readable)

### Comments Table
- id (TEXT PRIMARY KEY)
- postId (TEXT - FOREIGN KEY)
- userName (TEXT)
- text (TEXT)
- createdAt (TEXT - ISO string)

### Likes Table
- id (TEXT PRIMARY KEY)
- postId (TEXT - FOREIGN KEY)
- liked (INTEGER - 0 or 1)

## Navigation Structure

```
Splash Screen
  ↓
Login Screen
  ↓
Main Tabs:
  ├── Feed Screen
  ├── Add Post Screen
  └── Profile Screen
        ↓
    Settings Screen (Stack screen)
```

## Running the App

```bash
# Start Expo server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Notes

- SQLite database is automatically created on first run
- Dark mode preference is saved using AsyncStorage
- Images are stored as URIs (local file paths)
- For production, consider using Firebase Storage for image uploads
- Firebase authentication is set up but needs configuration

## Next Steps (Optional Enhancements)

1. Implement Firebase Authentication
2. Add image upload to Firebase Storage
3. Add user profiles and authentication
4. Add search functionality by hashtags
5. Add following/followers system
6. Add push notifications
7. Add image filters/editing

