---
layout: udf
title:  datePatternMatch
date:   2013-07-25T08:41:08.000Z
library: DateLib
argString: "dateString, datePattern"
author: Matt Graff
authorEmail: matt11678@hotmail.com
version: 1
cfVersion: CF9
shortDescription: Determine if a date string is in a particular pattern
tagBased: false
description: |
 For a data import from a spreadsheet I needed a way to determine if a string was in the format dd-MMM-yy so I knew to transform it to another database friendly format (ie mm/dd/yyyy)

returnValue: A boolean indicating whether the datestring is in the format specified by datepattern

example: |
 <cfset setLocale("French (Standard)")>
 <cfoutput>
     #datePatternMatch("25 juillet 2013", "d mmmm yyyy")#<br><!---true --->
     #datePatternMatch("25 july 2013", "d mmmm yyyy")#<br><!--- false because "july" is not valid in French --->
 </cfoutput>

args:
 - name: dateString
   desc: A string containing a date in the current locale
   req: true
 - name: datePattern
   desc: A string containing a date format mask (as per LSDateFormat())
   req: true


javaDoc: |
 /**
  * Determine if a date string is in a particular pattern
  * v0.9 by Matt Graff
  * v1.0 by Adam Cameron (simplifying logic, making locale-aware)
  * 
  * @param dateString      A string containing a date in the current locale (Required)
  * @param datePattern      A string containing a date format mask (as per LSDateFormat()) (Required)
  * @return A boolean indicating whether the datestring is in the format specified by datepattern 
  * @author Matt Graff (matt11678@hotmail.com) 
  * @version 1.0, July 25, 2013 
  */

code: |
 boolean function datePatternMatch(required string dateString, required string datePattern){
     return lsIsDate(arguments.dateString) && compareNoCase(arguments.dateString, lsDateFormat(arguments.dateString, arguments.datePattern) ) == 0;
 }

oldId: 2249
---

