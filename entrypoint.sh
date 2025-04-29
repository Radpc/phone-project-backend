#!/bin/sh

# Check migrations
npx prisma migrate dev

# Seed
# npx prisma db seed

# Start the server
node dist/main