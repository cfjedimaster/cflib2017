---
layout: udf
title:  weekNumsInMonth
date:   2011-07-24T03:26:50.000Z
library: DateLib
argString: "month, year"
author: Robby L.
authorEmail: robby@ohsogooey.com
version: 2
cfVersion: CF5
shortDescription: Returns the week numbers in a given month of a given year.
tagBased: false
description: |
 When given a month and year returns an array of weeks that are present in that month. By weeks we mean the numeric value from the week() function.

returnValue: Returns an array.

example: |
 <cfset foo = weekNumsInMonth(2,2003)>
 <cfdump var="#foo#">

args:
 - name: month
   desc: Month number.
   req: true
 - name: year
   desc: Year number.
   req: true


javaDoc: |
 /**
  * Returns the week numbers in a given month of a given year.
  * v2 mods by RCamden to fix December issues
  * 
  * @param month      Month number. (Required)
  * @param year      Year number. (Required)
  * @return Returns an array. 
  * @author Robby L. (robby@ohsogooey.com) 
  * @version 2, July 23, 2011 
  */

code: |
 function weekNumsInMonth(month,year) {
     var fakedate = createDate(year,month,1);
     var firstWeek = week(fakedate);
     var lastweek = week(createDate(year,month,daysInMonth(fakedate)));
     var i="";
     var aWeek = arrayNew(1);
     for(i=firstWeek;i lte lastWeek;i=i+1) {
         arrayAppend(aWeek, i);
     }
     return aWeek;
  }

oldId: 995
---

