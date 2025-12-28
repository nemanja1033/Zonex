#!/usr/bin/env python3
import subprocess
import os
import sys

os.chdir('/Users/mihailoknezevic/Zonex')

def run_cmd(cmd, description):
    print(f"\n{'='*60}")
    print(f"{description}")
    print(f"{'='*60}")
    print(f"Command: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    print(f"STDOUT:\n{result.stdout}")
    if result.stderr:
        print(f"STDERR:\n{result.stderr}")
    print(f"Return code: {result.returncode}")
    return result

# 1. Check status
run_cmd(['git', 'status'], "1. Checking git status")

# 2. Add all changes
run_cmd(['git', 'add', '-A'], "2. Adding all changes")

# 3. Check what's staged
run_cmd(['git', 'status', '--short'], "3. Checking staged changes")

# 4. Commit if there are changes
result = run_cmd(['git', 'diff', '--cached', '--quiet'], "4. Checking if there are changes to commit")
if result.returncode != 0:
    run_cmd(['git', 'commit', '-m', 'Update project - comprehensive update'], "5. Committing changes")
else:
    print("\n5. No changes to commit")

# 6. Check commits ahead
run_cmd(['git', 'log', 'origin/main..HEAD', '--oneline'], "6. Checking commits ahead of remote")

# 7. Fetch to update remote refs
run_cmd(['git', 'fetch', 'origin'], "7. Fetching from origin")

# 8. Push
result = run_cmd(['git', 'push', 'origin', 'main'], "8. Pushing to origin/main")

if result.returncode == 0:
    print("\n" + "="*60)
    print("✅ SUCCESS! Push completed!")
    print("="*60)
else:
    print("\n" + "="*60)
    print("❌ FAILED! Push did not complete.")
    print("="*60)
    sys.exit(1)


