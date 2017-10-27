---
layout: udf
title:  GetSeason
date:   2003-05-13T16:47:29.000Z
library: DateLib
argString: "[myDate]"
author: William Steiner
authorEmail: williams@hkusa.com
version: 1
cfVersion: CF5
shortDescription: Returns season for given date.
tagBased: false
description: |
 Returns the Season for a given date. If no date is specified, defaults to the current date.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 The current season is #GetSeason()#.
 </CFOUTPUT>

args:
 - name: myDate
   desc: The date. Defaults to now.
   req: false


javaDoc: |
 /**
  * Returns season for given date.
  * 
  * @param myDate      The date. Defaults to now. (Optional)
  * @return Returns a string. 
  * @author William Steiner (williams@hkusa.com) 
  * @version 1, May 13, 2003 
  */

code: |
 function GetSeason() {
     var myDate = iif(arraylen(arguments) gt 0,"arguments[1]", "now()");
     var myYear = Year(myDate);
     //Winter
     var winterStart = '12-21-' & decrementValue(myYear);
     var winterEnd = '03-20-' & myYear;
     //Spring
     var springStart = '3-21-' & myYear;
     var springEnd = '06-20-' & myYear;
     //Summenr 
     var summerStart = '06-21-' & myYear;
     var summerEnd ='09-20-' & myYear;
     //Fall
     var fallStart = '09-21-' & myYear;
     var fallEnd = '12-20-' & myYear;
     
     // return the correct season
     if (myDate GTE winterStart AND myDate LTE winterEnd) {
         return "Winter";
     } else if (myDate GTE springStart AND myDate LTE springEnd) {
         return "Spring";
     } else if (myDate GTE summerStart AND myDate LTE summerEnd) {
         return "Summer";
     } else if (myDate GTE fallStart AND myDate LTE fallEnd) {
         return "Fall";
     } else {
         return "";
     }
 }

oldId: 894
---

