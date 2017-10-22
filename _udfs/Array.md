---
layout: udf
title:  Array
date:   2002-07-03T17:38:54.000Z
library: DataManipulationLib
argString: "[paramN]"
author: Erki Esken
authorEmail: erki@dreamdrummer.com
version: 1
cfVersion: CF5
shortDescription: This functions helps to quickly build arrays, both simple and complex.
tagBased: false
description: |
 Now you can make simple or complex arrays with a one-liner in CF, just like with built-in shorthand syntax in many other programming languages. You can create simple 1D arrays with ease, or nest Array() functions to create complex 2D, 3D etc arrays.

returnValue: Returns an array.

example: |
 <cfdump var="#Array('one','two','three',Array('foo','bar','quux'))#">

args:
 - name: paramN
   desc: This UDF accepts N optional arguments. Each argument is added to the returned array.
   req: false


javaDoc: |
 /**
  * This functions helps to quickly build arrays, both simple and complex.
  * 
  * @param paramN      This UDF accepts N optional arguments. Each argument is added to the returned array. (Optional)
  * @return Returns an array. 
  * @author Erki Esken (erki@dreamdrummer.com) 
  * @version 1, July 3, 2002 
  */

code: |
 function Array() {
     var result = ArrayNew(1);
     var to = ArrayLen(arguments);
     var i = 0;
     for (i=1; i LTE to; i=i+1)
         result[i] = Duplicate(arguments[i]);
     return result;
 }

---

