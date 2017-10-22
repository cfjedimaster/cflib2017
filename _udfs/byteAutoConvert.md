---
layout: udf
title:  byteAutoConvert
date:   2010-03-03T10:16:31.000Z
library: StrLib
argString: "bytes[, maxreduction]"
author: Joerg Zimmer
authorEmail: joerg@zimmer-se.de
version: 0
cfVersion: CF5
shortDescription: Converts Byte values to the shortest human-readable format
tagBased: true
description: |
 pass this function your byte-vales (for example from a cfdirectory-resultset) and receive the value converted to the shortest possible, human-readable format. It's possible to limit the amount of reduction.

returnValue: returns a string

example: |
 Autoconvert: #byteAutoConvert(1124008800)#<br />
 Convert to MB or lower: #byteAutoConvert(1124008800,2)#

args:
 - name: bytes
   desc: size in bytes to format
   req: true
 - name: maxreduction
   desc: limit on reduction
   req: false


javaDoc: |
 <!---
  Converts Byte values to the shortest human-readable format
  03-mar-2010 minor change to the way units variable was created
  
  @param bytes      size in bytes to format (Required)
  @param maxreduction      limit on reduction (Optional)
  @return returns a string 
  @author Joerg Zimmer (joerg@zimmer-se.de) 
  @version 0, March 3, 2010 
 --->

code: |
 <cffunction name="byteAutoConvert" access="public" returntype="string" output="false">
     <cfargument name="bytes" type="numeric" required="true">
     <cfargument name="maxreduction" type="numeric" required="false" default="9">
     <cfset var units = listToArray("B,KB,MB,GB,TB,PB,EB,ZB,YB",",")>> 
     <cfset var conv = 0>
     <cfset var exp = 0>
     
     <cfif arguments.maxreduction gte 9>
         <cfset arguments.maxreduction = arraylen(units) - 1>
     </cfif>
     
     <cfif arguments.bytes gt 0>
         <cfset exp = fix(log(arguments.bytes) / log(1024))>
         <cfif exp gt arguments.maxreduction>
             <cfset exp = arguments.maxreduction>
         </cfif>
         <cfset conv = arguments.bytes / (1024^exp)>
     </cfif>
             
     <cfreturn "#trim(lsnumberformat(conv,"_____.00"))# #units[exp + 1]#"/>
 </cffunction>

---

