---
layout: udf
title:  arrayDeleteArray
date:   2008-04-11T12:22:34.000Z
library: DataManipulationLib
argString: "baseArray, deleteArray"
author: Jason Rushton
authorEmail: jason@iworks.com
version: 1
cfVersion: CF6
shortDescription: Remove elements from one array which exist in another array.
tagBased: false
description: |
 Remove elements from one array which exist in another array. Uses Java's array.removeAll(str)

returnValue: Returns an array.

example: |
 <cfset myArray = ListToArray( "Charlie,Jack,Kate,Libby,Sawyer" )>
 <cfset deleteArray = ListToArray( "Charlie,Libby" )>
 <cfset myArray = arrayDeleteArray( myArray, deleteArray )>

args:
 - name: baseArray
   desc: Main array of values.
   req: true
 - name: deleteArray
   desc: Array of values to delete.
   req: true


javaDoc: |
 /**
  * Remove elements from one array which exist in another array.
  * 
  * @param baseArray      Main array of values. (Required)
  * @param deleteArray      Array of values to delete. (Required)
  * @return Returns an array. 
  * @author Jason Rushton (jason@iworks.com) 
  * @version 1, April 11, 2008 
  */

code: |
 function arrayDeleteArray( baseArray, deleteArray ) {
     arguments.baseArray.removeAll(arguments.deleteArray);
     return arguments.baseArray;
 }

oldId: 1815
---

