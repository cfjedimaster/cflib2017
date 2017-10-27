---
layout: udf
title:  getISBN
date:   2004-01-28T15:45:55.000Z
library: StrLib
argString: "BarCodeNum"
author: Amar Trivedi
authorEmail: atrivedi@ekomcorp.com
version: 1
cfVersion: CF5
shortDescription: Converts Barcode to valid ISBN number (without &quot;-&quot;).
tagBased: false
description: |
 UDF is useful when user needs to take scanned barcode as input and convert it to ISBN for book catalog purposes.

returnValue: Returns a string.

example: |
 <cfoutput>
      #getISBN(9780321125163)#
 </cfoutput>
 
 OUTPUT:
 0321125169

args:
 - name: BarCodeNum
   desc: Bar code number.
   req: true


javaDoc: |
 /**
  * Converts Barcode to valid ISBN number (without &quot;-&quot;).
  * 
  * @param BarCodeNum      Bar code number. (Required)
  * @return Returns a string. 
  * @author Amar Trivedi (atrivedi@ekomcorp.com) 
  * @version 1, January 28, 2004 
  */

code: |
 function getISBN(BarCodeNum) {
   var x ='';
   var sum = 0;
   var i = 0;
   var digitsum = 0;
   var ModSum=0;
 
   // Barcode Must be 13 digits AND numeric 
   if(len(BarCodeNum) NEQ  13) return 0;
   if(not IsNumeric(BarCodeNum)) return 0;
   /** get rid of first 3 characters since they are  NOT used for conversion **/
   x = right(BarCodeNum,10);
   x = left(x,9);
   // loop through middle 9 digits
   for(i = 1; i LTE 9; i = i + 1) {
        digitsum = Mid( x, i, 1 ) * i;
        sum = sum + digitsum;
   }
   // check for the last letter/digit
   ModSum = sum MOD 11;
   if(ModSum EQ 10) ModSum = "x";
   return x & ModSum;
 }

oldId: 1017
---

