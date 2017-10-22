---
layout: udf
title:  decimal2Time
date:   2005-08-09T12:23:48.000Z
library: DateLib
argString: "decimal[, timeMask]"
author: Nick Giovanni
authorEmail: audi.tt@verizon.net
version: 1
cfVersion: CF5
shortDescription: Converts decimal to time.
tagBased: false
description: |
 Takes a decimal value between 0.001 and 23.99 and converts it to a time format.

returnValue: Returns a string.

example: |
 <cfoutput>#decimal2Time(15.25)#</cfoutput>

args:
 - name: decimal
   desc: A number between 0 and 23.99.
   req: true
 - name: timeMask
   desc: Mask for formatting. Defaults to hh&#58;mm tt.
   req: false


javaDoc: |
 /**
  * Converts decimal to time.
  * 
  * @param decimal      A number between 0 and 23.99. (Required)
  * @param timeMask      Mask for formatting. Defaults to hh:mm tt. (Optional)
  * @return Returns a string. 
  * @author Nick Giovanni (audi.tt@verizon.net) 
  * @version 1, August 9, 2005 
  */

code: |
 function decimal2Time(decimal){
     var timeMask = "hh:mm tt"; 
     var timeValue = ""; 
     var decimalMinutes = "";
     var decimalHours = "";
 
     //make sure passed value is numeric
     if(not isNumeric(decimal)) return "The value passed to function decimalToTime() is not a valid number!";
 
     timeValue =  numberFormat(decimal,"99.99");
     
     if(timeValue LT 0 OR timeValue GTE 24) return "The value passed to function decimalToTime() is not within the valid range of 0 - 23.99"; 
 
     //if the optional mask was passed use that otherwise default to "hh:mm tt"
     if(arrayLen(arguments) gt 1) timeMask = arguments[2];
             
     decimalHours = listfirst(timeValue,".");
     decimalMinutes = listLast(timeValue,".");
             
     //attempt to determine minutes 
     if(decimalMinutes neq 0) decimalMinutes = round(60*decimalMinutes/100);
             
     timeValue = timeFormat(decimalHours & ":" & decimalMinutes,timeMask);
     return timeValue;
 }

---

