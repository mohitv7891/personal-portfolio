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

# ── Permanent Gist ID (never wiped by stop script) ───────────────
FIXED_GIST_ID="a6964334ecdffc19dc8adbf0b13cfaa0"

header() { echo -e "\n${TEAL}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }
ok()     { echo -e "  ${GREEN}✓${NC} $1"; }
info()   { echo -e "  ${YELLOW}→${NC} $1"; }
fail()   { echo -e "  ${RED}✗${NC} $1"; exit 1; }

header
echo -e "  ${TEAL}Portfolio Heartbeat — Auto Setup${NC}"
header

# ── STEP 1: GitHub PAT ───────────────────────────────────────────
echo -e "\n${YELLOW}[1/4]${NC} GitHub Personal Access Token"
info "Open → https://github.com/settings/tokens/new"
info "Check only the 'gist' scope, then generate & paste below."
echo -ne "\n  PAT (hidden): "
read -rs GITHUB_PAT
echo ""

[ -z "$GITHUB_PAT" ] && fail "No PAT provided."

HTTP=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: token $GITHUB_PAT" \
  https://api.github.com/user)
[ "$HTTP" != "200" ] && fail "PAT invalid or expired (HTTP $HTTP)."
ok "PAT verified"

# ── STEP 2: Ping existing Gist with fresh timestamp ──────────────
echo -e "\n${YELLOW}[2/4]${NC} Updating heartbeat Gist (ID: ${FIXED_GIST_ID})..."

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
PATCH_BODY=$(python3 - <<EOF
import json
payload = {"files": {"status.json": {"content": json.dumps({"lastSeen": "$TIMESTAMP"})}}}
print(json.dumps(payload))
EOF
)

HTTP=$(curl -s -o /dev/null -w "%{http_code}" \
  -X PATCH \
  -H "Authorization: token $GITHUB_PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  "https://api.github.com/gists/${FIXED_GIST_ID}" \
  -d "$PATCH_BODY")

[ "$HTTP" = "200" ] && ok "Gist pinged (lastSeen: $TIMESTAMP)" \
  || fail "Gist ping failed (HTTP $HTTP). Check PAT has 'gist' scope."

# ── STEP 3: Patch heartbeat.sh ───────────────────────────────────
echo -e "\n${YELLOW}[3/4]${NC} Configuring heartbeat.sh..."

sed -i '' "s|^GITHUB_PAT=.*|GITHUB_PAT=\"${GITHUB_PAT}\"|" "$HEARTBEAT_SH"
sed -i '' "s|^GIST_ID=.*|GIST_ID=\"${FIXED_GIST_ID}\"|"   "$HEARTBEAT_SH"
ok "heartbeat.sh configured (PAT + Gist ID set)"

# Ensure Live.jsx has the correct Gist URL
GIST_URL="https://gist.githubusercontent.com/mohitv7891/${FIXED_GIST_ID}/raw/status.json"
if ! grep -q "$FIXED_GIST_ID" "$LIVE_JSX"; then
  sed -i '' "s|const HEARTBEAT_GIST_URL = '.*';|const HEARTBEAT_GIST_URL = '${GIST_URL}';|g" "$LIVE_JSX"
  cd "$SCRIPT_DIR"
  git add src/components/Live.jsx
  git commit -m "chore: set heartbeat Gist URL in Live.jsx" --quiet || true
  git push origin ui-redesign --quiet
  ok "Live.jsx updated and pushed"
  cd - > /dev/null
else
  ok "Live.jsx already has correct Gist URL (no push needed)"
fi

# ── STEP 4: Start heartbeat ──────────────────────────────────────
echo -e "\n${YELLOW}[4/4]${NC} Starting heartbeat (background)..."

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
echo -e "  ${GREEN}All done! Portfolio shows 'online' now.${NC}"
echo -e "  ${GREEN}Flips to 'offline' 10 min after stop-heartbeat.sh.${NC}"
header
echo ""
