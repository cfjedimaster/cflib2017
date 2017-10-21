---
layout: udf
title:  SwatchIT
date:   2002-07-05T08:41:07.000Z
library: DateLib
argString: ""
author: B Kiefer
authorEmail: packetsdontlie@mac.com
version: 1
cfVersion: CF5
shortDescription: Returns the current internet time.
description: |
 The goal of sIT may be commercial, but a base10 clock is wonderful.  This function can be very useful in timestamps and other query string variables.  This function should self adjust for your UTC offset.  See http://www.ypass.net for PHP and Perl versions.  See http://www.swatch.com for information.

returnValue: Returns a string.

example: |
 <!--- Remember that we cache UDF results, so output below will not change. --->
 <cfoutput>
 #swatchIT()#
 </cfoutput>

args:


javaDoc: |
 /**
  * Returns the current internet time.
  * 
  * @return Returns a string. 
  * @author B Kiefer (packetsdontlie@mac.com) 
  * @version 1, July 5, 2002 
  */

code: |
 function swatchIT(){
     var myutc = GetTimeZoneInfo();
     var beats = ((3600 + Val(Hour(now()) * 3600) + Val(Minute(now()) * 60) + Second(now()) + val(myutc.utcTotalOffset)) mod 86400) / 86.4;
     return decimalformat(beats);
 }

---

