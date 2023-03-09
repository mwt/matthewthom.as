///////////////////////////////////////////////////////////////////////////////
// Table of contents
///////////////////////////////////////////////////////////////////////////////
// 1. Import preamble and postamble from files
// 2. Helper functions
// 3. Section functions and strings
// 4. Generate the tex file
// 5. Compile the tex file with LuaLaTeX
// 6. Export texCV class
///////////////////////////////////////////////////////////////////////////////

const fs = require("fs");
const exec = require("child_process").exec;

class texCV {
  data() {
    return {
      permalink: "/assets/pdfs/cv.pdf",
    };
  }

  async render(data) {
    ///////////////////////////////////////////////////////////////////////////
    // 1. Import preamble and postamble from files
    ///////////////////////////////////////////////////////////////////////////

    const texPreamble = fs.promises.readFile(
      `${__dirname}/_preamble.tex`,
      "utf8"
    );
    const texPostamble = fs.promises.readFile(
      `${__dirname}/_postamble.tex`,
      "utf8"
    );

    ///////////////////////////////////////////////////////////////////////////
    // 2. Helper functions
    ///////////////////////////////////////////////////////////////////////////

    // Get year from date string
    function getYear(dateString) {
      return new Date(dateString).getFullYear();
    }

    // Sort in reverse by date key (date can be a string)
    // The most recent data comes first
    function sortByDate(array, key) {
      return array
        .slice(0)
        .sort((a, b) =>
          Date.parse(a[key]) > Date.parse(b[key])
            ? -1
            : Date.parse(a[key]) < Date.parse(b[key])
            ? 1
            : 0
        );
    }

    ///////////////////////////////////////////////////////////////////////////
    // 3. Section functions and strings
    ///////////////////////////////////////////////////////////////////////////

    // The address line with social links and email
    const texAddressLine = `\\href{mailto:${data.site.email.replace(
      "..",
      "@"
    )}}{${data.site.email.replace("..", "@")}}
    {\\hspace{0.1em}\\textbullet\\hspace{0.1em}}
    \\href{${data.site.url}}{${data.site.url.replace(/(^\w+:|^)\/\//, "")}} 
    {\\hspace{0.1em}\\textbullet\\hspace{0.1em}}
    \\href{https://linkedin.com/in/${data.site.linkedin}}{\\faLinkedin/${
      data.site.linkedin
    }} 
    {\\hspace{0.1em}\\textbullet\\hspace{0.1em}}
    \\href{https://github.com/${data.site.github}}{\\faGithub/${
      data.site.github
    }}`;

    // Education function
    const texEducation = (education) => {
      return education
        .map(function (edu) {
          const degrees = edu.degrees
            .map(function (degree) {
              return `\\cvsubsubsection{${
                degree.title
              }} \\dateright{${getYear(degree.start)}--${getYear(degree.end)}}`;
            })
            .join("\n\n");
          return `\\cvsubsection{${edu.school}}\n\n${degrees}`;
        })
        .join("\n\n");
    };

    // Function to generate tex for papers
    // Relies on paper.template.frontMatter.content which is undocumented!
    const texPapers = (papers) => {
      return papers
        .map((paper) => {
          const withString =
            paper.data.authors.length > 1
              ? ` (with ${this.where_not(
                  paper.data.authors,
                  "name",
                  data.site.title
                )
                  .map((x) => x.name)
                  .join(", ")})`
              : "";
          const journalString = (() => {
            if (paper.data.journal && paper.data.published) {
              return `\n\n\\cvsubsubsection{${paper.data.journal} ${paper.data.year}}`;
            }
            if (paper.data.journal && paper.data.accepted) {
              return `\n\n\\cvsubsubsection{Accepted at ${paper.data.journal}}`;
            } else if (paper.data.journal && paper.data.rnr) {
              return `\n\n\\cvsubsubsection{R\\&R at ${paper.data.journal}}`;
            } else {
              return "";
            }
          })();
          return `\\cvsubsection{\\href{${data.site.url}${paper.url}}{\`\`${paper.data.title}''}}${withString}${journalString}

\\begin{markdown}${paper.template.frontMatter.content}\\end{markdown}
          `;
        })
        .join("\n\n");
    };

    // Sort presentations by date and list them
    const texPresentations = (presentations) => {
      const sortedPresentations = sortByDate(presentations, "date");
      return sortedPresentations
        .map((pres) => {
          return `${pres.where} \\dateright{${getYear(pres.date)}}`;
        })
        .join("\n\n");
    };

    // Sort awards by date and list them
    // We also use for RA positions
    const texAwards = (awards) => {
      const sortedAwards = sortByDate(awards, "date");
      return sortedAwards
        .map((award) => {
          // Check for date range or single date (if neither, leave empty)
          const awardDateString = award.date
            ? ` \\dateright{${getYear(award.date)}}`
            : award.start && award.end
            ? ` \\dateright{${getYear(award.start)}--${getYear(award.end)}}`
            : "";

          // Take title, for, from if they exist and filter out empty/undefined strings
          return `${[award.title, award.for, award.from]
            .filter((x) => x)
            .join(", ")}${awardDateString}`;
        })
        .join("\n\n");
    };

    // Generate a simple list (e.g. for software)
    // Papers are processed by texPapers
    const texList = (projects) => {
      return projects
        .map((project) => {
          return `\\cvsubsubsection{\\href{${project.url}}{${project.title}}}${
            project.github
              ? `\\dateright{\\href{${project.github}}{\\faGithub\\ Source}}`
              : ""
          }`;
        })
        .join("\n\n");
    };

    // Generate a list of references/advisors with emails
    const texReferences = (references) => {
      return references
        .map((reference) => {
          return `\\cvsubsection{\\href{${reference.url}}{${reference.title}}}
          
          \\cvsubsubsection{${reference.description}}
          
          \\href{mailto:${reference.email.replace(
            "..",
            "@"
          )}}{${reference.email.replace("..", "@")}}`;
        })
        .join("\n\n");
    };

    ///////////////////////////////////////////////////////////////////////////
    // 4. Generate the tex file (single string template)
    ///////////////////////////////////////////////////////////////////////////

    const texBody = `%%% Make a header for CV with personal data
\\begin{center}
  \\headernamestyle{
    ${data.site.title}
  }
  \\\\
  \\vspace{0.6mm}
  \\headerpositionstyle{
    ${data.site.bio}
  }
  \\\\
  \\vspace{0.4mm}
  \\headeraddressstyle{
    ${texAddressLine}
  }
  \\\\
  \\vspace{-1mm}
\\end{center}

%%% Education
\\cvsection{Education}

${texEducation(data.cv.education)}

%%% Publications
\\cvsection{Publications}

${texPapers(this.where(data.collections.papers, "accepted"))}

%%% Working papers
\\cvsection{Working Papers}

${texPapers(this.where_not(data.collections.papers, "accepted"))}

%%% Presentations
\\cvsection{Presentations}\\vspace{1.618ex}

${texPresentations(data.cv.presentations)}

%%% Refereeing
\\cvsection{Refereeing}\\vspace{1.618ex}

${data.cv.refereeing.sort().join(", ")}

%%% Fellowships \\& Awards
\\cvsection{Fellowships \\& Awards}\\vspace{1.618ex}

${texAwards(data.cv.awards)}

%%% RA Experience
\\cvsection{Research Experience}\\vspace{1.618ex}

${texAwards(data.cv.researchexp)}

%%% Software
\\cvsection{Software}

\\cvsubsection{Research Software Packages}

${texList(
  data["projects-academic"].sort((a, b) => a.title.localeCompare(b.title))
)}

\\cvsubsection{Other Software \\& Projects}

${texList(
  data["projects-professional"]
    .concat(data["projects-personal"])
    .sort((a, b) => a.title.localeCompare(b.title))
)}

%%% References
\\cvsection{References}
${texReferences(data.cv.references)}
`;

    ///////////////////////////////////////////////////////////////////////////
    // 5. Compile the tex file with LuaLaTeX
    ///////////////////////////////////////////////////////////////////////////

    // Final tex string
    const texStrng = `${await texPreamble}\n${texBody}\n${await texPostamble}`;

    // Create a temporary directory if it doesn't exist and write the tex file
    fs.mkdir("./latex-temp", { recursive: true }, (err) => {
      if (err) throw err;

      // Write the tex file to the temp directory (using stdin is unstable)
      fs.writeFile("./latex-temp/cv.tex", texStrng, (err) => {
        if (err) throw err;

        // Run LuaLaTeX if the platform is Linux (Windows and Mac are not supported)
        // If not Linux, there will be no pdf
        if (process.platform === "linux") {
          // Run LuaLaTeX in the tmp directory to generate the pdf in temp dir
          exec(
            "../vtex/bin/x86_64-linux/lualatex -shell-escape -interaction nonstopmode -halt-on-error -file-line-error cv.tex",
            {
              cwd: "./latex-temp",
            },
            (err, stdout, stderr) => {
              if (err) {
                console.log(stdout);
                if (err) throw err;
              }
              console.log("[11ty] cv.pdf generated using LuaLaTeX");

              // Move the pdf to the dist folder
              fs.rename(
                "./latex-temp/cv.pdf",
                "./dist/assets/pdfs/cv.pdf",
                (err) => {
                  if (err) throw err;
                  console.log("[11ty] cv.pdf moved to dist folder");
                }
              );
            }
          );
        }
      });
    });

    // Don't actually return anything (LuaLaTeX generates the PDF)
    return;
  }
}

///////////////////////////////////////////////////////////////////////////////
// 6. Export the texCV class
///////////////////////////////////////////////////////////////////////////////

module.exports = texCV;
