---
layout: udf
title:  hrefsToList
date:   2006-02-22T12:29:30.000Z
library: StrLib
argString: "inputString[, delimiter]"
author: Marcus Raphelt
authorEmail: cfml@raphelt.de
version: 1
cfVersion: CF5
shortDescription: Extracts all links from a given string and puts them into a list.
description: |
 Extracts all links from a given string and puts them into a list.

returnValue: Returns a list.

example: |
 <cfhttp url="http://www.yahoo.com">
 
 <cfset links = hrefsToList(cfhttp.filecontent)>
 <cfoutput>#links#</cfoutput>

args:
 - name: inputString
   desc: String to parse.
   req: true
 - name: delimiter
   desc: Delimiter for returned list. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Extracts all links from a given string and puts them into a list.
  * 
  * @param inputString      String to parse. (Required)
  * @param delimiter      Delimiter for returned list. Defaults to a comma. (Optional)
  * @return Returns a list. 
  * @author Marcus Raphelt (cfml@raphelt.de) 
  * @version 1, February 22, 2006 
  */

code: |
 function hrefsToList(inputString) {
     var pos=1;
     var tmp=0;
     var linklist = "";
     var delimiter = ",";
     var endpos = "";
     
     if(arrayLen(arguments) gte 2) delimiter = arguments[2];
         
     while(1) {
         tmp = reFindNoCase("<a[^>]*>[^>]*</a>", inputString, pos);
         if(tmp) {
             pos = tmp;
             endpos = findNoCase("</a>", inputString, pos)+4;
             linkList = listAppend(linkList, mid(inputString, pos, endpos-pos), delimiter);
             pos = endpos;
         }
         else break;
     }
 
     return linkList;
 }

---

