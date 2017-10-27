---
layout: udf
title:  Form2QS
date:   2002-06-26T19:01:48.000Z
library: DataManipulationLib
argString: ""
author: Billy Cravens
authorEmail: billy@architechx.com
version: 1
cfVersion: CF5
shortDescription: Converts form variables to query string.
tagBased: false
description: |
 Creates a standard query string (list of name value pairs, separated by =, delimited by &amp;) from all of the form variables.

returnValue: Returns a string.

example: |
 <cfset form.foo = 1>
 <cfset form.goo = "Jacob Camden">
 <cfoutput>foo.cfm?id=1#form2qs()#</cfoutput>

args:


javaDoc: |
 /**
  * Converts form variables to query string.
  * Modified by RCamden
  * 
  * @return Returns a string. 
  * @author Billy Cravens (billy@architechx.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function form2qs() {
     var str = "";
     var field = "";
     for(key in form) {
         str = str & "&#key#=" & urlEncodedFormat(form[key]);
     }
     return str;    
 }

oldId: 531
---

