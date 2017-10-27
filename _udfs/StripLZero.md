---
layout: udf
title:  StripLZero
date:   2001-09-13T11:08:13.000Z
library: StrLib
argString: "Num"
author: Critter Gewlas
authorEmail: critter@cfresume.org
version: 1
cfVersion: CF5
shortDescription: Strips leading zero's from a string or number.
tagBased: false
description: |
 Strips leading zero's from a string or number.

returnValue: Returns a string.

example: |
 <cfoutput>
 #stripLZero(0006325)#<br/>
 #stripLZero("0631 Appleton Lane")#
 </cfoutput>

args:
 - name: Num
   desc: Number or string to be modified.
   req: true


javaDoc: |
 /**
  * Strips leading zero's from a string or number.
  * 
  * @param Num      Number or string to be modified. 
  * @return Returns a string. 
  * @author Critter Gewlas (critter@cfresume.org) 
  * @version 1, September 13, 2001 
  */

code: |
 function StripLZero(s) {
     return REReplace(s,"^0","","ALL");
 }

oldId: 239
---

