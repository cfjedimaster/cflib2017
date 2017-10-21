---
layout: udf
title:  IsPalindrome
date:   2001-11-22T14:05:28.000Z
library: StrLib
argString: "string"
author: Douglas Williams
authorEmail: klenzade@i-55.com
version: 1
cfVersion: CF5
shortDescription: Checks string to see if it is a pPalindrome.
description: |
 Checks string to see if it is a palindrome. A palindrome is any word or phrase that is the same spelled forwards or backwards. The test performed will ignore spaces and punctuation.

returnValue: Returns a boolean.

example: |
 <cfset mystr = "racecar">
 <cfset complex = "Sums are not set as a test on Erasmus">
 <cfset bad = "This will not work.">
 
 <cfoutput>
 Is "racecar" a Palindrome: #isPalindrome(mystr)#<BR>
 Is "Sums are not set as a test on Erasmus" a Palindrome: #isPalindrome(complex)#<BR>
 Is "This will not work." a Palindrome: #isPalindrome(bad)#<BR>
 </cfoutput>

args:
 - name: string
   desc: The string to check.
   req: true


javaDoc: |
 /**
  * Checks string to see if it is a pPalindrome.
  * Modified by Raymond Camden
  * 
  * @param string      The string to check. 
  * @return Returns a boolean. 
  * @author Douglas Williams (klenzade@i-55.com) 
  * @version 1, November 22, 2001 
  */

code: |
 function isPalindrome(string) {
   var newstring = rereplacenocase(string, '[^a-z1-9]','', 'ALL');
   return newstring eq reverse(newstring);
 }

---

