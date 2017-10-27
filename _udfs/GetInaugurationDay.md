---
layout: udf
title:  GetInaugurationDay
date:   2001-08-28T13:35:59.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for Inauguration Day
tagBased: false
description: |
 Returns a date for the US Presidential Inauguration. Returns -1 for non-inauguration years.  If no year is specified, defaults to the current year.

returnValue: Returns a date object.

example: |
 <CFIF GetInaugurationDay() EQ -1>
 There are no elections this year, therefore there is no Inauguration Day.
 <CFELSE>
 <CFOUTPUT>
 This year, Inauguration Day is on #DateFormat(GetInaugurationDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>
 </CFIF>

args:
 - name: TheYear
   desc: The year you want to return Inauguration Day for.
   req: false


javaDoc: |
 /**
  * Returns the date for Inauguration Day
  * Minor modifications by Rob Brooks-Bilson
  * 
  * @param TheYear      The year you want to return Inauguration Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1, August 28, 2001 
  */

code: |
 //Inauguration Day: Jan 20, every 4 years ,2001,2005 etc. If Jan 20 is Sunday, InaugurationDay is Jan 21
 // for other  years, -1 is returned
 function GetInaugurationDay() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   if(TheYear MOD 4 eq 1){ 
     if(DayOfWeek(CreateDate(TheYear,1,20)) eq 1){  //Sunday
       return CreateDate(TheYear,1,21);
     }
     else{
       return CreateDate(TheYear,1,20);
     }
   } 
   else{
     return -1;
   }
 }

oldId: 197
---

