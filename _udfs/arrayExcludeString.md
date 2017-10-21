---
layout: udf
title:  arrayExcludeString
date:   2006-07-11T14:33:22.000Z
library: DataManipulationLib
argString: "aObj"
author: Marcos Placona
authorEmail: marcos.placona@gmail.com
version: 1
cfVersion: CF6
shortDescription: Excludes string items from an array.
description: |
 This UDF is to be used when you need to remove all the string values from your array. It removes them and return a clean array with just numbers.

returnValue: Returns an array.

example: |
 <cfset aTest = arrayNew(1) />
 <cfset aTest[3] = 22 />
 <cfset aTest[1] = "Marcos" />
 <cfset aTest[2] = "Placona" />
 <cfset aTest[3] = 22 />
 <cfset aTest[4] = "www.cfdevelopers.com.br">
 <cfset aTest[5] = 55>
 <cfset aTest[6] = "test">
 <cfset aTest[7] = "11">
 <cfset aTest[8] = "135">
 <cfset aTest[9] = "test">
 <cfset aTest[10] = "25">
 
 
 <cfdump var="#arrayExcludeNumeric(aTest)#">

args:
 - name: aObj
   desc: Array to filter.
   req: true


javaDoc: |
 <!---
  Excludes string items from an array.
  
  @param aObj      Array to filter. (Required)
  @return Returns an array. 
  @author Marcos Placona (marcos.placona@gmail.com) 
  @version 1, July 11, 2006 
 --->

code: |
 <cffunction name="arrayExcludeString" returntype="array">
     <cfargument name="aObj" type="array" required="Yes">
     <cfset var ii = "">
     
     <!--- Looping through the array --->
     <cfloop to="1" from="#arrayLen(aObj)#" index="ii" step="-1">
         <!--- Checking if it's a number --->
         <cfif not isNumeric(aObj[ii])>
             <cfset arrayDeleteAt(arguments.aObj, ii) />
         </cfif>
     </cfloop>
     
     <cfreturn aObj />
 </cffunction>

---

