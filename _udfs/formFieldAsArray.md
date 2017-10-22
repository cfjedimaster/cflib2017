---
layout: udf
title:  formFieldAsArray
date:   2013-02-20T01:15:10.000Z
library: UtilityLib
argString: "fieldName"
author: Ryan Stille
authorEmail: ryan@stillnet.org
version: 2
cfVersion: CF8
shortDescription: Returns a form field as array, useful for when you have more than one form field with the same name.
tagBased: true
description: |
 When you pass several form or URL variables into ColdFusion with the same name, they end up as a comma separated list. This is commonly done with checkboxes – a user can check as many items as they want, then they will end up in your code all in a single variable. This works fine, until your data contains a comma. This function will return the data as an array to get around that problem. Tested on ColdFusion 8 and 9, probably runs on CF 7 also, maybe even 6.
 
 UPDATE - rewritten to work in CF10. Code is much more simple now.

returnValue: Returns an array.

example: |
 <cfset MyFormFieldAsArray = formFieldAsArray('group_of_checkboxes') />

args:
 - name: fieldName
   desc: Name of the Form or URL field
   req: true


javaDoc: |
 <!---
  Returns a form field as array, useful for when you have more than one form field with the same name.
  
  @param fieldName      Name of the Form or URL field (Required)
  @return Returns an array. 
  @author Ryan Stille (ryan@stillnet.org) 
  @version 2, February 19, 2013 
 --->

code: |
 <cffunction name="formFieldAsArray" returntype="array" output="false" hint="Returns a Form/URL variable as an array.">
     <cfargument name="fieldName" required="true" type="string" hint="Name of the Form or URL field" />
     
     <cfset var content = getHTTPRequestData().content />
     <cfset var returnArray = arrayNew(1) />
     
     <cfloop list="#content#" delimiters="&" index="local.parameter">
         <cfif listFirst(local.parameter,"=") EQ arguments.fieldName>
             <cfif ListLen(local.parameter,"=") EQ 2>
                 <cfset arrayAppend(returnArray,URLDecode(listLast(local.parameter,"="))) />
             <cfelse>
                 <cfset arrayAppend(returnArray,"") />
             </cfif>
         </cfif>
     </cfloop>
     
     <cfreturn returnArray />
 
 </cffunction>

---

