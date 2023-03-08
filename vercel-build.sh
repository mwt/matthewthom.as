#/bin/sh

###############################################################################
# This script is used by Vercel build the website into the ./dist folder.
# It is run after the install script.
###############################################################################

# Copy the fonts to the dist folder and build the website
curl -sS "https://docs.matthewthom.as/website-fonts.tar.gz" | tar -xzC "./" &&
    npx @11ty/eleventy

# Generate the cv.pdf
cd "./latex-temp"
../vtex/bin/x86_64-linux/lualatex -shell-escape -interaction nonstopmode -halt-on-error -file-line-error cv.tex
cd -

# Move the cv.pdf to the dist folder
mv "./latex-temp/cv.pdf" "./dist/assets/pdfs/cv.pdf" && echo "Moved cv.pdf to ./dist/assets/pdfs/"
