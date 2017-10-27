---
layout: udf
title:  structGetKey
date:   2008-09-09T15:18:00.000Z
library: DataManipulationLib
argString: "theStruct, theKey, defaultValue"
author: Adam Tuttle
authorEmail: j.adam.tuttle@gmail.com
version: 0
cfVersion: CF5
shortDescription: Returns a key value from the given struct, or a default value.
tagBased: false
description: |
 Returns a key value from the given struct, or a default value.

returnValue: Returns a value.

example: |
 <cfset myData = structNew()>
 <cfset mydata.keyThatExists = 1>
 
 <cfset result1 = structGetKey(myData, "keyThatExists", "not found") /> <!--- this returns the value of myData.keyThatExists --->
 <cfset result2 = structGetKey(myData, "keyThatNOTExists", "not found") /> <!--- this returns "not found" --->
 <cfoutput>#result1#<br />#result2#</cfoutput>

args:
 - name: theStruct
   desc: The structure.
   req: true
 - name: theKey
   desc: Key name.
   req: true
 - name: defaultValue
   desc: Default value to use if key does not exist.
   req: true


javaDoc: |
 /**
  * Returns a key value from the given struct, or a default value.
  * 
  * @param theStruct      The structure. (Required)
  * @param theKey      Key name. (Required)
  * @param defaultValue      Default value to use if key does not exist. (Required)
  * @return Returns a value. 
  * @author Adam Tuttle (j.adam.tuttle@gmail.com) 
  * @version 0, September 9, 2008 
  */

code: |
 function structGetKey(theStruct, theKey, defaultVal){
     if (structKeyExists(arguments.theStruct, arguments.theKey)){
         return arguments.theStruct[arguments.theKey];
     }else{
         return arguments.defaultVal;
     }
 }

oldId: 1878
---

