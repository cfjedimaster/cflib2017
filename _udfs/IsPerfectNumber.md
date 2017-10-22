---
layout: udf
title:  IsPerfectNumber
date:   2001-09-06T18:59:10.000Z
library: MathLib
argString: "number"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the specified number is a perfect number.
tagBased: false
description: |
 Returns True if the specified number is a perfect number.  A perfect number is an integer greater than zero whose factors less than the number all add up to the number (i.e. 6 is a perfect number 3+2+1=6).

returnValue: Returns a Boolean value.

example: |
 <CFOUTPUT>
 Is 6 a perfect number? #YesNoFormat(IsPerfectNumber(6))#<BR>
 Is 12 a perfect number? #YesNoFormat(IsPerfectNumber(12))#<BR>
 </CFOUTPUT>

args:
 - name: number
   desc: Integer greater than zero to test.
   req: true


javaDoc: |
 /**
  * Returns True if the specified number is a perfect number.
  * 
  * @param number      Integer greater than zero to test. 
  * @return Returns a Boolean value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, September 6, 2001 
  */

code: |
 function IsPerfectNumber(number)
 {
   Var i=0;
   Var factors = "";
   Var factorArray=0;
   Var sum=0;
   if (number lt 1){
     return False;
     break;
   }  
   for (i=1; i LTE number/2; i=i+1) {
     if (Int(number/i) EQ number/i) {
       factors = ListAppend(Factors, i);
     }
   }  
   factorArray=ListToArray(factors);
   sum=ArraySum(factorArray);
   if (sum eq number){
     return True;
   }
   else{
     return False;
   }
 }

---

