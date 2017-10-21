---
layout: udf
title:  verityPercentage
date:   2003-05-09T18:09:04.000Z
library: StrLib
argString: "num"
author: Howard Owens
authorEmail: howens@insidevc.com
version: 1
cfVersion: CF5
shortDescription: Takes a verity &quot;score&quot; value and returns a formatted percentage.
description: |
 Takes a verity &quot;score&quot; value and returns a formatted percentage.
 
 When verity returns a score, it usually looks like 0.87454, which is not an intuitive number for site browser to discern.  This UDF formats the SCORE into something 88%, which is easier to read.

returnValue: Returns a string.

example: |
 <cfset score="0.87899">
 
 <CFOUTPUT>
 #verityPercentage(score)#
 </CFOUTPUT>

args:
 - name: num
   desc: Verity score.
   req: true


javaDoc: |
 /**
  * Takes a verity &quot;score&quot; value and returns a formatted percentage.
  * 
  * @param num      Verity score. (Required)
  * @return Returns a string. 
  * @author Howard Owens (howens@insidevc.com) 
  * @version 1, August 10, 2003 
  */

code: |
 function verityPercentage(num){
     var outNum = '';
     var leftDigit=ListFirst(num, '.');
     var rightDigits=Left(ListGetAt(num, 2, '.'), 2);
     
     if (right(rightDigits, 2) GTE 5) rightDigits = rightDigits+1;
 
     if (leftDigit gte 1) outNum='100' & '%';
     else outNum=RightDigits & '%';
     
     return outNum;
 }

---

