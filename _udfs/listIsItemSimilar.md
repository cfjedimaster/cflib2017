---
layout: udf
title:  listIsItemSimilar
date:   2009-01-07T00:03:16.000Z
library: StrLib
argString: "listIn, strToMatch[, delimeter]"
author: Tony Felice
authorEmail: sites@breckcomm.com
version: 2
cfVersion: CF5
shortDescription: Determines whether any list items begin with the strToMatch.
tagBased: false
description: |
 Determines whether any list items begin with the strToMatch.

returnValue: Returns a boolean.

example: |
 <cfoutput>#listIsItemSimilar("this,that,the other","th")#</cfoutput>

args:
 - name: listIn
   desc: List of values.
   req: true
 - name: strToMatch
   desc: String to search for in the beginning of each list item.
   req: true
 - name: delimeter
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Determines whether any list items begin with the strToMatch.
  * v2 by RCamden
  * 
  * @param listIn      List of values. (Required)
  * @param strToMatch      String to search for in the beginning of each list item. (Required)
  * @param delimeter      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a boolean. 
  * @author Tony Felice (sites@breckcomm.com) 
  * @version 2, January 6, 2009 
  */

code: |
 function listIsItemSimilar(listIn,strToMatch){
     var delim = ",";
     var count = 0;
     var xz = "";
     
     if(arrayLen(arguments) gt 2) delim = arguments[3];
     for(xz=1;xz<=listLen(listIn,delim);xz=xz+1){
         if(findNoCase(strToMatch,left(listGetAt(listIn,xz,delim),len(strToMatch)))) return true;                            
     }
     return false;
 }

---

