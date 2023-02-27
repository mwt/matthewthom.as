![screen shot of www.matthewthom.as](static/screen-shot.png)

This is the repository for my personal website, [matthewthom.as](https://www.matthewthom.as). It is built using [11ty](https://www.11ty.dev/).

## Folder layout

All of the interpreted files are in the `src` folder. The `src` folder is organized as follows:

```
src
├── assets
│   ├── css
│   ├── images
│   │   ├── headshot.png
│   │   └── posts
│   │       ├── YEAR1
│   │       └── YEAR2
│   ├── pdfs
├── blog.liquid
├── _data
├── feed.xml.liquid
├── _includes
│   ├── sass
│   │   ├── base
│   │   ├── components
│   │   ├── fonts
│   │   └── pages
│   ├── tools
├── index.liquid
├── _layouts
├── _papers
├── _posts
└── sitemap.xml.liquid
```

### `src/assets`

This folder contains all of the assets that are used by the code of the site.

- The `css` folder contains the SASS import file that generates the CSS for the site.
- The `images` folder contains all of the images that are processed by [`eleventy-img`](https://www.11ty.dev/docs/plugins/image/).
- The `pdfs` folder contains all of the PDFs used on the site. These are passed through to the site without any processing. However, they are still scanned by `eleventy` for inclusion in the sitemap with accurate `lastmod` dates.

### `src/_data`

This folder contains all of the data files that are used by the site. These are all JSON files.

### `src/_includes`

This folder contains all of the partials that are used by the site. These are all liquid files. The folder also contains the `sass` folder which contains the SASS files that are used to generate the CSS for the site. These files are imported for final use in `src/assets/css/main.scss`.

### `src/_layouts`

This folder contains the layout templates that are used by the site (eg. `src/_layouts/post.liquid`). There are no layout files in the `_includes` folder. These are all liquid files.

### `src/_papers`

This folder contains metadata for all papers that are listed on the site. The metadata is included in the frontmater of the paper and the body of the document contains the paper's abstract.

### `src/_posts`

This folder contains all of the blog posts that are listed on the site. These are output to `dist/blog`.

### `static`

This folder contains all of the static files that are passed through to the site without any processing. These files are outputted to `dist/assets/static` and are not scanned for inclusion in the sitemap.
