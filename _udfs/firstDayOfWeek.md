---
layout: udf
title:  firstDayOfWeek
date:   2014-03-08T17:53:20.000Z
library: DateLib
argString: "[date]"
author: Pete Ruckelshaus
authorEmail: pruckelshaus@yahoo.com
version: 2
cfVersion: CF9
shortDescription: Analogous to firstDayOfMonth() function.
description: |
 Returns the date for the first day of the week for a passed in date object.  Assumes Sunday as the first day of the week.

returnValue: Returns a date.

example: |
 <cfoutput>#firstDayOfWeek(now())#</cfoutput>

args:
 - name: date
   desc: Date object used to figure out week.
   req: false


javaDoc: |
 /**
  * Analogous to firstDayOfMonth() function.
  * v1.0 by Pete Ruckelshaus
  * v2.0 by Randy Johnson (made the date argument optional)
  * v2.1 by Adam Cameron (simplified logic)
  * 
  * @param date      Date object used to figure out week. (Optional)
  * @return Returns a date. 
  * @author Pete Ruckelshaus (pruckelshaus@yahoo.com) 
  * @version 2.1, March 8, 2014 
  */

code: |
 date function firstDayOfWeek(date date=now()){
     return dateAdd("d", -(dayOfWeek(date)-1), date);
 }

---

