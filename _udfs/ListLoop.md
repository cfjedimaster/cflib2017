---
layout: udf
title:  ListLoop
date:   2002-06-26T19:01:56.000Z
library: StrLib
argString: "theList, theEval[, theDelim]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Applies simple evaluations to every element in a list.
tagBased: false
description: |
 Applies the passed evaluation to every element in the specified list. Allows versatile conversions, calculations, formatting and other alterations to an entire list in one easy step. Use the variable &quot;x&quot; in the passed evaluation to denote the current list element.

returnValue: Returns a string.

example: |
 <cfset my_list = "one,two,three">
 <cfset my_list2 = "1,2,3">
 <cfset my_list3 = "This is a test">
 
 <cfoutput>
 #ListLoop(my_list, "x & ""y""")#<br>
 <br>
 #ListLoop(my_list, "Left(x, Len(x)-1)")#<br>
 <br>
 #ListLoop(my_list2, "x*3")#<br>
 <br>
 #ListLoop(my_list2, "NumberFormat(x, ""0.000"")")#<br>
 <br>
 #ListLoop(my_list2, "MonthAsString(x)")#<br>
 <br>
 #ListLoop(my_list3, "Reverse(x)", " ")#<br>
 </cfoutput>

args:
 - name: theList
   desc: The list to work with.
   req: true
 - name: theEval
   desc: The evaluation to execute.
   req: true
 - name: theDelim
   desc: Delimiter to use. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Applies simple evaluations to every element in a list.
  * 
  * @param theList      The list to work with. (Required)
  * @param theEval      The evaluation to execute. (Required)
  * @param theDelim      Delimiter to use. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function ListLoop(theList, theEval) {
     var i             = 0;
     var theList_len   = 0;
     var x             = "";
 
     var theDelim      = ",";
     if(ArrayLen(Arguments) GTE 3) theDelim = Arguments[3];
 
     theList_len   = ListLen(theList, theDelim);
 
     for (i=1; i LTE theList_len; i=i+1) {
         x = ListGetAt(theList, i, theDelim);
         theList = ListSetAt(theList, i, Evaluate(theEval), theDelim);
     }
 
     return theList;
 }

oldId: 544
---

