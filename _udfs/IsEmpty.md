---
layout: udf
title:  IsEmpty
date:   2003-07-10T21:49:05.000Z
library: DataManipulationLib
argString: "varName"
author: Fabio Serra
authorEmail: faser@faser.net
version: 1
cfVersion: CF5
shortDescription: Check if a variable is set and has a value.
tagBased: false
description: |
 Check if a variable is set and has a value. This UDF will check to see if the variable is an array, structure, or query. If so, it will check to see if any data exists in the variable, and if not, will return true.

returnValue: Returns a boolean.

example: |
 <cfset myVar = 1>
 <cfset myVar3 = arrayNew(1)>
 <cfset myVar4 = arrayNew(1)>
 <cfset myVar4[1] = "e">
 <cfset myVar5 = structNew()>
 <cfset myVar6 = structNew()>
 <cfset myVar6.name = "ray">
 <cfset myVar7 = queryNew("F")>
 <cfset myVar8 = queryNew("F")>
 <cfset queryAddRow(myVar8,1)>
 
 <cfoutput>
 IsEmpty("myvar") = #isEmpty("myVar")#<br>
 IsEmpty("myvar2") = #isEmpty("myVar2")#<br>
 IsEmpty("myvar3") = #isEmpty("myVar3")#<br>
 IsEmpty("myvar4") = #isEmpty("myVar4")#<br>
 IsEmpty("myvar5") = #isEmpty("myVar5")#<br>
 IsEmpty("myvar6") = #isEmpty("myVar6")#<br>
 IsEmpty("myvar7") = #isEmpty("myVar7")#<br>
 IsEmpty("myvar8") = #isEmpty("myVar8")#<br>
 </cfoutput>
 
 <cfif isEmpty("myVar")>
 <cfset myVar = "Pippo">
 </cfif>

args:
 - name: varName
   desc: Variable to check for.
   req: true


javaDoc: |
 /**
  * Check if a variable is set and has a value.
  * Mods by RCamden to add support for struct/query
  * 
  * @param varName      Variable to check for. (Required)
  * @return Returns a boolean. 
  * @author Fabio Serra (faser@faser.net) 
  * @version 1, July 10, 2003 
  */

code: |
 function isEmpty(varName) {
     var ptr = "";
     
     if(not isDefined(varName)) return true;
     ptr = evaluate(varName);
     
     if(isSimpleValue(ptr)) {
         if(not len(ptr)) return true;
     } else if(isArray(ptr)) {
         if(arrayIsEmpty(ptr)) return true;
     } else if(isStruct(ptr)) {
         if(structIsEmpty(ptr)) return true;
     } else if(isQuery(ptr)) {
         if(not ptr.recordCount) return true;
     }
         
     return false;
 }

oldId: 420
---

