# node_modules/.bin/webpack -p &&

# cp src/index.html build/index.html &&
# cp src/main.js build/main.js &&

node_modules/.bin/electron-packager ./build \
  --overwrite  \
  --platform=darwin  \
  --arch=x64 \
  --icon=src/resources/mac/midi-1024.png.icns \
  --prune=true \
  --out=release-builds