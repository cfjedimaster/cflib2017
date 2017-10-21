---
layout: udf
title:  utcOffsetToMinutes
date:   2015-01-08T17:24:15.521Z
library: DateLib
argString: "offset"
author: Mosh Teitelbaum
authorEmail: mosh.teitelbaum@evoch.com
version: 1
cfVersion: CF10
shortDescription: Converts UTC Offset to minutes.
description: |
 Converts UTC Offset to minutes.

returnValue: Returns a number.

example: |
 <cfoutput>
 #utcOffsetToMinutes("UTC-05:00")# = -300<br />
 #utcOffsetToMinutes("UTC+0500")# = 300<br />
 #utcOffsetToMinutes("05")# = 300<br />
 </cfoutput>

args:
 - name: offset
   desc: The formatted UTC offset to be converted to minutes.
   req: true


javaDoc: |
 <!---
 Converts UTC Offset to minutes.
 
 @param offset The formatted UTC offset to be converted to minutes. (Required)
 @return Returns a number.
 @author Mosh Teitelbaum (mosh.teitelbaum@evoch.com)
 @version 1, 1/8/2015
 --->
 

code: |
 <cffunction name="utcOffsetToMinutes" returntype="numeric" output="no" description="Converts UTC Offset to minutes.">
     <cfargument name="offset" type="string" required="yes" hint="The formatted UTC offset to be converted to minutes.">
 
     <!--- Initialize local variables --->
     <cfset var h = 0>                                                            <!--- hours --->
     <cfset var m = 0>                                                            <!--- minutes --->
     <cfset var s = 1>                                                            <!--- sign --->
     <cfset var str = ReReplaceNoCase(arguments.offset, "[^-:0-9]", "", "ALL")>    <!--- offset with non-important characters removed --->
 
     <!--- If first character is "-", adjust sign --->
     <cfif Compare(Left(str, 1), "-") EQ 0>
         <cfset s = -1>
         <cfset str = Right(str, Len(str) - 1)>
     </cfif>
 
     <!--- Determine number of hours and minutes --->
     <cfif ListLen(str, ":") EQ 2>
         <cfset h = ListFirst(str, ":")>
         <cfset m = ListLast(str, ":")>
     <cfelseif Len(str) EQ 2>
         <cfset h = str>
     <cfelseif Len(str) EQ 3>
         <cfset h = Left(str, 1)>
         <cfset m = Right(str, 2)>
     <cfelseif Len(str) EQ 4>
         <cfset h = Left(str, 2)>
         <cfset m = Right(str, 2)>
     </cfif>
 
     <!--- Return number of minutes --->
     <cfreturn s * ((h * 60) + m)>
 </cffunction>
 

---

