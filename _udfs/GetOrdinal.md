---
layout: udf
title:  GetOrdinal
date:   2003-11-05T12:46:56.000Z
library: StrLib
argString: "num"
author: Mark Andrachek
authorEmail: hallow@webmages.com
version: 1
cfVersion: CF5
shortDescription: Returns the 2 character english text ordinal for numbers.
tagBased: false
description: |
 Takes a number as an argument, and returns the 2 letter english text ordinal appropriate for the number. For example, the number 1 would return &quot;st&quot; for 1st, and so on.

returnValue: Returns a string.

example: |
 <CFSET myordinal = GetOrdinal(Day(Now()))>
 
 <CFOUTPUT>
 Today is the #Day(Now())#<SUP>#variables.myordinal#</SUP> of #MonthAsString(Month(Now()))#
 </CFOUTPUT>

args:
 - name: num
   desc: Number you wish to return the ordinal for.
   req: true


javaDoc: |
 /**
  * Returns the 2 character english text ordinal for numbers.
  * 
  * @param num      Number you wish to return the ordinal for. (Required)
  * @return Returns a string. 
  * @author Mark Andrachek (hallow@webmages.com) 
  * @version 1, November 5, 2003 
  */

code: |
 function GetOrdinal(num) {
   // if the right 2 digits are 11, 12, or 13, set num to them.
   // Otherwise we just want the digit in the one's place.
   var two=Right(num,2);
   var ordinal="";
   switch(two) {
        case "11": 
        case "12": 
        case "13": { num = two; break; }
        default: { num = Right(num,1); break; }
   }
 
   // 1st, 2nd, 3rd, everything else is "th"
   switch(num) {
        case "1": { ordinal = "st"; break; }
        case "2": { ordinal = "nd"; break; }
        case "3": { ordinal = "rd"; break; }
        default: { ordinal = "th"; break; }
   }
 
   // return the text.
   return ordinal;
 }

---

