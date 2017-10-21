---
layout: udf
title:  ListDiff
date:   2002-06-26T19:04:10.000Z
library: StrLib
argString: "list1, list2[, delimiters]"
author: Ivan Rodriguez
authorEmail: wantez015@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Compares two lists and returns the elements that do not appear in both lists. Returns a list that contains the elementsrest between list1 and list2
description: |
 Compares two lists and returns the elements that do not appear in both lists.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 ListDiff("1,2,3","1,3,4,5"): #ListDiff("1,2,3","1,3,4,5")#
 </CFOUTPUT>

args:
 - name: list1
   desc: First list to compare
   req: true
 - name: list2
   desc: Second list to compare
   req: true
 - name: delimiters
   desc: Delimiter for all lists.  Defualt is comma.
   req: false


javaDoc: |
 /**
  * Compares two lists and returns the elements that do not appear in both lists.
 Returns a list that contains the elementsrest between list1 and list2
  * 
  * @param list1      First list to compare (Required)
  * @param list2      Second list to compare (Required)
  * @param delimiters      Delimiter for all lists.  Defualt is comma. (Optional)
  * @return Returns a string. 
  * @author Ivan Rodriguez (wantez015@hotmail.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function ListDiff(list1,list2)    {
   var delimiters    = ",";
   var listReturn = "";
   var position = 1;
 
   // default list delimiter to a comma unless otherwise specified    
   if (arrayLen(arguments) gte 3){
     delimiters    = arguments[3];
   }
         
   //checking list1
   for(position = 1; position LTE ListLen(list1,delimiters); position = position + 1) {
     value = ListGetAt(list1, position , delimiters );
     if (ListFindNoCase(list2, value , delimiters ) EQ 0)
       listReturn = ListAppend(listReturn, value , delimiters );
     }
         
     //checking list2
     for(position = 1; position LTE ListLen(list2,delimiters); position = position + 1)    {
       value = ListGetAt(list2, position , delimiters );
       if (ListFindNoCase(list1, value , delimiters ) EQ 0)
         listReturn = ListAppend(listReturn, value , delimiters );
   }
   return listReturn;
 }

---

