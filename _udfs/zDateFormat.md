---
layout: udf
title:  zDateFormat
date:   2005-08-23T14:31:58.000Z
library: DateLib
argString: "offset, date"
author: Jeffrey Pratt
authorEmail: quicquid@gmail.com
version: 1
cfVersion: CF6
shortDescription: Formats the given date as a Zulu date.
description: |
 It takes a GMT offset and a date object, and returns a string representation of the date as a Zulu date (yyyy-mm-ddTHH:mm:ssZ). It checks for valid offsets and dates. It's useful in formatting dates as Zulu dates for Atom feeds, etc.

returnValue: Returns a string.

example: |
 <cfset mydate = now()>
 <cfoutput>
 #DateFormat(myDate, "ddd, dd mmm yyyy")# #TimeFormat(myDate, "HH:mm:ss")#<br/>
 #zDateFormat("-0330", myDate)#
 </cfoutput>

args:
 - name: offset
   desc: Offset from GMT.
   req: true
 - name: date
   desc: The date to format.
   req: true


javaDoc: |
 <!---
  Formats the given date as a Zulu date.
  
  @param offset      Offset from GMT. (Required)
  @param date      The date to format. (Required)
  @return Returns a string. 
  @author Jeffrey Pratt (quicquid@gmail.com) 
  @version 1, August 23, 2005 
 --->

code: |
 <cffunction name="zDateFormat" returntype="string">
     <cfargument name="offset" type="string" required="true"/>
     <cfargument name="date" type="date" required="true"/>
     
     <cfset var sign = Left(offset, 1)/>
     <cfset var hours = Mid(offset, 2, 2)/>
     <cfset var minutes = Mid(offset, 4, 2)/>
     <cfset var zDate = "">
     <cfset var formattedDate = "">
     
     <cfif not IsNumeric(offset) or len(offset) neq 5 or (sign is not "-" and sign is not "+")>
         <cfthrow type="InvalidGMTOffsetFormatException" message="A valid GMT offset is of the form '-hhmm' or '+hhmm', with 'hh' being the number of hours and 'mm' being the number of minutes by which the date is offset from GMT."/>
     </cfif>
     
     <cfif sign Is "+">
         <cfset hours = -hours/>
         <cfset minutes = -minutes/>
     </cfif>
     
     <cfset zDate = dateAdd("n", minutes, dateAdd("h", hours, date))/>
     <cfset formattedDate = dateFormat(zDate, "yyyy-mm-dd") & "T" & timeFormat(zDate, "HH:mm:ss") & "Z"/>
     
     <cfreturn formattedDate/>
 </cffunction>

---

