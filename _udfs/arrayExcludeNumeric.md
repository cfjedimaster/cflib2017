---
layout: udf
title:  arrayExcludeNumeric
date:   2006-07-06T15:22:22.000Z
library: DataManipulationLib
argString: "aObj"
author: Marcos Placona
authorEmail: marcos.placona@gmail.com
version: 2
cfVersion: CF6
shortDescription: Excludes numeric items from an array.
description: |
 Excludes all the numerical items inside an one dimensional array returning a new &quot;non numeric&quot; array.

returnValue: Returns an array.

example: |
 <cfset aTest = arrayNew(1) />
 <cfset aTest[1] = "Marcos" />
 <cfset aTest[2] = "Placona" />
 <cfset aTest[3] = 22 />
 <cfset aTest[4] = "www.cfdevelopers.com.br">
 
 <cfdump var="#arrayExcludeNumeric(aTest)#">

args:
 - name: aObj
   desc: Array to filter.
   req: true


javaDoc: |
 <!---
  Excludes numeric items from an array.
  V2 by Raymond Camden
  
  @param aObj      Array to filter. (Required)
  @return Returns an array. 
  @author Marcos Placona (marcos.placona@gmail.com) 
  @version 2, July 6, 2006 
 --->

code: |
 <cffunction name="arrayExcludeNumeric" returntype="array">
     <cfargument name="aObj" type="array" required="Yes">
     <cfset var ii = "">
     
     <!--- Looping through the array --->
     <cfloop to="1" from="#arrayLen(aObj)#" index="ii" step="-1">
         <!--- Checking if it's a number --->
         <cfif isNumeric(aObj[ii])>
             <cfset arrayDeleteAt(arguments.aObj, ii) />
         </cfif>
     </cfloop>
     
     <cfreturn aObj />
 </cffunction>

---

