---
layout: udf
title:  DateTimeFormat
date:   2001-11-26T14:51:35.000Z
library: DateLib
argString: "time[, dateFormat][, timeFormat][, joinStr]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Calls both DateFormat and TimeFormat on a data object.
description: |
 This function serves as a simple shorthand for calling both DateFormat and TimeFormat on one data object.

returnValue: This function returns a string.

example: |
 <CFOUTPUT>
 Default: #DateTimeFormat(Now())#<BR>
 Euro Date: #DateTimeFormat(Now(),"dd/mm/yy")#<BR>
 With JoinStr = at: #DateTimeFormat(Now(),"mmmm d, yyyy","h:mm tt"," at ")#<BR>
 With JoinStr = /: #DateTimeFormat(Now(),"mmmm d, yyyy","h:mm tt"," / ")#
 </CFOUTPUT>

args:
 - name: time
   desc: A data object.
   req: true
 - name: dateFormat
   desc: The string to use to format dates. Defaults to 
   req: false
 - name: timeFormat
   desc: The string to use to format time. Defaults to 
   req: false
 - name: joinStr
   desc: This string is placed between the date and time. Defaults to one space character.
   req: false


javaDoc: |
 /**
  * Calls both DateFormat and TimeFormat on a data object.
  * 
  * @param time      A data object. 
  * @param dateFormat      The string to use to format dates. Defaults to  
  * @param timeFormat      The string to use to format time. Defaults to  
  * @param joinStr      This string is placed between the date and time. Defaults to one space character. 
  * @return This function returns a string. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, November 26, 2001 
  */

code: |
 function DateTimeFormat(time) {
     var str = "";
     var dateFormat = "mmmm d, yyyy";
     var timeFormat = "h:mm tt";
     var joinStr = " ";
     
     if(ArrayLen(Arguments) gte 2) dateFormat = Arguments[2];
     if(ArrayLen(Arguments) gte 3) timeFormat = Arguments[3];
     if(ArrayLen(Arguments) gte 4) joinStr = Arguments[4];
 
     return DateFormat(time, dateFormat) & joinStr & TimeFormat(time, timeFormat);
 }

---

