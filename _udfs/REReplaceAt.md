---
layout: udf
title:  REReplaceAt
date:   2002-06-26T19:03:13.000Z
library: StrLib
argString: "theString, regExpression, newSubString, startIndex[, theScope]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Replaces a regular expression with newSubString from a specified starting position.
tagBased: false
description: |
 An enhanced version of CF's REReplace() function. Returns theString with occurrence(s) of the specified regular expression replaced with newSubString starting from the startIndex and optionally within the provided scope. This startIndex feature can be especially useful for partial and/or conditional replacements.

returnValue: Returns a string.

example: |
 An example of a conditional replacement:<br>
 <br>
 <cfscript>
 before_str    = "A. red&nbsp;&nbsp;B. orange&nbsp;&nbsp;C. yellow";
 after_str     = before_str;
 i             = 1;
 replace_str   = 1;
 do {
     previous_str  = after_str;
     after_str     = REReplaceAt(after_str, "[A-Z]\.", replace_str & ".", i);
     i             = i + Len(replace_str)+1;
     replace_str   = replace_str +1;
 } while (after_str NEQ previous_str);
 </cfscript>
 
 <cfoutput>
 before:<br>
 #before_str#<br>
 <br>
 after:<br>
 #after_str#<br>
 </cfoutput>
 <br>
 <br>
 <br>
 
 An example of a partial replacement:<br>
 <br>
 <cfset b_str = "abcdefghijklmnopqrstuvwxyz">
 <cfoutput>
 before:<br>
 #b_str#<br>
 <br>
 after:<br>
 #REReplaceAt(b_str, "[a-z]", "-", Int(Len(b_str)/2), "ALL")#<br>
 </cfoutput>

args:
 - name: theString
   desc: The string to format.
   req: true
 - name: regExpression
   desc: The regular expression to look for.
   req: true
 - name: newSubString
   desc: The string to use as a replacement.
   req: true
 - name: startIndex
   desc: Where to begin replacing.
   req: true
 - name: theScope
   desc: pe   Number of replacements to make. Default is "ONE". Value can be "ONE" or "ALL."
   req: false


javaDoc: |
 /**
  * Replaces a regular expression with newSubString from a specified starting position.
  * 
  * @param theString      The string to format. (Required)
  * @param regExpression      The regular expression to look for. (Required)
  * @param newSubString      The string to use as a replacement. (Required)
  * @param startIndex      Where to begin replacing. (Required)
  * @param theScope      pe   Number of replacements to make. Default is "ONE". Value can be "ONE" or "ALL." (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function REReplaceAt(theString, regExpression, newSubString, startIndex){
     var targetString  = "";
     var preString     = "";
 
     var theScope      = "ONE";
     if(ArrayLen(Arguments) GTE 5) theScope    = Arguments[5];
 
     if (startIndex LTE Len(theString)) {
         targetString = Right(theString, Len(theString)-startIndex+1);
         if (startIndex GT 1) preString = Left(theString, startIndex-1);
         return preString & REReplace(targetString, regExpression, newSubString, theScope);
     } else {
         return theString;
     }
 }

---

