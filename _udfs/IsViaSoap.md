---
layout: udf
title:  IsViaSoap
date:   2003-08-28T10:00:47.000Z
library: UtilityLib
argString: ""
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF6
shortDescription: Returns true if the curent request is SOAP based.
tagBased: true
description: |
 Returns true if the curent request is SOAP based.

returnValue: Returns a boolean.

example: |
 <cfoutput>Is this request a Soap request? #isViaSoap()#</cfoutput>

args:


javaDoc: |
 <!---
  Returns true if the curent request is SOAP based.
  
  @return Returns a boolean. 
  @author Ben Forta (ben@forta.com) 
  @version 1, August 28, 2003 
 --->

code: |
 <cffunction name="isViaSoap" returnType="boolean" output="no">
    <!--- Get current message context --->
    <cfset var ctx = createObject("java", "org.apache.axis.MessageContext").getCurrentContext()>
     
    <!--- Invoke (cheap) method to see if it is null --->
    <cftry>
       <cfset ctx.isclient()>
       <cfcatch type="any">
          <cfreturn false>
       </cfcatch>
    </cftry>
 
    <cfreturn true>
 
 </cffunction>

---

