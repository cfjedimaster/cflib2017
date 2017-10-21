---
layout: udf
title:  booleanize
date:   2006-07-03T15:23:16.000Z
library: DataManipulationLib
argString: "[value]"
author: Craig M. Rosenblum
authorEmail: crosenblum@gmail.com
version: 1
cfVersion: CF7
shortDescription: Simply converts access yes/no or other boolean variables to 0/1 format, almost opposite of yesnoformat
description: |
 This was to help deal with a problem of access/sql conversion and there were some yes/no values that did not match to boolean values. So had to create a script to simplify universal conversion to boolean values.

returnValue: Returns 1 or 0.

example: |
 <cfset one = "true">
 <cfset two = "0">
 <cfset new_one = 0>
 <cfset new_two = 0>
 
 <b>default values:</b><br>
 <cfoutput>
 one = #one#<br>
 two = #two#<br>
 </cfoutput>
 <cfoutput>
 <b>New Values:</b><br>
 one = #booleanize(one)#<br>
 two = #booleanize(two)#<br>
 </cfoutput>

args:
 - name: value
   desc: The value to convert.
   req: false


javaDoc: |
 /**
  * Simply converts access yes/no or other boolean variables to 0/1 format, almost opposite of yesnoformat
  * 
  * @param value      The value to convert. (Optional)
  * @return Returns 1 or 0. 
  * @author Craig M. Rosenblum (crosenblum@gmail.com) 
  * @version 1, July 3, 2006 
  */

code: |
 function booleanize(value) {
     if (not isboolean(value)) {
         value = replacenocase(value,'on',1);
         value = replacenocase(value,'off',0);
     }
     if (yesnoformat(value) eq 'Yes') value = 1;
     if (yesnoformat(value) eq 'No') value = 0;
     return value;
 }

---

