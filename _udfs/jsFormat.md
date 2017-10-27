---
layout: udf
title:  jsFormat
date:   2003-05-09T18:00:20.000Z
library: StrLib
argString: "mystring"
author: Isaac Dealey
authorEmail: info@turnkey.to
version: 1
cfVersion: CF5
shortDescription: Fixes an oversight in the jsstringformat() function
tagBased: false
description: |
 Extends the jsstringformat function and allows the string &quot;&lt;/script&gt;&quot; to be embedded in a javascript literal string, preventing &quot;unterminated string constant&quot; errors in your javascript.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="js">
 <script>
 alert('e');
 </script>
 </cfsavecontent>
 
 <cfset js = jsFormat(js)>
 <cfoutput>
 <script>
 var someval = '#js#';
 </script>
 </cfoutput>

args:
 - name: mystring
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Fixes an oversight in the jsstringformat() function
  * 
  * @param mystring      String to format. (Required)
  * @return Returns a string. 
  * @author Isaac Dealey (info@turnkey.to) 
  * @version 1, May 9, 2003 
  */

code: |
 function jsFormat(mystring) {
     return Replace(jsstringformat(mystring),"/","\/","ALL"); 
 }

oldId: 845
---

