#!/usr/bin/env bash
export APP_ID="prp_app_id" \
export MASTER_KEY="prp_master_key" \
export VERBOSE=1

printf "Your $0 configurations:\n\n"
printf "APP_ID=$APP_ID\n"
printf "MASTER_KEY=$MASTER_KEY\n"
printf "VERBOSE=$VERBOSE\n"

node index.js
