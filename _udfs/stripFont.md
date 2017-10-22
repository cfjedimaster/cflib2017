---
layout: udf
title:  stripFont
date:   2006-01-10T15:10:54.000Z
library: StrLib
argString: "str"
author: Dave Shuck
authorEmail: dshuck@gmail.com
version: 1
cfVersion: CF5
shortDescription: This tag removes all font tags from a string.
tagBased: false
description: |
 This tag removes all font tags from a string argument using regular expression comparison to catch open font tag regardless of the attributes.

returnValue: Returns a string.

example: |
 <cfset dirtyString = "<font size=""5"" color=""pink"">Here is content a user entered on your site!!!</font>" />
 
 <cfset cleanString = stripfont(dirtyString) />

args:
 - name: str
   desc: String to format.
   req: true


javaDoc: |
 /**
  * This tag removes all font tags from a string.
  * 
  * @param str      String to format. (Required)
  * @return Returns a string. 
  * @author Dave Shuck (dshuck@gmail.com) 
  * @version 1, January 10, 2006 
  */

code: |
 function stripFont(str) {
     //remove the open font tag
     var returnStr = reReplaceNoCase(str,"(<font)[^>]*>","","all");
     //remove the close font tag
     returnStr = replaceNoCase(returnStr,"</font>","","all");
     //return the stripped string
     return returnStr;
 }

---

