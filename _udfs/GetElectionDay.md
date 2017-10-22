---
layout: udf
title:  GetElectionDay
date:   2001-08-28T13:36:16.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date for Election Day in a given year
tagBased: false
description: |
 Returns a date for US Presidential Election Day in a given year.  Returns -1 for odd numbered years.  If no year is specified, defaults to the current year.

returnValue: Returns a date object.

example: |
 <CFIF GetElectionDay() EQ -1>
 There are no elections this year
 <CFELSE>
 <CFOUTPUT>
 This year, Election Day is on #DateFormat(GetElectionDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>
 </CFIF>

args:
 - name: TheYear
   desc: The year you want to return Election Day for.
   req: false


javaDoc: |
 /**
  * Returns a date for Election Day in a given year
  * This function requires the GetNthOccOfDayInMonth() function available from the DateLib library. Minor modifications by Rob Brooks-Bilson
  * 
  * @param TheYear      The year you want to return Election Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1, August 28, 2001 
  */

code: |
 //Election Day: Tuesday after First Monday in November, in even numbered years.
 // for odd numbered years, -1 is returned
 function GetElectionDay() {
  Var TheYear=Year(Now());
  if(ArrayLen(Arguments)) 
    TheYear = Arguments[1];
  if(TheYear MOD 2 eq 0){ 
    return DateAdd("d",1,CreateDate(TheYear,11,GetNthOccOfDayInMonth(1,2,11,TheYear))); //add 1 day to first monday
     } 
   else {
     return -1;
   }
 }

---

