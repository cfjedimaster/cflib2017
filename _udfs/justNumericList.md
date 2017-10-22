---
layout: udf
title:  justNumericList
date:   2010-04-01T22:35:19.000Z
library: StrLib
argString: "nList[, strDelim]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF5
shortDescription: Filters a list so that just numeric entries are returned.
tagBased: false
description: |
 Filters a list so that just numeric entries are returned. Based on isNumericList by John Rice.

returnValue: Returns a string.

example: |
 <cfset l = "3,4,6,2,d,4,2,gg,2,1,qqwqw,21,12,gg">
 <cfset fl = justNumericList(l)>
 <cfoutput>#fl#</cfoutput>

args:
 - name: nList
   desc: List to filter.
   req: true
 - name: strDelim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Filters a list so that just numeric entries are returned.
  * v2 changes by James Moberg
  * 
  * @param nList      List to filter. (Required)
  * @param strDelim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 2, April 1, 2010 
  */

code: |
 function justNumericList(nList) {
    var intIndex = 0;
    var aryN = arrayNew(1);
    var strDelim = ",";
    var result = arrayNew(1);
    if (arrayLen(arguments) gte 2) strDelim = arguments[2];
    aryN = listToArray(nlist,strDelim);
    for (intIndex=1;intIndex LTE arrayLen(aryN);intIndex=intIndex+1) {
     if (not compare(val(aryN[intIndex]),aryN[intIndex])) arrayAppend(result, aryN[intIndex]);
    }
    return arrayToList(result,strDelim);
 }

---

