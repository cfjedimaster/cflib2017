---
layout: udf
title:  GetSeptuagesima
date:   2001-10-05T12:51:02.000Z
library: DateLib
argString: "[TheYear]"
author: Beau A.C. Harbin
authorEmail: bharbin@activematter.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for Septuagesima in a given year.
tagBased: false
description: |
 Returns the date for Septuagesima in a given year.  If no year is specified, defaults to the current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 Septuagesima falls/fell on #DateFormat(GetSeptuagesima(), 'dddd mmmm dd, yyyy')# this year.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: The year to get Septuagesima for.
   req: false


javaDoc: |
 /**
  * Returns the date for Septuagesima in a given year.
  * This function requires the GetEaster() function available from the DateLib library.
  * 
  * @param TheYear      The year to get Septuagesima for. 
  * @return Returns a date object. 
  * @author Beau A.C. Harbin (bharbin@figleaf.com) 
  * @version 1.0, October 5, 2001 
  */

code: |
 function GetSeptuagesima() {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   Return DateAdd("d", -63, GetEaster(TheYear));
 }

oldId: 296
---

