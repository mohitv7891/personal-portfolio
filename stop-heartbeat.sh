#!/bin/bash
# ─────────────────────────────────────────────────────────────────
#  Portfolio Heartbeat — Stop
#  Kills the background process and clears PAT from heartbeat.sh.
#  The Gist ID is preserved so setup-heartbeat.sh can reuse it.
# ─────────────────────────────────────────────────────────────────

TEAL='\033[0;36m'; GREEN='\033[0;32m'
YELLOW='\033[1;33m'; NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
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
  kill "$PID" 2>/dev/null && ok "Heartbeat process $PID killed" \
    || echo -e "  ${YELLOW}→${NC} Process $PID already stopped"
  rm -f "$PID_FILE"
else
  echo -e "  ${YELLOW}→${NC} No PID file — heartbeat may already be stopped"
fi

# Clear only the PAT (never the Gist ID — it's reused on next setup)
sed -i '' 's|^GITHUB_PAT=.*|GITHUB_PAT="your_github_personal_access_token_here"|' "$HEARTBEAT_SH"
ok "PAT cleared from heartbeat.sh (Gist ID preserved for reuse)"

header
echo -e "  ${GREEN}Done. Status shows 'offline' in ~10 min.${NC}"
echo -e "  ${GREEN}Run setup-heartbeat.sh anytime to go back online.${NC}"
header
echo ""
