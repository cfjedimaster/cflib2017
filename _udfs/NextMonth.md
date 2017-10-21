---
layout: udf
title:  NextMonth
date:   2001-09-06T19:00:39.000Z
library: DateLib
argString: "[Date]"
author: Will Belden
authorEmail: wbelden@dwo.net
version: 1
cfVersion: CF5
shortDescription: Returns a date object representing the first day of the next month.
description: |
 Returns a date object representing the first day of the next month.  Optional parameters allows you to provide the date you want to calculate the next month from.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 Next Month begins on #DateFormat(NextMonth())#
 </CFOUTPUT>

args:
 - name: Date
   desc: Date object to go to the next month on. Defaults to now.
   req: false


javaDoc: |
 /**
  * Returns a date object representing the first day of the next month.
  * Version 2 by Raymond Camden
  * 
  * @param Date      Date object to go to the next month on. Defaults to now. 
  * @return Returns a date object. 
  * @author Will Belden (wbelden@dwo.net) 
  * @version 1, September 6, 2001 
  */

code: |
 function NextMonth() {
      var db = iif(arrayLen(arguments),"arguments[1]","now()");
     return DateAdd("m",1,CreateDate(Year(db), Month(db), 1));
 }

---

