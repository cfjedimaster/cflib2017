---
layout: udf
title:  CompareIgnoreWhiteSpace
date:   2008-12-02T17:03:52.000Z
library: StrLib
argString: "string1, string2[, isCompareCaseSensitive]"
author: Mark G. Smith
authorEmail: mark.g.smith@baesystems.com
version: 1
cfVersion: CF5
shortDescription: Performs a comparison of two strings ignoring any whitespace characters.
description: |
 Performs a comparison of two strings ignoring any whitespace characters including form feeds, line feeds, carriage returns, tabs, vertical tabs, and spaces.  Comparison is case sensitive unless a third argument of &quot;false&quot; is passed in.

returnValue: Returns a boolean.

example: |
 <cfset str1 = "The quick brown fox jumps over the lazy dog.">
 <cfset str2 = "The quick brown     fox jumps over the lazy     dog.">
 <cfset strChange = CompareIgnoreWhiteSpace(str1,str2)>
 <cfif strChange eq 0>
     The strings are equal!
 <cfelse>
     The strings are NOT equal!
 </cfif>

args:
 - name: string1
   desc: First string to compare.
   req: true
 - name: string2
   desc: Second string to compare.
   req: true
 - name: isCompareCaseSensitive
   desc: Determines if the comparison should check case. Default is true.
   req: false


javaDoc: |
 /**
  * Performs a comparison of two strings ignoring any whitespace characters.
  * 
  * @param string1      First string to compare. (Required)
  * @param string2      Second string to compare. (Required)
  * @param isCompareCaseSensitive      Determines if the comparison should check case. Default is true. (Optional)
  * @return Returns a boolean. 
  * @author Mark G. Smith (mark.g.smith@baesystems.com) 
  * @version 1, December 2, 2008 
  */

code: |
 function CompareIgnoreWhiteSpace(string1,string2) {
     var string1NoWhiteSpace = REReplace(string1,"[\s]","","ALL");
     var string2NoWhiteSpace = REReplace(string2,"[\s]","","ALL");
     var isCompareCaseSensitive = true;
     
     if(arrayLen(arguments) gte 3) isCompareCaseSensitive = arguments[3];
     
     if (isCompareCaseSensitive)
         return Compare(string1NoWhiteSpace, string2NoWhiteSpace);
     else
         return CompareNoCase(string1NoWhiteSpace, string2NoWhiteSpace);
 }

---

