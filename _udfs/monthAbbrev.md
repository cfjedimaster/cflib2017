---
layout: udf
title:  monthAbbrev
date:   2013-02-07T09:56:24.000Z
library: DateLib
argString: "monthNum"
author: Craig Heath
authorEmail: cf.contractor@gmail.com
version: 1
cfVersion: CF5
shortDescription: Month number to three character month text abbreviation.
description: |
 Pass in a digit (1-12) and get back the equivalent three character calendar month abbreviation.

returnValue: Returns a locale-specific string representation of the month formatted with mask mmm

example: |
 <cfoutput>
     <cfloop from="1" to="12" index="m">
         monthAbbrev(#m#): #monthAbbrev(m)#<br />
     </cfloop>
 </cfoutput>

args:
 - name: monthNum
   desc: The month (1-12)
   req: true


javaDoc: |
 /**
  * Month number to three character month text abbreviation.
  * v0.9 by Craig Heath
  * v1.0 by Adam Cameron (improved/simplified logic, made locale-aware)
  * 
  * @param monthNum      The month (1-12) (Required)
  * @return Returns a locale-specific string representation of the month formatted with mask mmm 
  * @author Craig Heath (cf.contractor@gmail.com) 
  * @version 1.0, February 7, 2013 
  */

code: |
 function monthAbbrev(monthnum) {
     return lsDateFormat("01-#monthnum#-01", "mmm"); // the year and the date are insignificant
 }

---

