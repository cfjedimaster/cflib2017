---
layout: udf
title:  ArrayInsertArrayAt
date:   2001-09-13T11:07:14.000Z
library: DataManipulationLib
argString: "a1, a2, pos"
author: Craig Fisher
authorEmail: craig@altainteractive.com
version: 1
cfVersion: CF5
shortDescription: Inserts an array at specified position in another array.
tagBased: false
description: |
 Inserts an array at specified position in another array.  Returns the resulting array.  If you secifiy a position one greater than the length of the first array the second array will be concatenated to the first.

returnValue: Returns an array.

example: |
 <CFSCRIPT>
 a1=ArrayNew(1);
 a1[1]=1;
 a1[2]=2;
 a1[3]=3;
 a1[4]=4;
 a1[5]=5;
 a1[6]=6;
 a2=ArrayNew(1);
 a2[1]="a";
 a2[2]="b";
 a2[3]="c";
 a2[4]="d";
 a3=ArrayInsertArrayAt(a1, a2, 2);
 </cfscript>
 <CFDUMP VAR="#a1#">
 <CFDUMP VAR="#a2#">
 <CFDUMP var="#a3#">

args:
 - name: a1
   desc: The first array.
   req: true
 - name: a2
   desc: The second array.
   req: true
 - name: pos
   desc: The position to insert at. 
   req: true


javaDoc: |
 /**
  * Inserts an array at specified position in another array.
  * 
  * @param a1      The first array. 
  * @param a2      The second array. 
  * @param pos      The position to insert at.  
  * @return Returns an array. 
  * @author Craig Fisher (craig@altainteractive.com) 
  * @version 1, September 13, 2001 
  */

code: |
 function ArrayInsertArrayAt(a1, a2, pos) {
     var aNew = ArrayNew(1);
     var len1 = "";
     var len2 = "";
     var i = 1;
     if ((NOT isArray(a1)) OR (NOT isArray(a2)) OR (NOT IsNumeric(pos)) OR (pos LT 1) OR (pos GT ArrayLen(a1) +1) )  {
         writeoutput("Error in <Code>ArrayInsertArrayAt()</code>! Correct usage: ArrayInsertArrayAt(<I>Array1</I>, <I>Array2</I>,
 <I>position</I>) -- Inserts <I>Array2</I> at <I>position</I> in
 <I>Array2</I>");
         return 0;
     }
     pos=int(pos);
     len1=ArrayLen(a1);
     len2=ArrayLen(a2);
     aNew=Duplicate(a1);
     if (pos IS NOT Len1 + 1) {
         for (i=0; i LT len2; i=i+1) ArrayInsertAt(aNew, pos + i, Duplicate(a2[i+1]));
     }
     else {
         for (i=1;i LTE len2;i=i+1) ArrayAppend(aNew, Duplicate(a2[i]));
     }    
     return aNew;
 }

---

