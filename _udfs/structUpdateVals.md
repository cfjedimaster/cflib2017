---
layout: udf
title:  structUpdateVals
date:   2005-12-22T22:42:48.000Z
library: DataManipulationLib
argString: "struct1, struct2"
author: Jorge Loyo
authorEmail: loyoj@fiu.edu
version: 1
cfVersion: CF6
shortDescription: Update one structure values with values from another structure for those keys that match.
description: |
 This function will find the matching keys between two structures and update structure1 values with structure2 values. If structure2 has more keys than structure1 the keys will not be added.

returnValue: Returns a structure.

example: |
 <cfset struct1 = structNew() />
 <cfset struct1['FNAME'] = "John" />
 <cfset struct1['LNAME'] = "Smith" />
 <cfset struct1['PHONE'] = "305.555.5555" />
 
 <cfset struct2 = structNew() />
 <cfset struct2['FNAME'] = "Bill" />
 <cfset struct2['LNAME'] = "Gates" />
 
 <cfdump var="#struct1#" label="Struct 1">
 <cfdump var="#struct2#" label="Struct 2">
 
 <cfset structUpdateVals(struct1, struct2) />
 <cfdump var="#struct1#" label="Updated Struct 1">

args:
 - name: struct1
   desc: The structure to be modified.
   req: true
 - name: struct2
   desc: The structure to copy values from.
   req: true


javaDoc: |
 <!---
  Update one structure values with values from another structure for those keys that match.
  
  @param struct1      The structure to be modified. (Required)
  @param struct2      The structure to copy values from. (Required)
  @return Returns a structure. 
  @author Jorge Loyo (loyoj@fiu.edu) 
  @version 1, December 22, 2005 
 --->

code: |
 <cffunction name="structUpdateVals" returntype="struct" output="false">
     <cfargument name="struct1" required="yes" type="struct" />
     <cfargument name="struct2" required="yes" type="struct"  />
 
     <cfloop collection="#struct2#" item="key">
         <cfif structKeyExists(struct1, key)>
             <cfset structUpdate(struct1, key, struct2[key]) />
     </cfif>
     </cfloop>        
     <cfreturn struct1 />
 </cffunction>

---

