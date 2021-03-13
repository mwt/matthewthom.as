---
title: "List of Econ Blogs"
author: "Matthew Wildrick Thomas"
layout: "post"
tag: ["economics"]
date: "2021-03-12"
use_math: false
---

This is a list I compiled of other blogs about Economics. If you would like to add or get added to this list, contact me, comment, or just submit a request to [edit the file that generates this list](https://github.com/mwt/mattwthomas.com/edit/master/_data/econ-blogs.yml).

---

{%- assign sorted_econ_blogs = site.data.econ-blogs | sort_natural: "title" -%}
{%- include projects.html data=sorted_econ_blogs -%}