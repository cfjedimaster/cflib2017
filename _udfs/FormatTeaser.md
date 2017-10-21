---
layout: udf
title:  FormatTeaser
date:   2003-07-31T09:46:48.000Z
library: StrLib
argString: "string, number[, urlArgument]"
author: Bryan LaPlante
authorEmail: blaplante@netwebapps.com
version: 3
cfVersion: CF5
shortDescription: Displays n number of characters from a string without cutting off in the middle of a word
description: |
 This function allows you to display n number of characters from a string with out cutting of in the middle of the word. The function will display a link at the end of the string if it is longer than the number of characters desired and the optional url argument is not empty.

returnValue: Returns a string.

example: |
 <cfset mystring = "here is a string with some chars">
 <cfoutput>#FormatTeaser(mystring,11,"http://www.yahoo.com")#</cfoutput>

args:
 - name: string
   desc: String to be modified.
   req: true
 - name: number
   desc: Number of characters to include in teaser.
   req: true
 - name: urlArgument
   desc: URL to use for 'more' link.
   req: false


javaDoc: |
 /**
  * Displays n number of characters from a string without cutting off in the middle of a word
  * Code used from FullLeft
  * 
  * @param string      String to be modified. (Required)
  * @param number      Number of characters to include in teaser. (Required)
  * @param urlArgument      URL to use for 'more' link. (Optional)
  * @return Returns a string. 
  * @author Bryan LaPlante (blaplante@netwebapps.com) 
  * @version 3, July 31, 2003 
  */

code: |
 function FormatTeaser(string,number){
     var urlArgument = "";
     var shortString = "";
     
     //return quickly if string is short or no spaces at all
     if(len(string) lte number or not refind("[[:space:]]",string)) return string;
     
     if(arrayLen(arguments) gt 2) urlArgument = "... <a href=""" & arguments[3] & """>[more]</a>";
 
     //Full Left code (http://www.cflib.org/udf.cfm?ID=329)
     if(reFind("[[:space:]]",mid(string,number+1,1))) {
           shortString = left(string,number);
     } else { 
         if(number-refind("[[:space:]]", reverse(mid(string,1,number)))) shortString = Left(string, (number-refind("[[:space:]]", reverse(mid(string,1,number))))); 
         else shortString = left(str,1);
     }
     
     return shortString & urlArgument;
 
 }

---

