#!/bin/bash
# ModalHP Daily Astro Blog Build Script
echo "Starting daily build for ModalHP & Astro Blog at $(date)" >> /var/log/modalhp-build.log

cd /opt/modalhp || exit 1

# Pull updates silently
git pull origin main --quiet >> /var/log/modalhp-build.log 2>&1

# Force rebuild so Astro processes new Date() for pubDate rendering
# We only need to rebuild the 'app' container which houses both Vue and Astro
docker compose build --quiet app >> /var/log/modalhp-build.log 2>&1

# Restart only if successfully built
docker compose up -d app >> /var/log/modalhp-build.log 2>&1

echo "Build completed at $(date)" >> /var/log/modalhp-build.log
echo "--------------------------------------------------------" >> /var/log/modalhp-build.log
