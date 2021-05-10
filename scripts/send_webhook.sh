#!/bin/bash
set -uxe

REV=$(git rev-parse HEAD | cut -c1-8)

generate_post_data=$(cat <<EOF
{
  "sha": "${REV}",
  "service": "goaltender-manifests",
  "environment": "staging"
}
EOF
)

curl --header "Content-Type: application/json" \
  --header "X-LaunchDarkly-Secret: ${WEBHOOK_SECRET}" \
  --data "$generate_post_data" "$WEBHOOK_URL"
