---
layout: udf
title:  googleURLShorten
date:   2011-01-14T15:40:14.000Z
library: UtilityLib
argString: "url[, apiKey]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF8
shortDescription: Uses Google's URL Shortening service to shorten a URL.
description: |
 Uses Google's URL Shortening service to shorten a URL.

returnValue: Returns a string.

example: |
 <cfset sampleURL = "http://www.coldfusionjedi.com/index.cfm/2011/1/10/jQuery-based-example-of-simple-shopping-cart-UI">
 <cfset test = googleURLShorten(sampleURL)>
 <cfoutput>
 I shorteneded #sampleURL# to #test#.<br/>
 </cfoutput>

args:
 - name: url
   desc: URL to shorten.
   req: true
 - name: apiKey
   desc: Optional API key.
   req: false


javaDoc: |
 <!---
  Uses Google's URL Shortening service to shorten a URL.
  v2 by RJLSoftware (rjlsoftware@gmail.com)
  
  @param url      URL to shorten. (Required)
  @param apiKey      Optional API key. (Optional)
  @return Returns a string. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 2, January 14, 2011 
 --->

code: |
 <cffunction name="googleURLShorten" output="false" returnType="string">
     <cfargument name="url" type="string" required="true">
     <cfargument name="apiKey" type="string" required="false" default="" hint="API key identifies your application to Google">
 
     <cfset var requestURL = "https://www.googleapis.com/urlshortener/v1/url">
     <cfset var httpResult = "">
     <cfset var result = "">
     <cfset var response = "">
     <cfset var body = {"longUrl"=arguments.url}>
     <cfset body = serializeJson(body)>
 
     <cfif arguments.apiKey NEQ "">
         <cfset requestURL=requestURL & "?key=" & arguments.apiKey>
     </cfif>
 
     <cfhttp url="#requestURL#" method="post" result="httpResult">
         <cfhttpparam type="header" name="Content-Type" value="application/json">
         <cfhttpparam type="body" value="#body#">
     </cfhttp>
     <cfset response=deserializeJSON(httpResult.filecontent.toString())>
 
     <cfif structkeyexists(response, 'error')>
         <cfset result=response.error.message>
     <cfelse>
         <!--- No Errors, return response.id (which is the shortened url) --->
         <cfset result=response.id>
     </cfif>
 
     <cfreturn result>
 </cffunction>

---

