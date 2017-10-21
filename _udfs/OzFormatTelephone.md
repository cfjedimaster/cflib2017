---
layout: udf
title:  OzFormatTelephone
date:   2004-02-26T18:26:25.000Z
library: StrLib
argString: "phoneNumber"
author: Peter Tilbrook
authorEmail: peter@coldgen.com
version: 1
cfVersion: CF5
shortDescription: Translates a 10 digit Australian telephone/facsimile number (either in STD or Toll Free format) into an Australian formatted telephone number.
description: |
 Translates a 10 digit Australian telephone/facsimile number (either in STD or Toll Free format) into an Australian formatted telephone number.

returnValue: Returns a string.

example: |
 <cfset PhoneNumber1 = "0262842727"><!--- STD (long distance) format --->
 <cfset PhoneNumber2 = "1800333999"><!--- Toll Free format --->
 <cfoutput>
 #PhoneNumber1# = #OzFormatTelephone(PhoneNumber1)#<br>
 #PhoneNumber2# = #OzFormatTelephone(PhoneNumber2)#<br>
 </cfoutput>

args:
 - name: phoneNumber
   desc: Number to format.
   req: true


javaDoc: |
 /**
  * Translates a 10 digit Australian telephone/facsimile number (either in STD or Toll Free format) into an Australian formatted telephone number.
  * 
  * @param phoneNumber      Number to format. (Required)
  * @return Returns a string. 
  * @author Peter Tilbrook (peter@coldgen.com) 
  * @version 1, February 26, 2004 
  */

code: |
 function OzFormatTelephone(PhoneNumber) {
     if (not isNumeric(PhoneNumber)) return "";
     if (left(PhoneNumber,1) eq 0) return "(" & left(PhoneNumber, 2) & ")&nbsp;" & mid(PhoneNumber, 4, 4) & "-" & right(PhoneNumber, 4);
     else if (left(PhoneNumber,1) neq 0) return left(PhoneNumber, 4) & "-" & mid(PhoneNumber, 3, 3) & "-" & right(PhoneNumber, 3);
     return "";
 }

---

