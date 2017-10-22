---
layout: udf
title:  arrayCompact
date:   2007-03-02T15:35:18.000Z
library: DataManipulationLib
argString: "arr[, delim]"
author: M Gillespie for HOUCFUG
authorEmail: houcfug@yahoogroups.com
version: 1
cfVersion: CF6
shortDescription: Used to remove missing positions from an array.
tagBased: false
description: |
 This function is designed to remove undefined postions from an array.  Will not work in CF5, and would not recommend using it for large arrays.  Optional argument to pass in delimiter (default is Pipe symbol).

returnValue: Returns an array.

example: |
 <!--- create the array --->
 <cfset tmp=arraynew(1)>
 <cfset tmp[1]="a">
 <cfset tmp[3]="c">
 <cfset tmp[4]="d">
 <!--- let's see it in all it's un-glory --->
 <cfdump var="#tmp#" label="original array">
 <!--- compacting - grindgrindgrind --->
 <cfset newTmp=arrayCompact(tmp)>
 <!--- show me --->
 <cfdump var="#Newtmp#" label="New Compacted array">
 <!--- now, the pudding --->
 <cfoutput>
 Looping new Array<br />
 <cfloop from="1" to="#arraylen(newTmp)#" index="i">
 index #i# = #newTmp[i]#<br />
 </cfloop>
 </cfoutput>

args:
 - name: arr
   desc: Array to compact.
   req: true
 - name: delim
   desc: Temporary list delimiter. Defaults to |.
   req: false


javaDoc: |
 /**
  * Used to remove missing positions from an array.
  * 
  * @param arr      Array to compact. (Required)
  * @param delim      Temporary list delimiter. Defaults to |. (Optional)
  * @return Returns an array. 
  * @author M Gillespie for HOUCFUG (houcfug@yahoogroups.com) 
  * @version 1, March 2, 2007 
  */

code: |
 function arrayCompact(arr) {
     var delim="|";
     if(arraylen(arguments) gt 1) {delim=arguments[2];}
     return listtoarray(arraytolist(arr,delim),delim);
 }

---

