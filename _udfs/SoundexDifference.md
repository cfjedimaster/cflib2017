---
layout: udf
title:  SoundexDifference
date:   2003-05-26T10:10:59.000Z
library: StrLib
argString: "str1, str2"
author: Benjamin Pate / Steve Bianco
authorEmail: benjamin@pate.org
version: 1
cfVersion: CF5
shortDescription: Returns the difference between the SOUNDEX values of two strings
description: |
 Returns the difference between the SOUNDEX values of two strings as an integer from 0-4. 0=No match, 4=Exact match.
 
 This function replicates the COMPARE function in MS SQL 2000, comparing the SOUNDEX values of two strings.  This UDF requires the Soundex function by Ben Forta, which can be downloaded from cflib.org

returnValue: Returns a number.

example: |
 <cfoutput>
     #soundex('steven')# #soundex('stephen')# #SoundexDifference('steven', 'stephen')#<br>
 </cfoutput>

args:
 - name: str1
   desc: First string.
   req: true
 - name: str2
   desc: Second string.
   req: true


javaDoc: |
 /**
  * Returns the difference between the SOUNDEX values of two strings
  * 
  * @param str1      First string. (Required)
  * @param str2      Second string. (Required)
  * @return Returns a number. 
  * @author Benjamin Pate / Steve Bianco (benjamin@pate.org) 
  * @version 1, May 26, 2003 
  */

code: |
 /**
  * Returns the difference between the SOUNDEX values of two
  * strings as an integer from 0-4. 0=No match, 4=Exact match.
  *
  * Note: Requires SOUNDEX UDF from Ben Forta
  *
  * @param str1    First string to be compared
  * @param str2    Second string to be compared
  * @return returns a number from 0 to 4
  * @author Benjamin Pate B525 P300 (benjamin@pate.org)
  * @author Steven Bianco S315 B520 (steventbianco@yahoo.com)
  * @version 1, April 17, 2003
  */
 
 function SoundexDifference(str1, str2)
 {
     var temp1 = Soundex(str1);
     var temp2 = Soundex(str2);
 
     var i = 0;
     var result = 0;
     
     for (i = 1 ; i LTE 4 ; i = i + 1)
     {
         if (MID(temp1, i, 1) IS MID(temp2, i , 1))
         {
             result = result + 1;
         }
     }
     return result;
 }

---

