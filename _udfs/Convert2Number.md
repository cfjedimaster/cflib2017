---
layout: udf
title:  Convert2Number
date:   2002-11-15T18:44:48.000Z
library: MathLib
argString: "strVal"
author: Glenn Wilson
authorEmail: glenn.wilson@quotegen.com
version: 1
cfVersion: CF5
shortDescription: Converts any numeric string (even ones with currancy symbols to a number).
tagBased: false
description: |
 This function will take any string and strip out all characters that are not (-.0123456789) and will then determine it's numeric value.

returnValue: Returns a number.

example: |
 Convert2Number($3,456.78) will return the numeric value 3456.78

args:
 - name: strVal
   desc: Value to convert.
   req: true


javaDoc: |
 /**
  * Converts any numeric string (even ones with currancy symbols to a number).
  * 
  * @param strVal      Value to convert. (Required)
  * @return Returns a number. 
  * @author Glenn Wilson (glenn.wilson@quotegen.com) 
  * @version 1, November 15, 2002 
  */

code: |
 function Convert2Number(StrVal){
   var regStr = "[^/.0123456789-]";
   return Val(REReplace(StrVal,regStr,"","all"));
 }

---

