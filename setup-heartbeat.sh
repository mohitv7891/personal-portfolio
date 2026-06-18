#!/bin/bash
# ─────────────────────────────────────────────────────────────────
#  Portfolio Heartbeat — Full Auto Setup (temporary / foreground)
#  Run:  bash setup-heartbeat.sh
#  Stop: bash stop-heartbeat.sh
# ─────────────────────────────────────────────────────────────────

set -e

TEAL='\033[0;36m'; GREEN='\033[0;32m'
YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIVE_JSX="$SCRIPT_DIR/src/components/Live.jsx"
HEARTBEAT_SH="$SCRIPT_DIR/heartbeat.sh"
PID_FILE="/tmp/portfolio-heartbeat.pid"
STATE_FILE="/tmp/portfolio-heartbeat.state"

header() { echo -e "\n${TEAL}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }
ok()     { echo -e "  ${GREEN}✓${NC} $1"; }
info()   { echo -e "  ${YELLOW}→${NC} $1"; }
fail()   { echo -e "  ${RED}✗${NC} $1"; exit 1; }

header
echo -e "  ${TEAL}Portfolio Heartbeat — Auto Setup${NC}"
header

# ── STEP 1: GitHub PAT ───────────────────────────────────────────
echo -e "\n${YELLOW}[1/5]${NC} GitHub Personal Access Token"
info "Open → https://github.com/settings/tokens/new"
info "Check only the 'gist' scope, then generate & paste below."
echo -ne "\n  PAT (hidden): "
read -rs GITHUB_PAT
echo ""

[ -z "$GITHUB_PAT" ] && fail "No PAT provided."

# Verify token works
HTTP=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: token $GITHUB_PAT" \
  https://api.github.com/user)
[ "$HTTP" != "200" ] && fail "PAT invalid or expired (HTTP $HTTP)."
ok "PAT verified"

# ── STEP 2: Create secret Gist ───────────────────────────────────
echo -e "\n${YELLOW}[2/5]${NC} Creating secret GitHub Gist..."

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Use Python to build valid JSON (avoids shell escaping pitfalls)
GIST_BODY=$(python3 - <<EOF
import json
payload = {
    "description": "Portfolio heartbeat",
    "public": False,
    "files": {
        "status.json": {
            "content": json.dumps({"lastSeen": "$TIMESTAMP"})
        }
    }
}
print(json.dumps(payload))
EOF
)

GIST_RESP=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/gists \
  -d "$GIST_BODY")

GIST_ID=$(echo "$GIST_RESP" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
[ -z "$GIST_ID" ] && fail "Gist creation failed. Response: $GIST_RESP"

GIST_URL="https://gist.githubusercontent.com/mohitv7891/${GIST_ID}/raw/status.json"
ok "Gist created → https://gist.github.com/mohitv7891/$GIST_ID"

# ── STEP 3: Patch heartbeat.sh ───────────────────────────────────
echo -e "\n${YELLOW}[3/5]${NC} Configuring heartbeat.sh..."

# Save originals for stop-script to restore
ORIG_PAT_LINE='GITHUB_PAT="your_github_personal_access_token_here"'
ORIG_ID_LINE='GIST_ID="your_gist_id_here"'

# Only patch if still at default values
if grep -q "your_github_personal_access_token_here" "$HEARTBEAT_SH"; then
  sed -i '' "s|your_github_personal_access_token_here|${GITHUB_PAT}|g" "$HEARTBEAT_SH"
  sed -i '' "s|your_gist_id_here|${GIST_ID}|g" "$HEARTBEAT_SH"
  echo "$GIST_ID" > "$STATE_FILE"   # remember gist id for stop script
  ok "heartbeat.sh patched"
else
  ok "heartbeat.sh already configured"
fi

# ── STEP 4: Patch Live.jsx ───────────────────────────────────────
echo -e "\n${YELLOW}[4/5]${NC} Updating Live.jsx with Gist URL..."

if grep -q "HEARTBEAT_GIST_URL = '';" "$LIVE_JSX"; then
  sed -i '' "s|const HEARTBEAT_GIST_URL = '';|const HEARTBEAT_GIST_URL = '${GIST_URL}';|g" "$LIVE_JSX"
  ok "Live.jsx updated"
else
  ok "Live.jsx already has a Gist URL"
fi

# Commit + push so Vercel picks it up
cd "$SCRIPT_DIR"
git add src/components/Live.jsx heartbeat.sh
git commit -m "chore: activate heartbeat online status" --quiet || true
git push origin ui-redesign --quiet
ok "Pushed to ui-redesign (Vercel will redeploy)"
cd - > /dev/null

# ── STEP 5: Start heartbeat in background ────────────────────────
echo -e "\n${YELLOW}[5/5]${NC} Starting heartbeat (background)..."

# Kill any previous instance
if [ -f "$PID_FILE" ]; then
  OLD_PID=$(cat "$PID_FILE")
  kill "$OLD_PID" 2>/dev/null || true
  rm -f "$PID_FILE"
fi

bash "$HEARTBEAT_SH" >> /tmp/portfolio-heartbeat.log 2>&1 &
echo $! > "$PID_FILE"
ok "Heartbeat running — PID $(cat $PID_FILE)"
info "Logs: tail -f /tmp/portfolio-heartbeat.log"
info "Stop: bash stop-heartbeat.sh"

header
echo -e "  ${GREEN}All done! Your status shows 'online' on the portfolio.${NC}"
echo -e "  ${GREEN}It will flip to 'offline' 10 min after you run stop-heartbeat.sh.${NC}"
header
echo ""
