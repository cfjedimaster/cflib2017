---
layout: udf
title:  isMod10
date:   2008-10-02T17:15:02.000Z
library: UtilityLib
argString: "number"
author: Scott Glassbrook
authorEmail: cflib@vox.phydiux.com
version: 3
cfVersion: CF5
shortDescription: Checks to see whether a string passed to it passes the Luhn algorithm (also known as the Mod10 algorithm)
description: |
 Checks a string against the Luhn Algorithm. Also known as the mod10 algorithm. this function can be used to check the validity of credit card numbers, Canadian social insurance numbers, and any other number as well.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 <cfif IsMod10("4000300020001000")>
    This string has passed the mod10 check
 <cfelse>
    This string has failed the mod10 check
 </cfif>
 </cfoutput>

args:
 - name: number
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Checks to see whether a string passed to it passes the Luhn algorithm (also known as the Mod10 algorithm)
  * V2 update by Christopher Jordan cjordan@placs.net
  * V3 update by Peter J. Farrell (pjf@maestropublishing.com)
  * 
  * @param number      String to check. (Required)
  * @return Returns a boolean. 
  * @author Scott Glassbrook (cflib@vox.phydiux.com) 
  * @version 3, October 2, 2008 
  */

code: |
 function isMod10(number) {
     var nDigits = Len(arguments.number);
     var parity = nDigits MOD 2;
     var digit = "";
     var sum = 0;
     var i = "";
 
     for (i=0; i LTE nDigits - 1; i=i+1) {
         digit = Mid(arguments.number, i+1, 1);
         if ((i MOD 2) EQ parity) {
             digit = digit * 2;
             if (digit GT 9) {
                 digit = digit - 9;
             }
         }
         sum = sum + digit;
     }
 
     if (NOT sum MOD 10) return TRUE;
     else return FALSE;
 }

---

