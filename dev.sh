#! /bin/bash
./node_modules/.bin/concurrently \
  --kill-others \
  --names devs,main \
  --prefix name \
  --prefix-colors magenta,cyan \
  'npm run dev-server' \
  'npm run nodemon'
