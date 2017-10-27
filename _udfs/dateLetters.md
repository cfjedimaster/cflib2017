---
layout: udf
title:  dateLetters
date:   2003-05-22T10:06:42.000Z
library: DateLib
argString: "dateStr[, formatStr]"
author: Ian Winter
authorEmail: ian@defusionx.om
version: 1
cfVersion: CF5
shortDescription: Add's the st,nd,rd,th after a day of the month.
tagBased: false
description: |
 This will return a given date in a long formated string including the optional letters ie 1st,2nd,3rd,4th etc.

returnValue: Returns a string.

example: |
 <cfoutput>
 #dateLetters(now())#
 </cfoutput>

args:
 - name: dateStr
   desc: Date to use.
   req: true
 - name: formatStr
   desc: Format string for month and year.
   req: false


javaDoc: |
 /**
  * Add's the st,nd,rd,th after a day of the month.
  * 
  * @param dateStr      Date to use. (Required)
  * @param formatStr      Format string for month and year. (Optional)
  * @return Returns a string. 
  * @author Ian Winter (ian@defusionx.om) 
  * @version 1, May 22, 2003 
  */

code: |
 function dateLetters(dateStr) {
     var letterList="st,nd,rd,th";
     var domStr=DateFormat(dateStr,"d");
     var domLetters='';
     var formatStr = "";
 
     if(arrayLen(arguments) gte 2) formatStr = dateFormat(dateStr,arguments[2]);
 
     switch (domStr) {
         case "1": case "21": case "31":  domLetters=ListGetAt(letterList,'1'); break;
         case "2": case "22": domLetters=ListGetAt(letterList,'2'); break;
         case "3": case "23": domLetters=ListGetAt(letterList,'3'); break;
         default: domLetters=ListGetAt(letterList,'4');
     }
 
     return domStr & domLetters & " " & formatStr;
 }

oldId: 907
---

