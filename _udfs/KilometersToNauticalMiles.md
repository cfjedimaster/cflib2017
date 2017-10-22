---
layout: udf
title:  KilometersToNauticalMiles
date:   2002-02-25T00:39:05.000Z
library: MathLib
argString: "kilometers"
author: Tom Nunamaker
authorEmail: tom@toshop.com
version: 1
cfVersion: CF5
shortDescription: Convert kilometers to nautical miles.
tagBased: false
description: |
 Converts kilometers to nautical miles.

returnValue: Returns a numerical value.

example: |
 <CFSET km = 100>
 <CFOUTPUT>
 Given km = #km#<BR>
 #km# kilometer(s) = #KilometersToNauticalMiles(km)# nautical miles. <br>
 </CFOUTPUT>

args:
 - name: kilometers
   desc: The number of kilometers to convert.
   req: true


javaDoc: |
 /**
  * Convert kilometers to nautical miles.
  * 
  * @param kilometers      The number of kilometers to convert. 
  * @return Returns a numerical value. 
  * @author Tom Nunamaker (tom@toshop.com) 
  * @version 1, February 24, 2002 
  */

code: |
 function KilometersToNauticalMiles(kilometers) {
   // NOTE: 1852 meters has been adopted as the international nautical mile 6076.11549 feet)
 
   return kilometers / 1.852;
 }

---

