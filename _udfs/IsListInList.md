---
layout: udf
title:  IsListInList
date:   2008-09-04T19:54:45.000Z
library: StrLib
argString: "l1, l2[, delim1][, delim2][, matchany]"
author: Daniel Chicayban
authorEmail: dbastos@math.utoledo.edu
version: 4
cfVersion: CF5
shortDescription: Checks is all elements of a list X is found in a list Y.
description: |
 If ALL elements of a list X is found in a list Y, the function returns TRUE (yes) otherwise it'll return FALSE (no). Also allows for 'matchany' functionality which will allow for any match of X in Y.

returnValue: Returns a boolean.

example: |
 <cfset l1 = "apples,oranges">
 <cfset l2 = "apples,bananas,oranges">
 <cfset l3 = "apples@zebras">
 <cfoutput>
 Is all of #l1# in #l2#? #isListInList(l1,l2)#<br>
 Is all of #l1# in #l3#? #isListInList(l1,l3,",","@")#<br>
 </cfoutput>
 
 <cfif isListInList("sm,m,l,xl","l,xl,sm",",",",",true)>
 Show Prodcut
 <cfelse>
 Don't show product
 </cfif>

args:
 - name: l1
   desc: The first list.
   req: true
 - name: l2
   desc: The second list. UDF checks to see if all of l1 is in l2.
   req: true
 - name: delim1
   desc: List delimiter for l1. Defaults to a comma.
   req: false
 - name: delim2
   desc: List delimiter for l2. Defaults to a comma.
   req: false
 - name: matchany
   desc: If true, UDF returns true if at least one item in l1 exists in l2. Defaults to false.
   req: false


javaDoc: |
 /**
  * Checks is all elements of a list X is found in a list Y.
  * v2 by Raymond Camden
  * v3 idea by Bill King
  * v4 fix by Chris Phillips
  * 
  * @param l1      The first list. (Required)
  * @param l2      The second list. UDF checks to see if all of l1 is in l2. (Required)
  * @param delim1      List delimiter for l1. Defaults to a comma. (Optional)
  * @param delim2      List delimiter for l2. Defaults to a comma. (Optional)
  * @param matchany      If true, UDF returns true if at least one item in l1 exists in l2. Defaults to false. (Optional)
  * @return Returns a boolean. 
  * @author Daniel Chicayban (dbastos@math.utoledo.edu) 
  * @version 4, September 4, 2008 
  */

code: |
 function isListInList(l1,l2) {
     var delim1 = ",";
     var delim2 = ",";
     var i = 1;
     var matchany = false;
     
     if(arrayLen(arguments) gte 3) delim1 = arguments[3];
     if(arrayLen(arguments) gte 4) delim2 = arguments[4];
     if(arrayLen(arguments) gte 5) matchany = arguments[5];
     
     for(i=1; i lte listLen(l1,delim1); i=i+1) {
         if(matchany and listFind(l2,listGetAt(l1,i,delim1),delim2)) return true;
         if(not matchany and not listFind(l2,listGetAt(l1,i,delim1),delim2)) return false;
     }
     return not matchany;
 }

---

