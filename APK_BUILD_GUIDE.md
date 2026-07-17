# APK Build Guide for Redavid AI

This guide will help you build an Android APK using Capacitor.

## Prerequisites

1. **Node.js** (v16+)
2. **Java Development Kit (JDK)** (v11+)
3. **Android SDK** (API level 24+)
4. **Android Studio** (recommended)
5. **Git**

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Build the Web App

```bash
npm run build
```

This creates the `dist/` folder with the production build.

## Step 3: Install Capacitor Packages

The packages are already in `package.json`. They'll be installed with `npm install`.

## Step 4: Add Android Platform

```bash
npx cap add android
```

This creates the `android/` folder with the native Android project.

## Step 5: Sync Files

```bash
npx cap sync android
```

This copies your built web app to the Android project.

## Step 6: Open in Android Studio

```bash
npx cap open android
```

Or manually:
- Open Android Studio
- Click "Open an Existing Project"
- Navigate to `redavid-ai/android`
- Click "Open"

## Step 7: Build the APK

### Debug APK (for testing):

1. In Android Studio, go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for the build to complete
3. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for production):

1. Create a keystore:
```bash
keytool -genkey -v -keystore ~/redavid-ai-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias redavid-ai-key
```

2. In Android Studio:
   - Go to **Build** → **Generate Signed Bundle / APK**
   - Select **APK**
   - Choose your keystore file
   - Fill in password and key information
   - Select **Release** build type
   - Click **Create**

3. APK location: `android/app/build/outputs/apk/release/app-release.apk`

## Alternative: Build from Command Line

### Debug APK:
```bash
cd android
./gradlew assembleDebug
cd ..
```

APK: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK:
```bash
cd android
./gradlew assembleRelease
cd ..
```

APK: `android/app/build/outputs/apk/release/app-release.apk`

## Step 8: Install on Device/Emulator

### Via ADB:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Via Android Studio:
1. Connect device or start emulator
2. Click the **Run** button (green play icon)
3. Select your device
4. App installs and launches

## Quick Commands

```bash
npm run build && npx cap sync android
npx cap open android
npm run android:build
npm run android:sync
npm run android:live
```

## Troubleshooting

### Issue: Gradle build fails
**Solution:**
```bash
cd android
./gradlew clean
./gradlew build
cd ..
```

### Issue: "No Android SDK found"
**Solution:**
- Open Android Studio
- Go to **SDK Manager**
- Install Android SDK (API 24+)
- Set `ANDROID_SDK_ROOT` environment variable

### Issue: Build outputs not found
**Solution:**
```bash
cd android
./gradlew clean assembleDebug
cd ..
```

## App Permissions

The app needs these permissions in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## Distribution

### Option 1: Google Play Store
- Create Google Play Developer account ($25)
- Sign APK with your keystore
- Upload to Play Console
- Follow review process

### Option 2: Direct Distribution
- Share APK file directly
- Users enable "Unknown Sources" in Settings
- Install directly

### Option 3: Firebase App Distribution
- Upload APK to Firebase
- Share link with testers
- Automatic installations

---

**Happy building! 🚀**