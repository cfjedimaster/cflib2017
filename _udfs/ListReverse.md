---
layout: udf
title:  ListReverse
date:   2001-07-17T18:53:52.000Z
library: StrLib
argString: "list[, delimiter]"
author: Stephen Milligan
authorEmail: spike@spike.org.uk
version: 2
cfVersion: CF5
shortDescription: Reverses a list.
tagBased: false
description: |
 Reverses a list.

returnValue: Returns a list.

example: |
 <CFSET myList = "apples,oranges,pears,bananas">
 <CFSET ReversedList = ListReverse(myList)>
 <CFOUTPUT>
 myList: #myList#<BR>
 ReversedList: #ReversedList#
 </CFOUTPUT>

args:
 - name: list
   desc: List to be modified.
   req: true
 - name: delimiter
   desc: Delimiter for the list. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Reverses a list.
  * Modified by RCamden to use var scope
  * 
  * @param list      List to be modified. 
  * @param delimiter      Delimiter for the list. Defaults to a comma. 
  * @return Returns a list. 
  * @author Stephen Milligan (spike@spike.org.uk) 
  * @version 2, July 17, 2001 
  */

code: |
 function ListReverse(list) {
 
     var newlist = "";
     var i = 0;
     var delims = "";
     var thisindex = "";
     var thisitem = "";
     
     var argc = ArrayLen(arguments);
     if (argc EQ 1) {
         ArrayAppend(arguments,',');
     }
     delims = arguments[2];
     while (i LT listlen(list,delims))
     {    
     thisindex = listlen(list,delims)-i;
     thisitem = listgetat(list,thisindex,delims);
     newlist = listappend(newlist,thisitem,delims);
     i = i +1;
     }
  return newlist;
 }

oldId: 51
---

