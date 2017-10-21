---
layout: udf
title:  GetHTMLTitle
date:   2001-12-03T14:42:54.000Z
library: StrLib
argString: "str"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Parses an HTML page and returns the title.
description: |
 This UDF will parse an HTML string (normally returned from CFFILE) and return the text between the title tags. The UDF will return an empty string if it cannot find proper HTML title tags.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 <CFSAVECONTENT VARIABLE="FakeHTMLFile">
 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
 
 <html>
 <head>
     <title>Interesting Title</title>
 </head>
 
 <body>
 
 Hello every
 
 </body>
 </html>
 </CFSAVECONTENT>
 
 <CFSET Title = GetHTMLTitle(FakeHTMLFile)>
 The title of this html file is #Title#
 </CFOUTPUT>

args:
 - name: str
   desc: The HTML string to check.
   req: true


javaDoc: |
 /**
  * Parses an HTML page and returns the title.
  * 
  * @param str      The HTML string to check. 
  * @return Returns a string. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, December 3, 2001 
  */

code: |
 function GetHTMLTitle(str) {
     var matchStruct = reFindNoCase("<[[:space:]]*title[[:space:]]*>([^<]*)<[[:space:]]*/title[[:space:]]*>",str,1,1);
     if(arrayLen(matchStruct.len) lt 2) { writeoutput("error<BR>");return ""; }
     return Mid(str,matchStruct.pos[2],matchStruct.len[2]);    
 }

---

