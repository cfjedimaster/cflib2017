---
layout: udf
title:  GetMardiGras
date:   2001-09-04T16:43:48.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for Mardi Gras  of a given year.
tagBased: false
description: |
 Returns the date for Mardi Gras in a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Mardi Gras is on #DateFormat(GetMardiGras(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return Mardi Gras for.
   req: false


javaDoc: |
 /**
  * Returns the date for Mardi Gras  of a given year.
  * This function requires the GetEaster() function available from the DateLib library.
  * 
  * @param TheYear      Year you want to return Mardi Gras for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1, September 4, 2001 
  */

code: |
 // Mardi Gras: Seventh Tuesday before Easter
 function GetMardiGras() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return DateAdd("D",-47,GetEaster(TheYear));
 }

---

