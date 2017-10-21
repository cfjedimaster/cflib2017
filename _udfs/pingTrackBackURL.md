---
layout: udf
title:  pingTrackBackURL
date:   2005-09-14T22:54:35.000Z
library: NetLib
argString: "trackbackurl, permalink[, charset][, title][, excerpt][, blogName][, timeout]"
author: Giampaolo Bellavite
authorEmail: giampaolo@bellavite.com
version: 1
cfVersion: CF6
shortDescription: Pings a TrackBack URL.
description: |
 Pings a TrackBack URL according to the TrackBack Specification from SixApart (http://www.sixapart.com/pronet/docs/trackback_spec).

returnValue: Returns a string.

example: |
 <cfset trackBackUrl = "http://www.bellavite.com/blog/_ping.cfm?blogID=1482">
 <cfset permLink = "http://www.cflib.org">
 <cfset charset = "utf-8">
 <cfset title = "Just a test">
 <cfset excerpt = "Let we see how this UDF works">
 <cfset blogName = "The CFLib Project">
 
 <cfset ret = pingTrackBack(trackBackUrl, permLink, charset, title, excerpt, blogName)>
 <cfoutput>#ret#</cfoutput>

args:
 - name: trackbackurl
   desc: The TrackBack ping URL to ping
   req: true
 - name: permalink
   desc: The permalink for the entry
   req: true
 - name: charset
   desc: Default to utf-8.
   req: false
 - name: title
   desc: The title of the entry
   req: false
 - name: excerpt
   desc: An excerpt of the entry
   req: false
 - name: blogName
   desc: The name of the weblog to which the entry was posted
   req: false
 - name: timeout
   desc: Default to 30. Value, in seconds, that is the maximum time the request can take
   req: false


javaDoc: |
 <!---
  Pings a TrackBack URL.
  
  @param trackbackurl      The TrackBack ping URL to ping (Required)
  @param permalink      The permalink for the entry (Required)
  @param charset      Default to utf-8. (Optional)
  @param title      The title of the entry (Optional)
  @param excerpt      An excerpt of the entry (Optional)
  @param blogName      The name of the weblog to which the entry was posted (Optional)
  @param timeout      Default to 30. Value, in seconds, that is the maximum time the request can take (Optional)
  @return Returns a string. 
  @author Giampaolo Bellavite (giampaolo@bellavite.com) 
  @version 1, January 12, 2006 
 --->

code: |
 <cffunction name="pingTrackback" output="false" returntype="string">
     <cfargument name="trackBackURL" type="string" required="yes">
     <cfargument name="permalink" type="string" required="yes">
     <cfargument name="charset" type="string" required="no" default="utf-8">
     <cfargument name="title" type="string" required="no">
     <cfargument name="excerpt" type="string" required="no">
     <cfargument name="blogName"  type="string" required="no">
     <cfargument name="timeout"  type="numeric" required="no" default="30">
     <cfset var cfhttp = "">
     <cfhttp url="#arguments.trackBackURL#" method="post" timeout="#arguments.timeout#" charset="#arguments.charset#">
         <cfhttpparam type="header" name="Content-Type" value="application/x-www-form-urlencoded; charset=#arguments.charset#">
         <cfhttpparam type="formfield" encoded="yes" name="url" value="#arguments.permalink#">
         <cfif structKeyExists(arguments, "title")>
             <cfhttpparam type="formfield" encoded="yes" name="title" value="#arguments.title#">
         </cfif>
         <cfif structKeyExists(arguments, "excerpt")>
             <cfhttpparam type="formfield" encoded="yes" name="excerpt" value="#arguments.excerpt#">
         </cfif>
         <cfif structKeyExists(arguments, "blogName")>
             <cfhttpparam type="formfield" encoded="yes" name="blog_name" value="#arguments.blogName#">
         </cfif>
     </cfhttp>
     <cfreturn cfhttp.FileContent>
 </cffunction>

---

