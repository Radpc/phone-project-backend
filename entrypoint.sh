#!/bin/sh

# Check migrations
npx prisma migrate dev

# Start the server
node dist/main