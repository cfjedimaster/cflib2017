---
layout: udf
title:  StripAnchors
date:   2002-11-01T19:50:16.000Z
library: StrLib
argString: "str"
author: Brian Brown
authorEmail: vonbrownz@hotmail.com
version: 2
cfVersion: CF5
shortDescription: A function that will strip out all anchors in text that has been passed as an argument.
description: |
 A function that will strip out all anchors in text that has been passed as an argument to the function.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="foo">
 This is some text with some <b>html</b> in it as
 well as <a href="links.cfm">links with <b>formatting</b></a> in them.
 </cfsavecontent>
 
 <cfoutput>#stripAnchors(foo)#</cfoutput>

args:
 - name: str
   desc: String to strip anchors from.
   req: true


javaDoc: |
 /**
  * A function that will strip out all anchors in text that has been passed as an argument.
  * Version 2 by Raymond Camden
  * 
  * @param str      String to strip anchors from. (Required)
  * @return Returns a string. 
  * @author Brian Brown (vonbrownz@hotmail.com) 
  * @version 2, November 1, 2002 
  */

code: |
 function stripAnchors(str) {
     var temp = reReplaceNoCase(str,"<[[:space:]]*a[[:space:]]+[^>]*>","","all");
     return reReplaceNoCase(temp,"<[[:space:]]*/a[[:space:]]*>","","all");
 }

---

