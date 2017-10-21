---
layout: udf
title:  htmlDecode
date:   2013-07-24T14:06:00.000Z
library: StrLib
argString: "HTML"
author: Adam Tuttle
authorEmail: adam@fusiongrokker.com
version: 1
cfVersion: CF5
shortDescription: Inverse of HTMLEditFormat, similar to URLDecode
description: |
 Converts an HTML-escaped string back to normal HTML.

returnValue: Returns a decoded string

example: |
 <cfoutput>
 #htmlDecode('Hello&lt;br/&gt;World!')#
 </cfoutput>

args:
 - name: HTML
   desc: A string to decode
   req: true


javaDoc: |
 /**
  * Inverse of HTMLEditFormat, similar to URLDecode
  * v1.0 by Adam Tuttle
  * 
  * @param HTML      A string to decode (Required)
  * @return Returns a decoded string 
  * @author Adam Tuttle (adam@fusiongrokker.com) 
  * @version 1.0, July 24, 2013 
  */

code: |
 function htmlDecode(HTML){
     return replaceList(arguments.HTML, "&lt;,&gt;,&amp;,&quot;", '<,>,&,"');
 }

---

