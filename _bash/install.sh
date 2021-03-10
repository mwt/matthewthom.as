#!/bin/sh

VTEX_VERSION=1.0

# Hack: stuff vtex into bundler cache
DIR="vendor/bin"
FILE="$DIR/vtex-v$VTEX_VERSION.tar.gz"

mkdir -p ${DIR}

if [ -f "$FILE" ]
then
    echo "vTeX cache hit!"
    echo "Clean"
    rm -rf vtex
    echo "Extract vtex"
    tar xzf $FILE
else
    echo "Clean"
    rm -rf vtex
    echo "Install wget"
    yum install wget
    echo "Download vtex"
    wget -O $FILE -nv "https://github.com/mwt/vtex/releases/download/v$VTEX_VERSION/vtex.tar.gz"
    echo "Extract vtex"
    tar xzf $FILE
fi

bundle install
bundle package
