---
layout: udf
title:  CardinalToOrdinal
date:   2003-05-26T10:41:31.000Z
library: StrLib
argString: "cardinalString"
author: Howard Fore
authorEmail: me@hofo.com
version: 1
cfVersion: CF5
shortDescription: Convert cardinal number strings to ordinal number strings.
tagBased: false
description: |
 Takes a cardinal number string and converts it to an ordinal number string. This is particularly useful when combined with the NumberAsString UDF.

returnValue: Returns a string.

example: |
 <cfoutput>
 #CardinalToOrdinal("two hundred thirteen")#
 </cfoutput>

args:
 - name: cardinalString
   desc: Cardinal string to format.
   req: true


javaDoc: |
 /**
  * Convert cardinal number strings to ordinal number strings.
  * 
  * @param cardinalString      Cardinal string to format. (Required)
  * @return Returns a string. 
  * @author Howard Fore (me@hofo.com) 
  * @version 1, May 26, 2003 
  */

code: |
 function CardinalToOrdinal(cardinalString) {
   var resultString = "";        // Generated result to return
   var lastCardinal = "";        // Last word in cardinal number string
   var TempNum = 0;              // temp integer
 
   cardinalSpecialStrings = "One,one,Two,two,Three,three,Four,four,Five,five,Six,six,Eight,eight,Nine,nine,Twelve,twelve";
   ordinalSpecialStrings = "First,first,Second,second,Third,third,Fourth,fourth,Fifth,fifth,Sixth,sixth,Eighth,eighth,Ninth,ninth,Twelfth,twelfth";
   
   cardinalString = trim(cardinalString);
   lastCardinal = listLast(cardinalString," ");
   resultString = ListDeleteAt(cardinalString,ListLen(cardinalString," ")," ");
   
   // Is lastCardinal a special case?
   TempNum = listFindNoCase(cardinalSpecialStrings,lastCardinal);
   if (TempNum GT 0) {
       resultString = ListAppend(resultString,ListGetAt(ordinalSpecialStrings,TempNum)," ");
   } else {
     if (ListFindNoCase(Right(lastCardinal,2),"en"))
     {
       // Last word ends with "en", add "th"
       resultString = ListAppend(resultString,lastCardinal & "th"," ");
     } 
     if (ListFindNoCase(Right(lastCardinal,1),"d"))
     {
       // Last word ends with "d", add "th"
       resultString = ListAppend(resultString,lastCardinal & "th"," ");
     } 
     if (ListFindNoCase(Right(lastCardinal,1),"y"))
     {
       // Last word ends with "y", delete "y", add "ieth"
       resultString = ListAppend(resultString, Left(lastCardinal,Len(lastCardinal) - 1) & "ieth"," ");
     } 
     if (ListFindNoCase(Right(lastCardinal,3),"ion"))
     {
       // Last word ends with "ion", add "th"
       resultString = ListAppend(resultString,lastCardinal & "th"," ");
     } 
   }
   return resultString;
 }

oldId: 918
---

