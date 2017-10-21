---
layout: udf
title:  hexToString
date:   2004-01-28T15:42:54.000Z
library: StrLib
argString: "hex"
author: Michael Krock
authorEmail: michael.krock@avv.com
version: 1
cfVersion: CF5
shortDescription: Converts a hex value to a string.
description: |
 Converts a hex value to a string.

returnValue: Returns a string.

example: |
 <cfoutput>
 #hexToString("B52EC9272A2E62B03FFA2E733FDDB86D4970E5D1F2FFEE")#
 </cfoutput>

args:
 - name: hex
   desc: Hex string.
   req: true


javaDoc: |
 /**
  * Converts a hex value to a string.
  * 
  * @param hex      Hex string. (Required)
  * @return Returns a string. 
  * @author Michael Krock (michael.krock@avv.com) 
  * @version 1, January 28, 2004 
  */

code: |
 function hexToString(hex) {
     
     var str = "";
     var i = 0;
         
     for (i=1; i LTE len(hex); i=i+2) {
         str = str & chr(inputBaseN(mid(hex,i,2),16));
     }
         
     return str;
 }

---

