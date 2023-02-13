// Markdown-It options
const mdOptions = {
  html: true,
  typographer: true,
};

const markdownIt = require("markdown-it")(mdOptions);
const markdownItKaTeX = require("@traptitech/markdown-it-katex");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItFootnote = require("markdown-it-footnote");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const sass = require("eleventy-sass");

module.exports = function (eleventyConfig) {
  // Set passthrough folders
  eleventyConfig.addPassthroughCopy("assets");

  // Enable RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Compile SASS
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

  // Simplify a collection so that it resembles jekyll or other data
  eleventyConfig.addFilter("flatten_pages", flattenPages);

  // Reproduce some Liquid filters, sometimes losely
  eleventyConfig.addFilter("date_to_xmlschema", dateToXmlSchema);
  eleventyConfig.addFilter("cgi_escape", cgiEscape);
  eleventyConfig.addFilter("number_of_words", numberOfWords);
  eleventyConfig.addFilter("sort_by", sortBy);
  eleventyConfig.addFilter("where", where);
  eleventyConfig.addFilter("where_not", whereNot);

  // RSS feed liquid filters
  eleventyConfig.addFilter("date_to_rfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addFilter("date_to_rfc822", pluginRss.dateToRfc822);
  eleventyConfig.addFilter("get_newest_collection_item_date", pluginRss.getNewestCollectionItemDate);
  eleventyConfig.addFilter("absolute_url", pluginRss.absoluteUrl);
  eleventyConfig.addFilter("convert_html_to_absolute_urls", pluginRss.convertHtmlToAbsoluteUrls);

  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("_posts/*.md");
  });

  eleventyConfig.addCollection("papers", (collection) => {
    return collection.getFilteredByGlob("_papers/*.md");
  });

  // Enable markdown KaTeX plugin and set options
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.set(mdOptions);
    mdLib.use(markdownItKaTeX);
    mdLib.use(markdownItAttrs);
    mdLib.use(markdownItFootnote);
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
  const html = markdownIt.render(content);

  return inline ? html.replace("<p>", "").replace("</p>", "") : html;
}

function numberOfWords(content) {
  return content.split(/\s+/g).length;
}

function flattenPages(array) {
  if (array) {
    return array.map((item) => {
      return { ...item.data, ...item.page, content: item.content };
    });
  } else {
    return undefined;
  }
}

// Define a function to use for filtering and reverse filtering
function filterWhere(item, key, value) {
  const data = item && item.data ? item.data : item;
  return typeof value === "undefined" ? key in data : data[key] === value;
}
function where(array, key, value) {
  return array.filter((item) => {
    return filterWhere(item, key, value);
  });
}
function whereNot(array, key, value) {
  return array.filter((item) => {
    return !filterWhere(item, key, value);
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
