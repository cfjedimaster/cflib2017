---
layout: udf
title:  GetEaster
date:   2001-09-04T16:42:54.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for Easter in a given year.
tagBased: false
description: |
 Returns the date for Easter in a given year.  If no year is specified, defaults to the current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 Easter falls on #DateFormat(GetEaster(), 'dddd mmmm dd, yyyy')# this year.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: The year to get Easter for.
   req: false


javaDoc: |
 /**
  * Returns the date for Easter in a given year.
  * Minor edits by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param TheYear      The year to get Easter for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1, September 4, 2001 
  */

code: |
 function GetEaster() {
   Var TheYear=iif(arraylen(arguments) gt 0,"arguments[1]", "Year(Now())");       
   Var century = Int(TheYear/100);
   Var G = TheYear MOD 19;
   Var K = Int((century - 17)/25);
   Var I = (century - Int(century/4) - Int((century - K)/3) + 19*G + 15) MOD 30;
   Var H = I - Int((I/28))*(1 - Int((I/28))*Int((29/(I + 1)))*Int(((21 - G)/11)));
   Var J = (TheYear + Int(TheYear/4) + H + 2 - century + Int(century/4)) MOD 7;
   Var L = H - J;
   Var EasterMonth = 3 + Int((L + 40)/44);
   Var EasterDay = L + 28 - 31*Int((EasterMonth/4));
   return CreateDate(TheYear,EasterMonth,EasterDay);
 }

---

