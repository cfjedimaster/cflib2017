---
layout: udf
title:  timeZoneNow
date:   2014-10-02T12:08:13.000Z
library: DateLib
argString: "[timeZone]"
author: Ray Ford
authorEmail: fordray+cflib@gmail.com
version: 1
cfVersion: CF9
shortDescription: Show the current date/time for a given time zone.
tagBased: false
description: |
 E.g. Your server is in the US &amp; your target audience is in the UK. This will return the current date/time as it would appear if the server was located in the UK. Daylight saving time is also considered.
 If you provide an invalid time zone or an empty string, the function will throw an error and show about 600 time zones to choose from.

returnValue: Returns a date/time.

example: |
 Current date/time in Hawaii
 <br />
 <cfoutput>#timeZoneNow('US/Hawaii')#</cfoutput>
 <br /><br />
 Current date/time in Amsterdam
 <br />
 <cfoutput>#timeZoneNow('Europe/Amsterdam')#</cfoutput>
 
 <!--- Show all the timezones to choose from inside an error
 <cfoutput>#timeZoneNow('')#</cfoutput> --->

args:
 - name: timeZone
   desc: Time zone.
   req: false


javaDoc: |
 /**
  * Show the current date/time for a given time zone.
  * 
  * @param timeZone      Time zone. (Optional)
  * @return Returns a date/time. 
  * @author Ray Ford (fordray+cflib@gmail.com) 
  * @version 1, October 2, 2014 
  */

code: |
 function timeZoneNow(timeZone) {
     var loc={};
     loc.GMT = DateAdd( "s", GetTimeZoneInfo().UTCTotalOffset, Now() );
     loc.ObjTimeZone = createObject("java","java.util.TimeZone").getTimeZone(timeZone);
     if ( ListFind( arrayToList( loc.ObjTimeZone.getAvailableIDs() ),timeZone) EQ 0) {
         throw(message='Invalid Time Zone',detail = arraylen(loc.ObjTimeZone.getAvailableIDs()) & ' Timezones: <br />' & arrayToList(loc.ObjTimeZone.getAvailableIDs(),' '));/* this line wont work in CF8 */
     };
     loc.StdTime = DateAdd( "s",  loc.ObjTimeZone.getRawOffset() / 1000, loc.GMT );
     loc.DsTime = DateAdd( "s",  loc.ObjTimeZone.inDaylightTime(loc.StdTime) * loc.ObjTimeZone.getDSTSavings() / 1000, loc.StdTime );
     return loc.DsTime;
 }

oldId: 2333
---

