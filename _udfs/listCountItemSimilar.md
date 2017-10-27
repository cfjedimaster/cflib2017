---
layout: udf
title:  listCountItemSimilar
date:   2009-01-07T00:03:03.000Z
library: StrLib
argString: "listIn[, strToMatch][, delimeter]"
author: Tony Felice
authorEmail: sites@breckcomm.com
version: 2
cfVersion: CF5
shortDescription: Determines number of list items that begin with the strToMatch.
tagBased: false
description: |
 Determines number of list items that begin with the strToMatch.

returnValue: Returns a number.

example: |
 <cfoutput>#listCountItemSimilar("this,that,the other","th")#</cfoutput>

args:
 - name: listIn
   desc: List of values.
   req: true
 - name: strToMatch
   desc: String to search for in the beginning of each list item.
   req: false
 - name: delimeter
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Determines number of list items that begin with the strToMatch.
  * v2 edits by RCamden
  * 
  * @param listIn      List of values. (Required)
  * @param strToMatch      String to search for in the beginning of each list item. (Optional)
  * @param delimeter      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a number. 
  * @author Tony Felice (sites@breckcomm.com) 
  * @version 2, January 6, 2009 
  */

code: |
 function listCountItemSimilar(listIn,strToMatch){
     var delim = ",";
     var count = 0;
     var xz = "";
     
     if(arrayLen(arguments) gt 2) delim = arguments[3];
     for(xz=1;xz<=listLen(listIn,delim);xz=xz+1) {
         count = count + findNoCase(strToMatch,left(listGetAt(listIn,xz,delim),len(strToMatch)));                                    
     }
     return count;
 }

oldId: 1895
---

