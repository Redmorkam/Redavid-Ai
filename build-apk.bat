@echo off
REM Redavid AI - APK Build Script for Windows

echo.
echo ==================================
echo Redavid AI - APK Builder for Windows
echo ==================================
echo.

where /q node
if errorlevel 1 (
    echo Error: Node.js is not installed
    pause
    exit /b 1
)

echo ^✓ Node.js found
node --version

echo.
echo [Step 1] Installing dependencies...
call npm install
if errorlevel 1 (
    echo Error: npm install failed
    pause
    exit /b 1
)
echo ^✓ Dependencies installed

echo.
echo [Step 2] Building web app...
call npm run build
if errorlevel 1 (
    echo Error: Build failed
    pause
    exit /b 1
)
echo ^✓ Web app built

if not exist "android" (
    echo.
    echo [Step 3] Adding Android platform...
    call npx cap add android
    if errorlevel 1 (
        echo Error: Failed to add Android platform
        pause
        exit /b 1
    )
    echo ^✓ Android platform added
) else (
    echo.
    echo [Step 3] Android platform already exists
)

echo.
echo [Step 4] Syncing files...
call npx cap sync android
if errorlevel 1 (
    echo Error: Sync failed
    pause
    exit /b 1
)
echo ^✓ Files synced

echo.
echo [Step 5] Building debug APK...
cd android
call gradlew.bat clean assembleDebug
if errorlevel 1 (
    echo Error: APK build failed
    cd ..
    pause
    exit /b 1
)
cd ..
echo ^✓ Debug APK built

echo.
echo ==================================
echo ^✓ APK Build Complete!
echo APK Location: android\app\build\outputs\apk\debug\app-debug.apk
echo ==================================
echo.

pause