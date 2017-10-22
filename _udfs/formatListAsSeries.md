---
layout: udf
title:  formatListAsSeries
date:   2010-01-14T18:20:53.000Z
library: StrLib
argString: "theList"
author: Mosh Teitelbaum
authorEmail: mosh.teitelbaum@evoch.com
version: 2
cfVersion: CF5
shortDescription: Function that formats a numeric list so that successive numbers are shown as a series.
tagBased: false
description: |
 Function that formats a numeric list so that successive numbers are shown as a series.  List must be numeric.  For this function to be useful, list elements should be sorted in ascending order.  Updated 1/14/10 by Todd Sharp (todd@cfsilence.com) to sort the list before grouping.

returnValue: Returns a string.

example: |
 <cfoutput>
 #formatListAsSeries("2,1,6,4,7,8,10")#
 <!--- outputs: 1-2, 4, 6-8, 10 --->
 </cfoutput>

args:
 - name: theList
   desc: The list to parse.
   req: true


javaDoc: |
 /**
  * Function that formats a numeric list so that successive numbers are shown as a series.
  * 
  * @param theList      The list to parse. (Required)
  * @return Returns a string. 
  * @author Mosh Teitelbaum (mosh.teitelbaum@evoch.com) 
  * @version 2, January 14, 2010 
  */

code: |
 function formatListAsSeries(theList) {
     var lastEle = "";
     var isSet = false;
     var fList = "";
     var currEle = "";
     var idx = 0;
     
     theList = listSort(theList, "numeric", "asc");
     
     for ( idx = 1; idx LTE ListLen(theList); idx = idx + 1 ) {
         currEle = ListGetAt(theList, idx);
         
         if ( Len(lastEle) EQ 0 ) {
             fList = fList & currEle;
             lastEle = currEle;
             isSet = false;
         } else if ( lastEle EQ currEle ) {
             //do nothing
         } else if ( lastEle + 1 NEQ currEle ) {
             if ( isSet ) {
                 fList = fList & lastEle;
             }
             fList = fList & ", " & currEle;
             lastEle = currEle;
             isSet = false;
         } else {
         if ( NOT isSet ) {
             fList = fList & "-";
         }
         lastEle = currEle;
         isSet = true;
         }
     }
 
     if ( isSet ) {
         fList = fList & lastEle;
     }
 
     return fList;
 }

---

