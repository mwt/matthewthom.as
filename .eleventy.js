const markdownIt = require('markdown-it')
const sass = require("eleventy-sass");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(sass, {
    sass: {
      style: "expanded",
      sourceMap: false,
      includes: "_includes/sass",
    },
  });

  // Add a filter and a tag to parse content as Markdown in Liquid files
  eleventyConfig.addFilter("markdownify", markdown);
  eleventyConfig.addPairedShortcode("markdown", (content) =>
    markdown(content, false)
  );

  // Add a Liquid filter to format a date and wrap it in a <time> element
  eleventyConfig.addFilter("time", time);

  // Reproduce some Liquid filters, sometimes losely
  eleventyConfig.addFilter("date_to_xmlschema", dateToXmlSchema);
  eleventyConfig.addFilter("date_to_rfc3339", dateToRFC3339);
  eleventyConfig.addFilter("cgi_escape", cgiEscape);
  eleventyConfig.addFilter("number_of_words", numberOfWords);
  eleventyConfig.addFilter("sort_by", sortBy);
  eleventyConfig.addFilter("where", where);
  eleventyConfig.addFilter("where_not", whereNot);

  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("_posts/*.md");
  });

  eleventyConfig.addCollection("papers", (collection) => {
    return collection.getFilteredByGlob("_papers/*.md");
  });

  return {
    dir: {
      input: "./",
      output: "./_site",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};

function markdown(content, inline = false) {
  const html = markdownIt({ html: true }).render(content);

  return inline ? html.replace("<p>", "").replace("</p>", "") : html;
}

function numberOfWords(content) {
  return content.split(/\s+/g).length;
}

// Define a function to use for filtering and reverse filtering
function filterWhere(item, key, value) {
  const data = item && item.data ? item.data : item;
  return typeof value === "undefined" ? key in data : data[key] === value;
}
function where(array, key, value) {
  return array.filter((item) => {
    filterWhere(item, key, value);
  });
}
function whereNot(array, key, value) {
  return array.filter((item) => {
    !filterWhere(item, key, value);
  });
}

function sortBy(array, key) {
  return array
    .slice(0)
    .sort((a, b) =>
      a[key].toLowerCase() < b[key].toLowerCase()
        ? -1
        : a[key].toLowerCase() > b[key].toLowerCase()
        ? 1
        : 0
    );
}

function cgiEscape(value) {
  const escapedString = encodeURIComponent(value);
  return escapedString.replaceAll("%20", "+");
}

function dateToXmlSchema(value) {
  return new Date(value).toISOString();
}

function dateToRFC3339(value) {
  let date = new Date(value).toISOString();
  let chunks = date.split(".");
  chunks.pop();

  return chunks.join("") + "Z";
}

function dateToString(value) {
  const date = new Date(value);
  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const month = parts[0].value;
  const day = Number(parts[2].value);
  const year = parts[4].value;
  const suffix = ["st", "nd", "rd"][day - 1] || "th";

  return month + " " + day + suffix + ", " + year;
}

function time(value) {
  return `<time datetime="${dateToXmlSchema(value)}">${dateToString(
    value
  )}</time>`;
}
