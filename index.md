---
layout: page
title: Home
---
---
I'm Matthew Thomas, an Economics PhD student at Northwestern University. I am currently interested in industrial organization and applied microeconomic theory. This page is here to share my academic and non-academic projects.


{% for page in site.pages %}
	{% if page.category == 'home' %}
		{% if page.hidden != true %}
---
<h2 id="{{ page.title | slugify }}"> {{ page.title }} </h2>
{{ page.content }}
		{% endif %}
	{% endif %}
{% endfor %}

