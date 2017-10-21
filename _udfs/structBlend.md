---
layout: udf
title:  structBlend
date:   2008-10-30T17:23:43.000Z
library: DataManipulationLib
argString: "struct1, struct2[, overwriteflag]"
author: Raymond Compton
authorEmail: usaRaydar@gmail.com
version: 2
cfVersion: CF5
shortDescription: Blends all nested structs, arrays, and variables in a struct to another.
description: |
 Works much like Coldfusion's own structAppend.  The difference is it checks all nested structs and updates or adds children nested keys and their values to any depth.
 
 Note that this UDF modified the structs. If you wish to keep the original data, make a backup using duplicate first.

returnValue: Returns a boolean.

example: |
 <cfscript>
     St1.Base = "Struct One Keyval";
     St1.Nest.one = "one";
     St1.Nest.two = "two";
     St1.Nest.three = "three";
     St2.Base = "Struct 2 Keyval";
     St2.Nest.two = 2;
     St2.Nest.four = 4;
 </cfscript>    
     
 <cfoutput>
     <cfdump var="#St1#" label="St1 Orginal">
     <cfdump var="#St2#" label="St2">
     Blend with overwrite=false: Return=<cfoutput>#structBlend(St1,St2,false)#</cfoutput>
     <cfdump var="#St1#" label="St1 blended">
     Blend with overwrite=true: Return=<cfoutput>#structBlend(St1,St2,true)#</cfoutput>
     <cfdump var="#St1#" label="St1 blended, overwrite=true">
 </cfoutput>

args:
 - name: struct1
   desc: The first struct.
   req: true
 - name: struct2
   desc: The second sturct.
   req: true
 - name: overwriteflag
   desc: Determines if keys are overwritten. Defaults to true.
   req: false


javaDoc: |
 /**
  * Blends all nested structs, arrays, and variables in a struct to another.
  * 
  * @param struct1      The first struct. (Required)
  * @param struct2      The second sturct. (Required)
  * @param overwriteflag      Determines if keys are overwritten. Defaults to true. (Optional)
  * @return Returns a boolean. 
  * @author Raymond Compton (usaRaydar@gmail.com) 
  * @version 2, October 30, 2008 
  */

code: |
 function structBlend(Struct1,Struct2) {
     var i = 1;
     var OverwriteFlag = true;
     var StructKeyAr = listToArray(structKeyList(Struct2));
     var Success = true;
       if ( arrayLen(arguments) gt 2 AND isBoolean(Arguments[3]) ) // Optional 3rd argument "OverwriteFlag"
           OverwriteFlag = Arguments[3];
         try {
             for ( i=1; i lte structCount(Struct2); i=i+1 ) {
                 if ( not isDefined('Struct1.#StructKeyAr[i]#') )  // If structkey doesn't exist in Struct1
                     Struct1[StructKeyAr[i]] = Struct2[StructKeyAr[i]]; // Copy all as is.
                 else if ( isStruct(struct2[StructKeyAr[i]]) )            // else if key is another struct
                     Success = structBlend(Struct1[StructKeyAr[i]],Struct2[StructKeyAr[i]],OverwriteFlag);  // Recall function
                 else if ( OverwriteFlag )    // if Overwrite
                     Struct1[StructKeyAr[i]] = Struct2[StructKeyAr[i]];  // set Struct1 Key with Struct2 value.
             }
         }
         catch(any excpt) { Success = false; }
     return Success;
 }

---

