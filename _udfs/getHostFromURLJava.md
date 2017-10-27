---
layout: udf
title:  getHostFromURLJava
date:   2008-06-05T16:24:48.000Z
library: UtilityLib
argString: "[url]"
author: Todd Sharp
authorEmail: todd@cfsilence.com
version: 1
cfVersion: CF5
shortDescription: Extracts the host name from a URL.
tagBased: true
description: |
 Uses Java to extract the host name from a URL.  Different from getHostFromURL (http://www.cflib.org/udf.cfm?id=494) since this UDF uses Java to extract the host name and getHostFromURL uses regex.

returnValue: Returns a string containing the host name.

example: |
 <cfset greatBlog = "http://cfsilence.com/client/blog" />
 <cfset host = getHostFromURL(greatBlog) />
 <cfoutput>#host#</cfoutput>
 <!--- outputs 'cfsilence.com' --->

args:
 - name: url
   desc: the url from which you want to extract the host name
   req: false


javaDoc: |
 <!---
  Extracts the host name from a URL.
  
  @param url      the url from which you want to extract the host name (Optional)
  @return Returns a string containing the host name. 
  @author Todd Sharp (todd@cfsilence.com) 
  @version 1, June 5, 2008 
 --->

code: |
 <cffunction name="getHostFromURL" access="public" output="false" returntype="string">
     <cfargument name="url" required="false" default="" />
     <cfset var jURL = "" />
     <cfif len(arguments.url)>
         <cfset jURL = createObject("java", "java.net.URL").init(arguments.url) />
         <cfreturn jURL.getHost() />
     <cfelse>
         <cfreturn ""/>
     </cfif>
 </cffunction>

oldId: 1870
---

