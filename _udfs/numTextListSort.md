---
layout: udf
title:  numTextListSort
date:   2004-01-13T00:15:55.000Z
library: StrLib
argString: "list"
author: Matt
authorEmail: Coldfusion@spiraldev.com
version: 1
cfVersion: CF6
shortDescription: This function is to be used, to sort a list that has numeric and text values.
description: |
 This function returns a sorted list that has numeric and text values starting with the numeric and ending with the text values.

returnValue: Returns a string.

example: |
 <cfscript>
 myList='cash,car,12,5,4,3,2,1,11,10,9,8,7,6,home';
 writeoutput(numTextListSort(myList));
 </cfscript>

args:
 - name: list
   desc: List to sort.
   req: true


javaDoc: |
 /**
  * This function is to be used, to sort a list that has numeric and text values.
  * 
  * @param list      List to sort. (Required)
  * @return Returns a string. 
  * @author Matt (Coldfusion@spiraldev.com) 
  * @version 1, January 12, 2004 
  */

code: |
 function numTextListSort(list) {
     var numArray=arrayNew(1);
     var textArray=arrayNew(1);
     var mg = 1;
     var data = "";
     
     //convert to array for speed
     data = listToArray(list);
     
     //loop through the list passed to the function
     for(;mg lte arrayLen(data);mg=mg+1){
         //if the value at this position of the list is numeric put it in the numList List
         if(isNumeric(data[mg])) numArray[arrayLen(numArray)+1] = data[mg];
         //else put it in the textList List
         else textArray[arrayLen(textArray)+1] = data[mg];
     }
     
     //sort the numList
     arraySort(numArray,"numeric");
     //sort the textList
     arraySort(textArray,"text");
     //put together
     for(mg=1;mg lte arrayLen(textArray);mg=mg+1) {
         numArray[arrayLen(numArray)+1] = textArray[mg];
     }
     
     //return the mainList
     return arrayToList(numArray);
     
 }

---

