---
layout: udf
title:  KilometersToMiles
date:   2001-09-17T15:23:04.000Z
library: ScienceLib
argString: "kilometers"
author: Joshua Licht
authorEmail: jlicht5@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Converts kilometers to miles.
description: |
 Converts kilometers to miles.

returnValue: Returns a numeric value.

example: |
 <CFSET k=51>
 <CFOUTPUT>
 Given k=#k#<BR>
 #k# kilometer(s) = #KilometersToMiles(K)# miles. <br>
 </CFOUTPUT>

args:
 - name: kilometers
   desc: The number of kilometers you want converted to miles.
   req: true


javaDoc: |
 /**
  * Converts kilometers to miles.
  * 
  * @param kilometers      The number of kilometers you want converted to miles. 
  * @return Returns a numeric value. 
  * @author Joshua Licht (jlicht5@hotmail.com) 
  * @version 1, September 17, 2001 
  */

code: |
 function KilometersToMiles(Kilometers)
 {
   Return Kilometers * 0.6214;
 }

---

