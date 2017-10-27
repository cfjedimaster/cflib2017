---
layout: udf
title:  DaysTilBirthday
date:   2002-02-13T05:44:50.000Z
library: DateLib
argString: "birthdate"
author: Jason Fuller
authorEmail: jason@yomamma.com
version: 1
cfVersion: CF5
shortDescription: Returns number of days until your next birthday.
tagBased: false
description: |
 DaysTilBirthday returns the number of days until your next birthday.  It should accept any date ColdFusion can parse, and will return an integer.  If your birthday happens to be today, it will return zero.

returnValue: Returns a numeric value.

example: |
 <cfset my_birthday = "June 9, 1979">
 My birthday is in <cfoutput>#DaysTilBirthday(my_birthday)#</cfoutput> day(s).

args:
 - name: birthdate
   desc: Birthdate you want to find the number of days until.  Accepts any valid date object.
   req: true


javaDoc: |
 /**
  * Returns number of days until your next birthday.
  * 
  * @param birthdate      Birthdate you want to find the number of days until.  Accepts any valid date object. 
  * @return Returns a numeric value. 
  * @author Jason Fuller (jason@yomamma.com) 
  * @version 1, February 12, 2002 
  */

code: |
 function DaysTilBirthday(birthdate) {
   var daysRemaining = "";
   if (DateFormat(now(), "MMDD") GT DateFormat(birthdate, "MMDD")) 
     daysRemaining = Int(CreateDate(DatePart("yyyy", now() + 365), DatePart("m", birthdate), DatePart("d", birthdate)) - now() + 1);
   else 
     daysRemaining = Int(CreateDate(DatePart("yyyy", now()), DatePart("m", birthdate), DatePart("d", birthdate)) - now() + 1);
   Return daysRemaining;
 }

oldId: 490
---

