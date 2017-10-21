---
layout: udf
title:  NumberUnFormat
date:   2002-12-23T20:51:15.000Z
library: StrLib
argString: "inStr[, default_value]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Removes all non-essential formatting from a number.
description: |
 Removes all non-essential formatting from a number. If no number exists then returns the raw string, or (if specified) the optional default value. Similar to Mark Andrachek's GetNumbers, but preserves minus signs and always keeps the decimal places, and provides exceptions for entirely non-numeric strings. (Note: numbers in scientific notation will not work with this function.)

returnValue: Returns a number or string.

example: |
 <cfoutput>
 NumberUnFormat("-10")<br>
 #NumberUnFormat("-10")#<br>
 <br>
 NumberUnFormat("1.5432%")<br>
 #NumberUnFormat("1.5432%")#<br>
 <br>
 NumberUnFormat("$1,499.95")<br>
 #NumberUnFormat("$1,499.95")#<br>
 <br>
 NumberUnFormat("down 3 points")<br>
 #NumberUnFormat("down 3 points")#<br>
 <br>
 NumberUnFormat("&lt;b&gt;3,000,000&lt;/b&gt;")<br>
 #NumberUnFormat("<b>3,000,000</b>")#<br>
 <br>
 NumberUnFormat("no digits")<br>
 #NumberUnFormat("no digits")#<br>
 <br>
 NumberUnFormat("no digits", "0.00")<br>
 #NumberUnFormat("no digits", "0.00")#<br>
 </cfoutput>

args:
 - name: inStr
   desc: String to format.
   req: true
 - name: default_value
   desc: Used if the formatted string is empty. Defaults to inStr.
   req: false


javaDoc: |
 /**
  * Removes all non-essential formatting from a number.
  * 
  * @param inStr      String to format. (Required)
  * @param default_value      Used if the formatted string is empty. Defaults to inStr. (Optional)
  * @return Returns a number or string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, December 23, 2002 
  */

code: |
 function NumberUnFormat(inStr) {
     var outNum = 0;
     var default_value = inStr;
 
     if(ArrayLen(Arguments) GTE 2) default_value = Arguments[2];
 
     outNum = REReplace(inStr,"[^0-9\.\-]",'','ALL');
     if (Len(outNum) LT 1) {
         outNum = default_value;
     }
 
     return outNum;
 }

---

