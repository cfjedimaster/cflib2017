---
layout: udf
title:  LSDayOfWeekAsString
date:   2001-07-17T17:51:21.000Z
library: StrLib
argString: "day_of_week[, locale]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Returns the localized version of a day of the week.
tagBased: false
description: |
 Returns the localized version of a day of the week. For example, if your current locale is set as French (Standard), the value for 1, Sunday, will be dimanche.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 The current locale is #GetLocale()#<BR>
 The first day of the week is: #LSDayOfWeekAsString(2)#<BR>
 Switching to French (Standard) locale.<BR>
 <CFSET SetLocale("French (Standard)")>
 The first day of the week in French (Standard) locale is: #LSDayOfWeekAsString(1)#
 </CFOUTPUT>

args:
 - name: day_of_week
   desc: The day of the week.
   req: true
 - name: locale
   desc: Locale to use. Defaults to current locale.
   req: false


javaDoc: |
 /**
  * Returns the localized version of a day of the week.
  * Original idea + code from Ben Forta
  * 
  * @param day_of_week      The day of the week. 
  * @param locale      Locale to use. Defaults to current locale. 
  * @return Returns a string. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, July 17, 2001 
  */

code: |
 function LSDayOfWeekAsString(day_of_week) {
     //create arbitrary date
     VAR d=CreateDate(2000, 6, 1);
     VAR dow = DayOfWeek(d);
     VAR oldlocale = "";
     VAR tempstr = "";
 
     if(dow neq day_of_week) d = dateAdd("d",day_of_week-dow,d);
 
     if(ArrayLen(Arguments) eq 2) {
         oldLocale = setLocale(arguments[2]);
         tempstr = LSDateFormat(d,"dddd");
         setLocale(oldLocale);
     } else {
         tempstr = LSDateFormat(d,"dddd");
     }
     return tempstr;
 }

---

