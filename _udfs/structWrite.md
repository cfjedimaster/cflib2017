---
layout: udf
title:  structWrite
date:   2003-05-09T18:29:17.000Z
library: DataManipulationLib
argString: "structure, key, value[, allowOverwrite]"
author: Anthony Cooper
authorEmail: ant@bluevan.co.uk
version: 1
cfVersion: CF5
shortDescription: Like structInsert() but does not throw an error if the key exists and you choose not to overwrite.
tagBased: false
description: |
 A replacement for structInsert() function. Works around the structInsert() feature of thowing an error if you are writing to a struct, the key exists, and you don't want to overwrite.

returnValue: Returns yes or no indicating if a change was made.

example: |
 <cfset fishStock = structNew()>
 <cfdump var="#fishStock#" />
 
 <cfset result = structWrite( fishStock, "trout", "100", "false" )>
 <cfdump var="#result#" />
 <cfdump var="#fishStock#" />
 <hr />
 <cfset result = structWrite( fishStock, "trout", "50", "false" )>
 <cfdump var="#result#" />
 <cfdump var="#fishStock#" />
 <hr />
 <cfset result = structWrite( fishStock, "trout", "0", "true" )>
 <cfdump var="#result#" />
 <cfdump var="#fishStock#" />
 <hr />
 <cfset result = structWrite( fishStock, "salmon", "10", "true" )>
 <cfdump var="#result#" />
 <cfdump var="#fishStock#" />

args:
 - name: structure
   desc: Struct to be modified.
   req: true
 - name: key
   desc: Key to modify.
   req: true
 - name: value
   desc: Value to use.
   req: true
 - name: allowOverwrite
   desc: Boolean. If false and key exists, value will not be changed. Defaults to false.
   req: false


javaDoc: |
 /**
  * Like structInsert() but does not throw an error if the key exists and you choose not to overwrite.
  * 
  * @param structure      Struct to be modified. (Required)
  * @param key      Key to modify. (Required)
  * @param value      Value to use. (Required)
  * @param allowOverwrite      Boolean. If false and key exists, value will not be changed. Defaults to false. (Optional)
  * @return Returns yes or no indicating if a change was made. 
  * @author Anthony Cooper (ant@bluevan.co.uk) 
  * @version 1, May 9, 2003 
  */

code: |
 function structWrite(structure, key, value) {
     var valueWritten = false;
     var allowOverwrite = false;
         
     if(arrayLen(arguments) gte 4) allowOverwrite = arguments[4];
 
     if ( structKeyExists( structure, key ) IMP allowOverwrite ) {
         valueWritten = structInsert( structure, key, value, allowOverwrite );
     }
     return yesNoFormat(valueWritten);
 }

oldId: 859
---

