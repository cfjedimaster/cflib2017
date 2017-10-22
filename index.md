---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
title: Welcome to CFLib
---

<h2>Libraries</h2>

{% for lib in site.libraries %}
    {% assign udfs = site.udfs | where:"library",lib.title %}
    {% assign latest = udfs | last %}
<div class="lib">
    <a href="/library/{{ lib.title }}">{{ lib.title }}</a> <br/>
    <span class="date">Last Updated {{ latest.date | date:"%B %d, %Y"}}</span> <br/>
    Number of UDFs: {{udfs.size}} <br/>
    {{ lib.description }}
</div>

{% endfor %}

<div class="homeContent">
<h2>Welcome To CFLib.org</h2>
<p>Welcome to the Common Function Library Project. The purpose of the Common Function Library Project (CFLib.org) is to create a set of user-defined function (UDF) libraries
for ColdFusion 5.0 and higher. These libraries are open source and may be used and modified to your liking. Functions range from email format checking to encryption routines. 
These UDFs can greatly speed up development time as well as add new and powerful features to your web site.
</p>

<p>
Anyone can add their code to the project by simply using our <a href="/submit">submission form</a>. You must be running ColdFusion 5.0 (or higher) to run these libraries. For more information 
about ColdFusion, please visit <a href="http://www.adobe.com/go/coldfusion">Adobe's ColdFusion</a> product page. If you have any suggestions or comments, 
please <a href="/contact">contact</a> me.
</p>	

<p>
CFLib.org was created by <a href="http://www.raymondcamden.com">Raymond Camden</a>. 
Thanks to <a href="http://adamcameroncoldfusion.blogspot.co.uk/">Adam Cameron</a> for quite a bit of help as well.
</p>
</div>
					
<div class="submissionAndUpdates clear">
	<div class="submissions">
		<h4>Submissions</h4>
		<p>
		You can <a href="/submit">submit</a> your own UDF now. Before doing so, please search the site and ensure we haven't released a similar UDF already. Also note
		that your UDF may be modified to meet CFLib standards.
		</p>
		<p>
		UDFs will be processed and checked manually. This will take some time. Sorry.
		</p>
	</div>
	<div class="recentUpdates">
		<h4>News</h4>
		<p>
		Welcome to CFLib 2017. CFLib is still static! Thanks to <a href="https://www.netlify.com/">Netlify</a> for awesome hosting!
		</p>
	</div>						
</div>


