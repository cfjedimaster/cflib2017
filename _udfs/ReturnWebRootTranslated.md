---
layout: udf
title:  ReturnWebRootTranslated
date:   2003-05-09T17:38:58.000Z
library: UtilityLib
argString: ""
author: David Whiterod
authorEmail: whiterod.david@saugov.sa.gov.au
version: 1
cfVersion: CF5
shortDescription: Returns the translated (file system) location of the web root directory.
description: |
 Returns the translated (file system) location of the web root directory. Relies on PATH_TRANSLATED and SCRIPT_NAME

returnValue: Returns a string.

example: |
 <cfset Variables.WebRootDir = ReturnWebRootTranslated()>
 
 <cfoutput>#Variables.WebRootDir#</cfoutput>

args:


javaDoc: |
 /**
  * Returns the translated (file system) location of the web root directory.
  * 
  * @return Returns a string. 
  * @author David Whiterod (whiterod.david@saugov.sa.gov.au) 
  * @version 1, May 9, 2003 
  */

code: |
 function ReturnWebRootTranslated() {
   var tmpPath = Replace(CGI.SCRIPT_NAME, "/", "\", "ALL");
   return ReplaceNoCase(CGI.PATH_TRANSLATED, tmpPath, "", "ALL");
 }

---

