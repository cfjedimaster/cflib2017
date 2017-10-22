---
layout: udf
title:  GetSecureURL
date:   2009-05-10T00:36:36.000Z
library: StrLib
argString: "[domain][, path][, queryString][, port]"
author: Jon Hartmann
authorEmail: jon.hartmann@gmail.com
version: 0
cfVersion: CF5
shortDescription: Creates an HTTPS URL for the current page, or for given page information.
tagBased: true
description: |
 This function takes cgi information and creates a URL for an https to the current page. Each section can be overridden to allow it to create URLS for other locations.

returnValue: Returns a string

example: |
 <cfdump var="#GetSecureURL()#">

args:
 - name: domain
   desc: url to secure
   req: false
 - name: path
   desc: page to secure
   req: false
 - name: queryString
   desc: queryString for page
   req: false
 - name: port
   desc: additional port to use in url
   req: false


javaDoc: |
 <!---
  Creates an HTTPS URL for the current page, or for given page information.
  
  @param domain      url to secure (Optional)
  @param path      page to secure (Optional)
  @param queryString      queryString for page (Optional)
  @param port      additional port to use in url (Optional)
  @return Returns a string 
  @author Jon Hartmann (jon.hartmann@gmail.com) 
  @version 0, May 9, 2009 
 --->

code: |
 <cffunction name="GetSecureURL" output="false" returntype="string">
     <cfargument name="domain" typ="string" required="false" default="#cgi.server_name#" />
     <cfargument name="path" typ="string" required="false" default="#cgi.script_name#" />
     <cfargument name="queryString" typ="string" required="false" default="#cgi.query_string#" />
     <cfargument name="port" typ="string" required="false" default="#cgi.server_port#" />
     
     <cfset var HTTPSURL = "https://" & arguments.domain />
     
     <cfif IsNumeric(arguments.port)>
         <cfset HTTPSURL = HTTPSURL & ":" & arguments.port />
     </cfif>
     
     <cfset HTTPSURL = HTTPSURL & arguments.path />
     
     <cfif Len(arguments.queryString)>
         <cfset HTTPSURL = HTTPSURL & "?" & arguments.queryString />
     </cfif>
     
     <cfreturn HTTPSURL />
 </cffunction>

---

