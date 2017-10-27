---
layout: udf
title:  IntegerRankFormat
date:   2002-12-23T20:45:10.000Z
library: StrLib
argString: "num"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Turn 1 into 1st, 2 into 2nd, etc.
tagBased: false
description: |
 Takes an integer and gives it back to you formatted as a &quot;rank&quot;.  1 becomes &quot;1st&quot;, 2 becomes &quot;2nd&quot;, 199329 becomes &quot;199,329th&quot; -- you get the idea.

returnValue: Returns a string.

example: |
 <cfloop list="1,2,3,4,5,11,12,13,45,1864203,19992,56311" index="num">
     <cfoutput>#IntegerRankFormat(num)#<br></cfoutput>
 </cfloop>

args:
 - name: num
   desc: Number to format.
   req: true


javaDoc: |
 /**
  * Turn 1 into 1st, 2 into 2nd, etc.
  * 
  * @param num      Number to format. (Required)
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, December 23, 2002 
  */

code: |
 function IntegerRankFormat(number){
     //grab the last digit
     var lastDigit = right(number,1);
     //grab the last two digits
     var lastTwoDigits = right(number,2);
     //use numberFormat() to put in commas for number larger than 999
     number = numberFormat(number);
     //11, 12, and 13 are special cases, so deal with them
     switch(lastTwoDigits){
         case 11:{
             return number & "th";
         }
         case 12:{
             return number & "th";
         }
         case 13:{
             return number & "th";
         }
     }
     //append the correct suffix based on the last number
     switch(lastDigit){
         case 1:{
             return number & "st";
         }
         case 2:{
             return number & "nd";
         }
         case 3:{
             return number & "rd";
         }
         default:{
             return number & "th";
         }
     }
 }

oldId: 805
---

