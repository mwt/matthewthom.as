#!/bin/sh
##
# $1: URL to tar.gz file containing everything not in repo
#
##

JEKYLL_ENV=production

# echo "Fetch variables from _config.yml"
# title="Matthew Wildrick Thomas"
# bio=$(grep 'bio:' _config.yml | tail -n1); bio=${bio#*: }
# email=$(grep 'email:' _config.yml | tail -n1); email=${email#*: }
# github=$(grep 'github:' _config.yml | tail -n1); github=${github#*: }
# linkedin=$(grep 'linkedin:' _config.yml | tail -n1); linkedin=${linkedin#*: }
#
# echo "Build resume"
# ./vtex/bin/x86_64-linux/pandoc resume.md -t latex --template="./_latex/resume-template.latex" --pdf-engine="./vtex/bin/x86_64-linux/pdflatex" -V title="$title" -V bio="$bio" -V email="$email" -V github="$github" -V linkedin="$linkedin" -o "./assets/pdfs/resume.pdf"

echo "Build website"
JEKYLL_ENV=production bundle exec jekyll build
curl -sS "$1" | tar -xzC _site
