#/bin/sh

###############################################################################
# This script is used by Vercel build the website into the ./dist folder.
# It is run after the install script.
###############################################################################

# Copy the fonts to the dist folder and build the website
curl -sS "https://docs.matthewthom.as/website-fonts.tar.gz" | tar -xzC "./" &&
    npx @11ty/eleventy
