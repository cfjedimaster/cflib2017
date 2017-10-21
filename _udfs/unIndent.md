---
layout: udf
title:  unIndent
date:   2009-03-07T19:13:55.000Z
library: StrLib
argString: "str"
author: Nathan Strutz
authorEmail: strutz@gmail.com
version: 0
cfVersion: CF5
shortDescription: Un-indents strings but preserves formatting
description: |
 Removes unnecessary leading tabs or spaces (whitespace chars) from each line of a string, preserving the formatting while flushing the string left. It is basically a block un-indent (like your IDE probably does with shift-tab).

returnValue: returns a string

example: |
 <pre>
 <cfsavecontent variable="str">
     <tag>
         <child>
     </tag>
 </cfsavecontent>
 <cfoutput>#htmlCodeFormat(unIndent(str))#</cfoutput>
 </pre>

args:
 - name: str
   desc: String to be modified
   req: true


javaDoc: |
 /**
  * Un-indents strings but preserves formatting
  * 
  * @param str      String to be modified (Required)
  * @return returns a string 
  * @author Nathan Strutz (strutz@gmail.com) 
  * @version 0, March 7, 2009 
  */

code: |
 function unIndent(str) {
     var lines = str.split("\n");
     var i = 0;
     var minSpaceDist = 9999;
     var newStr = "";
 
     for(i=1; i lte arrayLen(lines); i=i+1) {
         if (len(trim(lines[i]))) {
             minSpaceDist = max( min(minSpaceDist, reFind("[\S]",lines[i])-1), 0);
         }
     }
 
     for(i=1; i lte arrayLen(lines); i=i+1) {
         newStr = newStr & removeChars(lines[i], 1, minSpaceDist) & chr(10);
     }
     return newStr;
 }

---

