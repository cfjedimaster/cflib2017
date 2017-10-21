---
layout: udf
title:  listsAreDistinct
date:   2003-06-25T22:55:48.000Z
library: StrLib
argString: "list1, list2[, delim1][, delim2]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Tells whether two lists have entirely distinct elements
description: |
 Given two lists, returns a boolean value telling you whether both lists have entirely different elements.  In other words, no element in list 1 exists in list 2 and vice versa.
 
 The comparison is case insensitive.

returnValue: boolean

example: |
 <cfscript>
     list1 = "a,b,c,d,e,f";
     list2 = "g,h,i,j";
     list3 = "K+A+I";
 </cfscript>
 
 <cfoutput>
 Is list1 (<em>#list1#</em>) distinct from list2 (<em>#list2#</em>)?
 <br />
 #yesNoFormat(listsAreDistinct(list1,list2))#
 <br /><br />
 
 Is list1 (<em>#list1#</em>) distinct from list3 (<em>#list3#</em>)?
 <br />
 #yesNoFormat(listsAreDistinct(list1,list3,",","+"))#
 <br /><br />
 
 Is list3 (<em>#list3#</em>) distinct from list2 (<em>#list2#</em>)?
 <br />
 #yesNoFormat(listsAreDistinct(list3,list2,"+"))#
 </cfoutput>

args:
 - name: list1
   desc: The first list
   req: true
 - name: list2
   desc: The second list
   req: true
 - name: delim1
   desc: The delimiter of the first list (default is comma)
   req: false
 - name: delim2
   desc: The delimiter of the second list (default is comma)
   req: false


javaDoc: |
 /**
  * Tells whether two lists have entirely distinct elements
  * 
  * @param list1      The first list (Required)
  * @param list2      The second list (Required)
  * @param delim1      The delimiter of the first list (default is comma) (Optional)
  * @param delim2      The delimiter of the second list (default is comma) (Optional)
  * @return boolean 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, June 25, 2003 
  */

code: |
 function listsAreDistinct(list1,list2){
     var delim1 = ",";
     var delim2 = ",";
     var ii = 0;
     var array = "";
     //deal with the optional delimiter arguments
     switch(arrayLen(arguments)) {
         case 3:
         {
             delim1 = arguments[3];
             break;
         }
         case 4:
         {
             delim1 = arguments[3];
             delim2 = arguments[4];
             break;
         }
     }
     //make list1 into an array for easy looping
     array = listToArray(list1,delim1);
     //loop through list1 checking for any matches in list2
     for(ii = 1; ii LTE arrayLen(array); ii = ii + 1){
         //if this element exists in list 2, return false
         if(listFindNoCase(list2,array[ii],delim2))
             return false;
     }
     //if we've gotten this far, the lists are distinct
     return true;
 }

---

