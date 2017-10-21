---
layout: udf
title:  IsFactor
date:   2001-07-18T14:23:20.000Z
library: MathLib
argString: "a, b"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns True if A is a factor of B.
description: |
 Returns True if A is a factor of B.

returnValue: Returns true or false.

example: |
 <CFSET a=25>
   <CFSET b=100>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>a=#a#
   <LI>b=#b#
   </UL>
   Is #a# a factor of #b#? #YesNoFormat(IsFactor(a,b))#
   </CFOUTPUT>

args:
 - name: a
   desc: Any non negitive integer greater than or equal to 1.
   req: true
 - name: b
   desc: Any non negitive integer greater than or equal to 1.
   req: true


javaDoc: |
 /**
  * Returns True if A is a factor of B.
  * 
  * @param a      Any non negitive integer greater than or equal to 1. 
  * @param b      Any non negitive integer greater than or equal to 1. 
  * @return Returns true or false. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 18, 2001 
  */

code: |
 function IsFactor(a,b)
 {
   if (Int(b/a) EQ b/a){
     Return True;
     }
   else { 
     Return False;
   }
 }

---

