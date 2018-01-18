#!/bin/sh
: ${REMOTE_USER:="bitrix"}
: ${REMOTE_HOST:="corp.pharm.local"}
: ${LOCAL_DIR:="build/"}
: ${REMOTE_DIR:="/home/bitrix/www/requests/"}

echo Adding $REMOTE_HOST to known_hosts...
ssh-keyscan -H $REMOTE_HOST >> ~/.ssh/known_hosts -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null

echo Deploying via SSH...
rsync --delete -avzh -e ssh "$LOCAL_DIR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
