---
layout: udf
title:  ListDiffDup
date:   2007-10-04T17:52:44.000Z
library: StrLib
argString: "list1, list2[, delimiters]"
author: Anonymous
authorEmail: anonymous@gmail.com
version: 1
cfVersion: CF5
shortDescription: Compares two lists and returns the elements that are unique for each list.
description: |
 This function compares two lists and will return a new list containing the difference between the two input lists. This function is different from ListDiff as it treats duplicate elements within the lists as distinct elements.

returnValue: Returns a string.

example: |
 <cfoutput>#ListDiffDup("1,2,3","1,2,3,3,3,4")#</cfoutput>

args:
 - name: list1
   desc: The first list.
   req: true
 - name: list2
   desc: The second list.
   req: true
 - name: delimiters
   desc: Delimiter for both lists. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Compares two lists and returns the elements that are unique for each list.
  * Added var statements.
  * 
  * @param list1      The first list. (Required)
  * @param list2      The second list. (Required)
  * @param delimiters      Delimiter for both lists. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Anonymous (anonymous@gmail.com) 
  * @version 1, October 4, 2007 
  */

code: |
 function ListDiffDup(list1,list2)    {
   var delimiters    = ",";
   var listReturn = "";
   
   // Use two temporary lists.
   var temp1 = list1;
   var temp2 = list2;
   
   var i = 1;
   var pos = 1;
 
   // default list delimiter to a comma unless otherwise specified
   if (arrayLen(arguments) gte 3){
     delimiters    = arguments[3];
   }
 
 
     // Loop over the first list, eliminate all duplicate elements from the temp2 list.
   for (i=1; i lte ListLen(list1,delimiters); i=i+1) {
       pos = ListFindNoCase(temp2,ListGetAt(list1,i,delimiters),delimiters);
     if (pos neq 0) {
         temp2 = ListDeleteAt(temp2,pos,delimiters);
     }
   }
 
     // Loop over the second list, eliminate all duplicate elements from the temp1 list.
   for (i=1; i lte ListLen(list2,delimiters); i=i+1) {
       pos = ListFindNoCase(temp1,ListGetAt(list2,i,delimiters),delimiters);
     if (pos neq 0) {
         temp1 = ListDeleteAt(temp1,pos,delimiters);
     }
   }
 
   // Append all distinct elements from the first list to the return list
   for (i=1; i lte ListLen(temp1,delimiters); i=i+1) {
       listReturn = ListAppend(listReturn,ListGetAt(temp1,i,delimiters),delimiters);
   }
         
   // Append all distinct elements from the second list to the return list.
   for (i=1; i lte ListLen(temp2,delimiters); i=i+1) {
       listReturn = ListAppend(listReturn,ListGetAt(temp2,i,delimiters),delimiters);
   }
 
   return listReturn;
 }

---

