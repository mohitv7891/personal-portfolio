#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Portfolio Heartbeat — keeps your "online" status live
#
# SETUP (one-time):
#   1. Create a GitHub Personal Access Token:
#      https://github.com/settings/tokens/new
#      → Scopes: check only "gist"
#
#   2. Create a new SECRET GitHub Gist at https://gist.github.com
#      Filename: status.json
#      Content:  {"lastSeen":"2000-01-01T00:00:00Z"}
#      Copy the Gist ID from the URL (the long hash after your username)
#
#   3. Fill in the two variables below:
# ─────────────────────────────────────────────────────────────

GITHUB_PAT="your_github_personal_access_token_here"
GIST_ID="31e1cec928b0e205f49dab2e479e0c0d"

# ─────────────────────────────────────────────────────────────
# How it works:
#   - Pings the Gist with the current UTC timestamp every 5 min
#   - When your laptop sleeps/shuts down, pings stop → portfolio
#     shows "offline" after 10 minutes of no update
# ─────────────────────────────────────────────────────────────

INTERVAL=300   # seconds between pings (5 minutes)

echo "▶ Heartbeat started (every ${INTERVAL}s). Press Ctrl+C to stop."

while true; do
  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  PAYLOAD=$(python3 - <<EOF
import json
payload = {"files": {"status.json": {"content": json.dumps({"lastSeen": "$TIMESTAMP"})}}}
print(json.dumps(payload))
EOF
)

  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    -X PATCH \
    -H "Authorization: token ${GITHUB_PAT}" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Content-Type: application/json" \
    "https://api.github.com/gists/${GIST_ID}" \
    -d "${PAYLOAD}")

  if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ $(date '+%H:%M:%S') — online pinged (${TIMESTAMP})"
  else
    echo "✗ $(date '+%H:%M:%S') — ping failed (HTTP ${HTTP_CODE})"
  fi

  sleep "$INTERVAL"
done
