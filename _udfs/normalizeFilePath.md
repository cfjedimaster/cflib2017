---
layout: udf
title:  normalizeFilePath
date:   2008-09-09T15:15:23.000Z
library: FileSysLib
argString: "filePath"
author: S. Isaac Dealey
authorEmail: info@turnkey.to
version: 0
cfVersion: CF6
shortDescription: normalizes a file path to remove invalid slashes and extra dots.
description: |
 Turns c:\path\/to//dir/../other into c:\path\to\other - file or directory must already exist.

returnValue: Returns a string.

example: |
 <cfoutput>Put your files here: #normalizeFilePath("c:\path\/to//dir/../other")#</cfoutput>

args:
 - name: filePath
   desc: The file path to format.
   req: true


javaDoc: |
 /**
  * normalizes a file path to remove invalid slashes and extra dots.
  * 
  * @param filePath      The file path to format. (Required)
  * @return Returns a string. 
  * @author S. Isaac Dealey (info@turnkey.to) 
  * @version 0, September 9, 2008 
  */

code: |
 function normalizeFilePath(filePath) {
 return CreateObject("java","java.io.File").init(filePath).getCanonicalPath();
 }

---

