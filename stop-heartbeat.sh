#!/bin/bash
# ─────────────────────────────────────────────────────────────────
#  Portfolio Heartbeat — Stop & Revert
#  Run: bash stop-heartbeat.sh
# ─────────────────────────────────────────────────────────────────

TEAL='\033[0;36m'; GREEN='\033[0;32m'
YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIVE_JSX="$SCRIPT_DIR/src/components/Live.jsx"
HEARTBEAT_SH="$SCRIPT_DIR/heartbeat.sh"
PID_FILE="/tmp/portfolio-heartbeat.pid"

header() { echo -e "\n${TEAL}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }
ok()     { echo -e "  ${GREEN}✓${NC} $1"; }

header
echo -e "  ${TEAL}Portfolio Heartbeat — Stopping${NC}"
header

# Kill background process
if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if kill "$PID" 2>/dev/null; then
    ok "Heartbeat process $PID killed"
  else
    echo -e "  ${YELLOW}→${NC} Process $PID already stopped"
  fi
  rm -f "$PID_FILE"
else
  echo -e "  ${YELLOW}→${NC} No PID file found (heartbeat may not be running)"
fi

# Revert heartbeat.sh credentials
if grep -qv "your_github_personal_access_token_here" "$HEARTBEAT_SH"; then
  sed -i '' 's|^GITHUB_PAT=.*|GITHUB_PAT="your_github_personal_access_token_here"|' "$HEARTBEAT_SH"
  sed -i '' 's|^GIST_ID=.*|GIST_ID="your_gist_id_here"|' "$HEARTBEAT_SH"
  ok "heartbeat.sh credentials cleared"
fi

# Revert Live.jsx
if grep -q "HEARTBEAT_GIST_URL = 'https" "$LIVE_JSX"; then
  sed -i '' "s|const HEARTBEAT_GIST_URL = 'https[^']*';|const HEARTBEAT_GIST_URL = '';|g" "$LIVE_JSX"
  ok "Live.jsx reverted (status will show offline)"
fi

# Commit + push revert
cd "$SCRIPT_DIR"
git add src/components/Live.jsx heartbeat.sh
git commit -m "chore: deactivate heartbeat online status" --quiet || true
git push origin ui-redesign --quiet
ok "Pushed revert to ui-redesign"
cd - > /dev/null

header
echo -e "  ${GREEN}Done. Status will show 'offline' on the portfolio.${NC}"
echo -e "  ${GREEN}Run setup-heartbeat.sh again anytime to re-activate.${NC}"
header
echo ""
