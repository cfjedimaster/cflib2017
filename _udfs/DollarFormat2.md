---
layout: udf
title:  DollarFormat2
date:   2002-09-16T16:36:23.000Z
library: StrLib
argString: "inNum[, default_var]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Works like the built-in function DollarFormat, but does no rounding.
tagBased: false
description: |
 Works like the built-in function DollarFormat, but does no rounding so that you can round as you see fit. Most frequently useful for displaying whole dollar amounts. Adds commas to every third digit to the left of the decimal point. Uses parenthesis to denote negative values. And of course adds a dollar sign. If value passed is not a number then returns the raw string, or the specified optional default value. Incidentally, numbers in scientific notation also work with this function.

returnValue: Returns a string.

example: |
 <cfoutput>
 DollarFormat2("123456789"):<br>
 #DollarFormat2("123456789")#<br>
 <br>
 DollarFormat2("1234.123456"):<br>
 #DollarFormat2("1234.123456")#<br>
 <br>
 DollarFormat2("-1234"):<br>
 #DollarFormat2("-1234")#<br>
 <br>
 DollarFormat2("+1234"):<br>
 #DollarFormat2("+1234")#<br>
 <br>
 DollarFormat2("123"):<br>
 #DollarFormat2("123")#<br>
 <br>
 DollarFormat2("(see note)"):<br>
 #DollarFormat2("(see note)")#<br>
 <br>
 DollarFormat2(".", "not a number"):<br>
 #DollarFormat2(".", "not a number")#<br>
 <br>
 DollarFormat2("$1", "not a number"):<br>
 #DollarFormat2("$1", "not a number")#<br>
 <br>
 DollarFormat2("1%", "not a number"):<br>
 #DollarFormat2("1%", "not a number")#<br>
 <br>
 DollarFormat2("1,234", "not a number"):<br>
 #DollarFormat2("1,234", "not a number")#<br>
 </cfoutput>

args:
 - name: inNum
   desc: Number to format.
   req: true
 - name: default_var
   desc: Value to use if number isn't a proper number.
   req: false


javaDoc: |
 /**
  * Works like the built-in function DollarFormat, but does no rounding.
  * 
  * @param inNum      Number to format. (Required)
  * @param default_var      Value to use if number isn't a proper number. (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, September 16, 2002 
  */

code: |
 function DollarFormat2(inNum) {
     var out_str             = "";
     var decimal_str         = "";
 
     var default_value = inNum;
     if(ArrayLen(Arguments) GTE 2) default_value = Arguments[2];
 
     if (not IsNumeric(inNum)) {
         return (default_value);
     } else {
         inNum = Trim(inNum);
         if(ListLen(inNum, ".") GT 1) {
             out_str = Abs(ListFirst(inNum, "."));
             decimal_str = "." & ListLast(inNum, ".");
         } else if (Find(".", inNum) EQ 1) {
             decimal_str = inNum;
         } else {
             out_str = Abs(inNum);
         }
         if (out_str NEQ "") {
             // add commas
             out_str = Reverse(out_str);
             out_str = REReplace(out_str, "([0-9][0-9][0-9])", "\1,", "ALL");
             out_str = REReplace(out_str, ",$", "");   // delete potential leading comma
             out_str = Reverse(out_str);
         }
 
         // add dollar sign (and parenthesis if negative)
         if(inNum LT 0) {
             return ("($" & out_str & decimal_str & ")");
         } else {
             return ("$" & out_str & decimal_str);
         }
     }
 }

---

