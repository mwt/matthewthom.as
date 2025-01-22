#!/bin/sh
##
# $1: Api key for Bunny.net
# $2: FTP password for Bunny.net
#
##

ZONE_ID="3243289"

# Deploy
#
# to bunny
echo "Copying www files to Bunny Edge Storage"
lftp ftp://storage.bunnycdn.com <<EOF
user matthewthomas "$2"
mirror --reverse --parallel=10 --delete --no-perms --transfer-all dist/ /matthewthomas/
exit
EOF

# Purge the CDN
echo ""
echo "Purging files from CDN:"
curl --request POST --url "https://api.bunny.net/pullzone/$ZONE_ID/purgeCache" --header 'content-type: application/json' --header "AccessKey: $1"
