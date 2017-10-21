---
layout: udf
title:  LeftDotDot
date:   2009-05-10T00:13:15.000Z
library: StrLib
argString: "str[, l]"
author: Peter Coppinger
authorEmail: peter@digital-crew.com
version: 0
cfVersion: CF5
shortDescription: leftDotDot turns &quot;This is a nice day&quot; into &quot;This is a nic..&quot;
description: |
 leftDotDot turns &quot;This is a nice day&quot; into &quot;This is a nic..&quot;. You can specify the clipping length.
 
 This is very handy when you have a limited layout or just want to give a preview.
 
 Or if you just want to ensure that some ridiculously long name doesn't mess things up.
 
 We use it extensively in Teamwork Project Manager.

returnValue: Returns a string

example: |
 <cfoutput>#HTMLEditFormat( LeftDotDot( productDescription, 50 ) )#</cfoutput>

args:
 - name: str
   desc: String to use
   req: true
 - name: l
   desc: length to use
   req: false


javaDoc: |
 <!---
  leftDotDot turns &quot;This is a nice day&quot; into &quot;This is a nic..&quot;
  
  @param str      String to use (Required)
  @param l      length to use (Optional)
  @return Returns a string 
  @author Peter Coppinger (peter@digital-crew.com) 
  @version 0, May 9, 2009 
 --->

code: |
 <cffunction name="leftDotDot" output="no" returntype="string">
     <cfargument name="str" type="string" required="yes">
     <cfargument name="l" type="numeric" required="no" default="80">
     
     <cfset var result = str>
     
     <cfif Len( str ) GT l>
         <cfset result = Left( Trim(str), l-2 ) & "...">
     </cfif>
     
     <cfreturn result>
     
 </cffunction>

---

