---
layout: udf
title:  Factor
date:   2001-09-06T18:55:58.000Z
library: MathLib
argString: "integer"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns a list of all factors for a given positive integer.
description: |
 Returns a list of all factors for a given positive integer.

returnValue: Returns a comma delimited list of values.

example: |
 <CFSET n=100>
   <CFOUTPUT>
   Given n=100
   The factors of #n# are: {#Factor(n)#}
   </CFOUTPUT>

args:
 - name: integer
   desc: Any non negitive integer greater than or equal to 1.
   req: true


javaDoc: |
 /**
  * Returns a list of all factors for a given positive integer.
  * 
  * @param integer      Any non negitive integer greater than or equal to 1. 
  * @return Returns a comma delimited list of values. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.1, September 6, 2001 
  */

code: |
 function factor(integer)
 {
   Var i=0; 
   Var Factors = "";
   for (i=1; i LTE integer/2; i=i+1) {
     if (Int(integer/i) EQ integer/i) {
       Factors = ListAppend(Factors, i);
     }
   }
   Return ListAppend(Factors, integer);
 }

---

