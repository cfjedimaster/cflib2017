---
layout: udf
title:  RemoveEmptyStructureKeys
date:   2004-04-19T12:25:25.000Z
library: DataManipulationLib
argString: "structure"
author: Brian Rinaldi
authorEmail: brinaldi@criticaldigital.com
version: 1
cfVersion: CF5
shortDescription: Removes any empty structure keys from within a structure.
tagBased: false
description: |
 Removes any empty structure keys from within a structure. This is often useful when passing FORM scope variables to a component as an argumentCollection.

returnValue: Returns a structure.

example: |
 <cfset s = structNew()>
 <cfset s.foo = "">
 <cfset s.goo = "something">
 <cfdump var="#removeEmptyStructureKeys(s)#">

args:
 - name: structure
   desc: Structure to modify.
   req: true


javaDoc: |
 /**
  * Removes any empty structure keys from within a structure.
  * version 2 by Raymond Camden, added var, slimmed things down a bit.
  * 
  * @param structure      Structure to modify. (Required)
  * @return Returns a structure. 
  * @author Brian Rinaldi (brinaldi@criticaldigital.com) 
  * @version 1, April 19, 2004 
  */

code: |
 function removeEmptyStructureKeys(structure) {
     var newStructure = structNew();
     var keys = structKeyList(arguments.structure);
     var name = "";
     var i = 1;
     for (;i lte listLen(keys);i=i+1) {
         name = listGetAt(keys,i);
         if (not isSimpleValue(arguments.structure[name])) {
             newStructure[name] = arguments.structure[name];
         }
         else if (arguments.structure[name] neq "") {
             newStructure[name] = arguments.structure[name];
         }
     }
     return newStructure;
 }

oldId: 1074
---

