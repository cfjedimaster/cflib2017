---
layout: udf
title:  Sleep
date:   2003-09-29T16:25:52.000Z
library: UtilityLib
argString: "ms"
author: Nathan Strutz
authorEmail: mrnate@hotmail.com
version: 1
cfVersion: CF6
shortDescription: Causes the current request to wait for a specified amount of time.
tagBased: false
description: |
 This function causes the current java thread, ( the current CFMX page request) to go to sleep for a specified number of milliseconds. Not tested with CF5. Found in Pete Freitag's blog (cfm.blogspot.com).

returnValue: Returns nothing.

example: |
 <!---
 There will be a 2 second delay...
 <cfflush>
 <cfset Sleep(2000)>
 done waiting!
 --->

args:
 - name: ms
   desc: Number of miliseconds to sleep.
   req: true


javaDoc: |
 /**
  * Causes the current request to wait for a specified amount of time.
  * 
  * @param ms      Number of miliseconds to sleep. (Required)
  * @return Returns nothing. 
  * @author Nathan Strutz (mrnate@hotmail.com) 
  * @version 1, September 29, 2003 
  */

code: |
 function sleep(ms) {
     var thread = createObject("java", "java.lang.Thread");
     thread.sleep(ms);
 }

oldId: 959
---

