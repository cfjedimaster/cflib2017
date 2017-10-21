---
layout: udf
title:  isVIN
date:   2013-02-19T23:26:06.000Z
library: StrLib
argString: "v"
author: Christopher Jordan
authorEmail: cjordan@placs.net
version: 1
cfVersion: CF8
shortDescription: US Vehicle Identification Number (VIN) validation.
description: |
 This function accepts a United States-formatted Vehicle Identification Number (VIN) as the sole argument, and returns true if the VIN is valid.
 
 See http://en.wikipedia.org/wiki/Vehicle_Identification_Number

returnValue: Returns a boolean.

example: |
 <cfoutput>
 <cfset vin = "1GNDM19ZXRB170064">
 #vin#: #isVin(vin)#<br />
 <cfset vin = "1FAFP40634F172825">
 #vin#: #isVin(vin)#<br />
 </cfoutput>

args:
 - name: v
   desc: VIN to validate
   req: true


javaDoc: |
 /**
  * US Vehicle Identification Number (VIN) validation.
  * version 1.0 by Christopher Jordan
  * version 1.1 by RHPT, Peter Boughton &amp; Adam Cameron (original function rejected valid VINs)
  * 
  * @param v      VIN to validate (Required)
  * @return Returns a boolean. 
  * @author Christopher Jordan (cjordan@placs.net) 
  * @version 1, February 19, 2013 
  */

code: |
 function isVIN(v) {
     var i = "";
     var d = "";
     var checkDigit = "";
     var sum = 0;
     var weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
     var transliterations = {
         a = 1,    b = 2, c = 3, d = 4, e = 5, f = 6,    g = 7, h = 8,
         j = 1,    k = 2, l = 3, m = 4, n = 5,         p = 7,            r = 9,
                 s = 2, t = 3, u = 4, v = 5, w = 6,    x = 7, y = 8,    z = 9
     };
     var vinRegex = "(?x)    ## allow comments
         ^                    ## from the start of the string
                             ## see http://en.wikipedia.org/wiki/Vehicle_Identification_Number for VIN spec
         [A-Z\d]{3}            ## World Manufacturer Identifier (WMI)
         [A-Z\d]{5}            ## Vehicle decription section (VDS)
         [\dX]                ## Check digit
         [A-Z\d]                ## Model year
         [A-Z\d]                ## Plant
         \d{6}                ## Sequence
         $                    ## to the end of the string
     ";
 
     if (! REFindNoCase(vinRegex, arguments.v)) {
         return false;
     }
 
     for (i = 1; i <= len(arguments.v); i++) {
         d = mid(arguments.v, i, 1);
 
         if (! isNumeric(d)) {
             sum += transliterations[d] * weights[i];
         } else {
             sum += d * weights[i];
         }
     }
 
     checkDigit = sum % 11;
 
     if (checkDigit == 10) {
         checkDigit = "x";
     }
     return checkDigit == mid(arguments.v, 9, 1);
 }

---

