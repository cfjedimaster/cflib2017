---
layout: udf
title:  composeDateTime
date:   2013-05-03T14:29:14.000Z
library: DateLib
argString: "[date][, year][, month][, day][, hour][, minute][, second]"
author: Adam Cameron
authorEmail: adamcameroncoldfusion@gmail.com
version: 1
cfVersion: CF9
shortDescription: Creates a date time from optional date parts
description: |
 Similar to createDateTime(), except all arguments are optional so one can be selective in which parts to specify for the result. Any unspecified arguments default to the current datetime's relevant component.
 
 This is really just a patch for a shortcoming in CFML's createDateTime() function. If you use this, perhaps vote to get an &quot;official&quot; version added to CFML: https://bugbase.adobe.com/index.cfm?event=bug&amp;id=3374275

returnValue: A date

example: |
 defaultsWereSet = composeDateTime();
 justYearWasSet = composeDateTime(2011);
 monthWasSetToo = composeDateTime(2011, 3);
 dayWasSetToo = composeDateTime(2011, 3, 24);
 hourWasSetToo = composeDateTime(2011, 3, 24, 9);
 minWasSetToo = composeDateTime(2011, 3, 24, 9, 30);
 secWasSetToo = composeDateTime(2011, 3, 24, 9, 30, 00);
 writeDump(variables);

args:
 - name: date
   desc: The base date to start with. Defaults to now()
   req: false
 - name: year
   desc: The year to set
   req: false
 - name: month
   desc: The month to set
   req: false
 - name: day
   desc: The day to set
   req: false
 - name: hour
   desc: The hour to set
   req: false
 - name: minute
   desc: The minute to set
   req: false
 - name: second
   desc: The second to set
   req: false


javaDoc: |
 /**
  * Creates a date time from optional date parts
  * v1.0 by Adam Cameron
  * v1.1 by Adam Cameron (under guidance of GrumpyCFer). Adding date argument to allow for dates to not necessarily be now()-based. Fixed potential temporal issue.
  * 
  * @param date      The base date to start with. Defaults to now() (Optional)
  * @param year      The year to set (Optional)
  * @param month      The month to set (Optional)
  * @param day      The day to set (Optional)
  * @param hour      The hour to set (Optional)
  * @param minute      The minute to set (Optional)
  * @param second      The second to set (Optional)
  * @return A date 
  * @author Adam Cameron (adamcameroncoldfusion@gmail.com) 
  * @version 1, May 3, 2013 
  */

code: |
 private date function composeDateTime(date date=now(), numeric year, numeric month, numeric day, numeric hour, numeric minute, numeric second){
     param name="arguments.year" default=year(date);
     param name="arguments.month" default=month(date);
     param name="arguments.day" default=day(date);
     param name="arguments.hour" default=hour(date);
     param name="arguments.minute" default=minute(date);
     param name="arguments.second" default=second(date);
 
     return createDateTime(arguments.year, arguments.month, arguments.day, arguments.hour, arguments.minute, arguments.second);
 }

---

