---
layout: udf
title:  getCurrentURL
date:   2008-09-05T18:53:00.000Z
library: UtilityLib
argString: ""
author: Topper
authorEmail: topper@cftopper.com
version: 1
cfVersion: CF6
shortDescription: Returns the current URL for the page.
description: |
 Returns the current URL for the page.
 Works better than other methods.
 
 Other methods of calculating the URL from CGI variables won't work if your application is in a sub-folder like http://localhost/myapp/ - they ignore the &quot;myapp&quot; bit.
 
 I've seen and tired all sorts of other ways to get the Current URL but this is the only method I have found that works in all secenarios.

returnValue: Returns a string.

example: |
 <cfset pageURL = GetCurrentURL()>

args:


javaDoc: |
 <!---
  Returns the current URL for the page.
  
  @return Returns a string. 
  @author Topper (topper@cftopper.com) 
  @version 1, September 5, 2008 
 --->

code: |
 <cffunction name="getCurrentURL" output="No" access="public" returnType="string">
     <cfset var theURL = getPageContext().getRequest().GetRequestUrl().toString()>
     <cfif len( CGI.query_string )><cfset theURL = theURL & "?" & CGI.query_string></cfif>
     <cfreturn theURL>
 </cffunction>

---

