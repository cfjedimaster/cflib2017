---
layout: udf
title:  NextOccOfDOW
date:   2001-08-22T14:14:14.000Z
library: DateLib
argString: "[day]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns a date object representing the next occurrence of the specified day.  The default is the next occurrence of the current day.
tagBased: false
description: |
 Returns a date object representing the next occurrence of the specified day.  The default is the next occurrence of the current day.
 <P>
 This function is based on an idea submitted by Larry Juncker (ljuncker@aljcompserv.com).

returnValue: Returns a date.

example: |
 <CFOUTPUT>
 <CFLOOP INDEX="i" FROM="1" TO="7">
 The next occurrence of #DayOfWeekAsString(i)# is #DateFormat(NextOccOfDOW(i), 'mmmm dd, yyyy')#.<BR>
 </CFLOOP>
 </CFOUTPUT>

args:
 - name: day
   desc: Ordinal day of the week.  1=Sunday, 2=Monday, 3=Tuesday, etc.  
   req: false


javaDoc: |
 /**
  * Returns a date object representing the next occurrence of the specified day.  The default is the next occurrence of the current day.
  * This function is based on an idea submitted by Larry Juncker (ljuncker@aljcompserv.com).
  * 
  * @param day      Ordinal day of the week.  1=Sunday, 2=Monday, 3=Tuesday, etc.   
  * @return Returns a date. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, August 22, 2001 
  */

code: |
 function  NextOccOfDOW()
 {
   Var day = DayOfWeek(Now());
   Var dayOffset = 7;
   if(ArrayLen(Arguments)) 
     day = Arguments[1];
   if(Day GT DayOfWeek(Now()))
     dayOffset = 0;
   return DateAdd("d",(dayOffset + (day - DayOfWeek(Now()))),Now());    
 }

oldId: 175
---

