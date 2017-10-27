---
layout: udf
title:  HighlightFromTo
date:   2002-09-24T17:54:48.000Z
library: StrLib
argString: "str, start, end[, startHi][, endHi]"
author: Scott Delatush
authorEmail: delatush@yahoo.com
version: 2
cfVersion: CF5
shortDescription: Applies a simple highlight from and to a given position in a string.
tagBased: false
description: |
 Applies a simple highlight from and to a given position in a string. Works well to quickly reference certain position of characters in large strings.

returnValue: Returns a string.

example: |
 <cfoutput>
 #highLightFromTo("1234567890",5,8)#<br>
 </cfoutput>

args:
 - name: str
   desc: String to modify.
   req: true
 - name: start
   desc: Position to insert highlight.
   req: true
 - name: end
   desc: Position to end highlight.
   req: true
 - name: startHi
   desc: String to use for the beginning of the highlight. Defaults to <span style="background-color&#58; yellow;">
   req: false
 - name: endHi
   desc: String to use for the end of the highlight. Defaults to </span>
   req: false


javaDoc: |
 /**
  * Applies a simple highlight from and to a given position in a string.
  * version 2 by rcmamden
  * 
  * @param str      String to modify. (Required)
  * @param start      Position to insert highlight. (Required)
  * @param end      Position to end highlight. (Required)
  * @param startHi      String to use for the beginning of the highlight. Defaults to <span style="background-color: yellow;"> (Optional)
  * @param endHi      String to use for the end of the highlight. Defaults to </span> (Optional)
  * @return Returns a string. 
  * @author Scott Delatush (delatush@yahoo.com) 
  * @version 2, September 24, 2002 
  */

code: |
 function HighLightFromTo(str,start, end) {
     var startHi = "<span style=""background-color: yellow;"">";
     var endHi = "</span>";
 
     if(arrayLen(arguments) gte 4) startHi = arguments[4];
     if(arrayLen(arguments) gte 5) endHi = arguments[5];
 
     if(start gte (len(str) - 1)) return str;
     if(end gte len(str)) end = len(str);
 
     str = insert(startHi,str,start-1);
     str = insert(endHi,str,end+len(startHi));
     return str;
 }

oldId: 721
---

