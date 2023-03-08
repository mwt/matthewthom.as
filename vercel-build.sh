#/bin/sh

# Get and install vtex
mkdir -p ./tmp &&
    curl -sSL "https://github.com/mwt/vtex/releases/download/v2.0/vtex.tar.gz" | tar -xzC ./tmp/

curl -sS "https://docs.matthewthom.as/website-fonts.tar.gz" | tar -xzC ./ &&
    npx @11ty/eleventy
