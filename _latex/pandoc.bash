title=$(grep 'title:' _config.yml | tail -n1); title=${title#*: }
bio=$(grep 'bio:' _config.yml | tail -n1); bio=${bio#*: }
email=$(grep 'email:' _config.yml | tail -n1); email=${email#*: }
github=$(grep 'github:' _config.yml | tail -n1); github=${github#*: }
linkedin=$(grep 'linkedin:' _config.yml | tail -n1); linkedin=${linkedin#*: }

pandoc resume.md -t latex --template="./_latex/resume-template.latex" --pdf-engine=pdflatex -V title="$title" -V bio="$bio" -V email="$email" -V github="$github" -V linkedin="$linkedin" -o "./assets/resume.pdf"