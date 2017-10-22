---
layout: udf
title:  IsCFC
date:   2002-10-16T17:07:44.000Z
library: DataManipulationLib
argString: "objectToCheck"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF6
shortDescription: Returns a boolean for whether a CF variable is a CFC instance.
tagBased: false
description: |
 Pass it any CF variable, it returns a boolean value to tell you if it is a CFC instance.

returnValue: Returns a boolean.

example: |
 <cfscript>
     cfc = createObject("component","cflib.udf");
     str = createObject("java","java.lang.String");
 </cfscript>
 
 <cfoutput>
     isCFC(cfc) = #isCFC(cfc)#<br>
     isCFC(str) = #isCFC(str)#<br>
     isCFC(structNew()) = #isCFC(structNew())#<br>
 </cfoutput>

args:
 - name: objectToCheck
   desc: The object to check.
   req: true


javaDoc: |
 /**
  * Returns a boolean for whether a CF variable is a CFC instance.
  * 
  * @param objectToCheck      The object to check. (Required)
  * @return Returns a boolean. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, October 16, 2002 
  */

code: |
 function IsCFC(objectToCheck){
     //get the meta data of the object we're inspecting
     var metaData = getMetaData(arguments.objectToCheck);
     //if it's an object, let's try getting the meta Data
     if(isObject(arguments.objectToCheck)){
         //if it has a type, and that type is "component", then it's a component
         if(structKeyExists(metaData,"type") AND metaData.type is "component"){
             return true;
         }
     }    
     //if we've gotten here, it must not have been a contentObject            
     return false;        
 }

---

