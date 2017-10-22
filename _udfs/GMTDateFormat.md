---
layout: udf
title:  GMTDateFormat
date:   2002-03-21T10:45:47.000Z
library: DateLib
argString: "aDate, offset"
author: Mark Andrachek
authorEmail: hallow@webmages.com
version: 1
cfVersion: CF5
shortDescription: This function takes a date time object and an offset, and outputs a GMT date/time formatted string.
tagBased: false
description: |
 This takes two arguments, adate and offset. adate should be a valid date/time object, and offset should be a valid GMT offset (formatted +0000 or -0000, for example, Eastern Standard Time is -0500). It will then output a valid GMT string. It's especially usefull to help prevent browser and proxy caching.

returnValue: Returns a string.

example: |
 <cfset oldtime = DateAdd('n',1,Now())>
 <cfoutput>
 #GMTDateFormat(variables.oldtime,'-0500')#
 </cfoutput>

args:
 - name: aDate
   desc: A date.
   req: true
 - name: offset
   desc: A valid GMT offset.
   req: true


javaDoc: |
 /**
  * This function takes a date time object and an offset, and outputs a GMT date/time formatted string.
  * 
  * @param aDate      A date. 
  * @param offset      A valid GMT offset. 
  * @return Returns a string. 
  * @author Mark Andrachek (hallow@webmages.com) 
  * @version 1, March 21, 2002 
  */

code: |
 function GMTDateFormat (adate,offset) {
      // adate must be a valid date time object.
      // the offset must be in the format -0000 or +0000.
      
      var dvalue = ""; // the final value.
      
      if (IsDate(adate)) {
           
           dvalue = DateAdd('h',Left(offset,3),DateAdd('s',Left(offset,1) & Right(offset,2),adate));
           dvalue = Left( DayOfWeekAsString( DayOfWeek( dvalue ) ), 3) & 
                   ', ' & 
                   DateFormat(dvalue,'dd mmm yyyy') &
                   ' ' &
                   TimeFormat(dvalue,'HH:mm:ss') &
                   ' GMT';
           
           return dvalue;
      }
      
      else { return; }
 }

---

