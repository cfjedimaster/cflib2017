---
layout: udf
title:  ListSplit
date:   2010-03-11T06:13:17.000Z
library: StrLib
argString: "inList, numGet[, inDelimiter][, outDelimiter]"
author: Ryan Thompson-Jewell
authorEmail: ryan@thompson-jewell.com
version: 3
cfVersion: CF5
shortDescription: A split function for lists, splitting the original list into lists of n array elements.
description: |
 A split function for lists, splitting the original list into lists of n array elements. Returns an array of the list segments.

returnValue: Returns an array of lists.

example: |
 <cfset form.invoices = "205106,205107,R66591,R66647 RT4036">
 <cfset invoicesSplit = listsplit(inList="#form.invoices#", numGet="#numberformat(listLen(form.invoices)/2)#", inDelimiter=",", outDelimiter=" ")>
 <cfdump var="#invoicesSplit#">

args:
 - name: inList
   desc: The list to split.
   req: true
 - name: numGet
   desc: Number of items per array element.
   req: true
 - name: inDelimiter
   desc: List delimiter. Defaults to a comma.
   req: false
 - name: outDelimiter
   desc: Output list delimiter, defaults to comma
   req: false


javaDoc: |
 <!---
  A split function for lists, splitting the original list into lists of n array elements.
  Rewritten by Raymond Camden
  Output delimiter mod by Jules Gravinese (webveteran.com), December 2009
  
  @param inList      The list to split. (Required)
  @param numGet      Number of items per array element. (Required)
  @param inDelimiter      List delimiter. Defaults to a comma. (Optional)
  @param outDelimiter      Output list delimiter, defaults to comma (Optional)
  @return Returns an array of lists. 
  @author Ryan Thompson-Jewell (ryan@thompson-jewell.com) 
  @version 3, March 11, 2010 
 --->

code: |
 <cffunction name="listSplit" output="no" returnType="array" description="
     * A split function for lists, splitting the original list into lists of n array elements.
     * Rewritten by Raymond Camden
     * Output delimiter mod by Jules Gravinese (webveteran.com), December 2009
     *
     * @author  Ryan Thompson-Jewell (ryan@thompson-jewell.com)
     * @version 2, September 24, 2002
 ">
     <cfargument name="inList"       default=""  hint="The list to split">
     <cfargument name="numGet"       default="1" hint="Number of items per array alement">
     <cfargument name="inDelimiter"  default="," hint="Input delimiter">
     <cfargument name="outDelimiter" default="," hint="Output delimiter">
 
     <cfscript>
     var aResult=arraynew(1);
 
     if(numGet gte listLen(inList,inDelimiter)) {
         aResult[1] = inList;
         return aResult;
     }
     aResult[1] = "";
     while(listLen(inList,inDelimiter)) {
         aResult[arrayLen(aResult)] = listAppend(aResult[arrayLen(aResult)],listFirst(inList,inDelimiter), outDelimiter);
         inList = listRest(inList,inDelimiter);
         if(listLen(aResult[arrayLen(aresult)],outDelimiter) is numGet and len(inList)) aResult[arrayLen(aResult)+1] = "";
     }
     return aResult;
     </cfscript>
 </cffunction>

---

