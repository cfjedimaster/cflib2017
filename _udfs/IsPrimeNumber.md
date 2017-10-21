---
layout: udf
title:  IsPrimeNumber
date:   2001-11-21T17:14:14.000Z
library: MathLib
argString: "inNum"
author: Douglas Williams
authorEmail: klenzade@i-55.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the specified number is a prime number.
description: |
 Returns True if the specified number is a prime number.  A prime number is a positive integer that has two postive integer factors (the number is evenly divisible by 1 and itself).  Note that 1 is not a prime number.

returnValue: Returns a Boolean value

example: |
 <cfset mynum = 11>
 <cfset mynum2 = 15>
 
 <cfoutput>
 Given mynum = #mynum#<br>
 IsPrimeNumber returns #IsPrimeNumber(mynum)#<br>
 Given mynum2 = #mynum2#<br>
 IsPrimeNumber returns #IsPrimeNumber(mynum2)# 
 </cfoutput>

args:
 - name: inNum
   desc: Any integer greater than one that  you wish to test for prime.
   req: true


javaDoc: |
 /**
  * Returns True if the specified number is a prime number.
  * Minor edits by Rob Brooks-Bilson (rbils@amkor.com).  Edit by Steve Ford (steve.ford@enline.com) to fix misidentification of 4 as a prime number.  Algorithm improved by Shakti Shrivastava (divine_shammer@yahoo.com) -check up to sqr root of integer.  Further refined by Sierra Bufe (sierra@brighterfusion.com).
  * 
  * @param inNum      Any integer greater than one that  you wish to test for prime. 
  * @return Returns a Boolean value 
  * @author Douglas Williams (klenzade@i-55.com) 
  * @version 1.2, November 21, 2001 
  */

code: |
 function IsPrimeNumber(inNum)
 {
   var i=0;
   if (inNum lt 2){
     return False;
     break;
   }
   for (i=2; i LTE (sqr(inNum)); i=i+1) {
     if (NOT inNum MOD i) {
       return False;
       break;
     }
   }
   return True;
 }

---

