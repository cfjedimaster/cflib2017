---
layout: udf
title:  MaxDate
date:   2003-09-12T16:38:44.000Z
library: DateLib
argString: "dt1, dt2"
author: Shawn Fairweather
authorEmail: psalm_119_@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Returns larger of 2 dates.
description: |
 Returns larger of 2 dates.

returnValue: Returns a date.

example: |
 <cfset d1 = createDate(2002,1,1)>
 <cfset d2 = now()>
 <cfoutput>#maxDate(d1,d2)#</cfoutput>

args:
 - name: dt1
   desc: The first date. (Is always the hardest.)
   req: true
 - name: dt2
   desc: The second date.
   req: true


javaDoc: |
 /**
  * Returns larger of 2 dates.
  * 
  * @param dt1      The first date. (Is always the hardest.) (Required)
  * @param dt2      The second date. (Required)
  * @return Returns a date. 
  * @author Shawn Fairweather (psalm_119_@hotmail.com) 
  * @version 1, September 12, 2003 
  */

code: |
 function maxDate(Dt1, Dt2){
      if(DateCompare(Dt1, Dt2) IS 1) return Dt1;
      else return Dt2;
 }

---

