---
layout: udf
title:  StripBlock
date:   2002-06-21T12:14:01.000Z
library: StrLib
argString: "strString, strFirstChar, strLastChar[, strScope]"
author: Neal Barnett
authorEmail: nealb@800wine.com
version: 1
cfVersion: CF5
shortDescription: Removes all characters in a string between two characters.
description: |
 Removes all characters in a string between two characters.  Especially useful for remarks enclosed in brackets, asterisks, etc., which you don't wish to display.

returnValue: Returns a string.

example: |
 <cfset strvar = StripBlock("Show them this [but not this]","[","]")>
 <cfoutput>#strvar#</cfoutput>

args:
 - name: strString
   desc: String to modify.
   req: true
 - name: strFirstChar
   desc: Character to begin removal.
   req: true
 - name: strLastChar
   desc: Character to end removal.
   req: true
 - name: strScope
   desc: ALL or ONE. Signifies how many replacements to make. Default is ALL.
   req: false


javaDoc: |
 /**
  * Removes all characters in a string between two characters.
  * 
  * @param strString      String to modify. (Required)
  * @param strFirstChar      Character to begin removal. (Required)
  * @param strLastChar      Character to end removal. (Required)
  * @param strScope      ALL or ONE. Signifies how many replacements to make. Default is ALL. (Optional)
  * @return Returns a string. 
  * @author Neal Barnett (nealb@800wine.com) 
  * @version 1, June 21, 2002 
  */

code: |
 function StripBlock(strString,strFirstChar,strLastChar) 
 {
     // Special Chars - Don't include ] (end-bracket) since it must be the
     // first character within brackets [ ] in the regular expression
     var strSpecialChars = "+*?.[^$(){}|\&##-";
     
     // Default to replace all blocks in string unless they passed a scope
     var strScope = "ALL";  
     if (ArrayLen(Arguments) gt 3)
           strScope = Arguments[4];
         
     // Escape the start and end chars if they're special
     if (FindNoCase(strFirstChar,strSpecialChars)) 
         strFirstChar = "\" & strFirstChar;
     if (FindNoCase(strLastChar,strSpecialChars)) 
         strLastChar = "\" & strLastChar;
 
     return REReplaceNoCase(strString,strFirstChar & "[^" & strLastChar & "]*" & strLastChar,"","#strScope#");
 }

---

