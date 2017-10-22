---
layout: udf
title:  getTinyURL
date:   2008-10-06T15:56:43.000Z
library: UtilityLib
argString: "theurl"
author: Todd Sharp
authorEmail: todd@cfsilence.com
version: 1
cfVersion: CF5
shortDescription: Quick and easy way to get a tinyurl.
tagBased: true
description: |
 Pass a URL and the UDF will return a tinyurl (http://tinyurl.com).

returnValue: Returns a String containing the tinyurl.

example: |
 <cfdump var="#getTinyURL("http://cflib.org")#">

args:
 - name: theurl
   desc: The URL that you would like to convert to a tinyurl.
   req: true


javaDoc: |
 <!---
  Quick and easy way to get a tinyurl.
  
  @param theurl      The URL that you would like to convert to a tinyurl. (Required)
  @return Returns a String containing the tinyurl. 
  @author Todd Sharp (todd@cfsilence.com) 
  @version 1, October 6, 2008 
 --->

code: |
 <cffunction name="getTinyURL" access="public" output="false" returntype="string">
     <cfargument name="theurl" required="true" type="string" />
     <cfset var apiURL = "http://tinyurl.com/api-create.php?url=" & URLEncodedFormat(arguments.theurl) />
     
     <cfhttp url="#apiURL#" />
     
     <cfreturn cfhttp.FileContent />
 </cffunction>

---

