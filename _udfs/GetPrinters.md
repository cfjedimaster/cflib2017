---
layout: udf
title:  GetPrinters
date:   2007-09-07T22:35:26.000Z
library: UtilityLib
argString: ""
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF8
shortDescription: Get array of available server printers (for use with CFPRINT).
tagBased: true
description: |
 Uses internal ColdFusion Java object to obtain an array of printers available to CF.

returnValue: Returns an array.

example: |
 <cfdump var="#GetPrinters()#">

args:


javaDoc: |
 <!---
  Get array of available server printers (for use with CFPRINT).
  
  @return Returns an array. 
  @author Ben Forta (ben@forta.com) 
  @version 1, September 7, 2007 
 --->

code: |
 <cffunction name="GetPrinters" returntype="array" output="no">
    <!--- Define local vars --->
    <cfset var piObj="">
 
    <!--- Get PrinterInfo object --->
    <cfobject type="java"
          action="create"
          name="piObj"
          class="coldfusion.print.PrinterInfo">
 
    <!--- Return printer list --->
    <cfreturn piObj.getPrinters()>
 </cffunction>

---

