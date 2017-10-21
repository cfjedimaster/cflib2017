---
layout: udf
title:  IsXML
date:   2003-08-28T10:04:27.000Z
library: DataManipulationLib
argString: "data"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF6
shortDescription: Checks to see if a string is valid XML.
description: |
 Checks to see if a string is valid XML.

returnValue: Returns a boolean.

example: |
 <cfsavecontent variable="packet">
 <foo></foo>
 </cfsavecontent>
 
 <cfoutput>
 Is packet XML? #isXML(packet)#<br>
 Is "jedi" a packet? #isXML("jedi")#
 </cfoutput>

args:
 - name: data
   desc: String to check.
   req: true


javaDoc: |
 <!---
  Checks to see if a string is valid XML.
  
  @param data      String to check. (Required)
  @return Returns a boolean. 
  @author Ben Forta (ben@forta.com) 
  @version 1, August 28, 2003 
 --->

code: |
 <cffunction name="isXML" returnType="boolean" output="no">
    <cfargument name="data" type="string" required="yes">
 
    <!--- try catch block --->
    <cftry>
       <!--- try to parse the data as xml --->
       <cfset xmlparse(data)>
       <!--- if xmlparse() fails, it is not xml --->
       <cfcatch type="any">
          <cfreturn false>
       </cfcatch>
    </cftry>
 
    <cfreturn true>
    
 </cffunction>

---

