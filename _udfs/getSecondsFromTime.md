---
layout: udf
title:  getSecondsFromTime
date:   2008-07-16T13:14:07.000Z
library: DateLib
argString: "timeObject"
author: Alan McCollough
authorEmail: kittycat@kittycatonline.com
version: 2
cfVersion: CF5
shortDescription: Returns the total number of seconds from midnight for a valid date/time object.
description: |
 Returns the total number of seconds from midnight for a valid date/time object.

returnValue: Returns a numeric value.

example: |
 <CFSET TheTime=Now()>
 
 <CFOUTPUT>
 Given a time of #TimeFormat(TheTime)#<BR>
 #GetSecondsFromTime(TimeFormat(TheTime))# seconds have elapsed since midnight.
 <P>
 Given a time of #TheTime#<BR>
 #GetSecondsFromTime(TheTime)# seconds have elapsed since midnight.
 </CFOUTPUT>

args:
 - name: timeObject
   desc: Valid date/time object.
   req: true


javaDoc: |
 /**
  * Returns the total number of seconds from midnight for a valid date/time object.
  * Note that this function returns different results depending on whether the date/time object you pass it has seconds defined.
  * 
  * v2 bug fix by Steven Van Gemert
  * 
  * @param timeObject      Valid date/time object. (Required)
  * @return Returns a numeric value. 
  * @author Alan McCollough (kittycat@kittycatonline.com) 
  * @version 2, July 16, 2008 
  */

code: |
 function getSecondsFromTime(timeObject){
   var theSeconds = Val(Hour(timeObject) * 3600) + Val(Minute(timeObject) * 60) + Second(timeObject);
   return theSeconds;
 }

---

