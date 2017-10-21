---
layout: udf
title:  midLimit
date:   2009-05-10T00:20:29.000Z
library: StrLib
argString: "sString, nLimit"
author: Joshua Rountree
authorEmail: joshua@remote-app.com
version: 0
cfVersion: CF5
shortDescription: Limits a string from the center inserting &quot;...&quot;
description: |
 Limits a given string to a specified amount of characters.  This UDF takes the characters from the middle of the string and inserts &quot;...&quot; in it's place.

returnValue: Returns a string

example: |
 <cfset TestString = "The fox ran over the log and jumped into a hole to escape the hunter.">
 
 <cfoutput>
 Original String:<br />
 #TestString#<br /><br />
 
 Limited String to 25 characters:<br />
 #midLimit(TestString,25)#
 </cfoutput>

args:
 - name: sString
   desc: string to use
   req: true
 - name: nLimit
   desc: max length of string to use
   req: true


javaDoc: |
 /**
  * Limits a string from the center inserting &quot;...&quot;
  * 
  * @param sString      string to use (Required)
  * @param nLimit      max length of string to use (Required)
  * @return Returns a string 
  * @author Joshua Rountree (joshua@remote-app.com) 
  * @version 0, May 9, 2009 
  */

code: |
 function midLimit(sString,nLimit) {
     var nLength = Len(sString);
     var nPercent = nLimit/nLength;
     var nStart = Round(nLimit * .5);
     var nRemoveCount = (nLength - nLimit);
     var sResult = "";
     
     if(nLength GT nLimit) {
         sResult = RemoveChars(sString,nStart,nRemoveCount+3);
         sResult = Insert("...",sResult,nStart-1);
     } else {
         sResult = sString;
     }
     
     return sResult;
 }

---

