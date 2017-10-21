---
layout: udf
title:  isDateList
date:   2009-05-09T22:01:19.000Z
library: DateLib
argString: "nList[, strDelim]"
author: Laura Norris
authorEmail: lnorris@tiffinweb.com
version: 0
cfVersion: CF5
shortDescription: Checks if a list consists of date values only.
description: |
 Checks if a list consists of valid date values only.  Useful if processing a CSV file and a column requires all fields to be dates.  Based on isNumbericList().

returnValue: returns a boolean

example: |
 <cfoutput>
 <!--- example of a basic date list --->
 #isDateList("4/11/2008,12/5/2008,4/15/2009,11/29/2008")#<br>
 <!--- example of a list with a pipe ('|') delimiter --->
 #isDateList("4/11/2008|12/5/2008|4/15/2009|11/29/2008", "|" )#<br>
 <!--- examples of an invalid date lists    --->
 #isDateList("4/11/2008,12/34/2008,4/15/2009,11/29/2008")#<br>
 #isDateList("4/11/2008,12/5/2008,4/15/2009,a")#<br>
 </cfoutput>

args:
 - name: nList
   desc: List of dates
   req: true
 - name: strDelim
   desc: list delimiter
   req: false


javaDoc: |
 /**
  * Checks if a list consists of date values only.
  * 
  * @param nList      List of dates (Required)
  * @param strDelim      list delimiter (Optional)
  * @return returns a boolean 
  * @author Laura Norris (lnorris@tiffinweb.com) 
  * @version 0, May 9, 2009 
  */

code: |
 function isDateList(nList) {
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
         if (NOT isDate(aryN[intIndex])) {
             /*    hit a non-date list element, send the no-go back                */
             return false;
         }
     }
     /*    made it through the list at this point, send the ok back                */    
     return true;
 }

---

