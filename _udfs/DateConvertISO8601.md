---
layout: udf
title:  DateConvertISO8601
date:   2004-09-28T15:00:25.000Z
library: DateLib
argString: "ISO8601dateString, targetZoneOffset"
author: David Satz
authorEmail: david_satz@hyperion.com
version: 1
cfVersion: CF5
shortDescription: Convert a date in ISO 8601 format to an ODBC datetime.
description: |
 This function take a string that holds a date in ISO 8601 and converts it to ODBC datetime, but could be adapted to convert to whatever you like.  It also will convert to a datetime in a timezone of your choice by specifying the offset, i.e. it could take a datetime in GMT and convert to PT.
 
 See http://www.w3.org/TR/NOTE-datetime for description of ISO 8601, the International Standard for the representation of dates and times.

returnValue: Returns a datetime.

example: |
 <cfscript>
     dt = "2004-09-23T09:12:00-07:00";
     PSTtargetZoneOffset = -8;
     ESTtargetZoneOffset = -5;
     GMTtargetZoneOffset = 0;
 
     TimeZoneInfo = GetTimeZoneInfo();
     if ( TimeZoneInfo.isDSTOn ) {
         PSTtargetZoneOffset = PSTtargetZoneOffset  + 1;
         ESTtargetZoneOffset = ESTtargetZoneOffset  + 1;
     }
 </cfscript>
 <cfoutput>
     <h2>isDSTOn: #TimeZoneInfo.isDSTOn#</h2>
     <hr>
     <b>#variables.dt#</b><br>
     Formatted with CreateODBCDateTime: #CreateODBCDateTime( left(variables.dt,10) & " " & mid(variables.dt,12,8))#<br>
     <!--- String: #(left(variables.dt,10) & " " &  mid(variables.dt,12,8))#<br>
     DateConvert: #DateConvert("utc2Local", left(variables.dt,10) & " " & mid(variables.dt,12,8))#<br> --->
     DateConvertISO8601 PST: #DateConvertISO8601(variables.dt,variables.PSTtargetZoneOffset)# : #DateFormat(DateConvertISO8601(variables.dt,variables.PSTtargetZoneOffset),"mmm dd, yyyy")# #TimeFormat(DateConvertISO8601(variables.dt,variables.PSTtargetZoneOffset),"hh:mm:ss tt")#<br>
     DateConvertISO8601 EST: #DateConvertISO8601(variables.dt,variables.ESTtargetZoneOffset)# : #DateFormat(DateConvertISO8601(variables.dt,variables.ESTtargetZoneOffset),"mmm dd, yyyy")# #TimeFormat(DateConvertISO8601(variables.dt,variables.ESTtargetZoneOffset),"hh:mm:ss tt")#<br>
     DateConvertISO8601 UTC: #DateConvertISO8601(variables.dt,variables.GMTtargetZoneOffset)# : #DateFormat(DateConvertISO8601(variables.dt,variables.GMTtargetZoneOffset),"mmm dd, yyyy")# #TimeFormat(DateConvertISO8601(variables.dt,variables.GMTtargetZoneOffset),"hh:mm:ss tt")#
 </cfoutput>
 <hr>
 <cfset dt = "2004-09-23T09:12:00+07:00">
 <cfoutput>
     <b>#variables.dt#</b><br>
     Formatted with CreateODBCDateTime: #CreateODBCDateTime( left(variables.dt,10) & " " & mid(variables.dt,12,8))#<br>
     <!--- String: #(left(variables.dt,10) & " " &  mid(variables.dt,12,8))#<br>
     DateConvert: #DateConvert("utc2Local", left(variables.dt,10) & " " & mid(variables.dt,12,8))#<br> --->
     DateConvertISO8601 PST: #DateConvertISO8601(variables.dt,variables.PSTtargetZoneOffset)# : #DateFormat(DateConvertISO8601(variables.dt,variables.PSTtargetZoneOffset),"mmm dd, yyyy")# #TimeFormat(DateConvertISO8601(variables.dt,variables.PSTtargetZoneOffset),"hh:mm:ss tt")#<br>
     DateConvertISO8601 EST: #DateConvertISO8601(variables.dt,variables.ESTtargetZoneOffset)# : #DateFormat(DateConvertISO8601(variables.dt,variables.ESTtargetZoneOffset),"mmm dd, yyyy")# #TimeFormat(DateConvertISO8601(variables.dt,variables.ESTtargetZoneOffset),"hh:mm:ss tt")#<br>
     DateConvertISO8601 UTC: #DateConvertISO8601(variables.dt,variables.GMTtargetZoneOffset)# : #DateFormat(DateConvertISO8601(variables.dt,variables.GMTtargetZoneOffset),"mmm dd, yyyy")# #TimeFormat(DateConvertISO8601(variables.dt,variables.GMTtargetZoneOffset),"hh:mm:ss tt")#
 </cfoutput>
 <hr>
 <cfset dt = "2004-09-23T09:12:00Z">
 <cfoutput>
     <b>#variables.dt#</b><br>
     Formatted with CreateODBCDateTime: #CreateODBCDateTime( left(variables.dt,10) & " " & mid(variables.dt,12,8))#<br>
     <!--- String: #(left(variables.dt,10) & " " &  mid(variables.dt,12,8))#<br>
     DateConvert: #DateConvert("utc2Local", left(variables.dt,10) & " " & mid(variables.dt,12,8))#<br> --->
     DateConvertISO8601 PST: #DateConvertISO8601(variables.dt,variables.PSTtargetZoneOffset)# : #DateFormat(DateConvertISO8601(variables.dt,variables.PSTtargetZoneOffset),"mmm dd, yyyy")# #TimeFormat(DateConvertISO8601(variables.dt,variables.PSTtargetZoneOffset),"hh:mm:ss tt")#<br>
     DateConvertISO8601 EST: #DateConvertISO8601(variables.dt,variables.ESTtargetZoneOffset)# : #DateFormat(DateConvertISO8601(variables.dt,variables.ESTtargetZoneOffset),"mmm dd, yyyy")# #TimeFormat(DateConvertISO8601(variables.dt,variables.ESTtargetZoneOffset),"hh:mm:ss tt")#<br>
     DateConvertISO8601 UTC: #DateConvertISO8601(variables.dt,variables.GMTtargetZoneOffset)# : #DateFormat(DateConvertISO8601(variables.dt,variables.GMTtargetZoneOffset),"mmm dd, yyyy")# #TimeFormat(DateConvertISO8601(variables.dt,variables.GMTtargetZoneOffset),"hh:mm:ss tt")#
 </cfoutput>

args:
 - name: ISO8601dateString
   desc: The ISO8601 date string.
   req: true
 - name: targetZoneOffset
   desc: The timezone offset.
   req: true


javaDoc: |
 /**
  * Convert a date in ISO 8601 format to an ODBC datetime.
  * 
  * @param ISO8601dateString      The ISO8601 date string. (Required)
  * @param targetZoneOffset      The timezone offset. (Required)
  * @return Returns a datetime. 
  * @author David Satz (david_satz@hyperion.com) 
  * @version 1, September 28, 2004 
  */

code: |
 function DateConvertISO8601(ISO8601dateString, targetZoneOffset) {
     var rawDatetime = left(ISO8601dateString,10) & " " & mid(ISO8601dateString,12,8);
     
     // adjust offset based on offset given in date string
     if (uCase(mid(ISO8601dateString,20,1)) neq "Z")
         targetZoneOffset = targetZoneOffset -  val(mid(ISO8601dateString,20,3)) ;
     
     return DateAdd("h", targetZoneOffset, CreateODBCDateTime(rawDatetime));
 
 }

---

