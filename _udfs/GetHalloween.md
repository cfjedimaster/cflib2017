---
layout: udf
title:  GetHalloween
date:   2001-08-28T14:35:46.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date for Halloween  of a given year.
description: |
 Returns a date for Halloween  of a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Halloween is on #DateFormat(GetHalloween (), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: The year you want to return Halloween for.
   req: false


javaDoc: |
 /**
  * Returns a date for Halloween  of a given year.
  * 
  * @param TheYear      The year you want to return Halloween for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, August 28, 2001 
  */

code: |
 // Halloween: October 31
 function GetHalloween() {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,10,31);
 }

---

