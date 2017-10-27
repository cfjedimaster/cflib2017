---
layout: udf
title:  paragraphtolist
date:   2005-05-10T14:13:32.000Z
library: StrLib
argString: "text"
author: Tony Monast
authorEmail: merkel_@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Convert a text with many lines into a html list.
tagBased: false
description: |
 Take a text and use the carriage return as a delimiter list to generate an html list (&lt;ul&gt;). Each line become an element of the list (&lt;li&gt;).

returnValue: Returns a string.

example: |
 <cfsavecontent variable="text">
 Line 1
 Line 2
 Line 3
 </cfsavecontent>
 
 <cfoutput>#paragraphToList(text)#</cfoutput>

args:
 - name: text
   desc: Text to format.
   req: true


javaDoc: |
 /**
  * Convert a text with many lines into a html list.
  * 
  * @param text      Text to format. (Required)
  * @return Returns a string. 
  * @author Tony Monast (merkel_@hotmail.com) 
  * @version 1, May 10, 2005 
  */

code: |
 function paragraphToList(text) { 
     var thelist = "";
     var i = 1;
     text = trim(text);
     for(i=1; i lte listLen(text,chr(13));i=i+1) thelist = thelist & "<li>" & ListGetAt(text,i,chr(13)) & "</li>";
     if(len(thelist) GT 0) {  
         thelist = "<ul>" & thelist & "</ul>";
         return thelist ;
     } else return "";
 }

oldId: 1206
---

