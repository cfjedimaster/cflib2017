---
layout: udf
title:  arrayFind
date:   2008-04-30T15:18:23.000Z
library: DataManipulationLib
argString: "array, valueToFind"
author: Larry C. Lyons
authorEmail: larryclyons@gmail.com
version: 2
cfVersion: CF6
shortDescription: The arrayFind function uses the java.util.list indexOf function to find an element in an array.
tagBased: true
description: |
 The arrayFind function performs a case sensitive search to find the index number of a value in a single dimension array using the java.util.List indexOf method. 
 
 Because this function performs a case sensitive search, Harry or hArry etc., would not be found (if the item is harry). Also since java arrays start at 0, I modified the returned value to conform to CFMX array index values.

returnValue: Returns a number, 0 if no match is found.

example: |
 <cfset arry = listToArray("tom, dick, harry, phred")>
 
 <cfset test = arrayFind(arry,"tom")>
 
 returns a 1
 
 <cfset test2 = arrayFind(arry,"Tom")>
 
 returns a 0 (not found)

args:
 - name: array
   desc: Array to search.
   req: true
 - name: valueToFind
   desc: Value to find.
   req: true


javaDoc: |
 <!---
  The arrayFind function uses the java.util.list indexOf function to find an element in an array.
  v1 by Nathan Dintenfas.
  
  @param array      Array to search. (Required)
  @param valueToFind      Value to find. (Required)
  @return Returns a number, 0 if no match is found. 
  @author Larry C. Lyons (larryclyons@gmail.com) 
  @version 2, April 30, 2008 
 --->

code: |
 <cffunction name="arrayFind" access="public" hint="returns the index number of an item if it is in the array" output="false" returntype="numeric">
 
 <cfargument name="array" required="true" type="array">
 <cfargument name="valueToFind" required="true" type="string">
 
 <cfreturn (arguments.array.indexOf(arguments.valueToFind)) + 1>
 </cffunction>

oldId: 1626
---

