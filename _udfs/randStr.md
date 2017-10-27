---
layout: udf
title:  randStr
date:   2007-04-02T15:47:26.000Z
library: StrLib
argString: "strLen, charset"
author: Bobby Hartsfield
authorEmail: bobby@acoderslife.com
version: 2
cfVersion: CF5
shortDescription: Returns a randomly generated string using the specified character sets and length(s)
tagBased: false
description: |
 randStr returns a randomly generated string using lowercase letters, and/or numbers and possible uppercase letters. 
 
 The length of the string can be set specifically or the function can choose a random length within a specified range. eg: &quot;8,16&quot; will generate a string 8 to 16 characters long: &quot;5&quot; would only generate strings with 5 characters.
 
 The characters used are based on your own preference. You may build a 'charset' using any of the three words &quot;alpha, numeric, and upper&quot;.
 
 Alpha = a-z
 Upper = A-Z
 Numeric = 0-9

returnValue: Returns a string.

example: |
 <cfoutput>
 #randStr("8,16", "alphanumericupper")#
 </cfoutput>

args:
 - name: strLen
   desc: Either a number of a list of numbers representing the range in size of the returned string.
   req: true
 - name: charset
   desc: A string describing the type of random string. Can contain&#58; alpha, numeric, and upper.
   req: true


javaDoc: |
 /**
  * Returns a randomly generated string using the specified character sets and length(s)
  * 
  * @param strLen      Either a number of a list of numbers representing the range in size of the returned string. (Required)
  * @param charset      A string describing the type of random string. Can contain: alpha, numeric, and upper. (Required)
  * @return Returns a string. 
  * @author Bobby Hartsfield (bobby@acoderslife.com) 
  * @version 2, April 2, 2007 
  */

code: |
 function randStr(strLen, charSet) {
     var usableChars = "";
     var charSets = arrayNew(1);
     var tmpStr = "";    
     var newStr = "";
     var i = 0;
     var thisCharPos = 0;
     var thisChar = "";
     
     charSets[1] = '48,57';    // 0-9
     charSets[2] = '65,90';    // A-Z
     charSets[3] = '97,122';    // a=z
     
     if (findnocase('alpha', charSet)) { usableChars = listappend(usableChars, 3); }
     
     if (findnocase('numeric', charSet)) { usableChars = listappend(usableChars, 1); }
     
     if (findnocase('upper', charSet)) { usableChars = listappend(usableChars, 2); }
     
     if (len(usableChars) is 0) { usableChars = '1,2,3'; }
 
     if(listlen(strLen) gt 1 and listfirst(strLen) lt listlast(strLen)) { strLen = randrange(listfirst(strLen), listlast(strLen)); }
     else if (val(strLen) is 0) { strLen = 8; }
     
     
     while (len(tmpStr) LE strLen-1)
     {
         thisSet = listFirst(usableChars);
         usableChars = listdeleteat(usableChars, 1);
         usableChars = listappend(usableChars, thisSet);
     
         tmpStr = tmpStr & chr(randrange(listfirst(charSets[thisSet]), listlast(charSets[thisSet])));
     }
     
     for (i=1; i lte strLen; i=i+1)
     {
         thisCharPos = randrange(1, len(tmpStr));
         thisChar = mid(tmpStr, thisCharPos, 1);
         tmpStr = removeChars(tmPStr, thisCharPos, 1);
         newstr = newstr & thisChar;
     }
     
     return newStr;
 }

oldId: 1609
---

