---
layout: udf
title:  IsCFCType
date:   2002-12-23T21:14:47.000Z
library: DataManipulationLib
argString: "objectToCheck, type[, checkFullName]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF6
shortDescription: Checks if a given variable is a specific CFC type
tagBased: false
description: |
 Given a variable and a type to check for, this UDF returns a boolean value for whether the given variable is a component of the given type.
 
 You can use either &quot;long notation&quot; (i.e.: &quot;org.bacfug.myCFC&quot;), which will check for the complete component type, or you can use &quot;short notation&quot; (i.e.: &quot;myCFC&quot;), which will check only the name of the component, without concern for where it sits in the directory hierarchy.
 
 If you want to force full name checking, regardles off using long or short notation, pass a boolean value as an optional third argument.

returnValue: Returns a boolean.

example: |
 <cfscript>
     //create a component instance
     myCFC = createObject("component","CFIDE.componentutils.utils");
     //which types shall we check?
     typesToCheck = arrayNew(1);
     typesToCheck[1] = "utils";
     typesToCheck[2] = "CFIDE.componentutils.utils";
     typesToCheck[3] = "banana";
     typesToCheck[4] = "org.bacfug.utils";
 </cfscript>
 
 <!--- loop through the types to check, checking each one --->
 <cfloop from="1" to="#arrayLen(typesToCheck)#" index="ii">
     <cfset thisType = typesToCheck[ii]>
     <cfoutput>
         Is myCFC a <em>#thisType#</em>?: #yesNoFormat(isCFCType(myCFC,thisType))#<br />
     </cfoutput>
 </cfloop>
 
 <hr>
 <cfdump var="#getMetaData(myCFC)#">

args:
 - name: objectToCheck
   desc: CFC instance to check.
   req: true
 - name: type
   desc: String name of CFC.
   req: true
 - name: checkFullName
   desc: Boolean specifying if type should only match for the full name of the CFC. Defaults to false. If any value is passed, checkFullname is true.
   req: false


javaDoc: |
 /**
  * Checks if a given variable is a specific CFC type
  * 
  * @param objectToCheck      CFC instance to check. (Required)
  * @param type      String name of CFC. (Required)
  * @param checkFullName      Boolean specifying if type should only match for the full name of the CFC. Defaults to false. If any value is passed, checkFullname is true. (Optional)
  * @return Returns a boolean. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, December 23, 2002 
  */

code: |
 function isCFCType(objectToCheck,type){
     //get the meta data of the object we're inspecting (we use duplicate so we don't mess with the instance)
     var metaData = getMetaData(arguments.objectToCheck);
     //are we going to check for a full name, or just the end?
     var checkFullName = true;
     //which component are we checking? (used to allow traversing the "extends" for extended components)
     var metaToCheck = metaData;
     //which name shall we check?
     var nameToCheck = metaData.name;
     //if the arguments.type has no periods, don't check the full name
     if(listLen(arguments.type,".") LTE 1)
         checkFullName = false;
     //allow a third argument to force the checkFullName
     if(structCount(arguments) GT 2)
         checkFullName = arguments[3];
     //if it's an object, see if it's the right kind of component
     if(isObject(arguments.objectToCheck)){
         //if it has a type, and that type is "component", then it's a component, so we then look at the type
         if(structKeyExists(metaData,"type") AND metaData.type is "component"){    
             //do a while loop to be sure we see if this component extends the type we want
             while(structKeyExists(metaToCheck,"extends")){
                 //if we are not checking the full name, then take only the last element in the full name
                 if(NOT checkFullName)
                     nameToCheck = listLast(metaToCheck.name,".");
                 else
                     nameToCheck = metaToCheck.name;
                 //if the name of the component we're looking at is the type we're looking for, return true
                 if(nameToCheck is arguments.type)
                     return true;
                 //set this to the extends of the current component to traverse the meta data tree    
                 metaToCheck = metaToCheck.extends;    
             }
         }
     }    
     //if we've gotten here, it must not have been a the right kind of object
     return false;        
 }

---

