#!/bin/bash
set -e
cd /Users/mihailoknezevic/Zonex

echo "Adding all changes..."
git add -A

echo "Checking for changes..."
if ! git diff --cached --quiet; then
    echo "Committing changes..."
    git commit -m "Update project - $(date +%Y-%m-%d-%H:%M:%S)"
else
    echo "No changes to commit"
fi

echo "Pushing to origin..."
git push origin main

echo "Done!"

