---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: page
title: welcome to cflib
---

ray {{ page.title }}

{{ site.udfs.size }}

{% assign libs = site.udfs | group_by: "library" | sort: "name" %}

{% for lib in libs %}
lib: {{lib.name}} {{lib.items.size}}
{% endfor %}