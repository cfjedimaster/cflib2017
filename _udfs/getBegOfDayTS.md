---
layout: udf
title:  getBegOfDayTS
date:   2006-01-30T21:55:25.000Z
library: DateLib
argString: "date"
author: Sami Hoda
authorEmail: samihoda@gmail.com
version: 1
cfVersion: CF5
shortDescription: A function which returns a Beginning Of Day TimeStamp. For example, 1/1/2000 10&#58;30 PM returns {ts '2000-01-01 00&#58;00&#58;00'}.
tagBased: false
description: |
 A function which returns a Beginning Of Day TimeStamp. For example, 1/1/2000 10:30 PM returns {ts '2000-01-01 00:00:00'}.
 
 Useful for SQL queries when users search by date ranges and you need to include all values by the beginning of a certain date period.

returnValue: Returns a timestamp.

example: |
 <cfset BOD = getBegOfDayTS("1/1/2000 10:30 PM")>
 <cfoutput>#BOD#</cfoutput>

args:
 - name: date
   desc: Date to use.
   req: true


javaDoc: |
 /**
  * A function which returns a Beginning Of Day TimeStamp. For example, 1/1/2000 10:30 PM returns {ts '2000-01-01 00:00:00'}.
  * 
  * @param date      Date to use. (Required)
  * @return Returns a timestamp. 
  * @author Sami Hoda (samihoda@gmail.com) 
  * @version 1, January 30, 2006 
  */

code: |
 function getBegOfDayTS(date) {
     var vDate = date;    
     vDate = dateFormat(vDate, 'MM/DD/YYYY');
     vDate = DateAdd("h",00,vDate);
     vDate = DateAdd("n",00,vDate);
     vDate = DateAdd("s",00,vDate);
     
     return vDate;
 }

---

