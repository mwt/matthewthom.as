#!/bin/sh

echo "Install wget"
yum install wget

VTEX_VERSION=0.1

echo "Download vtex"
wget vtex.tar.gz "https://github.com/mwt/vtex/releases/download/v$VTEX_VERSION/vtex.tar.gz"

echo "Extract vtex"
tar xzf vtex.tar.gz
