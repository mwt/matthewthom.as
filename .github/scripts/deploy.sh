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
# to endpoint
rsync -rlci --log-file=$TMPFILE --delete _site/ endpoint:/www/
# to bunny
rclone sync _site/ bunny:/matthewthomas/

# Purge the CDN using values from rsync log
cat $TMPFILE | grep -E '\] (<fc)' | cut -d \  -f 5 | sed -e 's/index.html$//' | while read -r filename; do
    echo "Purge https://$PULL_ZONE/$filename"
    curl -sS --get --data-urlencode "url=https://$PULL_ZONE/$filename" --url 'https://api.bunny.net/purge' --header 'Accept: application/json' --header "AccessKey: $1"
    echo ""
done
