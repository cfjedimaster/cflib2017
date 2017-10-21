---
layout: udf
title:  GetFirstDateinQuarter
date:   2004-02-14T10:57:11.000Z
library: DateLib
argString: "quarter"
author: Brian Sweeney
authorEmail: brianvsweeney@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Gets the first date in a given quarter.
description: |
 Gets the first date in a given quarter.

returnValue: Returns a date.

example: |
 <cfloop index="x" from=1 to=4>
     <cfoutput>#getFirstDateInQuarter(x)# = #quarter(getFirstDateInQuarter(x))#<br></cfoutput>
 </cfloop>

args:
 - name: quarter
   desc: A number from 1 to 4.
   req: true


javaDoc: |
 /**
  * Gets the first date in a given quarter.
  * 
  * @param quarter      A number from 1 to 4. (Required)
  * @return Returns a date. 
  * @author Brian Sweeney (brianvsweeney@hotmail.com) 
  * @version 1, February 14, 2004 
  */

code: |
 function GetFirstDateinQuarter(quarter){
     switch(quarter){
         case 1:
             return CreateDate(year(now()), 1, 1);
             break;
         case 2:
             return CreateDate(year(now()), 4, 1);
             break;
         case 3:
             return CreateDate(year(now()), 7, 1);
             break;
         case 4:
             return CreateDate(year(now()), 10, 1);
             break;
     }
 }

---

