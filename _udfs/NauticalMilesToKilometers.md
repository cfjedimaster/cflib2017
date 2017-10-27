---
layout: udf
title:  NauticalMilesToKilometers
date:   2002-03-18T20:35:36.000Z
library: MathLib
argString: "NauticalMiles"
author: Tom Nunamaker
authorEmail: tom@toshop.com
version: 1
cfVersion: CF5
shortDescription: Convert Nautical Miles to Kilometers.
tagBased: false
description: |
 Converts nautical miles to Kilometers.

returnValue: Returns a numeric value.

example: |
 <CFSET nm=53.9956803456>
 
 <CFOUTPUT>
 Given nm=#nm#<BR>
 #nm# Nautical Mile(s) = #NauticalMilesToKilometers(nm)# Kilometers. <br>
 </CFOUTPUT>

args:
 - name: NauticalMiles
   desc: The number of nautical miles you want converted to kilometers.
   req: true


javaDoc: |
 /**
  * Convert Nautical Miles to Kilometers.
  * NOTE: 1852 meters has been adopted as the international nautical mile (6076.11549 feet)
  * 
  * @param NauticalMiles      The number of nautical miles you want converted to kilometers. 
  * @return Returns a numeric value. 
  * @author Tom Nunamaker (tom@toshop.com) 
  * @version 1, March 18, 2002 
  */

code: |
 function NauticalMilesToKilometers(NauticalMiles){
   return NauticalMiles * 1.852;
 }

oldId: 500
---

