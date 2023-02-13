---
title: "Econ Ipsum Now Available in TeX"
author: "Matthew W. Thomas"
layout: "post"
tag: ["tech", "webdev"]
date: "2021-03-15"
use_math: false
description: "Someone made a TeX version of my Econ Ipsum website"
---

About two years ago, [Maria Betto](https://mariabetto.com) and I made [Econ Ipsum](https://ipsum.mwt.me), a Lorem Ipsum generator that uses words from Econometrica abstracts to produce Economic sounding nonsense. We never put any sort of tracking or analytics on the page. So, I don't know how many people use it. However, I can tell from the number of api calls that it is more than originally expected.[^1]

One long running joke on the page is that the randomized articles have zero citations and are "not forthcoming". That is, we remind that the random text is not a reference for any other article and is not scheduled for publication in any journal. These facts were intended to be self-evident. So, I was surprised when a student contacted me to ask if he could use some random paragraphs in a TeX package he was working on.

Naturally, I was ecstatic that someone liked Econ Ipsum enough to make a spinoff. So, I'm happy to announce that you can now use Econ Ipsum paragraphs in TeX via the [econlipsum](https://ctan.org/pkg/econlipsum) package by Jack Coleman. So, Econ Ipsum's citation counter -- intended to remain forever at zero -- has now advanced to one.

![Econ Ipsum with one citation](/assets/images/posts/2021/econ-ipsum-citations1.png)
{: .text-center}

---

[^1]: The number of api executions is the maximum number of paragraphs requested by a single person divided by 100 (and rounded up). Each day (typically) has between 3 and 30 executions. On one day, there were 184 executions -- which means that one person generated 18,400 paragraphs.
