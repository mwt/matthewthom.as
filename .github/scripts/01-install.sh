#!/bin/sh

###############################################################################
# This script is used by Vercel to install the node modules and vtex binary.
# It is run before the build script.
###############################################################################

# Install node modules (incl. 11ty)
NODE_ENV="production" npm ci

# Get and install vtex (for cv.pdf)
curl -sSL "https://github.com/mwt/vtex/releases/download/v3.0/vtex.tar.gz" | tar -xzC "./"
