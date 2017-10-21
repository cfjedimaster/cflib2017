---
layout: udf
title:  getEndOfDayTS
date:   2006-01-30T21:56:46.000Z
library: DateLib
argString: "date"
author: Sami Hoda
authorEmail: samihoda@gmail.com
version: 1
cfVersion: CF5
shortDescription: A function which returns a End Of Day TimeStamp. For example, 1/1/2000 returns {ts '2000-01-01 23&#58;59&#58;59'}.
description: |
 A function which returns a End Of Day TimeStamp. For example, 1/1/2000 returns {ts '2000-01-01 23:59:59'}.
 
 Useful for SQL queries when users search by date ranges and you need to include all values by the end of a certain date period.

returnValue: Returns a timestamp.

example: |
 <cfset EOD = getEndOfDayTS("1/1/2000")>
 <cfoutput>#EOD#</cfoutput>

args:
 - name: date
   desc: Date to use.
   req: true


javaDoc: |
 /**
  * A function which returns a End Of Day TimeStamp. For example, 1/1/2000 returns {ts '2000-01-01 23:59:59'}.
  * 
  * @param date      Date to use. (Required)
  * @return Returns a timestamp. 
  * @author Sami Hoda (samihoda@gmail.com) 
  * @version 1, January 30, 2006 
  */

code: |
 function getEndOfDayTS(date) {
     var vDate = date;
     vDate = dateFormat(vDate, 'MM/DD/YYYY');
     vDate = DateAdd("h",23,vDate);
     vDate = DateAdd("n",59,vDate);
     vDate = DateAdd("s",59,vDate);
     
     return vDate;
 }

---

