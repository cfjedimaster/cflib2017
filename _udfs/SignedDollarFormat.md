---
layout: udf
title:  SignedDollarFormat
date:   2001-09-13T10:22:35.000Z
library: StrLib
argString: "amount"
author: David Grant
authorEmail: david@insite.net
version: 1
cfVersion: CF5
shortDescription: Returns amount signed and dollar formatted.
tagBased: false
description: |
 This UDF accept one number: amount, and returns the amount dollar formatted with a plus or minus sign instead of the regular parenthesis that dollarFormat() returns with negative numbers.

returnValue: Returns a string.

example: |
 <cfset theAmount = 12500.75>
 <cfset theAmount2 = -123.99>
 
 <cfoutput>
 #signedDollarFormat(theAmount)#<BR>
 #signedDollarFormat(theAmount2)#<BR>
 </cfoutput>

args:
 - name: amount
   desc: Amount to be formatted.
   req: true


javaDoc: |
 /**
  * Returns amount signed and dollar formatted.
  * 
  * @param amount      Amount to be formatted. 
  * @return Returns a string. 
  * @author David Grant (david@insite.net) 
  * @version 1, September 13, 2001 
  */

code: |
 function signedDollarFormat(amount) {
     var sign = "";
     if (amount gt 0) sign = "+";
     else if (amount lt 0) sign = "-";
     amount = sign & dollarFormat(amount);
     return reReplace(amount,"\(|\)","","ALL"); //get rid of parenthesis
 }

---

