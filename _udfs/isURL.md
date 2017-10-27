---
layout: udf
title:  isURL
date:   2010-08-05T14:36:48.000Z
library: StrLib
argString: "stringToCheck"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 2
cfVersion: CF7
shortDescription: A quick way to test if a string is a URL.
tagBased: false
description: |
 This is a quick way to check if a string is a URL -- handy when, for instance, a user is entering a URL into a form that will later be used to make a link on a web page.  Mostly just more convenient than needing to remember the regex. Notice that it makes use of isValid. The isValid function has built in URL checking, but this regex is considered to be stronger.
 
 Credit for the regex comes from DragingFireball.net:
 http://daringfireball.net/2010/07/improved_regex_for_matching_urls

returnValue: Returns a boolean.

example: |
 <cfset list = "www.foo.com,http://www.foo.com,http://intranet/foo/foo.htm,http:/noslash.com">
 <cfoutput>
 <cfloop list="#list#" index="s">
 #yesNoFormat(isURL(s))# - #s#<br>
 </cfloop>
 </cfoutput>

args:
 - name: stringToCheck
   desc: The string to check.
   req: true


javaDoc: |
 /**
  * A quick way to test if a string is a URL.
  * Regex by Gruber: http://daringfireball.net/2010/07/improved_regex_for_matching_urls
  * 
  * @param stringToCheck      The string to check. (Required)
  * @return Returns a boolean. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 2, August 5, 2010 
  */

code: |
 function isURL(stringToCheck){
        var URLRegEx = "(?i)\b((?:[a-z][\w-]+:(?:/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'"".,<>?«»“”‘’]))";
        return isValid("regex", stringToCheck, URLRegex);
 }

oldId: 210
---

