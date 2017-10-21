---
layout: udf
title:  MinDate
date:   2003-09-12T16:37:26.000Z
library: DateLib
argString: "dt1, dt2"
author: Shawn Fairweather
authorEmail: psalm_119_@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Returns smaller of 2 dates.
description: |
 Returns smaller of 2 dates.

returnValue: Returns a date.

example: |
 <cfset d1 = createDate(2002,1,1)>
 <cfset d2 = now()>
 <cfoutput>#minDate(d1,d2)#</cfoutput>

args:
 - name: dt1
   desc: First date.
   req: true
 - name: dt2
   desc: Second date.
   req: true


javaDoc: |
 /**
  * Returns smaller of 2 dates.
  * 
  * @param dt1      First date. (Required)
  * @param dt2      Second date. (Required)
  * @return Returns a date. 
  * @author Shawn Fairweather (psalm_119_@hotmail.com) 
  * @version 1, September 12, 2003 
  */

code: |
 function minDate(Dt1, Dt2){
      if(DateCompare(Dt2, Dt1) IS 1) return Dt1;
      else return Dt2;
 }

---

