---
layout: udf
title:  StripAllBut
date:   2002-07-02T14:02:00.000Z
library: StrLib
argString: "strSource, strKeep[, beCS]"
author: Scott Jibben
authorEmail: scott@jibben.com
version: 1
cfVersion: CF5
shortDescription: Strips all characters from a string except the ones that you want to keep.
tagBased: false
description: |
 This generic UDF can be used to strip unwanted characters from strings.  It can be used to eliminate non-numeric characters from phone numbers or social security numbers.  It could also be used to strip out monetary or number formatting symbols for easier conversion back to a numeric value.

returnValue: Returns a string.

example: |
 <cfset Fax = "612-555-1234 (Fax)">
 <cfoutput>
   Input: #Fax#<br>
   Strip all but the numbers: #StripAllBut(Fax, "1234567890")#<br>
   Strip all but letters: #StripAllBut(Fax, "abcdefghijklmnopqrstuvwxyz",false)#<br>
   Strip all but (cs) letters: #StripAllBut(Fax, "abcdefghijklmnopqrstuvwxyz")#<br>
 </cfoutput>

args:
 - name: strSource
   desc: The string to strip.
   req: true
 - name: strKeep
   desc: List of  characters to keep.
   req: true
 - name: beCS
   desc: Boolean that determines if the match should be case sensitive. Default is true.
   req: false


javaDoc: |
 /**
  * Strips all characters from a string except the ones that you want to keep.
  * 
  * @param strSource      The string to strip. (Required)
  * @param strKeep      List of  characters to keep. (Required)
  * @param beCS      Boolean that determines if the match should be case sensitive. Default is true. (Optional)
  * @return Returns a string. 
  * @author Scott Jibben (scott@jibben.com) 
  * @version 1, July 2, 2002 
  */

code: |
 function stripAllBut(str,strip) {
     var badList = "\";
     var okList = "\\";
     var bCS = true;
 
     if(arrayLen(arguments) gte 3) bCS = arguments[3];
 
     strip = replaceList(strip,badList,okList);
     
     if(bCS) return rereplace(str,"[^#strip#]","","all");
     else return rereplaceNoCase(str,"[^#strip#]","","all");
 }

---

