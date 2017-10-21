---
layout: udf
title:  getEveryDOW
date:   2011-07-27T19:33:13.000Z
library: DateLib
argString: "dowList[, startdate][, enddate]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF5
shortDescription: Returns every occasion of a day of the week. A list of days of the week can be used.
description: |
 Returns every occasion of a day of the week. A list of days of the week can be used. The UDF returns an array of date objects corresponding to the days of the week requested.

returnValue: Returns an array.

example: |
 <cfset dowList = "1,3">
 <cfset dArr = getEveryDow(dowlist)>
 <cfdump var="#dArr#">

args:
 - name: dowList
   desc: A list of days of the week in numeric form.
   req: true
 - name: startdate
   desc: Initial range for search. Defaults to the beginning of the current year.
   req: false
 - name: enddate
   desc: Initial range for search. Defaults to the end of the current year.
   req: false


javaDoc: |
 /**
  * Returns every occasion of a day of the week. A list of days of the week can be used.
  * Updates by Scott Pinkston and Peter Boughton to support a 'range' instead of just a year.
  * Fix by Jim O'Keefe to prevent values outside of this year.
  * 
  * @param dowList      A list of days of the week in numeric form. (Required)
  * @param startdate      Initial range for search. Defaults to the beginning of the current year. (Optional)
  * @param enddate      Initial range for search. Defaults to the end of the current year. (Optional)
  * @return Returns an array. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 2, July 27, 2011 
  */

code: |
 function getEveryDOW(dowlist) {
     var day1 = "";
     var x = "";
     var thisDOW = "";
     var result = arrayNew(1);
     var initialDOW = "";
     var offset = "";
     var dateToAdd = "";
     var startdate = createDate(year(now()), 1, 1);
     var enddate = createDate(year(now()), 12, 31);
     
     day1 = startdate;
     initialDOW = dayOfWeek(day1);
 
     if(arrayLen(arguments) gte 2) {
         startdate = arguments[2];
     }
     if(arrayLen(arguments) gte 3) {
         enddate = arguments[3];
     }
 
     while( day1 LT enddate ) {
         for(x=1; x lte listlen(dowlist); x=x+1) {
             thisDOW = listGetAt(dowlist, x);
             offset = thisDOW - initialDOW;
             dayToAdd = dateAdd("d", offset, day1 );
             if (dayToAdd gte startDate and dayToAdd lte endDate) {arrayAppend(result, dayToAdd);}
         }
         day1 = dateAdd("ww", 1, day1);
     }
     return result;
 }

---

