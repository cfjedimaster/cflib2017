---
layout: udf
title:  cfLipsum
date:   2010-04-29T18:24:46.000Z
library: CFMLLib
argString: "[isFormatted]"
author: Bret Feddern
authorEmail: bret@bricecheddarn.com
version: 0
cfVersion: CF5
shortDescription: Converts a feed of lorem ipsum text into a string for output.
tagBased: true
description: |
 This function allows for outputting lorem ipsum text on the fly.  It converts a feed of lorem ipsum text from Lipsum.com into a formatted or unformatted return string for output.

returnValue: returns a string

example: |
 <cfoutput>Formatted Lorem Ipsum:<br />#cfLipsum()#</cfoutput>
 <cfoutput>Unformatted Lorem Ipsum:<br />#cfLipsum(0)#</cfoutput>

args:
 - name: isFormatted
   desc: strips lorem ipsum text of punctuation and uppercase
   req: false


javaDoc: |
 <!---
  Converts a feed of lorem ipsum text into a string for output.
  
  @param isFormatted      strips lorem ipsum text of punctuation and uppercase (Optional)
  @return returns a string 
  @author Bret Feddern (bret@bricecheddarn.com) 
  @version 0, April 29, 2010 
 --->

code: |
 <cffunction name="cfLipsum" output="no" returntype="string" displayname="cfLipsum" hint="get a lorem ipsum string from lipsum.com">
     <cfargument name="isFormatted" type="numeric" required="no" default="1" />
 
     <cfset var theXML = "" />
     <cfset var theGrab = "" />
     <cfset var theLipsum = "" />
     <cfset var theLipsumFeed = "http://www.lipsum.com/feed/xml" />
     
     <!--- get the xml feed --->
     <cfhttp url="#theLipsumFeed#" method="get" resolveUrl="false" />
     
     <!--- parse and search xml for lorem ipsum --->
     <cfset theXML = XMLParse(cfhttp.filecontent) />
     <cfset theGrab = XMLSearch(theXML, "/feed") />
     
     <!--- only one lorem ipsum element in the feed --->
     <cfset theLipsum = theGrab[1].lipsum.xmltext />
     
     <!--- strips lorem ipsum text of punctuation and uppercase --->
     <cfif arguments.isFormatted neq 1>
         <cfset theLipsum = lcase(rereplacenocase(theLipsum, "[^a-z0-9 ]", "", "all")) />
     </cfif>
     
     <cfreturn theLipsum />
 </cffunction>

---

