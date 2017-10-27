---
layout: udf
title:  truncNumber
date:   2006-06-15T14:51:12.000Z
library: MathLib
argString: "input[, decimals]"
author: Tony Monast
authorEmail: tony@ckm9.com
version: 1
cfVersion: CF5
shortDescription: Cuts a number to a certain amount of decimal places without rounding.
tagBased: false
description: |
 Cuts a number to a certain amount of decimal places without rounding.

returnValue: Returns a number.

example: |
 <cfoutput>#TruncNumber(3.646)#</cfoutput>

args:
 - name: input
   desc: Decimal number.
   req: true
 - name: decimals
   desc: Number of decimals to the right of the period. Defaults to 2.
   req: false


javaDoc: |
 /**
  * Cuts a number to a certain amount of decimal places without rounding.
  * 
  * @param input      Decimal number. (Required)
  * @param decimals      Number of decimals to the right of the period. Defaults to 2. (Optional)
  * @return Returns a number. 
  * @author Tony Monast (tony@ckm9.com) 
  * @version 1, June 15, 2006 
  */

code: |
 function truncNumber(input) {
     var decimals = 2;
     var regex = "";
     var st = "";
     if(arrayLen(arguments) EQ 2) decimals = arguments[2];
     regex = "^\d*(.\d{1," & decimals & "})?";
     st = reFind(regex,input,1,true);
     return mid(input,st.pos[1],st.len[1]);
 }

oldId: 1457
---

