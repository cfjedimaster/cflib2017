---
layout: udf
title:  FahrenheitToCelsius
date:   2001-09-17T14:56:53.000Z
library: ScienceLib
argString: "fahrenheit"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts from degrees Fahrenheit to degrees Celsius.
tagBased: false
description: |
 Converts from degrees Fahrenheit to degrees Celsius.

returnValue: Returns a simple value.

example: |
 <CFSET f=32>
   <CFOUTPUT>
   Given f=#f#<BR>
   #f# degrees Fahrenheit = #FahrenheitToCelsius(f)# degrees Celsius
   </CFOUTPUT>

args:
 - name: fahrenheit
   desc: Degrees Fahrenheit to convert to Celsius
   req: true


javaDoc: |
 /**
  * Converts from degrees Fahrenheit to degrees Celsius.
  * Renamed from FarToCel to FahrenheitToCelsius.
  * 
  * @param fahrenheit      Degrees Fahrenheit to convert to Celsius 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.1, September 17, 2001 
  */

code: |
 function FahrenheitToCelsius(fahrenheit)
 {
   Return (100/(212-32) * (fahrenheit - 32));
 }

---

