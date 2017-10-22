---
layout: udf
title:  Abort
date:   2002-10-16T11:20:35.000Z
library: CFMLLib
argString: "[showError]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cfabort tag.
tagBased: true
description: |
 Mimics the cfabort tag.

returnValue: Does not return a value.

example: |
 <cfscript>
 x = 1;
 //abort("Foo");
 </cfscript>

args:
 - name: showError
   desc: An error to throw.
   req: false


javaDoc: |
 <!---
  Mimics the cfabort tag.
  
  @param showError      An error to throw. (Optional)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 16, 2002 
 --->

code: |
 <cffunction name="abort" output="false" returnType="void">
     <cfargument name="showError" type="string" required="false">
     <cfif isDefined("showError") and len(showError)>
         <cfthrow message="#showError#">
     </cfif>
     <cfabort>
 </cffunction>

---

