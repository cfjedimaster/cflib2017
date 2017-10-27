---
layout: udf
title:  differentChars
date:   2004-02-06T20:40:56.000Z
library: StrLib
argString: "string[, caseSensitive]"
author: Bjorn Jensen
authorEmail: public.cflib@saghian.com
version: 1
cfVersion: CF5
shortDescription: Counts how many different chars are in a string.
tagBased: false
description: |
 Counts how many different chars are in a string. Usable for passwords where you can ensure there is at least x different chars, can check case sensitive and not.

returnValue: Returns a number.

example: |
 <cfset mystring = "aAbBcC">
 <cfoutput>
 Not case sensitive: #differentChars(mystring)#<br>
 Case sensitive: #differentChars(mystring,true)#
 </cfoutput>

args:
 - name: string
   desc: String to check.
   req: true
 - name: caseSensitive
   desc: Determines if case sensitivity is used. Defaults to false.
   req: false


javaDoc: |
 /**
  * Counts how many different chars are in a string.
  * removed use of arguments. to make it cf5 compat
  * 
  * @param string      String to check. (Required)
  * @param caseSensitive      Determines if case sensitivity is used. Defaults to false. (Optional)
  * @return Returns a number. 
  * @author Bjorn Jensen (public.cflib@saghian.com) 
  * @version 1, February 6, 2004 
  */

code: |
 function differentChars(string){
     var iCount = 0;
     var i = 0;
     var sChars = "";
     var sChar = "";
     var caseSensitive = false;
 
     if (arrayLen(arguments) eq 2 and isBoolean(arguments[2]) and arguments[2]) {
         caseSensitive = true;
     }
     
     for(i=1;i lte len(string);i=i+1){
         sChar = mid(string, i, 1);
         if (caseSensitive and not find(sChar, sChars)){
             sChars = sChars & sChar;
             iCount = iCount+1;
         } else if (not caseSensitive and not findNoCase(sChar, sChars)){
             sChars = sChars & sChar;
             iCount = iCount+1;
         }
     }
 
     return iCount;
 }

oldId: 994
---

