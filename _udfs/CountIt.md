---
layout: udf
title:  CountIt
date:   2003-10-17T12:55:57.000Z
library: StrLib
argString: "str, c"
author: Peini Wu
authorEmail: pwu@hunter.com
version: 1
cfVersion: CF5
shortDescription: Get a count on searching string in the searched string.
tagBased: false
description: |
 Get a count on searching string in the searched string. Simular to ListLen, however this UDF accepts a string, not a single character, as a delimiter.

returnValue: Returns a numeric value.

example: |
 <CFSET STR = "what a world what a world what a world">
 <CFOUTPUT>
 STR=#STR#<BR>
 CountIt(STR,"what a world") = 
 #CountIt(STR, "what a world")#<BR>
 CountIt(STR,"world") = 
 #CountIt(STR, "world")#<BR>
 CountIt(STR,"d") = 
 #CountIt(STR, "d")#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: The string to search.
   req: true
 - name: c
   desc: The string to look for.
   req: true


javaDoc: |
 /**
  * Get a count on searching string in the searched string.
  * Updated by Raymond Camden
  * 
  * @param str      The string to search. (Required)
  * @param c      The string to look for. (Required)
  * @return Returns a numeric value. 
  * @author Peini Wu (pwu@hunter.com) 
  * @version 1, October 17, 2003 
  */

code: |
 function CountIt(str, c) {
     var pos = findnocase(c, str, 1);
     var count = 0;
 
     if(c eq "") return 0;
     
     while(pos neq 0){
         count = count + 1;
         pos = findnocase(c, str, pos+len(c));
     }
     
     return count;
 }

oldId: 304
---

