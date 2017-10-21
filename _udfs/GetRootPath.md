---
layout: udf
title:  GetRootPath
date:   2002-10-03T12:36:11.000Z
library: UtilityLib
argString: ""
author: Billy Cravens
authorEmail: billy@architechx.com
version: 1
cfVersion: CF5
shortDescription: Determines the root path of the application without hard-coding.
description: |
 It's pretty common to need to root path of an application (for redirects, images, etc.)  Typically, this value is hard-coded.  This UDF allows you to dynamically determine the root path.  Note: this requires that the template calling this UDF is in the root directory.

returnValue: Returns a string.

example: |
 <cfoutput>#getRootPath()#</cfoutput>

args:


javaDoc: |
 /**
  * Determines the root path of the application without hard-coding.
  * 
  * @return Returns a string. 
  * @author Billy Cravens (billy@architechx.com) 
  * @version 1, October 3, 2002 
  */

code: |
 function GetRootPath() {
     var cNested = listLen(getBaseTemplatePath(),"\") - listLen(getCurrentTemplatePath(),"\");
     var    appRootDir = cgi.script_name;
     var i = 0;
     
     for (i=0;i lte cNested;i=incrementValue(i)) {
         appRootDir = listDeleteAt(appRootDir,listLen(appRootDir, "/"),"/");
     }
     appRootDir = appRootDir & "/";
     return appRootDir;
 }

---

