---
layout: udf
title:  googleURLExpand
date:   2011-01-13T18:52:22.000Z
library: UtilityLib
argString: "url"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF8
shortDescription: Reverses a URL shortened by Google's URL Shortening service.
tagBased: true
description: |
 Reverses a URL shortened by Google's URL Shortening service.

returnValue: Returns a string.

example: |
 <cfset sampleURL = "http://www.coldfusionjedi.com/index.cfm/2011/1/10/jQuery-based-example-of-simple-shopping-cart-UI">
 <cfset test = googleURLShorten(sampleURL)>
 <cfoutput>
 I shorteneded #sampleURL# to #test#.<br/>
 </cfoutput>
 
 <cfset reversed = googleURLExpand(test)>
 <cfoutput>
 I expanded it to #reversed#.
 </cfoutput>

args:
 - name: url
   desc: Shortened URL to expand.
   req: true


javaDoc: |
 <!---
  Reverses a URL shortened by Google's URL Shortening service.
  
  @param url      Shortened URL to expand. (Required)
  @return Returns a string. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, January 13, 2011 
 --->

code: |
 <cffunction name="googleURLExpand" output="false" returnType="string">
     <cfargument name="url" type="string" required="true">
     <cfset var httpResult = "">
     <cfset var result = "">
 
     <cfhttp url="https://www.googleapis.com/urlshortener/v1/url?shortUrl=#urlEncodedFormat(arguments.url)#" method="get" result="httpResult"></cfhttp>
 
     <cfset result = httpResult.filecontent.toString()>
     <cfreturn deserializeJSON(result).longUrl>
 </cffunction>

oldId: 2113
---

