---
layout: page
---
---
I'm Matthew W. Thomas, an Economics PhD candidate at Northwestern University. I am currently interested in applied microeconomic theory including information in financial markets, contests, and lobbying. This page is here to share my academic and non-academic projects.


{% for page in site.pages %}
	{% if page.category == 'home' %}
		{% if page.hidden != true %}
---
<h2 id="{{ page.title | slugify }}"> {{ page.title }} </h2>
{{ page.content }}
		{% endif %}
	{% endif %}
{% endfor %}

