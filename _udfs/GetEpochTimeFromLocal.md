---
layout: udf
title:  GetEpochTimeFromLocal
date:   2002-06-21T12:30:36.000Z
library: DateLib
argString: "DateTime"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the number of seconds since January 1, 1970, 00&#58;00&#58;00 (Epoch time).
tagBased: false
description: |
 Returns the number of seconds since January 1, 1970, 00:00 (Epoch time), with the conversion for the server's offset from GMT factored in. Can be passed a datetime value, or defaults to Now().  Note that epoch time functions are only valid through 2038.

returnValue: Returns a numeric value.

example: |
 <CFOUTPUT>
 January 1 1989 14:10:00: #GetEpochTimeFromLocal("January 1 1989 14:10:00")#<BR>
 Now(): #GetEpochTimeFromLocal()#<BR>
 </CFOUTPUT>

args:
 - name: DateTime
   desc: Date/time object you want converted to Epoch time.
   req: true


javaDoc: |
 /**
  * Returns the number of seconds since January 1, 1970, 00:00:00 (Epoch time).
  * 
  * @param DateTime      Date/time object you want converted to Epoch time. (Required)
  * @return Returns a numeric value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, June 21, 2002 
  */

code: |
 function GetEpochTimeFromLocal() {
   var datetime = 0;
   if (ArrayLen(Arguments) eq 0) {
     datetime = Now();
   }
   else {
     datetime = arguments[1];
   }
   return DateDiff("s", DateConvert("utc2Local", "January 1 1970 00:00"), datetime);
 }

---

