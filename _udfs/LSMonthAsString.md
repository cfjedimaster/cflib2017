---
layout: udf
title:  LSMonthAsString
date:   2001-07-17T17:47:31.000Z
library: StrLib
argString: "month_number[, locale]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Returns the localized version of a month.
description: |
 Returns the localized version of a month number. For example, if your current locale is set as French (Standard), the value for 1, Janaury, will be Janvier.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 The current locale is #GetLocale()#<BR>
 The first month is: #LSMonthAsString(1)#<BR>
 Switching to French (Standard) locale.<BR>
 <CFSET SetLocale("French (Standard)")>
 The first month in French (Standard) locale is: #LSMonthAsString(1)#
 </CFOUTPUT>

args:
 - name: month_number
   desc: The month number.
   req: true
 - name: locale
   desc: Locale to use. Defaults to current locale.
   req: false


javaDoc: |
 /**
  * Returns the localized version of a month.
  * Original code + idea from Ben Forta
  * 
  * @param month_number      The month number. 
  * @param locale      Locale to use. Defaults to current locale. 
  * @return Returns a string. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, July 17, 2001 
  */

code: |
 function LSMonthAsString(month_number) {
     VAR d=CreateDate(2000, month_number, 1);
     VAR oldlocale = "";
     VAR tempstr = "";
     if(ArrayLen(Arguments) eq 2) {
         oldLocale = setLocale(arguments[2]);
         tempstr = LSDateFormat(d,"mmmm");
         setLocale(oldLocale);
     } else {
         tempstr = LSDateFormat(d,"mmmm");
     }
     return tempstr;
 }

---

