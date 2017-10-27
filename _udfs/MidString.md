---
layout: udf
title:  MidString
date:   2001-11-02T09:41:05.000Z
library: StrLib
argString: "string, from[, to]"
author: Andrew Cripps
authorEmail: andrew@cripps.net
version: 1
cfVersion: CF5
shortDescription: Midstring&#58; Return the middle part of a string between a specified start substring and a specified end substring.
tagBased: false
description: |
 The Midstring function returns the middle string between two substrings. The from and to strings should be unique in the string from which you want the substring because the function only looks for the first match of each string. So if you have string "ApplePearApple" and enter "Apple" as both the to and the from string, you will get an empty string back.
 Note that all strings are case sensitive.

returnValue: Returns the string between the delimiters.

example: |
 <cfset string="ApplePearPlum">
 <cfset fromstr="Apple">
 <cfset tostr="Plum">
 <cfset result = midstring(string,fromstr,tostr)>
 <cfoutput>
 string=#string#<BR>
 Mid from Apple to Plum = #result#<BR>
 </cfoutput>
 <cfset string="ApplePearPlumApple">
 <cfset fromstr="Apple">
 <cfset result = midstring(string,fromstr)>
 <cfoutput>
 string=#string#<BR>
 Mid using only Apple  = #result#
 </cfoutput>

args:
 - name: string
   desc: The string to check.
   req: true
 - name: from
   desc: The initial string to use as a delimiter.
   req: true
 - name: to
   desc: The ending string to use as a delimiter.
   req: false


javaDoc: |
 /**
  * Midstring: Return the middle part of a string between a specified start substring and a specified end substring.
  * 
  * @param string      The string to check. 
  * @param from      The initial string to use as a delimiter. 
  * @param to      The ending string to use as a delimiter. 
  * @return Returns the string between the delimiters. 
  * @author Andrew Cripps (andrew@cripps.net) 
  * @version 1, December 3, 2001 
  */

code: |
 function midstring(string,from) {
     var start="";
     var end="";
     var lenstart="";
     var to=from;
     
     if(arrayLen(arguments) gte 3) to = arguments[3];
     
     start = refind(from,string);
     end = refind(to,string,len(from)+start);
     lenstart = len(from);
     return mid(string,start+lenstart,max(end-start-lenstart,0));
     
 }

oldId: 334
---

