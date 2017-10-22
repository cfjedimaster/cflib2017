---
layout: udf
title:  formToNameValuePairs
date:   2009-06-18T03:15:16.000Z
library: StrLib
argString: "formStruct[, doNotProcessList]"
author: Stephen Withington
authorEmail: steve@stephenwithington.com
version: 0
cfVersion: CF7
shortDescription: I generate concatenated name-value pairs from forms.
tagBased: true
description: |
 Pass me a form and I'll generate url-friendly concatenated name-value pairs of each form field. If you want me to ignore any of the form fields, I can do that too!

returnValue: Returns a string

example: |
 <cfoutput>#formToNameValuePairs(form, "SUBMIT,ISSUBMITTED")#</cfoutput>

args:
 - name: formStruct
   desc: form structure
   req: true
 - name: doNotProcessList
   desc: List of fields to ignore
   req: false


javaDoc: |
 <!---
  I generate concatenated name-value pairs from forms.
  
  @param formStruct      form structure (Required)
  @param doNotProcessList      List of fields to ignore (Optional)
  @return Returns a string 
  @author Stephen Withington (steve@stephenwithington.com) 
  @version 0, June 17, 2009 
 --->

code: |
 <cffunction name="formToNameValuePairs" returntype="string" output="false" access="remote"
             hint="pass me a form and i'll generate concatenated name-value pairs.">
 
     <cfargument name="formStruct" type="struct" required="true" hint="the form struct to parse and concatenate" />
     <cfargument name="doNotProcessList" type="string" required="false" hint="a list of form fields to ignore" default="" />
 
     <cfset var local = structNew() />
     <cfset local.nameValuePairs = "" />
     <cfset local.doNotProcess = arguments.doNotProcessList />
     <cfset local.field = "" />
 
     <cfif structKeyExists(arguments,"formStruct") and structKeyExists(arguments.formStruct,"fieldnames")>
             <cfloop list="#arguments.formStruct.fieldnames#" index="local.field"> 
                 <cfif not listFindNoCase(local.doNotProcess,local.field)>
                     <cfset local.doNotProcess = listAppend(local.doNotProcess,local.field) />
                     <cfset local.nameValuePairs = listAppend(local.nameValuePairs,lcase(local.field) & "=" & urlEncodedFormat(form[local.field], "utf-8"), "&") />                        
                     </cfif>
             </cfloop>
        </cfif>    
 
     <cfreturn local.nameValuePairs />    
 </cffunction>

---

