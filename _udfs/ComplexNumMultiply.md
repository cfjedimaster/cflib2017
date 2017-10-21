---
layout: udf
title:  ComplexNumMultiply
date:   2001-11-15T20:08:42.000Z
library: MathLib
argString: "Multiplicand, Multiplier"
author: Matthew Walker
authorEmail: matthew@electricsheep.co.nz
version: 1
cfVersion: CF5
shortDescription: Multiply two complex numbers.
description: |
 Multiply two complex numbers, or a real and a complex number, or two real numbers and return the result stored as a structure.

returnValue: Returns a structure.

example: |
 <cfset a = ComplexNum(3,4)>
 <cfset b = ComplexNum(1,-10)>
 <cfset c = ComplexNumMultiply(a,b)>
 <cfset d = ComplexNumMultiply(a,3)>
 <cfoutput>
     (#ComplexNumToString(a)#) * (#ComplexNumToString(b)#) = #ComplexNumToString(c)#<br>
     (#ComplexNumToString(a)#) * 3 = (#ComplexNumToString(d)#)
 </cfoutput>

args:
 - name: Multiplicand
   desc: Structure containing a complex number or a real number.
   req: true
 - name: Multiplier
   desc: Structure containing a complex number or a real number.
   req: true


javaDoc: |
 /**
  * Multiply two complex numbers.
  * Note that this function uses complex numbers stored as structures by the ComplexNum() UDF also available in this library.  The ComplexNum() function is also required for this UDF to function.
  * 
  * @param Multiplicand      Structure containing a complex number or a real number. 
  * @param Multiplier      Structure containing a complex number or a real number. 
  * @return Returns a structure. 
  * @author Matthew Walker (matthew@electricsheep.co.nz) 
  * @version 1, November 15, 2001 
  */

code: |
 function ComplexNumMultiply(Multiplicand,Multiplier) {
     var ComplexProduct = StructNew();
     var ComplexMultiplicand = 0;
     var ComplexMultiplier = 0;
     var R = 0;
     var I = 0;
             
     if ( IsStruct(Multiplicand) )
         ComplexMultiplicand = Multiplicand;
     else    
         ComplexMultiplicand = ComplexNum(Multiplicand,0);    
     if ( IsStruct(Multiplier) )
         ComplexMultiplier = Multiplier;
     else    
         ComplexMultiplier = ComplexNum(Multiplier,0);
                 
     R = ComplexMultiplicand.R * ComplexMultiplier.R - ComplexMultiplicand.I * ComplexMultiplier.I;
     I = ComplexMultiplicand.R * ComplexMultiplier.I + ComplexMultiplicand.I * ComplexMultiplier.R;
     StructInsert(ComplexProduct, "R", R);
     StructInsert(ComplexProduct, "I", I);
     return ComplexProduct;
 }

---

