---
layout: udf
title:  struct
date:   2007-08-22T22:46:19.000Z
library: DataManipulationLib
argString: "[paramN]"
author: Erki Esken
authorEmail: erki@dreamdrummer.com
version: 2
cfVersion: CF6
shortDescription: This functions helps to quickly build structures, both simple and complex.
tagBased: false
description: |
 Now you can make simple or complex structures with a one-liner in CF, just like with built-in shorthand syntax in many other programming languages. You can create simple structures with ease, or nest Struct() functions to create complex, nested structures.

returnValue: Returns a structure.

example: |
 <cfdump var="#Struct(foo='bar',bar='foo',quux=Struct(one='1',two='2',three='3'))#">

args:
 - name: paramN
   desc: This UDF accepts N optional arguments. Each argument is added to the returned structure.
   req: false


javaDoc: |
 /**
  * This functions helps to quickly build structures, both simple and complex.
  * v2 by Brendan Baldwin brendan.baldwin@gmail.com
  * 
  * @param paramN      This UDF accepts N optional arguments. Each argument is added to the returned structure. (Optional)
  * @return Returns a structure. 
  * @author Erki Esken (erki@dreamdrummer.com) 
  * @version 2, August 22, 2007 
  */

code: |
 function struct() { return duplicate(arguments); }

oldId: 684
---

