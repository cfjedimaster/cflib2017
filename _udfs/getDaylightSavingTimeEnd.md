---
layout: udf
title:  getDaylightSavingTimeEnd
date:   2006-12-20T15:59:42.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for the End of Daylight Saving Time for a given year.
description: |
 Returns the date for the End of Daylight Saving Time for a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Daylight Saving Time ends on #DateFormat(GetDaylightSavingTimeEnd(), 'dddd, mmm dd, yyyy')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return the end of Daylight Saving Time.
   req: false


javaDoc: |
 /**
  * Returns the date for the End of Daylight Saving Time for a given year.
  * This function requires the GetLastOccOfDayInMonth() function available from the DateLib library.
  * 
  * @param TheYear      Year you want to return the end of Daylight Saving Time. (Optional)
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1, December 20, 2006 
  */

code: |
 function getDaylightSavingTimeEnd() {
     var TheYear=Year(Now());
       if(ArrayLen(Arguments)) TheYear = Arguments[1];
     //US Congress changed it for 2007,may switch back
     // From last Sunday in October to First Sunday in November 
     if(TheYear lt 2007) return CreateDate(TheYear,10,GetLastOccOfDayInMonth(1,10,TheYear));
     else return CreateDate(TheYear,11,GetNthOccOfDayInMonth(1,1,11,TheYear));
     return CreateDate;
 }

---

