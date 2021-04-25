---
title: "KaTeX Ruby Gem Updated with KaTeX v0.13.3"
author: "Matthew Wildrick Thomas"
layout: "post"
tag: ["tech", "ruby"]
date: "2021-04-25"
use_math: false
description: "You may need to edit your project to use my update"
---

Today, I made an update to the [KaTeX Ruby gem](https://rubygems.org/gems/katex/). The patch upgrades the bundled version of KaTeX from v0.11.0 to v0.13.3. The two major updates add several features and new symbols including support for MathML in display mode and `\underbar`.

There are two breaking changes:

* IE 9/10 support removed
* old-style numerals are now available via `\mathnormal` instead of `\mathcal`

In order to use the new gem on your website (eg. with Jekyll), you'll want to update to the 0.13.3 stylesheet. For example, if you previously used the following CSS declaration

~~~html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css" crossorigin="anonymous">
~~~

then you'll want to replace it with

~~~html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.css" crossorigin="anonymous">
~~~

Otherwise, you might get display issues.
