---
layout: udf
title:  arrayGroupsOf
date:   2010-02-04T23:32:12.000Z
library: DataManipulationLib
argString: "arrObj, intGroup[, padding]"
author: Marcos Placona
authorEmail: marcos.placona@gmail.com
version: 1
cfVersion: CF6
shortDescription: Splits or iterates over the array in number of groups.
tagBased: true
description: |
 Splits or iterates over the array in number of groups, 
 padding any remaining slots with custom strings unless it is empty. It's a big helper for the presentation layer where sometimes it's necessary to display data broken down into columns.

returnValue: Returns an array.

example: |
 <cfset ArrFruits = ["Orange", "Apple", "Peach", "Blueberry", 
                     "Blackberry", "Strawberry", "Grape", "Mango", 
                     "Clementine", "Cherry", "Plum", "Guava", 
                     "Cranberry"]>
 
 <table border="1">
     <cfoutput>
         <cfloop array="#arrayGroupsOf(ArrFruits, 5, 'not set')#" index="arrFruitsIX">
           <tr>
             <cfloop array="#arrFruitsIX#" index="arrFruit">
                 <td>#arrFruit#</td>
             </cfloop>
           </tr>
         </cfloop>
     </cfoutput>
 </table>

args:
 - name: arrObj
   desc: Array to split up in groups.
   req: true
 - name: intGroup
   desc: Number of items allowed on each group.
   req: true
 - name: padding
   desc:  What should it be filled with in case there's empty slots.
   req: false


javaDoc: |
 <!---
  Splits or iterates over the array in number of groups.
  
  @param arrObj      Array to split up in groups. (Required)
  @param intGroup      Number of items allowed on each group. (Required)
  @param padding       What should it be filled with in case there's empty slots. (Optional)
  @return Returns an array. 
  @author Marcos Placona (marcos.placona@gmail.com) 
  @version 1, February 4, 2010 
 --->

code: |
 <cffunction name="arrayGroupsOf" access="public" output="false" returntype="array">
     <cfargument name="arrObj" type="array" required="true" hint="An array object that will be split up in groups">
     <cfargument name="intGroup" type="numeric" required="true" hint="Number of items on each group">
     <cfargument name="padding" type="string" required="false" default=" " hint="What should it be filled with in case there's empty slots">
     
     <cfset var resArray = createObject("java", "java.util.ArrayList").Init(arguments.arrObj) />
     <cfset var arrGroup = arrayNew(1) />
     <cfset var arrObjGroup = arrayNew(1) />
     <cfset var arrObjSize = resArray.size()>
     <cfset var subStart = 0>
     <cfset var subEnd = arguments.intGroup>
     <cfset var ii = "">
     <cfset var difference = "">
     <cfset var jj = "">
     
     <cfset arrGroupSize = ceiling(arrObjSize / arguments.intGroup)>
     <cfset arrArrayGroupSize = arrGroupSize * arguments.intGroup>
     
     <cfif arrArrayGroupSize GT arrObjSize>
         <cfset difference = arrArrayGroupSize - arrObjSize>
         <cfloop from="1" to="#difference#" index="ii">
             <cfset resArray.add(arguments.padding) />
         </cfloop>
     </cfif>
     
     <cfloop from="1" to="#arrGroupSize#" index="jj">            
         <cfset arrGroup = resArray.subList(subStart, subEnd)>        
         <cfset arrayAppend(arrObjGroup, arrGroup)>
         
         <cfset subStart = subStart + arguments.intGroup>
         <cfset subEnd = subEnd  + arguments.intGroup>
         <cfset arrGroup = arrayNew(1) />
     </cfloop>
     
     <cfreturn arrObjGroup>
 
 </cffunction>

---

