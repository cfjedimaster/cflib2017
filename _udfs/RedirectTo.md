---
layout: udf
title:  RedirectTo
date:   2002-07-02T13:20:51.000Z
library: UtilityLib
argString: "location"
author: anthony petruzzi
authorEmail: rip747@aol.com
version: 1
cfVersion: CF5
shortDescription: Works like cflocation.
description: |
 A UDF version of cflocation that uses meta tags instead of a server-side redirect.

returnValue: Returns a string.

example: |
 <cfoutput>
 Non-active example:<br>
 redirectTo("http://www.foo.com")
 </cfoutput>

args:
 - name: location
   desc: URL to locate to.
   req: true


javaDoc: |
 /**
  * Works like cflocation.
  * 
  * @param location      URL to locate to. (Required)
  * @return Returns a string. 
  * @author anthony petruzzi (rip747@aol.com) 
  * @version 1, July 2, 2002 
  */

code: |
 function redirectto(location){
     return "<meta http-equiv=""Refresh"" content=""0; URL=#location#"">";
 }

---

