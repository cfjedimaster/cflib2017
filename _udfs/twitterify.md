---
layout: udf
title:  twitterify
date:   2012-12-15T19:16:35.000Z
library: StrLib
argString: "tweet"
author: John Venable
authorEmail: johnnykrisma@gmail.com
version: 1
cfVersion: CF5
shortDescription: Converts hashtags, mentions, and embedded URLs to clickable links.
tagBased: false
description: |
 when you retrieve a tweet from the Twitter API, the text doesn't have links to mentions(@), hashtags(#), or URLs. This function uses regular expressions to parse the tweet and link to all three types of references.

returnValue: Returns a string.

example: |
 <cfset tweet='@bennadel The www.BenNadel.com job board made its 79th Kiva donation on behalf of "Web Developer" http://bjam.in/jobs-160 ##FullTime ##Jobs ##NJ'>
 
 <cfoutput>
 
     #twitterify(tweet)#
 
 </cfoutput>

args:
 - name: tweet
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Converts hashtags, mentions, and embedded URLs to clickable links.
  * 
  * @param tweet      String to parse. (Required)
  * @return Returns a string. 
  * @author John Venable (johnnykrisma@gmail.com) 
  * @version 1, December 15, 2012 
  */

code: |
 function twitterify(tweet) {
     tweet = rereplacenocase(tweet, '(^|[\n ])([\w]+?://[\w]+[^ \"\n\r\t< ]*)', '\1<a href="\2" target="_blank">\2</a>', 'ALL');
     tweet = rereplacenocase(tweet, '(^|[\n ])((www|ftp)\.[^ \"\t\n\r< ]*)','\1<a href="http://\2" target="_blank">\2</a>','ALL');
     tweet = rereplacenocase(tweet, '##(\w+)', '<a class="tweet-hashtag" href="http://search.twitter.com/search?q=\1" target="_blank">##\1</a>', 'ALL');
     tweet = rereplacenocase(tweet, '@(\w+)', '<a class="tweet-mention" href="http://twitter.com/\1">@\1</a>', 'ALL');
         
     return tweet;
 }

---

