#!/usr/bin/env python3
import subprocess
import os
import sys

os.chdir('/Users/mihailoknezevic/Zonex')

print("=== Git Push Script ===")
print(f"Working directory: {os.getcwd()}")

# Add all changes
print("\n1. Adding all changes...")
result = subprocess.run(['git', 'add', '-A'], capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print(f"STDERR: {result.stderr}")

# Check status
print("\n2. Checking status...")
result = subprocess.run(['git', 'status', '--short'], capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print(f"STDERR: {result.stderr}")

# Check if there are changes to commit
result = subprocess.run(['git', 'diff', '--cached', '--quiet'], capture_output=True)
has_changes = result.returncode != 0

if has_changes:
    print("\n3. Committing changes...")
    result = subprocess.run(['git', 'commit', '-m', 'Update project'], 
                           capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print(f"STDERR: {result.stderr}")
else:
    print("\n3. No changes to commit")

# Check commits ahead
print("\n4. Checking commits ahead of remote...")
result = subprocess.run(['git', 'log', 'origin/main..HEAD', '--oneline'], 
                       capture_output=True, text=True)
if result.stdout.strip():
    print(f"Commits to push:\n{result.stdout}")
else:
    print("No commits ahead of remote")

# Push
print("\n5. Pushing to origin/main...")
result = subprocess.run(['git', 'push', 'origin', 'main'], 
                       capture_output=True, text=True)
print(f"STDOUT: {result.stdout}")
if result.stderr:
    print(f"STDERR: {result.stderr}")
print(f"Return code: {result.returncode}")

if result.returncode == 0:
    print("\n✅ Push successful!")
else:
    print("\n❌ Push failed!")
    sys.exit(1)


