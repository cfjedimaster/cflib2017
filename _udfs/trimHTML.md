---
layout: udf
title:  trimHTML
date:   2007-11-14T13:41:18.000Z
library: StrLib
argString: "str"
author: Kenric L. Ashe
authorEmail: cflib.org@kenric.com
version: 1
cfVersion: CF5
shortDescription: Like Trim() except it also works on html.
tagBased: false
description: |
 Like Trim() except it also works on html whitespace i.e. &lt;p&gt;&lt;/p&gt;, &lt;br&gt;, &lt;br/&gt;, &lt;br /&gt;, and  non-breaking spaces.

returnValue: Returns a string.

example: |
 <cfset before = "<p>&nbsp;</p> <br> <p>this is a test&nbsp;<br /> &nbsp;</p>">
 <cfset after = TrimHTML(before)>
 before: <cfdump var="#before#">
 <br><br>
 after: <cfdump var="#after#">

args:
 - name: str
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Like Trim() except it also works on html.
  * 
  * @param str      String to format. (Required)
  * @return Returns a string. 
  * @author Kenric L. Ashe (cflib.org@kenric.com) 
  * @version 1, November 14, 2007 
  */

code: |
 function trimHTML(str) {
     var htmlList = "<p>,</p>,<br>,<br/>,<br />,&nbsp;";
     var x = 0; var H = ""; var looping = 1;
     while (looping) {
         looping = 0;
         str = Trim(str);
         for (x=1; x lte ListLen(htmlList); x=x+1) {
             H = ListGetAt(htmlList, x);
             if (Left(str, Len(H)) is H) {str = Right(str, Len(str) - Len(H)); looping = 1;}
             if (Right(str, Len(H)) is H) {str = Left(str, Len(str) - Len(H)); looping = 1;}
         }
     }
     return str;
 }

oldId: 1709
---

