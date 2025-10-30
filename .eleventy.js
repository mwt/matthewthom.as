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
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Postprocessing
const htmlmin = require("html-minifier");
const postcss = require("postcss");
const cssnano = require("cssnano");

// Font Awesome
const fontawesome = require("@fortawesome/fontawesome-svg-core");
const faBrands = require("@fortawesome/free-brands-svg-icons").fab;
const faSolids = require("@fortawesome/free-solid-svg-icons").fas;

// Load all brand icons for later use
fontawesome.library.add(faBrands, faSolids);

module.exports = function (eleventyConfig) {
  // Set passthrough folders
  eleventyConfig.addPassthroughCopy({ static: "assets/static" });
  eleventyConfig.addPassthroughCopy("src/assets/pdfs");

  // Process PDFs, but do absolutely nothing with them
  eleventyConfig.addTemplateFormats("pdf");
  eleventyConfig.addExtension("pdf", {
    read: false,
    outputFileExtension: "pdf",
    compile: async (inputContent, inputPath) => {
      return async () => {
        return;
      };
    },
  });

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

  // Syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);

  // Minify HTML and add table wrappers
  eleventyConfig.addTransform("htmlpost", function (content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      // Add table wrappers
      content = content.replaceAll(
        /<table([^>]*)>/g,
        '<div class="table-wrapper"><table$1>'
      );
      content = content.replaceAll("</table>", "</table></div>");

      // Minify HTML
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

  // Add a Liquid filter to convert paper data to bibTeX string
  eleventyConfig.addFilter("bibtex", bibTeX);

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

  // Font Awesome single icon shortcode
  eleventyConfig.addAsyncShortcode("fontawesome_icon", (prefix, iconName) => {
    const icon = fontawesome.icon({ prefix, iconName });
    return icon.html[0];
  });

  // Font Awesome filter for generating a sprite sheet
  eleventyConfig.addFilter("fontawesome_sprites", (iconList) => {
    // Get the first icon in the list
    iconList = iconList.slice(0); // Make a copy of the list
    firstIcon = iconList.shift();
    var spritesAbstract = fontawesome.icon(firstIcon, {
      symbol: `icon-${firstIcon.iconName}`,
    }).abstract;

    // Add the rest of the icons (shifted list no longer has first icon)
    iconList.forEach((subIcon) => {
      const iconAbstract = fontawesome.icon(subIcon, {
        symbol: `icon-${subIcon.iconName}`,
      }).abstract;
      // We inject the "children" into the svg tag of the first icon
      spritesAbstract[0].children.push(...iconAbstract[0].children);
    });

    return fontawesome.toHtml(spritesAbstract[0]);
  });

  // Add collections
  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("src/_posts/*.md");
  });

  eleventyConfig.addCollection("papers", (collection) => {
    return collection.getFilteredByGlob("src/_papers/*.md");
  });

  eleventyConfig.addCollection("pdfs", (collection) => {
    return collection.getFilteredByGlob("src/assets/pdfs/**/*.pdf");
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
    formats: ["avif", "jpeg"],
    urlPath: "/assets/images/",
    outputDir: "./dist/assets/images/",
  });
  // relevant metadata is url, srcset
  const result = [...metadata.avif, ...metadata.jpeg];
  return result.length > 1 ? result : result[0];
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

// Create a function to generate a bibTeX entry for a paper
function bibTeX(collectionItem) {
  const paperData = collectionItem.data;

  // Create an array of lines for the bibTeX entry
  bibTeXArray = [];

  // Title
  bibTeXArray.push(`title     = "${paperData.title}"`);

  // Authors
  const authorString = paperData.authors
    .map((author) => author.name)
    .join(" and ");
  bibTeXArray.push(`author    = "${authorString}"`);

  // Journal
  if (paperData.journal && !paperData.rnr) {
    bibTeXArray.push(`journal   = "${paperData.journal}"`);
  } else {
    bibTeXArray.push(`journal   = "Working Paper"`);
  }

  // Volume
  if (paperData.volume) {
    bibTeXArray.push(`volume    = "${paperData.volume}"`);
  }

  // Number
  if (paperData.number) {
    bibTeXArray.push(`number    = "${paperData.number}"`);
  }

  // Pages
  if (paperData.pages) {
    bibTeXArray.push(
      `pages     = "${paperData.pages[0]}--${paperData.pages[1]}"`
    );
  }

  // Year (use date if year is not specified)
  const paperYear = paperData.year
    ? paperData.year
    : collectionItem.date.getFullYear();
  bibTeXArray.push(`year      = "${paperYear}"`);

  // Publisher
  if (paperData.pub) {
    bibTeXArray.push(`publisher = "${paperData.pub}"`);
  }

  return `@article{mwt${paperYear}${paperData.id_key
      ? paperData.id_key
      : collectionItem.fileSlug.split("-").pop()
    },
  ${bibTeXArray.join(",\n  ")}
}`;
}
