---
layout: udf
title:  UPCCheckDigit
date:   2002-06-15T14:38:07.000Z
library: StrLib
argString: "upc"
author: Pete Jacoby
authorEmail: cf@subnova.net
version: 1
cfVersion: CF5
shortDescription: Calculates a UPC-A check digit.
description: |
 Given the first 11 digits of a UPC-A barcode, returns the 12th check digit.

returnValue: Returns a numeric value.

example: |
 <cfset barcode=12345678901>
 <cfoutput>
 Check digit for #barcode# is #UPCCheckDigit(barcode)#
 </cfoutput>

args:
 - name: upc
   desc: 11 digit UPC-A code
   req: true


javaDoc: |
 /**
  * Calculates a UPC-A check digit.
  * 
  * @param upc      11 digit UPC-A code (Required)
  * @return Returns a numeric value. 
  * @author Pete Jacoby (cf@subnova.net) 
  * @version 1, June 15, 2002 
  */

code: |
 function UPCCheckDigit(upc){
 var odd = 0;
 var even = 0;
 var total = 0;
 
 if (NOT IsNumeric(upc) OR Len(upc) NEQ 11)
     return(-1);
 
 for (i=1; i LT 12; i=i+1){
         if (i MOD 2)
             odd=odd+Mid(upc, i, 1);
         else
             even=even+Mid(upc, i, 1);
     }
 
 total=(odd*3)+even;
 total=total mod 10;
 
 if (total eq 0)
     return 0;
 else
     return(10-total);
 }

---

