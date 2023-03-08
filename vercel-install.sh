#/bin/sh

###############################################################################
# This script is used by Vercel to install the node modules and vtex binary.
# It is run before the build script.
###############################################################################

# Install node modules (incl. 11ty)
npm install

# Get and install vtex (for cv.pdf)
mkdir -p ./tmp &&
    curl -sSL "https://github.com/mwt/vtex/releases/download/v2.1/vtex.tar.gz" | tar -xzC ./tmp/
