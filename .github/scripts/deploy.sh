#!/bin/sh
##
# $1: Api key for Buny.net
#
##

PULL_ZONE="matthewthomas.b-cdn.net"

# Create a tempfile
#
TMPFILE=$(mktemp /tmp/deploy.XXXXXX)

# Deploy
#
# to endpoint for www (log is for CDN cache purge)
rsync -rlci --log-file=$TMPFILE --delete _site/www/ endpoint:/www/
# to endpoint for gemini (no cdn)
rsync -rlci --delete _site/gemini/ endpoint:/gemini/
# to bunny
rclone sync _site/www/ bunny:/matthewthomas/

# Purge the CDN using values from rsync log
cat $TMPFILE | grep -E '\] (<fc)' | cut -d \  -f 5 | sed -e 's/index.html$//' | while read -r filename; do
    echo "Purge https://$PULL_ZONE/$filename"
    curl -sS --get --data-urlencode "url=https://$PULL_ZONE/$filename" --url 'https://api.bunny.net/purge' --header 'Accept: application/json' --header "AccessKey: $1"
    echo ""
done
