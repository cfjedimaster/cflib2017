---
layout: udf
title:  removeLinks
date:   2005-08-11T12:16:04.000Z
library: StrLib
argString: "str"
author: Jen Wright
authorEmail: jen@jenw.net
version: 2
cfVersion: CF5
shortDescription: Strips links and closing link tags from a string.
tagBased: false
description: |
 removeLinks searches a string for A tags and removes the tag and the closing tag. It takes one required argument, the string to be stripped. It returns the string with the links removed.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="str">
 <a href="http://www.cflib.org">CFlib.org</a><br>
 More <b>test</b><br>
 <a href="http://www.cnn.com">CNN.com
 </a>
 </cfsavecontent>
 
 <cfoutput>#removeLinks(str)#</cfoutput>

args:
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Strips links and closing link tags from a string.
  * Version 2 by Raymond Camden
  * 
  * @param str      String to parse. (Required)
  * @return Returns a string. 
  * @author Jen Wright (jen@jenw.net) 
  * @version 2, August 11, 2005 
  */

code: |
 function removeLinks(str) {
     str = reReplace(str, "<[[:space:]]*[aA].*?>(.*?)<[[:space:]]*/[[:space:]]*a[[:space:]]*>","\1","all");
     return str;    
 }

---

