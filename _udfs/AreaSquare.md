---
layout: udf
title:  AreaSquare
date:   2001-07-17T13:32:33.000Z
library: MathLib
argString: "side"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the area of a square.
tagBased: false
description: |
 Calculates the area of a square based on the length of one side.

returnValue: Returns the area of the square.

example: |
 <CFSET s=4>
   <CFOUTPUT>
   Given s=#s#
   The area of the square is #AreaSquare(s)#
   </CFOUTPUT>

args:
 - name: side
   desc: The length of one side of the square.
   req: true


javaDoc: |
 /**
  * Calculates the area of a square.
  * 
  * @param side      The length of one side of the square. 
  * @return Returns the area of the square. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 17, 2001 
  */

code: |
 function AreaSquare(side)
 {
   Return (side^2);
 }

---

