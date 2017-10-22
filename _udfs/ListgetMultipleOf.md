---
layout: udf
title:  ListgetMultipleOf
date:   2003-03-06T11:12:25.000Z
library: StrLib
argString: "list, factorOf[, delim]"
author: Sudhir Duddella
authorEmail: skduddella@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Returns a list with a specified factor of list elements from the passed list .
tagBased: false
description: |
 Returns a list with a specified factor of list elements from the passed list. Special delimeters (non-comma) can be specified in the optional final argument.

returnValue: Returns a string.

example: |
 <cfset List = "1,2,3,4,5,6,7,8,9,10">
 <cfoutput>#ListgetMultipleOf(List,3)#</cfoutput>

args:
 - name: list
   desc: List to parse.
   req: true
 - name: factorOf
   desc: Specifies how many items to skip before getting an item.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Returns a list with a specified factor of list elements from the passed list .
  * 
  * @param list      List to parse. (Required)
  * @param factorOf      Specifies how many items to skip before getting an item. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Sudhir Duddella (skduddella@hotmail.com) 
  * @version 1, March 6, 2003 
  */

code: |
 function ListgetMultipleOf(List,factorOf){
     var delim = ",";
     var result = "";
     var i = 1;
     
     if (factorOf lte 0) return result;
     if (ArrayLen(arguments) gt 2) delim = arguments[3];
             
     for (i=1;i lte ListLen(List,delim); i = i+1) {
         if (i mod factorOf eq 0) result = ListAppend(result,ListGetAt(List,i,delim),delim);
     }
         
     return result;
 }

---

