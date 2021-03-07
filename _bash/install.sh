#!/bin/sh

echo "Install wget"
yum install wget

VTEX_VERSION=0.1

echo "Download vtex"
wget -O vtex.tar.gz -nv "https://github.com/mwt/vtex/releases/download/v0.1/vtex.tar.gz"
echo "Extract vtex"
tar xzf vtex.tar.gz
