---
layout: udf
title:  CommaFormat
date:   2002-08-26T10:57:25.000Z
library: StrLib
argString: "inNum[, default]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Adds commas after every third non-ending digit to the left of the decimal point.
description: |
 Adds commas after every third non-ending digit to the left of the decimal point. Does not alter anything to the right of the decimal point nor does it do any additional formatting. If value passed is not a number then returns the raw string, or the specified optional default value. Additionally, since numbers with leading and trailing spaces are still considered valid by IsNumeric(), this function preserves these spaces as well. Numbers in scientific notation also work fine with this function.

returnValue: Returns a string.

example: |
 <cfoutput>
 
 CommaFormat("123456789"):<br>
 #CommaFormat("123456789")#<br>
 <br>
 CommaFormat("1234.123456"):<br>
 #CommaFormat("1234.123456")#<br>
 <br>
 CommaFormat("-1234"):<br>
 #CommaFormat("-1234")#<br>
 <br>
 CommaFormat("+1234"):<br>
 #CommaFormat("+1234")#<br>
 <br>
 CommaFormat("123"):<br>
 #CommaFormat("123")#<br>
 <br>
 CommaFormat("1234.1234E-5"):<br>
 #CommaFormat("1234.1234E-5")#<br>
 <br>
 CommaFormat("(see note)"):<br>
 #CommaFormat("(see note)")#<br>
 <br>
 CommaFormat(".", "not a number"):<br>
 #CommaFormat(".", "not a number")#<br>
 <br>
 CommaFormat("$1", "not a number"):<br>
 #CommaFormat("$1", "not a number")#<br>
 <br>
 CommaFormat("1%", "not a number"):<br>
 #CommaFormat("1%", "not a number")#<br>
 <br>
 CommaFormat("1,234", "not a number"):<br>
 #CommaFormat("1,234", "not a number")#<br>
 
 </cfoutput>

args:
 - name: inNum
   desc: Number to format.
   req: true
 - name: default
   desc: If number isn't numeric, display default instead.
   req: false


javaDoc: |
 /**
  * Adds commas after every third non-ending digit to the left of the decimal point.
  * 
  * @param inNum      Number to format. (Required)
  * @param default      If number isn't numeric, display default instead. (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, August 26, 2002 
  */

code: |
 function CommaFormat(inNum) {
     var outStr  = "";
     var decStr  = "";
 
     var default_value = inNum;
     if(ArrayLen(Arguments) GTE 2) default_value = Arguments[2];
 
     if (not IsNumeric(inNum)) {
         return (default_value);
     } else {
         if(ListLen(inNum, ".") GT 1) {
             outStr = ListFirst(inNum, ".");
             decStr = "." & ListLast(inNum, ".");
         } else if (Find(".", Trim(inNum)) EQ 1) {
             decStr = inNum;
         } else {
             outStr = inNum;
         }
         if (Trim(outStr) NEQ "") {
             outStr = Reverse(outStr);
             outStr = REReplace(outStr, "([0-9][0-9][0-9])", "\1,", "ALL");
             outStr = REReplace(outStr, ",$", "");   // delete potential leading comma
             outStr = REReplace(outStr, ",([^0-9]+)", "\1");   // delete leading comma w/ spaces in front of
             outStr = Reverse(outStr);
         }
         return (outStr & decStr);
     }
 }

---

