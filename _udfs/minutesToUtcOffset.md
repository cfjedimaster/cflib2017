---
layout: udf
title:  minutesToUtcOffset
date:   2015-01-08T17:29:03.274Z
library: DateLib
argString: "minutes[, format][, returnZero]"
author: Mosh Teitelbaum
authorEmail: mosh.teitelbaum@evoch.com
version: 1
cfVersion: CF10
shortDescription: Converts minutes to UTC Offset in the specified format.
description: |
 Converts minutes to UTC Offset in the specified format.

returnValue: A string indicating the specified minutes in UTC Offset format.

example: |
 <cfoutput>
 #minutesToUtcOffset(-300)# = -05:00<br />
 #minutesToUtcOffset(300, "+hhmm")# = +0500<br />
 #minutesToUtcOffset(-300, "+hh")# = -05<br />
 </cfoutput>

args:
 - name: minutes
   desc: The number of minutes to be converted to UTC Offset format.
   req: true
 - name: format
   desc: Indicates the UTC Offset format to be used. Options are "+hh&#58;mm" (default), "+hhmm", and "+hh". "+hh" falls back to the default if the converted minutes cannot convert to hours alone.
   req: false
 - name: returnZero
   desc: Indicates whether or not anything should be returned for zero minutes (e.g., "+00&#58;00"). Default is false.
   req: false


javaDoc: |
 <!---
 Converts minutes to UTC Offset in the specified format.
 
 @param minutes The number of minutes to be converted to UTC Offset format. (Required)
 @param format Indicates the UTC Offset format to be used. Options are "+hh:mm" (default), "+hhmm", and "+hh". "+hh" falls back to the default if the converted minutes cannot convert to hours alone. (Optional)
 @param returnZero Indicates whether or not anything should be returned for zero minutes (e.g., "+00:00"). Default is false. (Optional)
 @return A string indicating the specified minutes in UTC Offset format.
 @author Mosh Teitelbaum (mosh.teitelbaum@evoch.com)
 @version 1.0, 1/8/2015
 --->
 

code: |
 <cffunction name="minutesToUtcOffset" returntype="string" output="no" description="Converts minutes to UTC Offset in the specified format.">
     <cfargument name="minutes" type="numeric" required="yes" hint="The number of minutes to be converted to UTC Offset format.">
     <cfargument name="format" type="string" required="no" default="+hh:mm" hint="Indicates the UTC Offset format to be used. Options are '+hh:mm' (default), '+hhmm', and '+hh'. '+hh' falls back to the default if the converted minutes cannot convert to hours alone.">
     <cfargument name="returnZero" type="boolean" required="no" default="false" hint="Indicates whether or not anything should be returned for zero minutes (e.g., '+00:00'). Default is false.">
 
     <!--- Initialize local variables --->
     <cfset var h = fix(arguments.minutes / 60)>        <!--- hours --->
     <cfset var m = abs(arguments.minutes) MOD 60>    <!--- minutes --->
     <cfset var f = arguments.format>                <!--- format --->
 
     <!--- If zero and not returning zero, return empty string --->
     <cfif (arguments.minutes EQ 0) AND (NOT arguments.returnZero)>
         <cfreturn "">
     </cfif>
 
     <!--- Validate format --->
     <cfif (listFindNoCase("+hh:mm,+hhmm,+hh", arguments.format) EQ 0) OR ( (compareNoCase(arguments.format, "+hh") EQ 0) AND (m NEQ 0) )>
         <cfset f = "+hh:mm">
     </cfif>
 
     <!--- Return formatted string --->
     <cfswitch expression="#f#">
         <cfcase value="+hhmm">
             <cfreturn numberFormat(h, "+09") & numberFormat(m, "09")>
         </cfcase>
 
         <cfcase value="+hh">
             <cfreturn numberFormat(h, "+09")>
         </cfcase>
 
         <cfcase value="+hh:mm">
             <cfreturn numberFormat(h, "+09") & ":" & numberFormat(m, "09")>
         </cfcase>
     </cfswitch>
 </cffunction>
 

---

