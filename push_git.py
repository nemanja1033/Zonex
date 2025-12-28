#!/usr/bin/env python3
import subprocess
import os

os.chdir('/Users/mihailoknezevic/Zonex')

# Add all changes
subprocess.run(['git', 'add', '-A'], check=False)

# Commit
result = subprocess.run(['git', 'commit', '-m', 'Update project'], 
                       capture_output=True, text=True)
print(result.stdout)
print(result.stderr)

# Push
result = subprocess.run(['git', 'push', 'origin', 'main'],
                       capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
print(f"Exit code: {result.returncode}")


