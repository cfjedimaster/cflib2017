---
layout: udf
title:  ListReturnDuplicatesNoCase
date:   2008-10-18T15:12:46.000Z
library: StrLib
argString: "list[, delimiter]"
author: Gerald Guido
authorEmail: Gerald.Guido@gmail.com
version: 0
cfVersion: CF5
shortDescription: Searches a list for case-INsensitive duplicates and returns a list of the duplicate items or an empty string if no dupes are found.
description: |
 Searches a list for case-INsensitive Duplicates and returns a list of the duplicate items or an empty string if no dupes are found. Based on Jeff Howden's' ListDeleteDuplicates()

returnValue: Returns a string.

example: |
 Example:<br />
 <cfset myList = "Sister,Ghengis,Adonis,Osmisis,Frank,Zappa,sister,ghengis,adonis,osmisis,Frank,Zappa">
 
 <cfoutput>
 List of case-INsensitive dupes:
 <br />#ListReturnDuplicatesNoCase(myList)#
 </cfoutput>

args:
 - name: list
   desc: List to parse.
   req: true
 - name: delimiter
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Searches a list for case-INsensitive duplicates and returns a list of the duplicate items or an empty string if no dupes are found.
  * 
  * @param list      List to parse. (Required)
  * @param delimiter      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Gerald Guido (Gerald.Guido@gmail.com) 
  * @version 0, October 18, 2008 
  */

code: |
 function ListReturnDuplicatesNoCase(list) {
     var i = 1;
     var delimiter = ',';
     var returnValue1 = '';
     var tmpList = list;
 
     if(arrayLen(arguments) GTE 2) delimiter = arguments[2];
     list = ListToArray(list, delimiter);
     for(i = 1; i LTE ArrayLen(list); i = i + 1) if(ListValueCountNoCase(tmpList, list[i]) GT 1 and not listFindNoCase(returnValue1,list[i],delimiter)) returnValue1 = ListAppend(returnValue1, list[i], delimiter);
 
     return returnValue1;
 }

---

