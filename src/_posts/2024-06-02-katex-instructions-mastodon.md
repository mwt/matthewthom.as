---
title: "Setting up KaTeX in Mastodon"
author: "Matthew W. Thomas"
layout: "post"
override:tags: ["tech", "webdev", "mastodon"]
date: "2024-06-02"
use_math: false
description: "Guide for KaTeX math formatting in Mastodon"
---

This is a short guide to document my experience in enabling TeX support in Mastodon by injecting KaTeX into the interface. I use this setup on <https://econtwitter.net>. This differs from my the [Mathsodon fork](/blog/mathstodon-instructions/) I used previously in that it does not require direct modification of the Mastodon code. I instead inject KaTeX into the interface using nginx at the proxy level. As a result, we can install usual Mastodon updates without breaking this feature. I do not cover the installation of Mastodon itself in this guide.

You can think of this as similar to a userscript or browser extension, but automatically applied to all users of your instance.

## Install KaTeX static assets

The commands in this section should be run as the mastodon user. If you are not logged in as the mastodon user, you can switch with `sudo -su mastodon`. First, we need to create a directory to store the assets:

```sh
mkdir -p ~/overrides/katex && cd ~/overrides
```

Then, download and extract the files (feel free to replace the URL with the latest version of KaTeX):

```sh
wget -qO- https://github.com/KaTeX/KaTeX/releases/download/v0.16.10/katex.tar.gz | tar xzC ./katex
```

Then, make a file called `custom.js` in the `~/overrides` directory with the following content:

```js
// Render TeX by default
document.addEventListener("DOMContentLoaded", function () {
  var katexTootSelector =
    ".status__content .status__content__text:not(.katex-rendered)";

  // Define a function to render TeX in an element
  async function renderMathInToots(elm) {
    // Render the math in the element
    renderMathInElement(elm, {
      delimiters: [
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
      ],
      throwOnError: false,
    });

    // Add a class to the element so we don't render it again
    elm.classList.add("katex-rendered");
  }

  // On each mutation, render the math in the new elements
  const observer = new MutationObserver((mutations) => {
    // Render TeX in the new toots
    document.querySelectorAll(katexTootSelector).forEach(renderMathInToots);
  });

  // Observe the body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });

  // Render TeX in already loaded toots (there probably aren't any)
  document.querySelectorAll(katexTootSelector).forEach(renderMathInToots);
});
```

This short script calls KaTeX to render TeX in toots as they are loaded. We use a query selector to select toots that have not already been rendered by KaTeX. A mutation observer watches for changes to the DOM and renders TeX in new toots as they are loaded. The most fragile part of this script is the selector, which may need to be updated if the Mastodon interface changes.

## Configure nginx

In order to load the KaTeX assets and the custom script, we need to configure nginx to inject the necessary HTML into the Mastodon interface. This requires the nginx http sub module which is included in debian, but may require installation on other distributions. As root, edit the `/etc/nginx/sites-available/mastodon` file in the following ways:

1. Add the following block to the main `server` block so that we can access the files that we just installed:

   ```nginx
   location /overrides/ {
     alias /home/mastodon/overrides/;
     add_header Cache-Control "public, max-age=0, must-revalidate";
     add_header Strict-Transport-Security "max-age=63072000; includeSubDomains";
     try_files $uri =404;
   }
   ```

2. Add the following to the `location @proxy` block to inject the custom script:

   ```nginx
     # Load KaTeX stylesheets and scripts
     sub_filter '</head>' '
   <link rel="stylesheet" crossorigin="anonymous" href="/overrides/katex/katex.min.css" media="all" />
   <script defer crossorigin="anonymous" src="/overrides/katex/katex.min.js" id="katex-script"></script>
   <script defer crossorigin="anonymous" src="/overrides/katex/contrib/auto-render.min.js" id="katex-autorender"></script>
   <script defer crossorigin="anonymous" src="/overrides/custom.js"></script>

   </head>';

     # Only run the sub_filter once
     sub_filter_once on;
   ```

Finally, reload nginx with `sudo systemctl reload nginx`.

For security, you may want to add integrity checks to the script and stylesheet tags. I excluded them because your KaTeX version may differ. You can generate these with the following command:

```sh
while read -r file; do
  printf '\n%s\nintegrity="sha384-%s"\n' "$file" "$(openssl dgst -sha384 -binary < "$file" | openssl base64 -A)"
done <<EOF
/home/mastodon/overrides/katex/katex.min.css
/home/mastodon/overrides/katex/katex.min.js
/home/mastodon/overrides/katex/contrib/auto-render.min.js
/home/mastodon/overrides/custom.js
EOF
```

## Custom CSS

I added the following CSS in the Mastodon admin interface (Administration > Server settings > Appearance) to make display mode math look better:

```css
/* KaTeX
   ===================================== */
.status__content__text .katex-display {
  overflow: auto hidden;
  /* Make space for the scrollbar */
  padding-bottom: 1em;
  padding-top: 1em;
  margin-bottom: 0;
  margin-top: 0;
}

.status__content__text .katex-display::-webkit-scrollbar {
  height: 6px;
}
```

I also hacked in some instructions for using TeX under the compose box.

```css
/* Equation instructions in compose form
   ===================================== */
form.compose-form::after {
  content: "Inline LaTeX: \\( code \\) \00000a Display-mode: \\[ code \\]";
  white-space: pre-wrap;
  margin-top: 1em;
  font-family: monospace;
}
```
