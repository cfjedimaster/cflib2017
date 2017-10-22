---
layout: udf
title:  DateConvertZ
date:   2001-11-26T14:48:42.000Z
library: DateLib
argString: "conversionType, dateObj, zoneInfo"
author: Chris Wigginton
authorEmail: cwigginton@macromedia.com
version: 1
cfVersion: CF5
shortDescription: Similar to DateConvert, but provides local2zone and zone2local conversion from one time zone to another.
tagBased: false
description: |
 Similar to DateConvert, but provides local2zone and zone2local conversion from one time zone to another.

returnValue: Returns a date/time object.

example: |
 <cfset todayPST = Now()>
 <cfset todayGMT = DateConvertZ("local2zone", todayPST, "GMT")>
 <cfoutput>
 The Time in PST: #TimeFormat(todayPST,"HH:mm:ss")#<br>
 Converted to GMT:#TimeFormat(todayGMT,"HH:mm:ss")#
 </cfoutput>

args:
 - name: conversionType
   desc: Conversion type to use.  Options are zone2local (date object is from the specified time zone and this will convert it to local time) and local2zone (date object is based on local server time and this will convert it to the specfied time zone.)&#58;  
   req: true
 - name: dateObj
   desc: Date object you want to convert.
   req: true
 - name: zoneInfo
   desc: Standard time zone abbreviation as well as standard plus mod such as PST-8.
   req: true


javaDoc: |
 /**
  * Similar to DateConvert, but provides local2zone and zone2local conversion from one time zone to another.
  * 
  * @param conversionType      Conversion type to use.  Options are zone2local (date object is from the specified time zone and this will convert it to local time) and local2zone (date object is based on local server time and this will convert it to the specfied time zone.):   
  * @param dateObj      Date object you want to convert. 
  * @param zoneInfo      Standard time zone abbreviation as well as standard plus mod such as PST-8. 
  * @return Returns a date/time object. 
  * @author Chris Wigginton (cwigginton@macromedia.com) 
  * @version 1, November 26, 2001 
  */

code: |
 function DateConvertZ(conversionType, dateObj, zoneInfo)
 {
   var targetZone = "";
   var targetSpan = 0;
   var targetDate = "";
   var utcDate = "";
   var hourDiff = 0;
   var minDiff = 0;
   var zoneModOffSet = 0;
   var zoneMod = 0;
     
   //timeZone object
   var timeZone = StructNew();
   timeZone.UTC  =   0;     // Universal Time Coordinate or universal time zone
   timeZone.GMT  =   0;     // Greenwich Mean Time same as UTC
   timeZone.BST  =   1;     // British Summer time
   timeZone.IST  =   1;     // Irish Summer Time
   timeZone.WET  =   1;     // Western Europe Time
   timeZone.WEST =   1;     // Western Europe Summer Time
   timeZone.CET  =   1;     // Central Europe Time
   timeZone.CEST =   2;     // Central Europe Summer Time
   timeZone.EET  =   2;     // Eastern Europe Time
   timeZone.EEST =   3;     // Eastern Europe Summer Time
   timeZone.MSK  =   3;     // Moscow time
   timeZone.MSD  =   4;     // Moscow Summer Time
   timeZone.AST  =  -4;     // Atlantic Standard Time
   timeZone.ADT  =  -3;     // Atlantic Daylight Time
   timeZone.EST  =  -5;     // Eastern Standard Time
   timeZone.EDT  =  -4;     // Eastern Daylight Saving Time
   timeZone.CST  =  -6;     // Eastern Time
   timeZone.CDT  =  -5;     // Central Standard Time
   timeZone.MST  =  -7;     // Mountain Standard Time
   timeZone.MDT  =  -6;     // Mountain Daylight Saving Time
   timeZone.PST  =  -8;     // Pacific Standard Time
   timeZone.HST  = -10;     // Hawaiian Standard Time
   timeZone.AKST =  -9;     // Alaska Standard Time
   timeZone.AKDT =  -8;     // Alaska Standard Daylight Saving Time
   timeZone.AEST =  10;     // Australian Eastern Standard Time
   timeZone.AEDT =  11;     // Australian Eastern Daylight Time
   timeZone.ACST = 9.5;     // Australian Central Standard Time
   timeZone.ACDT = 10.5;    // Australian Central Daylight Time
   timeZone.AWST =   8;     // Australian Western Standard Time
     
   //Check for +- timezone mod such as PST-4
   zoneModOffSet = FindOneOf("+-", zoneInfo);
   if(zoneModOffSet) {
     //Extract out the zoneInfo and zoneMod
     zoneMod = Val(Right(zoneInfo, Len(zoneInfo) - zoneModOffSet + 1));
     zoneInfo = Left(zoneInfo, zonemodOffSet - 1);            
   }
     
   targetZone = timeZone[zoneInfo] + zoneMod;
     
   // Grab Target Zone Info
   hourDiff = fix(targetZone);
   minDiff = (targetZone - hourDiff) * 60; 
     
   targetSpan = CreateTimeSpan(0, hourDiff, minDiff, 0);
 
   if (conversionType IS "local2zone") {
     // date is local time so convert it to utc first
     utcDate = DateConvert("Local2Utc", dateObj) ;
     // Add the target zone difference
     targetDate = utcDate + targetSpan;
     return "{ts '" & DateFormat(targetDate, "yyyy-mm-dd ") & TimeFormat(targetDate, "HH:mm:ss") & "'}";
   }
   else if (conversionType is "zone2local") {
     //date is in the target zone so convert it to utc first
     targetDate = dateObj - targetSpan;
     //convert it back from utc to local
     targetDate = DateConvert("Utc2local", targetDate);    
     return "{ts '" & DateFormat(targetDate, "yyyy-mm-dd ") & TimeFormat(targetDate, "HH:mm:ss") & "'}";
   }
   return "{ts 'yyyy-mm-dd HH:mm:ss'}"; // error return
 }

---

