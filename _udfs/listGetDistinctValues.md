---
layout: udf
title:  listGetDistinctValues
date:   2005-02-25T00:14:29.000Z
library: StrLib
argString: "theList[, delimiter]"
author: Dave Carabetta
authorEmail: dcarabetta@gmail.com
version: 1
cfVersion: CF5
shortDescription: Returns a list of distinct values from a passed-in list.
tagBased: false
description: |
 This UDF takes a list that may have duplicate values in it and returns only the distinct values, either using the default comma delimiter or a delimiter of the user's choice that is passed in.

returnValue: Returns a string.

example: |
 <cfset variables.list = "BO,BO,AT,DC,BO,AT,HO,DC,DC,GA,VT" />
 <cfoutput>distinct values with comma: #listGetDistinctValues(variables.list)#<br /></cfoutput>
 
 <cfset variables.list = "BO.BO.AT.DC.BO.AT.HO.DC.DC.GA.VT" />
 <cfoutput>distinct values: #listGetDistinctValues(variables.list,".")#</cfoutput>

args:
 - name: theList
   desc: The list.
   req: true
 - name: delimiter
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Returns a list of distinct values from a passed-in list.
  * 
  * @param theList      The list. (Required)
  * @param delimiter      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Dave Carabetta (dcarabetta@gmail.com) 
  * @version 1, February 24, 2005 
  */

code: |
 function listGetDistinctValues(theList) {
     var distinctValues = "";
     var totalValues = 0;
     var i = 0;
     var currentElement = "";
     var delimiter = ",";
     
     // If the user specifies their own delimiter, use that one instead
     if (arrayLen(arguments) GT 1) delimiter = arguments[2];
     
     totalValues = listLen( theList, delimiter );
     
     // Loops over each element in the original list and appends the current
     // element if it does not already exist in the distinct values list
     for (i=1; i LTE totalValues; i=i+1) {
         currentElement = listGetAt(theList, i, delimiter);
         if (not listFind(distinctValues, currentElement, delimiter) ) {
             distinctValues = listAppend(distinctValues, currentElement, delimiter);
         }
     }
     
     return distinctValues;
 }

---

