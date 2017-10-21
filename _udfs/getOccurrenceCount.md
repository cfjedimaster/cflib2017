---
layout: udf
title:  getOccurrenceCount
date:   2006-10-13T20:58:22.000Z
library: StrLib
argString: "content, countThis[, countThisDelimiter]"
author: Cody Ridgway
authorEmail: cridgway@dcccd.edu
version: 1
cfVersion: CF5
shortDescription: Count the occureneces of a value or list of values in a given string.
description: |
 Count the occurences of a value or list of values in a string.  Pass the string (lists will be treated as strings) to parse and anything from a single character to a list of various items to count and the count or list of counts will be returned.  Spaces in the item or list of items are not stripped.

returnValue: Returns a string.

example: |
 <cfset testString = "<b>This is a test string</b> with <i>text</i>, tags, || (pipes), and a      (tab) in it.">
 
 <cfoutput>
 #getOccurrenceCount(testString,"a")#<br>
 #getOccurrenceCount(testString,"., ,<b>,<,text,#Chr(9)#")#<br>
 #getOccurrenceCount(testString,",|text|#Chr(9)#", "|")#<br>
 </cfoutput>

args:
 - name: content
   desc: String to parse.
   req: true
 - name: countThis
   desc: Character, or list of characters to count.
   req: true
 - name: countThisDelimiter
   desc: Delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Count the occureneces of a value or list of values in a given string.
  * 
  * @param content      String to parse. (Required)
  * @param countThis      Character, or list of characters to count. (Required)
  * @param countThisDelimiter      Delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Cody Ridgway (cridgway@dcccd.edu) 
  * @version 1, October 13, 2006 
  */

code: |
 function getOccurrenceCount(content, countThis) {
     var countThisDelimiter = ','; 
     var countThisLen = 1; 
     var countThisItem = ';
     var returnCount = ';
     var i = 1;
     
     if(arrayLen(Arguments) GT 2) countThisDelimiter = Left(arguments[3],1);
     countThisLen = ListLen(countThis, countThisDelimiter);
     
     if(countThisLen GT 1) {
         for(i=1; i LTE countThisLen; i=i+1){
             countThisItem = listGetAt(countThis, i, countThisDelimiter);
             returnCount = ListAppend(returnCount, val(len(content) - len(replace(content,countThisItem,"","all")))/Len(countThisItem));
         }
     }
     else{
         returnCount = val(len(content) - len(replace(content,countThis,"","all")))/Len(countThis);
     }
     return returnCount;
 }

---

