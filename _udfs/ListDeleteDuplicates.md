---
layout: udf
title:  ListDeleteDuplicates
date:   2008-07-02T20:13:57.000Z
library: StrLib
argString: "list"
author: Jeff Howden
authorEmail: cflib@jeffhowden.com
version: 1
cfVersion: CF5
shortDescription: Case-sensitive function for removing duplicate entries in a list.
tagBased: false
description: |
 Simply pass it a list and optional delimiter.  The function will look for case-sensitive matches, removing any it finds, and return a new list without duplicates.

returnValue: Returns a list.

example: |
 <cfset myList = "apples,oranges,apples,bananas,ORANGES">
 
 <cfoutput>
 List before removing dupes: #myList#<br>
 List after removing dupes: #ListDeleteDuplicates(myList)#
 </cfoutput>

args:
 - name: list
   desc: The list to be modified.
   req: true


javaDoc: |
 /**
  * Case-sensitive function for removing duplicate entries in a list.
  * Based on dedupe by Raymond Camden
  * 
  * @param list      The list to be modified. (Required)
  * @return Returns a list. 
  * @author Jeff Howden (cflib@jeffhowden.com) 
  * @version 1, July 2, 2008 
  */

code: |
 function ListDeleteDuplicates(list) {
   var i = 1;
   var delimiter = ',';
   var returnValue = '';
   if(ArrayLen(arguments) GTE 2)
     delimiter = arguments[2];
   list = ListToArray(list, delimiter);
   for(i = 1; i LTE ArrayLen(list); i = i + 1)
     if(NOT ListFind(returnValue, list[i], delimiter))
       returnValue = ListAppend(returnValue, list[i], delimiter);
   return returnValue;
 }

oldId: 532
---

