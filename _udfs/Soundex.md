---
layout: udf
title:  Soundex
date:   2004-09-23T13:34:17.000Z
library: StrLib
argString: "string"
author: Ben Forta
authorEmail: ben@forta.com
version: 2
cfVersion: CF5
shortDescription: Returns the Soundex of a string.
tagBased: false
description: |
 Soundex is a mechanism (originally created for the US Census) whereby all names (first or last) can be converted to a four character string based on sound. Using Soundex it is possible to search for names by how they sound (so search for &quot;Smith&quot; and also find &quot;Smyth&quot;).

returnValue: Returns a string.

example: |
 <CFSET STR = "Smyth">
 <CFSET STR2 = "Robert">
 <CFSET STR3 = "Raymond">
 <CFSET STR4 = "Jacob">
 <CFOUTPUT>
 The soundex for #STR# is #Soundex(STR)#<BR>
 The soundex for #STR2# is #Soundex(STR2)#<BR>
 The soundex for #STR3# is #Soundex(STR3)#<BR>
 The soundex for #STR4# is #Soundex(STR4)#<BR>
 </CFOUTPUT>

args:
 - name: string
   desc: String to be modified.
   req: true


javaDoc: |
 /**
  * Returns the Soundex of a string.
  * Version 2 by Andrew Northcutt (andrewn@edgeinformation.com)
  * 
  * @param string      String to be modified. (Required)
  * @return Returns a string. 
  * @author Ben Forta (ben@forta.com) 
  * @version 2, September 23, 2004 
  */

code: |
 function Soundex(string) {
   var WorkString=UCase(string);
   var NumList="";
   var NumListTemp="";
   var Num="";
   var FirstChar="";
   var Result="";
   var i = 1; //our loop iterator
 
   // Eliminate all non A-Z chars
   WorkString=REReplace(WorkString,"[^A-Z]","","ALL");
 
   // Save 1st character
   FirstChar=Left(WorkString,1);
 
   // Loop through string
   for (i=1; i LTE Len(WorkString); i=i+1) {
     // Init var each time around
     Num="";
     // Convert each character to numbers 1-6
     // AN: 8 is used for exceptions concerning the w and h characters
     // AN: See: 'http://www.archives.gov/research_room/genealogy/census/soundex.html' for more info
     // 9 is used as place-holder for chars to be ignored
     switch (Mid(WorkString,i,1)) {
       case "B":
       case "F":
       case "P":
       case "V": Num=1;
                 break;
       case "C":
       case "G":
       case "J":
       case "K":
       case "Q":
       case "S":
       case "X":
       case "Z": Num=2;
                 break;
       case "D":
       case "T": Num=3;
                 break;
       case "L": Num=4;
                 break;
       case "M":
       case "N": Num=5;
                 break;
 
       case "R": Num=6;
                 break;
       case "H":
       case "W": Num=8;
                 break;
       //A,E,I,O,U,Y?
       default: Num=9;
                break;
     }
     // Append to list
     NumList=ListAppend(NumList,Num);
   }
 
   // Next get rid of any side-by-side dupes
   NumListTemp=ListFirst(NumList);
   for (i=2; i LTE ListLen(NumList); i=i+1) {
     // Append only if not same as previous char
     if (ListGetAt(NumList, i) NEQ ListGetAt(NumList, i-1))
       NumListTemp=ListAppend(NumListTemp, ListGetAt(NumList, i));
   }
   NumList=NumListTemp;
 
   // And finally, build soundex
   Result=FirstChar;
 
   // Append the chars, if not 9 (excluded)
   for (i=2; i LTE ListLen(NumList); i=i+1) {
     if ((ListGetAt(NumList, i) EQ 8) AND (i LT ListLen(NumList))) {
       if (ListGetAt(NumList,i-1) EQ ListGetAt(NumList,i+1))
         i = i+1;
     }
     else if (ListGetAt(NumList, i) NEQ 9)
       Result=Result&ListGetAt(NumList, i);
   }
 
   // If too long, truncate
   if (Len(Result) GT 4)
     Result=Left(Result, 4);
   // If too short, pad
   else if (Len(Result) LT 4)
     Result=Result&RepeatString("0", 4-Len(Result));
 
   return Result;
 }

oldId: 39
---

