---
layout: udf
title:  isNumericList
date:   2002-03-20T11:51:01.000Z
library: StrLib
argString: "nList[, delimiter]"
author: John J. Rice
authorEmail: john@johnjrice.com
version: 1
cfVersion: CF5
shortDescription: Checks if a list consists of numeric values only.
tagBased: false
description: |
 Checks if a list consists of numeric values only. Handy for validating list received through forms and urls.  Nice for checking a potentially hazardous list before using it in SQL.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 <!--- example of a basic number list --->
 #isNumericList("7,9,8,0")#<br>
 <!--- example of a list with a pipe ('|') delimiter --->
 #isNumericList("7|9|8|0", "|" )#<br>
 <!--- example of an invalid number list    --->
 #isNumericList("7,9,8,a")#<br>
 </cfoutput>

args:
 - name: nList
   desc: List to check.
   req: true
 - name: delimiter
   desc: Delimiter for the list. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Checks if a list consists of numeric values only.
  * 
  * @param nList      List to check. 
  * @param delimiter      Delimiter for the list. Defaults to a comma. 
  * @return Returns a boolean. 
  * @author John J. Rice (john@johnjrice.com) 
  * @version 1, March 20, 2002 
  */

code: |
 function isNumericList(nList) {
     var intIndex    = 0;
     var aryN        = arrayNew(1);
     var strDelim    = ",";
 
     /*    default list delimiter to a comma unless otherwise specified            */
     if (arrayLen(arguments) gte 2){
         strDelim    = arguments[2];
     }
   
     /*    faster to work with arrays vs lists                                        */
     aryN        = listToArray(nlist,strDelim);
     
     for (intIndex=1;intIndex LTE arrayLen(aryN);intIndex=incrementValue(intIndex)) {
         if (compare(val(aryN[intIndex]),aryN[intIndex])) {
             /*    hit a non-numeric list element, send the no-go back                */
             return false;
         }
     }
     /*    made it through the list at this point, send the ok back                */    
     return true;
 }

---

