---
title: "List of Econ Blogs"
author: "Matthew W. Thomas"
layout: "post"
tag: ["economics"]
date: "2021-03-12"
use_math: false
description: "I made a blogroll of Econ blogs that anyone can contribute to"
---

This is a list I compiled of other blogs about Economics. If you would like to add or get added to this list, contact me, comment, or just submit a request to [edit the file that generates this list](https://github.com/mwt/matthewthom.as/edit/master/_data/econ-blogs.yml).

---

{%- assign sorted_econ_blogs = site.data.econ-blogs | sort_natural: "title" -%}
{%- include list.html data=sorted_econ_blogs -%}