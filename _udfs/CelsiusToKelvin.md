---
layout: udf
title:  CelsiusToKelvin
date:   2001-09-17T14:45:01.000Z
library: ScienceLib
argString: "celcius"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Celsius to degrees Kelvin.
description: |
 Converts degrees Celsius to degrees Kelvin.  Note that the Kelvin temperature scale has an absolute zero (negative Kelvin temperatures do not exist).  If a temperature below -273.15 Celcius (absolute 0) is passed, the funciton returns -1.

returnValue: Returns a float.

example: |
 <CFSET c=100>
 <CFOUTPUT>
 Given c=#c#<BR>
 #c# degrees Celsius = #CelsiusToKelvin(c)# degrees Kelvin.
 </CFOUTPUT>

args:
 - name: celcius
   desc: Degrees celsius you want converted.
   req: true


javaDoc: |
 /**
  * Converts degrees Celsius to degrees Kelvin.
  * 
  * @param celcius      Degrees celsius you want converted. 
  * @return Returns a float. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, September 17, 2001 
  */

code: |
 function CelsiusToKelvin(celsius)
 {
   if (celsius lt -273.15)
     Return -1;
   else
     Return celsius + 273.15;
 }

---

