---
layout: udf
title:  listWithNullsToArray
date:   2009-07-21T02:26:42.000Z
library: StrLib
argString: "parsedList[, delim]"
author: Andy Jarrett
authorEmail: udf@thebluefrogcompany.net
version: 2
cfVersion: CF5
shortDescription: Return an array from a list with null values.
tagBased: false
description: |
 If your list contains 6 elements with 5 null values then the listToArray length would be 1. With this function you create an array with a length of 6 and the extra values filled with &quot;null&quot;.

returnValue: Returns an array.

example: |
 <cfscript>
     newArray = listWithNullsToArray("andy|jarrett||andyjarrett.co.uk|","|");
     for(i=1;i lte arrayLen(newArray);i=i+1){
       writeOutput(newArray[i]&"<br>");
     }
 </cfscript>

args:
 - name: parsedList
   desc: List to parse.
   req: true
 - name: delim
   desc: List delimeter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Return an array from a list with null values.
  * v2 mod by Marc, fixes a list with a null in front
  * 
  * @param parsedList      List to parse. (Required)
  * @param delim      List delimeter. Defaults to a comma. (Optional)
  * @return Returns an array. 
  * @author Andy Jarrett (udf@thebluefrogcompany.net) 
  * @version 2, July 20, 2009 
  */

code: |
 function listWithNullsToArray(parsedList) {
     var delim = ",";
     if((left(trim(parsedList),1)) EQ delim) parsedList = "null" & parsedList;
     if(arrayLen(arguments) gt 1) delim = arguments[2];
     while(find(delim&delim,parsedList)) parsedList = replace(parsedList,delim&delim,delim & "NULL" & delim,"ALL");
     if(right(parsedList,1) eq delim){
         parsedList = listAppend(parsedList,"NULL",delim);
     }
     return listToArray(parsedList,delim);
 }

---

