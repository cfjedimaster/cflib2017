---
layout: udf
title:  ListDeleteDuplicatesNoCase
date:   2008-07-02T20:15:58.000Z
library: StrLib
argString: "list"
author: Jeff Howden
authorEmail: cflib@jeffhowden.com
version: 1
cfVersion: CF5
shortDescription: Case-insensitive function for removing duplicate entries in a list.
tagBased: false
description: |
 Simply pass it a list and optional delimiter.  The function will look for case-insensitive matches, removing any it finds, and return a new list without duplicates.

returnValue: Returns a list.

example: |
 <cfset myList = "apples,oranges,apples,bananas,ORANGES">
 
 <cfoutput>
 List before removing dupes: #myList#<br>
 List after removing dupes: #ListDeleteDuplicatesNoCase(myList)#
 </cfoutput>

args:
 - name: list
   desc: List to be modified.
   req: true


javaDoc: |
 /**
  * Case-insensitive function for removing duplicate entries in a list.
  * Based on dedupe by Raymond Camden
  * 
  * @param list      List to be modified. (Required)
  * @return Returns a list. 
  * @author Jeff Howden (cflib@jeffhowden.com) 
  * @version 1, July 2, 2008 
  */

code: |
 function ListDeleteDuplicatesNoCase(list) {
   var i = 1;
   var delimiter = ',';
   var returnValue = '';
   if(ArrayLen(arguments) GTE 2)
     delimiter = arguments[2];
   list = ListToArray(list, delimiter);
   for(i = 1; i LTE ArrayLen(list); i = i + 1)
     if(NOT ListFindNoCase(returnValue, list[i], delimiter))
       returnValue = ListAppend(returnValue, list[i], delimiter);
   return returnValue;
 }

oldId: 533
---

