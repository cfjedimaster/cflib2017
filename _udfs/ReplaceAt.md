---
layout: udf
title:  ReplaceAt
date:   2002-06-26T19:02:47.000Z
library: StrLib
argString: "theString, oldSubString, newSubString, startIndex[, theScope]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Replaces oldSubString with newSubString from a specified starting position.
description: |
 An enhanced version of CF's Replace() function. Returns theString with occurrence(s) of oldSubString replaced with newSubString in a specified scope starting from the startIndex. This startIndex feature can be especially useful for partial and/or conditional replacements.

returnValue: Returns a string.

example: |
 An example of a conditional replacement:<br>
 <br>
 <cfscript>
 before_str    = "X. red&nbsp;&nbsp;X. orange&nbsp;&nbsp;X. yellow";
 after_str     = before_str;
 i             = 1;
 replace_str   = 1;
 do {
     previous_str  = after_str;
     after_str         = ReplaceAt(after_str, "X", replace_str, i);
     i             = i + Len(replace_str);
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
 <cfset b_str = "xxxxxxxxxxxxxxxxxx">
 <cfoutput>
 before:<br>
 #b_str#<br>
 <br>
 after:<br>
 #ReplaceAt(b_str, "x", "y", Int(Len(b_str)/2), "ALL")#<br>
 </cfoutput>

args:
 - name: theString
   desc: The string to modify.
   req: true
 - name: oldSubString
   desc: The substring to replace.
   req: true
 - name: newSubString
   desc: The substring to use as a replacement.
   req: true
 - name: startIndex
   desc: Where to start replacing in the string.
   req: true
 - name: theScope
   desc: Number of replacements to make. Default is "ONE". Value can be "ONE" or "ALL."
   req: false


javaDoc: |
 /**
  * Replaces oldSubString with newSubString from a specified starting position.
  * 
  * @param theString      The string to modify. (Required)
  * @param oldSubString      The substring to replace. (Required)
  * @param newSubString      The substring to use as a replacement. (Required)
  * @param startIndex      Where to start replacing in the string. (Required)
  * @param theScope      Number of replacements to make. Default is "ONE". Value can be "ONE" or "ALL." (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function ReplaceAt(theString, oldSubString, newSubString, startIndex){
     var targetString  = "";
     var preString     = "";
 
     var theScope      = "ONE";
     if(ArrayLen(Arguments) GTE 5) theScope    = Arguments[5];
 
     if (startIndex LTE Len(theString)) {
         targetString = Right(theString, Len(theString)-startIndex+1);
         if (startIndex GT 1) preString = Left(theString, startIndex-1);
         return preString & Replace(targetString, oldSubString, newSubString, theScope);
     } else {
         return theString;
     }
 }

---

