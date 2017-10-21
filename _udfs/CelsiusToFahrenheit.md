---
layout: udf
title:  CelsiusToFahrenheit
date:   2001-09-17T14:57:36.000Z
library: ScienceLib
argString: "celsius"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts Celsius to Fahrenheit.
description: |
 Converts from degrees Celsius to degrees Fahrenheit.

returnValue: Returns a simple value

example: |
 <CFSET c=100>
   <CFOUTPUT>
   Given c=#c#<BR>
   #c# degrees Celsius = #CelsiusToFahrenheit(c)# degrees Fahrenheit
   </CFOUTPUT>

args:
 - name: celsius
   desc: Degrees Celsius to convert to degrees Fahrenheit
   req: true


javaDoc: |
 /**
  * Converts Celsius to Fahrenheit.
  * Renamed from CelToFar to CelsiusToFahrenheit.
  * 
  * @param celsius      Degrees Celsius to convert to degrees Fahrenheit 
  * @return Returns a simple value 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, September 17, 2001 
  */

code: |
 function CelsiusToFahrenheit(celsius)
 {
   Return ((212-32)/100 * celsius + 32);
 }

---

