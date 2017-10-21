---
layout: udf
title:  GetNumbers
date:   2001-12-18T19:35:27.000Z
library: StrLib
argString: "textStr[, allowDec]"
author: Mark Andrachek
authorEmail: hallow@webmages.com
version: 1
cfVersion: CF5
shortDescription: Returns the passed string with all non-numbers removed (letters, punctuation, whitespace, etc.).
description: |
 Returns the passed string with all non-numbers removed (letters, punctuation, whitespace, etc.).
 If an optional second argument is defined, decimals will be allowed.  Otherwise, only digits 0-9 are returned.

returnValue: Returns a number.

example: |
 <cfset mystring1="$12.42">
 <cfset mystring2="(555) 555-5555">
 
 <cfoutput>
 #GetNumbers(mystring1,1)#
 <br>
 #GetNumbers(mystring2)#
 </cfoutput>

args:
 - name: textStr
   desc: String containing numbers you want returned.
   req: true
 - name: allowDec
   desc: Boolean (yes/no) indicating whether to preserve decimal points.  Default is No.
   req: false


javaDoc: |
 /**
  * Returns the passed string with all non-numbers removed (letters, punctuation, whitespace, etc.).
  * 
  * @param textStr      String containing numbers you want returned. 
  * @param allowDec      Boolean (yes/no) indicating whether to preserve decimal points.  Default is No. 
  * @return Returns a number. 
  * @author Mark Andrachek (hallow@webmages.com) 
  * @version 1, December 18, 2001 
  */

code: |
 function GetNumbers(textstr) {
   if (arraylen(arguments) GTE 2) { 
     return REReplace(textstr,"[^0-9\.]",'','ALL'); }
   else { 
     return REReplace(textstr,"[^0-9]",'','ALL');  }
 }

---

