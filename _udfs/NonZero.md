---
layout: udf
title:  NonZero
date:   2002-12-23T21:07:27.000Z
library: UtilityLib
argString: "string"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: NonZero returns TRUE if a value (numeric or text) is not an empty string and is greater than 0.
tagBased: false
description: |
 NonZero returns TRUE if a value (numeric or text) is not an empty string and is greater than 0.

returnValue: Returns a boolean.

example: |
 <cfset mystring1="">
 <cfset mystring2="Sample">
 <cfoutput>
 MyString1 = #nonzero(mystring1)#<br>
 MyString2 = #nonzero(mystring2)#    
 </cfoutput>

args:
 - name: string
   desc: Value to check.
   req: true


javaDoc: |
 /**
  * NonZero returns TRUE if a value (numeric or text) is not an empty string and is greater than 0.
  * 
  * @param string      Value to check. (Required)
  * @return Returns a boolean. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, December 23, 2002 
  */

code: |
 function NonZero(string){
     if(string NEQ "" OR string GT 0) return true;
     return false;
 }

oldId: 808
---

