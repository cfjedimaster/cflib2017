---
layout: udf
title:  ListNext
date:   2002-10-10T11:36:03.000Z
library: StrLib
argString: "currentItem, theList[, theDelim]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Given the current list item, returns the next item within a list of unique values.
description: |
 Given the current list item, returns the next item within a list of unique values. If current item is the last value in the list or is not found in the list, then returns the first item. Will not work correctly if the list contains duplicate values (comparisons are case sensitive).

returnValue: Returns a string.

example: |
 <cfoutput>
 ListNext("breakfast", "breakfast,lunch,dinner"):<br>
 #ListNext("breakfast", "breakfast,lunch,dinner")#<br>
 <br>
 ListNext("", "breakfast,lunch,dinner"):<br>
 #ListNext("", "breakfast,lunch,dinner")#<br>
 <br>
 ListNext("lunch", "breakfast|lunch|dinner", "|"):<br>
 #ListNext("lunch", "breakfast|lunch|dinner", "|")#<br>
 <br>
 <br>
 Working independently in a loop:<br>
 ListNext(currentColor, "dimgray,gray,darkgray,silver,lightgrey,ghostwhite")<br>
 <cfset currentColor = "">
 <cfloop index="x" from="1" to="10">
     <cfset currentColor = ListNext(currentColor, "dimgray,gray,darkgray,silver,lightgrey,ghostwhite")>
     <font color="#currentColor#">#currentColor#</font><br>
 </cfloop>
 </cfoutput>

args:
 - name: currentItem
   desc: The current item in the list.
   req: true
 - name: theList
   desc: The list to examine.
   req: true
 - name: theDelim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Given the current list item, returns the next item within a list of unique values.
  * Mods by RCamden to make current_pos see if it was equal to OR greater than list lenth, plus original code didn't use custom delim for the listlen check.
  * 
  * @param currentItem      The current item in the list. (Required)
  * @param theList      The list to examine. (Required)
  * @param theDelim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, October 10, 2002 
  */

code: |
 function ListNext(currentItem, theList){
     var current_pos   = 0;
     var theDelim      = ",";
 
     if(ArrayLen(Arguments) GTE 3) theDelim = Arguments[3];
 
     current_pos = ListFind(theList, currentItem, theDelim);
 
     if(current_pos eq ListLen(theList, theDelim)) return ListFirst(theList, theDelim) ;
     else return ListGetAt(theList, current_pos+1, theDelim);
 }

---

