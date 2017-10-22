---
layout: udf
title:  strXOR
date:   2006-12-01T16:42:39.000Z
library: StrLib
argString: "str1, str2"
author: Peter Day
authorEmail: JWVPICBHZCOX@spammotel.com
version: 1
cfVersion: CF6
shortDescription: Returns as a binary object the chr by chr XOR of two given strings for length of shortest of the two.
tagBased: false
description: |
 Returns as a binary object the character by character exclusive OR of two given strings for a length of the shortest of the two. The result is the same as php: $str1 ^ $str2

returnValue: Returns a binary string.

example: |
 <cfset str1="abc">
 <cfset str2="xyzdef">
 <cfset x=BinaryEncode(strXOR(str1,str2),"hex")>
 <cfoutput>
 #x#
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
  * Returns as a binary object the chr by chr XOR of two given strings for length of shortest of the two.
  * 
  * @param str1      First string. (Required)
  * @param str2      Second string. (Required)
  * @return Returns a binary string. 
  * @author Peter Day (JWVPICBHZCOX@spammotel.com) 
  * @version 1, December 1, 2006 
  */

code: |
 function strXOR(str1,str2) {
     var theXOR="";
     var minLen=min(len(str1),len(str2)); 
     var i=1;
     
     for (; i le minLen; i=i+1 ) {
         theXOR = theXOR & rJustify(formatbaseN(bitXor(asc(mid(str1,i,1)),asc(mid(str2,i,1))),"16"),2);
     }
     
     theXOR=binaryDecode(replaceNoCase(theXOR," ","0","all"),"hex");
     return theXOR;
 }

---

