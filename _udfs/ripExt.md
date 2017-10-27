---
layout: udf
title:  ripExt
date:   2006-07-18T11:53:02.000Z
library: FileSysLib
argString: "name"
author: Richard
authorEmail: acdhirr@trilobiet.nl
version: 1
cfVersion: CF5
shortDescription: Function returns filename without extension.
tagBased: false
description: |
 This function (which is just a regular expression) strips off the extension from a filename. Dots within the filename are preserved.

returnValue: Returns a string.

example: |
 <cfset filename="this.is.your.file.jpeg">
 <cfoutput>#ripExt(filename)#</cfoutput>

args:
 - name: name
   desc: Filename.
   req: true


javaDoc: |
 /**
  * Function returns filename without extension.
  * 
  * @param name      Filename. (Required)
  * @return Returns a string. 
  * @author Richard (acdhirr@trilobiet.nl) 
  * @version 1, July 18, 2006 
  */

code: |
 function ripExt(name) {
     return reReplace(arguments.name,"\.[^.]*$","");
 }

oldId: 1445
---

