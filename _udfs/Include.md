---
layout: udf
title:  Include
date:   2005-08-03T12:34:52.000Z
library: CFMLLib
argString: "template"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF6
shortDescription: Mimics the cfinclude tag.
tagBased: true
description: |
 Mimics the cfinclude tag.

returnValue: Does not return a value.

example: |
 <cfscript>
 include("date.cfm");
 </cfscript>

args:
 - name: template
   desc: The template to include.
   req: true


javaDoc: |
 <!---
  Mimics the cfinclude tag.
  Changed output to true so the included doc could display something.
  
  @param template      The template to include. (Required)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 2, August 3, 2005 
 --->

code: |
 <cffunction name="include" output="true" returnType="void">
     <cfargument name="template" type="string" required="true">
     <cfinclude template="#template#">
 </cffunction>

---

