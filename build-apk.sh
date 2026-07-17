#!/bin/bash

echo "🚀 Redavid AI - APK Builder"
echo "=============================="

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

echo -e "\n${YELLOW}Step 1: Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ npm install failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo -e "\n${YELLOW}Step 2: Building web app...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Web app built${NC}"

if [ ! -d "android" ]; then
    echo -e "\n${YELLOW}Step 3: Adding Android platform...${NC}"
    npx cap add android
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to add Android platform${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Android platform added${NC}"
else
    echo -e "\n${YELLOW}Step 3: Android platform already exists${NC}"
fi

echo -e "\n${YELLOW}Step 4: Syncing files...${NC}"
npx cap sync android
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Sync failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Files synced${NC}"

echo -e "\n${YELLOW}Step 5: Building debug APK...${NC}"
cd android
./gradlew clean assembleDebug
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ APK build failed${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}✓ Debug APK built${NC}"

APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    echo -e "\n${GREEN}✅ APK Build Complete!${NC}"
    echo -e "${GREEN}APK Location: $APK_PATH${NC}"
    echo -e "${GREEN}APK Size: $(du -h "$APK_PATH" | cut -f1)${NC}"
else
    echo -e "${RED}❌ APK not found at expected location${NC}"
    exit 1
fi

echo -e "\n${GREEN}=============================="
echo -e "🎉 All done! Your APK is ready.${NC}"
echo -e "==============================${NC}"