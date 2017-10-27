---
layout: udf
title:  GetCurrentAge
date:   2001-11-30T12:36:11.000Z
library: DateLib
argString: "birthdate"
author: Eric Dobris
authorEmail: swooosh2@hotmail.com
version: 1
cfVersion: CF5
shortDescription: This UDF uses a persons birthdate to output their current age in years.
tagBased: false
description: |
 This UDF uses a persons birthdate to output their current age in years.  This will output a non negative inter value - unless of course you enter a birthdate in the future.

returnValue: Returns a numeric value.

example: |
 <CFSET BirthDate = "01/01/98">
 <cfoutput>
 Birthdate: #BirthDate#<BR>
 Age: #GetCurrentAge(BirthDate)#
 </cfoutput>

args:
 - name: birthdate
   desc: Valid date object representing a person's birth date.
   req: true


javaDoc: |
 /**
  * This UDF uses a persons birthdate to output their current age in years.
  * 11/30/01 - Optimize code: Sierra Bufe (sierra@brighterfusion.com)
  * 
  * @param birthdate      Valid date object representing a person's birth date. 
  * @return Returns a numeric value. 
  * @author Eric Dobris (swooosh2@hotmail.com) 
  * @version 1, November 30, 2001 
  */

code: |
 function GetCurrentAge(birthdate){ 
   return datediff('yyyy',birthdate,now());
 }

oldId: 366
---

