#!/bin/sh

ENV=$1

cp -rf "./firebase/${FIREBASE_ENV}/google-services.json" "./android/app"
cp -rf "./firebase/${FIREBASE_ENV}/GoogleService-Info.plist" ios

cp -rf "./src/configs/config.${ENV}.js" "./src/configs/config.js"

echo "$1 config used"