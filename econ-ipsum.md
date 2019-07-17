---
layout: minimal
title: Econ Ipsum
head:
- <link rel="prefetch" href="https://econ-ipsum.appspot.com/warmup"> 
---

## Econ Ipsum

This is a Lorem Ipsum generator that uses words from the abstracts of various economic papers.

<form action="https://econ-ipsum.appspot.com/" method="post" target="my_iframe">
  Number of paragraphs: <input type="number" class="nimput" name="np" value="5" min="0" max="100">
  <button type="submit" class="btn">Generate</button>
</form>

<!-- when the form is submitted, the server response will appear in this iframe -->
<iframe name="my_iframe" src="{{ site.url }}/econ-ipsum-static" width="100%" height="600px"></iframe>