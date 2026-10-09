#!/bin/sh
set -eu

# Character classes prevent the scanner matching its own pattern text.
# Scan every tracked file, including workflows, docs and environment examples.
# Quiet mode keeps matched credentials out of logs. Git errors fail closed.
scan() {
  label=$1
  pattern=$2
  if git grep -q -i -E "$pattern" -- .; then
    echo "::error::Found a possible hardcoded $label credential in tracked files. Inspect privately."
    exit 1
  else
    status=$?
    if [ "$status" -ne 1 ]; then
      echo "::error::Secret scan could not inspect tracked files (git exit $status)."
      exit "$status"
    fi
  fi
}

scan Supabase 'SUPABASE_SERVICE_ROLE_KEY=[e]y'
scan Slack 'xox[b]-[0-9]'
echo "Secret scan passed cleanly."
