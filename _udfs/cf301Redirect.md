---
layout: udf
title:  cf301Redirect
date:   2008-12-06T17:39:21.000Z
library: UtilityLib
argString: "urlString"
author: Erik Vold
authorEmail: erikvvold@gmail.com
version: 0
cfVersion: CF6
shortDescription: Takes a url and 301 redirects to user to that url.
description: |
 Takes a url and 301 redirects to user to that url. Please note - ColdFusion 8 adds the statusCode attribute to be cflocation. This UDF should only be used in ColdFusion 6 and 7.

returnValue: Returns nothing.

example: |
 <cfset cf301Redirect( 'http://google.com' ) />

args:
 - name: urlString
   desc: URL to push the user to.
   req: true


javaDoc: |
 <!---
  Takes a url and 301 redirects to user to that url.
  
  @param urlString      URL to push the user to. (Required)
  @return Returns nothing. 
  @author Erik Vold (erikvvold@gmail.com) 
  @version 0, December 6, 2008 
 --->

code: |
 <cffunction name="cf301Redirect" access="public" returntype="void" output="false">
   <cfargument name="urlString" type="string" required="yes" />
   
   <!--- 301 redirect the user to the provided url --->
   <cfheader statuscode="301" statustext="Moved permanently" />
   <cfheader name="Location" value="#arguments.urlString#" />
 </cffunction>

---

