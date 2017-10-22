---
layout: udf
title:  EvenOddColor
date:   2001-11-27T18:59:57.000Z
library: UtilityLib
argString: "num, evencolor, oddcolor"
author: Mark Andrachek
authorEmail: hallow@webmages.com
version: 1
cfVersion: CF5
shortDescription: Returns different colors if the number passed to it is even or odd.
tagBased: false
description: |
 This function takes 3 arguments, num,EvenColor, and OddColor.  num is the number you want to return the color for, EvenColor is the color returned if num is even, OddColor is the color returned if num is odd. This can be used to easily alternate table row or even cell colors.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 <TABLE>
 <CFLOOP FROM="1" TO="10" INDEX="x">
     <TR>
     <TD BGCOLOR="#EvenOddColor(variables.x,'##FFFFFF','##CECECE')#">#variables.x#
     </TD>
     </TR>
 </CFLOOP>
 </TABLE>
 </CFOUTPUT>

args:
 - name: num
   desc: The number to check for even/oddness.
   req: true
 - name: evencolor
   desc: The color to use for even numbers.
   req: true
 - name: oddcolor
   desc: The color to use for odd numbers.
   req: true


javaDoc: |
 /**
  * Returns different colors if the number passed to it is even or odd.
  * Modified by RCamden
  * 
  * @param num      The number to check for even/oddness. 
  * @param evencolor      The color to use for even numbers. 
  * @param oddcolor      The color to use for odd numbers. 
  * @return Returns a string. 
  * @author Mark Andrachek (hallow@webmages.com) 
  * @version 1.1, November 27, 2001 
  */

code: |
 function EvenOddColor(num,evencolor,oddcolor) {
     return Arguments[(num mod 2 )+ 2];
 }

---

