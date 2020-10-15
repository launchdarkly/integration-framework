#!/bin/bash
set -uxe

REV=$(git rev-parse HEAD | cut -c1-8)

generate_post_data=$(cat <<EOF
{
  "status": "completed",
  "parameters": {"sha": "${REV}"}
}
EOF
)

curl --header "Content-Type: application/json" --header "Accept: */*" --data "$generate_post_data" "$WEBHOOK_URL"
