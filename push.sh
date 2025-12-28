#!/bin/bash
cd /Users/mihailoknezevic/Zonex
git add -A
git commit -m "Update project $(date +%Y-%m-%d-%H%M%S)" || echo "No changes to commit"
git push origin main

