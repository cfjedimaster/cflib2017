---
layout: udf
title:  ArrayDeleteAtList
date:   2005-01-21T13:50:15.000Z
library: DataManipulationLib
argString: "a, l"
author: Giampaolo Bellavite
authorEmail: giampaolo@bellavite.com
version: 1
cfVersion: CF5
shortDescription: Deletes an elements list from an array.
tagBased: false
description: |
 Deletes elements from an array passing the list of positions.
 Similar to ArrayDeleteAt but the position value could be a list of positions.

returnValue: Returns an array.

example: |
 <cfset myArr=ArrayNew(1)>
 <cfset myArr[1]="1st">
 <cfset myArr[2]="2nd">
 <cfset myArr[3]="3rd">
 <cfset myArr[4]="4th">
 <cfset myArr[5]="5th">
 <cfdump var="#myArr#" label="Original array">
 <cfset list='1,5'>
 To delete: <br />
 <cfoutput>#list#</cfoutput><br />
 <cfdump var="#ArrayDeleteAtList(myArr,list)#" label="parsedArray">

args:
 - name: a
   desc: The array to modify.
   req: true
 - name: l
   desc: The list of indexes to remove.
   req: true


javaDoc: |
 /**
  * Deletes an elements list from an array.
  * 
  * @param a      The array to modify. (Required)
  * @param l      The list of indexes to remove. (Required)
  * @return Returns an array. 
  * @author Giampaolo Bellavite (giampaolo@bellavite.com) 
  * @version 1, January 21, 2005 
  */

code: |
 function ArrayDeleteAtList(a,l) {
     var i=1;
     l = listSort(l, "numeric", "desc");
     for(i=1; i lte listLen(l); i=i+1) arrayDeleteAt(a, listGetAt(l,i));
     return a;
 }

oldId: 1171
---

