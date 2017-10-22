---
layout: udf
title:  getDaylightSavingTimeStart
date:   2006-12-20T15:58:41.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 2
cfVersion: CF5
shortDescription: Returns the date for The start of Daylight Saving Time for a given year.
tagBased: false
description: |
 Returns the date for The start of Daylight Saving Time for a given year.  If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Daylight Saving Time starts on #DateFormat(GetDaylightSavingTimeStart(), 'dddd, mmm dd, yyyy')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return the start of Daylight Saving Time.
   req: false


javaDoc: |
 /**
  * Returns the date for The start of Daylight Saving Time for a given year.
  * This function requires the GetNthOccOfDayInMonth() function available from the DateLib library.
  * 
  * @param TheYear      Year you want to return the start of Daylight Saving Time. (Optional)
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 2, December 20, 2006 
  */

code: |
 function getDaylightSavingTimeStart() {
     var TheYear=Year(Now());
       if(ArrayLen(arguments)) TheYear = arguments[1];
     //US Congress changed it for 2007,may switch back
     // From first Sunday in April to Second Sunday in March 
     if(TheYear lt 2007) return CreateDate(TheYear,4,GetNthOccOfDayInMonth(1,1,4,TheYear));
     else return CreateDate(TheYear,3,GetNthOccOfDayInMonth(2,1,3,TheYear));
 }

---

