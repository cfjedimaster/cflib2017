---
layout: udf
title:  extend
date:   2013-09-12T13:46:51.000Z
library: DataManipulationLib
argString: ""
author: Owen Knapp
authorEmail: owen@letskillowen.com
version: 1
cfVersion: CF9
shortDescription: Merge the contents of two or more structs together into the first struct.
description: |
 This is similar to jQuery.extend().
 
 The function will accept 0 to many structs passed to it.
 
 The first struct passed as an argument is considered the target struct. When two more more structs are passed to extend() properties from all the structs are added to the target.
 
 This is useful, for instance, if you have code that expects a struct with specific keys and defaults as a variable or argument and you want to ensure they always exist before executing any further code.

returnValue: A struct containing all the passed-in structs appended in turn

example: |
 result = extend({one="tahi"},{two="rua"},{three="toru"},{four="wha"});
 writeDump(result);

args:


javaDoc: |
 /**
  * Merge the contents of two or more structs together into the first struct.
  * v1.0 by Owen Knapp
  * v1.1 by Adam Cameron (simplified logic, making it CF9 compatible)
  * 
  * @return A struct containing all the passed-in structs appended in turn 
  * @author Owen Knapp (owen@letskillowen.com) 
  * @version 1.1, September 12, 2013 
  */

code: |
 struct function extend() {
     var extended    = {};
     var arg            = "";
 
     for (arg in arguments){
         structAppend(extended, arguments[arg]);
     }
 
     return extended;
 }

---

