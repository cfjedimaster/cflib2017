---
layout: udf
title:  GetLastDateinQuarter
date:   2004-02-14T10:59:05.000Z
library: DateLib
argString: "quarter"
author: Brian Sweeney
authorEmail: brianvsweeney@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Gets the last date in a given quarter.
tagBased: false
description: |
 Gets the last date in a given quarter.

returnValue: Returna a date.

example: |
 <cfloop index="x" from=1 to=4>
     <cfoutput>#getLastDateInQuarter(x)# = #quarter(getLastDateInQuarter(x))#<br></cfoutput>
 </cfloop>

args:
 - name: quarter
   desc: A number from 1 to 4.
   req: true


javaDoc: |
 /**
  * Gets the last date in a given quarter.
  * 
  * @param quarter      A number from 1 to 4. (Required)
  * @return Returna a date. 
  * @author Brian Sweeney (brianvsweeney@hotmail.com) 
  * @version 1, February 14, 2004 
  */

code: |
 function GetLastDateinQuarter(quarter){
     switch(quarter){
         case 1:
             return CreateDate(year(now()), 3, DaysInMonth(CreateDate(year(now()),3,1)));
             break;
         case 2:
             return CreateDate(year(now()), 6, DaysInMonth(CreateDate(year(now()),6,1)));
             break;
         case 3:
             return CreateDate(year(now()), 9, DaysInMonth(CreateDate(year(now()),9,1)));
             break;
         case 4:
             return CreateDate(year(now()), 12, DaysInMonth(CreateDate(year(now()),12,1)));
             break;
     }
 }

oldId: 1038
---

