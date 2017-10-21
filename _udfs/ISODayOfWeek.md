---
layout: udf
title:  ISODayOfWeek
date:   2001-08-17T13:23:22.000Z
library: DateLib
argString: "date"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the ordinal for the day of the week for the specified date/time object according to ISO standards.
description: |
 Returns the ordinal for the day of the week for the specified date/time object according to ISO standards.  ISO standards use Monday as the first day of the week as opposed to CF's built in DayOfWeek() function, which uses Sunday as the first day.

returnValue: Returns an integer between 1 and 7.

example: |
 <CFOUTPUT>
 Today is day #ISODayOfWeek(Now())# of the week
 </CFOUTPUT>

args:
 - name: date
   desc: Date time object
   req: true


javaDoc: |
 /**
  * Returns the ordinal for the day of the week for the specified date/time object according to ISO standards.
  * 
  * @param date      Date time object 
  * @return Returns an integer between 1 and 7. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, August 17, 2001 
  */

code: |
 function ISODayOfWeek(date)
 {
   if (DayOfWeek(date) EQ 1) 
     Return 7;
   else 
     Return DayOfWeek(date)-1;
 }

---

