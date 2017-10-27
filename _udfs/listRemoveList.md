---
layout: udf
title:  listRemoveList
date:   2005-05-10T14:04:23.000Z
library: StrLib
argString: "list1, list2[, delimiters][, scope]"
author: Ann Terrell
authorEmail: ann@landuseoregon.com
version: 2
cfVersion: CF5
shortDescription: Removes second list from first list, accepting an optional delimiter and whether to remove one or all list items.
tagBased: false
description: |
 Removes items from the first list that are in the second list and returns the edited list.  Lists one and two are required, and optionally, pass in a delimiter and option to remove all instances of items in list 2, or to remove the first one.  (default is remove 1)

returnValue: Returns a string.

example: |
 <cfoutput>
 ListRemoveList("3,4,dog,g,b,d,t,e,22,22,22,33,44,77,$,dog", "$,dog,22", ",","all") =
 #ListRemoveList("3,4,dog,g,b,d,t,e,22,22,22,33,44,77,$,dog", "$,dog,22", ",","all")#
 <br><br>
 
 ListRemoveList("3,4,dog,g,b,d,t,e,22,22,22,33,44,77,$,dog", "$,dog,22", ",", "one") = 
 #ListRemoveList("3,4,dog,g,b,d,t,e,22,22,22,33,44,77,$,dog", "$,dog,22", ",", "one")#
 </cfoutput>

args:
 - name: list1
   desc: List to parse.
   req: true
 - name: list2
   desc: List of items to remove.
   req: true
 - name: delimiters
   desc: Delimiter. Defaults to a comma.
   req: false
 - name: scope
   desc: One or all. If one, removes one instance of the item from list2. All if otherwise. Defaults to one.
   req: false


javaDoc: |
 /**
  * Removes second list from first list, accepting an optional delimiter and whether to remove one or all list items.
  * 
  * @param list1      List to parse. (Required)
  * @param list2      List of items to remove. (Required)
  * @param delimiters      Delimiter. Defaults to a comma. (Optional)
  * @param scope      One or all. If one, removes one instance of the item from list2. All if otherwise. Defaults to one. (Optional)
  * @return Returns a string. 
  * @author Ann Terrell (ann@landuseoregon.com) 
  * @version 2, May 10, 2005 
  */

code: |
 function ListRemoveList(list1,list2)    {
   var delimiters    = ",";
   var removeall = false;
   var listReturn = list1;
   var position = 1;
 
   // default list delimiter to a comma unless otherwise specified
   if (arrayLen(arguments) gte 3) delimiters=arguments[3];
 
   // default removal pattern is remove one of each item in list2
   if (arrayLen(arguments) eq 4 and  arguments[4] eq "all") removeall=true;
   
   //checking list1
   for(position = 1; position LTE ListLen(list2,delimiters); position = position + 1) {
     value = ListGetAt(list2, position , delimiters );
      
     if (removeall) {
            while (ListFindNoCase(listReturn, value , delimiters ) NEQ 0)
               listReturn = ListDeleteAt(listReturn, ListFindNoCase(listReturn, value , delimiters ) , delimiters );
         }
     else {
             if (ListFindNoCase(listReturn, value , delimiters ) NEQ 0)
               listReturn = ListDeleteAt(listReturn, ListFindNoCase(listReturn, value , delimiters ) , delimiters );
         }
     }
         
   return listReturn;
 }

oldId: 1087
---

