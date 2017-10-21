---
layout: udf
title:  getCurrentTemplateDirectory
date:   2008-06-04T20:21:48.000Z
library: UtilityLib
argString: ""
author: Timothy D Farrar
authorEmail: timothyfarrar@sosensible.com
version: 1
cfVersion: CF5
shortDescription: This function returns the current directory of your current coldfusion template.
description: |
 This function returns the directory of the currently executing coldfusion page.

returnValue: Returns a string.

example: |
 The current directory is <cfoutput>#getCurrentTemplateDirectory()#</cfoutput>

args:


javaDoc: |
 /**
  * This function returns the current directory of your current coldfusion template.
  * 
  * @return Returns a string. 
  * @author Timothy D Farrar (timothyfarrar@sosensible.com) 
  * @version 1, June 4, 2008 
  */

code: |
 function getCurrentTemplateDirectory() {
     return getDirectoryFromPath(getCurrentTemplatepath());
 }

---

