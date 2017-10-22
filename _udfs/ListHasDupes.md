---
layout: udf
title:  ListHasDupes
date:   2004-05-11T18:29:05.000Z
library: StrLib
argString: "list[, delim][, caseCheck]"
author: Mike Gillespie
authorEmail: mike@striking.com
version: 1
cfVersion: CF5
shortDescription: Returns true if list has duplicate elements.
tagBased: false
description: |
 Pass a list to this function to evaluate if it contains duplicates.

returnValue: Returns a boolean.

example: |
 <cfset mylist="a,b,c,d,e,b">
 <cfoutput>#ListHasDupes(mylist)#</cfoutput>

args:
 - name: list
   desc: The list to check.
   req: true
 - name: delim
   desc: List delimer. Defaults to a comma.
   req: false
 - name: caseCheck
   desc: Determines if checking should be case-sensitive. Defaults to false.
   req: false


javaDoc: |
 /**
  * Returns true if list has duplicate elements.
  * 
  * @param list      The list to check. (Required)
  * @param delim      List delimer. Defaults to a comma. (Optional)
  * @param caseCheck      Determines if checking should be case-sensitive. Defaults to false. (Optional)
  * @return Returns a boolean. 
  * @author Mike Gillespie (mike@striking.com) 
  * @version 1, May 11, 2004 
  */

code: |
 function listHasDupes(list) {
     var arr=arraynew(1);
     var caseCheck=false;
     var delim=",";
     var i = 1;
     
     if (arrayLen(arguments) gt 1) delim = arguments[2];    
     if (arrayLen(arguments) gt 2) CaseCheck=Arguments[3];
     
     if(not caseCheck) list = lcase(list);
     
     arr=listToArray(list,delim);
     
     for (;i lte arraylen(arr);i=i+1 ) {
         if (listValueCount(list,arr[i],delim) gt 1) return true;
     }
     return false;
 }

---

