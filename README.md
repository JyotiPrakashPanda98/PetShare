# PetShare 🐾

A React Native social media app for sharing your pet's moments with the community.

## Features

### Core Features ✅
- **User Feed**: Display all uploaded pet posts (photo + caption + hashtags) in a scrollable feed, newest posts first
- **Upload Post**: Upload pet photos from gallery or camera, add captions and hashtags
- **Like Feature**: Toggle like button with real-time count updates
- **Data Persistence**: SQLite database for posts, comments, and likes (persists after app restart)
- **Comments**: Add and view comments on posts
- **Dark Mode**: Toggle between light and dark themes
- **Clean UI**: Instagram-inspired layout with usernames, timestamps, and responsive design

### Screen Navigation
1. **Splash Screen** → Auto-navigates to Login after 2.5 seconds
2. **Login Screen** → Navigate to Main Tabs after successful login
3. **Feed Screen** (Tab 1) → Browse pet posts with captions and hashtags
4. **Add Post Screen** (Tab 2) → Upload pet pictures with caption and hashtags
5. **Profile Screen** (Tab 3) → View pet profile with posts grid
6. **Settings Screen** → Toggle dark mode and manage settings

## Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Navigation** (Stack & Bottom Tabs)
- **SQLite** (expo-sqlite) for local data persistence
- **Expo Image** for optimized image loading
- **Expo Image Picker** for photo selection
- **Firebase** setup ready (optional - requires configuration)
- **AsyncStorage** for theme persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- Android Studio (for Android) or Xcode (for iOS development)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/JyotiPrakashPanda98/PetShare.git
cd PetShare
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Run on your device:**
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app on your phone

## Project Structure

```
PetShare/
├── src/
│   ├── components/
│   │   ├── CommentSection.tsx      # Comment modal component
│   │   ├── PostImage.tsx            # Reusable post image with loading/error states
│   │   └── ProfileImage.tsx         # Reusable profile image component
│   ├── context/
│   │   └── ThemeContext.tsx         # Dark mode theme context
│   ├── navigation/
│   │   └── AppNavigator.tsx        # Navigation setup
│   ├── screens/
│   │   ├── SplashScreen.tsx        # Animated splash screen
│   │   ├── LoginScreen.tsx         # Login with validation
│   │   ├── FeedScreen.tsx          # Main feed with posts
│   │   ├── AddPostScreen.tsx       # Upload posts with caption/hashtags
│   │   ├── ProfileScreen.tsx      # Pet profile page
│   │   └── SettingsScreen.tsx       # Settings with dark mode toggle
│   ├── services/
│   │   ├── database.ts             # SQLite database service
│   │   └── firebase.ts             # Firebase setup (optional)
│   └── types/
│       └── navigation.ts           # TypeScript navigation types
├── App.tsx                          # Main app entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Features Implemented

### ✅ Core Requirements
1. **User Feed** - Display posts with photo, caption, and hashtags, newest first
2. **Upload Post** - Upload pet photo, add caption and hashtags
3. **Like Feature** - Toggle like button with count updates
4. **Data Handling** - SQLite database for persistence
5. **Clean UI** - Instagram-inspired layout

### ✅ Bonus Features
1. **Comment Section** - Add and view comments on posts
2. **User Authentication** - Login screen with validation (Firebase setup ready)
3. **Dark Mode** - Toggle dark/light theme with persistence

### Image Features
- ✅ Optimized image loading with Expo Image
- ✅ Loading indicators for all images
- ✅ Error handling with fallback icons
- ✅ Smooth fade-in transitions
- ✅ Proper aspect ratios (1:1 square for posts)
- ✅ Profile images with initials fallback

## Database Schema

### Posts Table
- `id` (TEXT PRIMARY KEY)
- `petName` (TEXT)
- `petImage` (TEXT - URI)
- `ownerName` (TEXT)
- `caption` (TEXT)
- `hashtags` (TEXT)
- `likes` (INTEGER)
- `comments` (INTEGER)
- `isLiked` (INTEGER)
- `createdAt` (TEXT - ISO string)
- `timestamp` (TEXT - human readable)

### Comments Table
- `id` (TEXT PRIMARY KEY)
- `postId` (TEXT - FOREIGN KEY)
- `userName` (TEXT)
- `text` (TEXT)
- `createdAt` (TEXT - ISO string)

### Likes Table
- `id` (TEXT PRIMARY KEY)
- `postId` (TEXT - FOREIGN KEY)
- `liked` (INTEGER - 0 or 1)

## Configuration

### Firebase (Optional)
To enable Firebase authentication:
1. Create a Firebase project at https://console.firebase.google.com
2. Copy your Firebase config
3. Update `src/services/firebase.ts` with your configuration

## Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
```

## Notes

- SQLite database is automatically created on first run
- Dark mode preference is saved using AsyncStorage
- Images are stored as URIs (local file paths)
- For production, consider using Firebase Storage for image uploads
- Firebase authentication is set up but needs configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is for educational purposes.

## Author

**Jyoti Prakash Panda**
- Email: jyotiprakash.p1998@gmail.com
- GitHub: [@JyotiPrakashPanda98](https://github.com/JyotiPrakashPanda98)

---

Made with ❤️ using React Native and Expo
