---
layout: udf
title:  HTTPHeader
date:   2002-09-20T10:59:50.000Z
library: CFMLLib
argString: "[name][, value][, statuscode][, statustext]"
author: Kreig Zimmerman
authorEmail: kkz@foureyes.com
version: 1
cfVersion: CF6
shortDescription: Mimics the CFHEADER tag.
description: |
 Mimics the CFHEADER tag. Allows you to pass a name/value pair or a statuscode/statustext pair.

returnValue: Returns nothing.

example: |
 <cfscript>
   HTTPHeader(name="Content-Type", value="text/html; charset=iso-8859-1");
   HTTPHeader(name="Content-Language", value="EN-US");
 </cfscript>

args:
 - name: name
   desc: Name used when passing name/value pairs.
   req: false
 - name: value
   desc: Value used when passing name/value pairs.
   req: false
 - name: statuscode
   desc: Status code used when passing statuscode/statustext pairs.
   req: false
 - name: statustext
   desc: Status text used when passing statuscode/statustext pairs.
   req: false


javaDoc: |
 <!---
  Mimics the CFHEADER tag.
  
  @param name      Name used when passing name/value pairs. (Optional)
  @param value      Value used when passing name/value pairs. (Optional)
  @param statuscode      Status code used when passing statuscode/statustext pairs. (Optional)
  @param statustext      Status text used when passing statuscode/statustext pairs. (Optional)
  @return Returns nothing. 
  @author Kreig Zimmerman (kkz@foureyes.com) 
  @version 1, September 20, 2002 
 --->

code: |
 <cffunction name="HTTPHeader" output="false" returnType="void">
     <cfargument name="name" type="string" default="">
     <cfargument name="value" type="string" default="">
     <cfargument name="statuscode" type="string" default="">
     <cfargument name="statustext" type="string" default="">
     <cfif Len(name) and Len(value)>
         <cfheader name="#name#" value="#value#">
     <cfelseif Len(statuscode) and Len(statustext)>
         <cfheader statuscode="#statuscode#" statustext="#statustext#">
     </cfif>
 </cffunction>

---

