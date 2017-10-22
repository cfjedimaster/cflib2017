---
layout: udf
title:  structMerge
date:   2006-03-02T13:05:16.000Z
library: DataManipulationLib
argString: "struct1, struct2"
author: Marcos Placona
authorEmail: marcos.placona@gmail.com
version: 1
cfVersion: CF6
shortDescription: Merge two simple structures in one combining keys or creating new ones.
tagBased: true
description: |
 This UDF can be used when you want to merge two ColdFusion Structures on just one. Just pass the structures as arguments, and it returns a new structure with all the data amended or merged. Unlike structAppend, existing values in struct1 will be appended, not overwritten.

returnValue: Returns a struct.

example: |
 <cfset str1 = structNew() />
 <cfset str1.name = "Marcos" />
 <cfset str1.surname = "Placona" />
 <cfset str1.age = 22 />
 <cfset str1.wife = false />
 <cfset str1.dog = "Toby" />
 <cfset str1.company = "Company 1">
 
 <cfset str2 = structNew() />
 <cfset str2.name = "John" />
 <cfset str2.surname = "Doe" />
 <cfset str2.age = 55 />
 <cfset str2.children = 2 />
 <cfset str2.company = "Company 2">
 <cfset str2.website = "www.mywebsite.co.uk">
 
 <cfdump var="#structMerge(str1,str2)#" label="structMerge">
 <cfset structAppend(str1, str2)>
 <cfdump var="#str1#" label="structAppend">

args:
 - name: struct1
   desc: The first struct.
   req: true
 - name: struct2
   desc: The second struct.
   req: true


javaDoc: |
 <!---
  Merge two simple structures in one combining keys or creating new ones.
  
  @param struct1      The first struct. (Required)
  @param struct2      The second struct. (Required)
  @return Returns a struct. 
  @author Marcos Placona (marcos.placona@gmail.com) 
  @version 1, March 2, 2006 
 --->

code: |
 <cffunction name="structMerge" output="false">
     <cfargument name="struct1" type="struct" required="true">
     <cfargument name="struct2" type="struct" required="true">
     <cfset var ii = "" />
     
     <!--- Loop over the second structure passed --->
     <cfloop collection="#arguments.struct2#" item="ii">
         <cfif structKeyExists(struct1,ii)>
         <!--- In case it already exists, we just update it --->
             <cfset struct1[ii] = listAppend(struct1[ii], struct2[ii])>
         <cfelse>
         <!--- In all the other cases, just create a new key with the values or list of values --->
             <cfset struct1[ii] = struct2[ii] />
         </cfif>
     </cfloop>
     <cfreturn struct1 />
 </cffunction>

---

