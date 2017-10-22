---
layout: udf
title:  listDelete
date:   2006-05-17T14:15:23.000Z
library: StrLib
argString: "variable[, qs]"
author: Alessandro Chisari
authorEmail: ruchizzy@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Delete items from a list.
tagBased: false
description: |
 Delete items from a list. Will find and remove specified items from a list. Based on QueryStringDeleteVar UDF.

returnValue: Returns a string.

example: |
 <cfoutput>#listdelete("id,name","id,name,foo,moo")#</cfoutput>

args:
 - name: variable
   desc: An item, or a list of items, to remove from the list.
   req: true
 - name: qs
   desc: The actual list to parse. Can be blank.
   req: false


javaDoc: |
 /**
  * Delete items from a list.
  * 
  * @param variable      An item, or a list of items, to remove from the list. (Required)
  * @param qs      The actual list to parse. Can be blank. (Optional)
  * @return Returns a string. 
  * @author Alessandro Chisari (ruchizzy@hotmail.com) 
  * @version 1, May 17, 2006 
  */

code: |
 function listdelete(variable){
         //var to hold the final string
         var string = "";
         //vars for use in the loop, so we don't have to evaluate lists and arrays more than once
         var ii = 1;
         var thisVar = "";
         var thisIndex = "";
         var array = "";
         var qs = "";
         if(arrayLen(arguments) GT 1)
                 qs = arguments[2];
         //put the query string into an array for easier looping
         array = listToArray(qs,",");            
         //now, loop over the array and rebuild the string
         for(ii = 1; ii lte arrayLen(array); ii = ii + 1){
                 thisIndex = array[ii];
                 thisVar = thisIndex;
                 //if this is the var, edit it to the value, otherwise, just append
                 if(not listFindnocase(variable,thisVar))
                         string = listAppend(string,thisIndex,",");
         }
         //return the string
         return string;
 }

---

