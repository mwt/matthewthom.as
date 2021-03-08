#!/bin/sh

echo "Install wget"
yum install wget

VTEX_VERSION=1.0

echo "Download vtex"
wget -O vtex.tar.gz -nv "https://github.com/mwt/vtex/releases/download/v$VTEX_VERSION/vtex.tar.gz"
echo "Extract vtex"
tar xzf vtex.tar.gz
