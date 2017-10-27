---
layout: udf
title:  ComplexNumAdd
date:   2001-11-15T20:09:06.000Z
library: MathLib
argString: "First, Second"
author: Matthew Walker
authorEmail: matthew@electricsheep.co.nz
version: 1
cfVersion: CF5
shortDescription: Adds two complex numbers.
tagBased: false
description: |
 Add two complex numbers that have been stored as a structure using the ComplexNum() UDF. You can also use this function to add a complex and a real number, or even two real numbers. The result is stored in a structure.

returnValue: Returns a structure.

example: |
 <cfset a = ComplexNum(3,4)>
 <cfset b = ComplexNum(1,-10)>
 <cfset c = ComplexNumAdd(a,b)>
 <cfset d = ComplexNumAdd(a,3)>
 <cfoutput>
     #ComplexNumToString(a)# + #ComplexNumToString(b)# = #ComplexNumToString(c)#<br>
     #ComplexNumToString(a)# + 3 = #ComplexNumToString(d)#
 </cfoutput>

args:
 - name: First
   desc: Structure containing a complex number or a real number.
   req: true
 - name: Second
   desc: Structure containing a complex number or a real number.
   req: true


javaDoc: |
 /**
  * Adds two complex numbers.
  * Note that this function uses complex numbers stored as structures by the ComplexNum() UDF also available in this library.  The ComplexNum() function is also required for this UDF to function.
  * 
  * @param First      Structure containing a complex number or a real number. 
  * @param Second      Structure containing a complex number or a real number. 
  * @return Returns a structure. 
  * @author Matthew Walker (matthew@electricsheep.co.nz) 
  * @version 1, November 15, 2001 
  */

code: |
 function ComplexNumAdd(First,Second) {
     var ComplexSum = StructNew();
     var ComplexFirst = 0;
     var ComplexSecond = 0;
     var R = 0;
     var I = 0;
             
     if ( IsStruct(First) )
         ComplexFirst = First;
     else    
         ComplexFirst = ComplexNum(First,0);    
     if ( IsStruct(Second) )
         ComplexSecond = Second;
     else    
         ComplexSecond = ComplexNum(Second,0);
                 
     R = ComplexFirst.R + ComplexSecond.R;
     I = ComplexFirst.I + ComplexSecond.I;
     StructInsert(ComplexSum, "R", R);
     StructInsert(ComplexSum, "I", I);
     return ComplexSum;
 }

oldId: 354
---

