---
layout: udf
title:  Throw
date:   2002-10-15T11:05:35.000Z
library: CFMLLib
argString: "[Type][, Message][, Detail][, ErrorCode][, ExtendedInfo][, Object]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the CFTHROW tag.
description: |
 Mimics the CFTHROW tag.

returnValue: Does not return a value.

example: |
 <cfscript>
 x = 1;
 try {
     if(x lt 9) throw("BadValue","X is less than 9","X is less than 9 and this is bad because....",9900);
     } catch("BadValue" e) {
         dump(e);
     } catch("Any" e) {
         // you won't see this
         writeOutput("Unknown error");
     }
 </cfscript>

args:
 - name: Type
   desc: Type for exception.
   req: false
 - name: Message
   desc: Message for exception.
   req: false
 - name: Detail
   desc: Detail for exception.
   req: false
 - name: ErrorCode
   desc: Error code for exception.
   req: false
 - name: ExtendedInfo
   desc: Extended Information for exception.
   req: false
 - name: Object
   desc: Object to throw.
   req: false


javaDoc: |
 <!---
  Mimics the CFTHROW tag.
  
  @param Type      Type for exception. (Optional)
  @param Message      Message for exception. (Optional)
  @param Detail      Detail for exception. (Optional)
  @param ErrorCode      Error code for exception. (Optional)
  @param ExtendedInfo      Extended Information for exception. (Optional)
  @param Object      Object to throw. (Optional)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="throw" output="false" returnType="void" hint="CFML Throw wrapper">
     <cfargument name="type" type="string" required="false" default="Application" hint="Type for Exception">
     <cfargument name="message" type="string" required="false" default="" hint="Message for Exception">
     <cfargument name="detail" type="string" required="false" default="" hint="Detail for Exception">
     <cfargument name="errorCode" type="string" required="false" default="" hint="Error Code for Exception">
     <cfargument name="extendedInfo" type="string" required="false" default="" hint="Extended Info for Exception">
     <cfargument name="object" type="any" hint="Object for Exception">
     
     <cfif not isDefined("object")>
         <cfthrow type="#type#" message="#message#" detail="#detail#" errorCode="#errorCode#" extendedInfo="#extendedInfo#">
     <cfelse>
         <cfthrow object="#object#">
     </cfif>
     
 </cffunction>

---

