---
layout: udf
title:  isImage
date:   2005-09-08T02:49:02.000Z
library: UtilityLib
argString: "imgURL"
author: Nick Maloney
authorEmail: nmaloney@prolucid.com
version: 1
cfVersion: CF6
shortDescription: Checks to see if an image URL contains a valid jpeg or gif.
description: |
 Takes a url of an image as an argument. Returns boolean value based on whether or not the remote image is a valid jpeg or gif.

returnValue: Returns a boolean.

example: |
 <cfset imgURL = "http://cflib.org/images/logo_top.gif">
 
 <cfif isImage(imgURL)>
     <img src="#imgURL#">
 <cfelse>
     NO IMAGE
 </cfif>

args:
 - name: imgURL
   desc: URL.
   req: true


javaDoc: |
 <!---
  Checks to see if an image URL contains a valid jpeg or gif.
  
  @param imgURL      URL. (Required)
  @return Returns a boolean. 
  @author Nick Maloney (nmaloney@prolucid.com) 
  @version 1, September 7, 2005 
 --->

code: |
 <cffunction name="isImage" returntype="boolean" output="false">
     <cfargument name="imgURL" type="string" required="true">
     <cftry>
         <cfhttp method="get" url="#arguments.imgURL#" />
         <cfif cfhttp.mimetype eq "image/jpeg" or cfhttp.mimetype eq "image/gif">
             <cfreturn true>
         <cfelse>
             <cfreturn false>
         </cfif>
     <cfcatch>
         <cfreturn false>
     </cfcatch>
     </cftry>
 </cffunction>

---

