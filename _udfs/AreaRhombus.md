---
layout: udf
title:  AreaRhombus
date:   2001-07-17T13:27:23.000Z
library: MathLib
argString: "diag1, diag2"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the area of a rhombus.
tagBased: false
description: |
 Calculates the area of a rhombus based on the lengths of the diagonals.

returnValue: Returns the area of the rhombus.

example: |
 <CFSET diag1=4>
   <CFSET diag2=6>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>diag1=#diag1#
   <LI>diag2=#diag2#
   </UL>
   The area of the rhombus is #AreaRhombus(diag1,diag2)#
   </CFOUTPUT>

args:
 - name: diag1
   desc: Length of one diagonal
   req: true
 - name: diag2
   desc: Length of the other diagonal
   req: true


javaDoc: |
 /**
  * Calculates the area of a rhombus.
  * 
  * @param diag1      Length of one diagonal 
  * @param diag2      Length of the other diagonal 
  * @return Returns the area of the rhombus. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 17, 2001 
  */

code: |
 function AreaRhombus(diag1, diag2)
 {
   Return (0.5 * (diag1 + diag2));
 }

---

