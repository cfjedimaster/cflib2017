---
layout: udf
title:  ISOWeek
date:   2004-01-12T21:20:31.000Z
library: DateLib
argString: "inputDate"
author: Ron Pasch
authorEmail: pasch@cistron.nl
version: 1
cfVersion: CF5
shortDescription: Returns the weeknumber according to the ISO standard.
description: |
 CF returns weeknumbers that are not according to the ISO standard. This UDF does.

returnValue: Returns a number.

example: |
 ISOWeek(dateObject)<cfloop index="x" from=1 to=200>
     <cfset dateObject = dateAdd("d",x,now())>
     <cfoutput>#week(dateObject)# versus #ISOWeek(dateObject)#<br></cfoutput>
 </cfloop>

args:
 - name: inputDate
   desc: Date object.
   req: true


javaDoc: |
 /**
  * Returns the weeknumber according to the ISO standard.
  * 
  * @param inputDate      Date object. (Required)
  * @return Returns a number. 
  * @author Ron Pasch (pasch@cistron.nl) 
  * @version 1, January 12, 2004 
  */

code: |
 function ISOWeek(inputDate) {  
     var d = StructNew();
     var d2 = 0;
     var days = 0;
     d.yday = DayOfYear(inputDate);
     d.wday = DayOfWeek(inputDate)-1;
     d.year = Year(inputDate);
     days = d.yday - ((d.yday - d.wday + 382) MOD 7) + 3;
     if(days LT 0) {
         d.yday = d.yday + 365 + isLeapYear(d.year-1);
         days = d.yday - ((d.yday - d.wday + 382) MOD 7) + 3;
     } else {
         d.yday = (d.yday - 365) + isLeapYear(d.year);
         d2 = d.yday - ((d.yday - d.wday + 382) MOD 7) + 3;
         if (0 LTE d2) {
             days = d2;
         }
     }
     return int((days / 7) + 1);
 }

---

