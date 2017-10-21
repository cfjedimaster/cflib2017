---
layout: udf
title:  RandomizeString
date:   2009-05-09T21:35:26.000Z
library: StrLib
argString: "theString, theLength"
author: Stephen Withington
authorEmail: steve@stephenwithington.com
version: 0
cfVersion: CF5
shortDescription: I generate a randomized string of desired length.
description: |
 Pass in a string and I'll return a randomized string value at the length you desire.

returnValue: returns a string

example: |
 <cfoutput>#RandomizeString("0123456789ABCDEF", 32)#</cfoutput>

args:
 - name: theString
   desc: string of text to randomize
   req: true
 - name: theLength
   desc: length of random string to create
   req: true


javaDoc: |
 <!---
  I generate a randomized string of desired length.
  
  @param theString      string of text to randomize (Required)
  @param theLength      length of random string to create (Required)
  @return returns a string 
  @author Stephen Withington (steve@stephenwithington.com) 
  @version 0, May 9, 2009 
 --->

code: |
 <cffunction name="RandomizeString" returntype="string" output="false" access="public" 
             hint="pass me a string and desired length and i'll randomize it for you.">
     <cfargument name="theString" type="string" required="true" default="0123456789ABCDEF" />
     <cfargument name="theLength" type="numeric" required="true" default="32" />
     <cfset var randomizedString = "" />
     <cfset var theIndex = "" />
 
     <cfloop index="theIndex" from="1" to="#val(arguments.theLength)#" step="1">
         <cfset randomizedString = randomizedString & mid(arguments.theString, rand()*len(arguments.theString)+1, 1) />
     </cfloop>
     <cfreturn randomizedString />    
 </cffunction>

---

