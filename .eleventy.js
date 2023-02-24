// Markdown-It options
const mdOptions = {
  html: true,
  typographer: true,
};

// Markdown-It and plugins
const markdownIt = require("markdown-it")(mdOptions);
const markdownItKaTeX = require("@traptitech/markdown-it-katex");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItFootnote = require("markdown-it-footnote");

// 11ty plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyImage = require("@11ty/eleventy-img");
const eleventySass = require("eleventy-sass");

// Postprocessing
const htmlmin = require("html-minifier");
const postcss = require("postcss");
const cssnano = require("cssnano");

// fast-glob (for PDFs)
const fastGlob = require("fast-glob");

module.exports = function (eleventyConfig) {
  // Set passthrough folders
  eleventyConfig.addPassthroughCopy("static");

  // Enable RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Compile SASS
  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      style: "expanded",
      sourceMap: false,
      includes: "_includes/sass",
    },
    postcss: postcss([cssnano]),
  });

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        minifyJS: true,
      });
      return minified;
    }

    return content;
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

  // Reproduce some Liquid filters, sometimes loosely
  eleventyConfig.addFilter("date_to_xmlschema", dateToXmlSchema);
  eleventyConfig.addFilter("cgi_escape", cgiEscape);
  eleventyConfig.addFilter("number_of_words", numberOfWords);
  eleventyConfig.addFilter("sort_by", sortBy);
  eleventyConfig.addFilter("where", where);
  eleventyConfig.addFilter("where_not", whereNot);

  // Image library liquid filter
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  eleventyConfig.addFilter("jpeg_width", jpegWidth);

  // RSS feed liquid filters
  eleventyConfig.addLiquidFilter("date_to_rfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addLiquidFilter("date_to_rfc822", pluginRss.dateToRfc822);
  eleventyConfig.addLiquidFilter(
    "get_newest_collection_item_date",
    pluginRss.getNewestCollectionItemDate
  );
  eleventyConfig.addLiquidFilter("absolute_url", pluginRss.absoluteUrl);
  eleventyConfig.addLiquidFilter(
    "convert_html_to_absolute_urls",
    pluginRss.convertHtmlToAbsoluteUrls
  );

  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("src/_posts/*.md");
  });

  eleventyConfig.addCollection("papers", (collection) => {
    return collection.getFilteredByGlob("src/_papers/*.md");
  });

  eleventyConfig.addCollection("pdfs", (collection) => {
    pathList = fastGlob.sync("src/assets/pdfs/**/*.pdf");
    return pathList.map((path) => {
      return {
        url: path.replace("src/", "/"),
        date: new Date(),
        data: {
          title: path.split("/").pop().split(".")[0],
        },
      };
    });
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
      input: "./src",
      output: "./dist",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};

function markdown(content, inline = false) {
  const html = markdownIt.render(content);

  return inline ? html.replace("<p>", "").replace("</p>", "") : html;
}

async function imageShortcode(src, alt, width = "auto") {
  const extension = src.split(".").pop();
  const outputFormats = (() => {
    switch (extension) {
      case "svg":
        return ["svg", "jpeg"];
      case "png":
        return ["png", "jpeg"];
      default:
        return ["jpeg"];
    }
  })();

  let metadata = await eleventyImage(src, {
    widths: [width],
    formats: outputFormats,
    urlPath: "/assets/images/",
    outputDir: "./dist/assets/images/",
  });

  let imageAttributes = {
    alt: alt,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return eleventyImage.generateHTML(metadata, imageAttributes);
}

async function jpegWidth(src, width = "auto") {
  const widths = width.length > 1 ? width : [width];
  let metadata = await eleventyImage(src, {
    widths: widths,
    formats: ["jpeg"],
    urlPath: "/assets/images/",
    outputDir: "./dist/assets/images/",
  });
  // relevant metadata is url, srcset
  return metadata.jpeg.length > 1 ? metadata.jpeg : metadata.jpeg[0];
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
