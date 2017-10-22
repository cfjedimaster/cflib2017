---
layout: udf
title:  getGeneratedKey
date:   2008-02-15T17:18:37.000Z
library: DatabaseLib
argString: "resultStruct"
author: Todd Sharp
authorEmail: todd@cfsilence.com
version: 1
cfVersion: CF8
shortDescription: Normalizes the various possible returned keys in the cfquery result struct.
tagBased: true
description: |
 This UDF takes the result struct from cfquery and returns the proper generated key from that struct.

returnValue: Returns a value.

example: |
 <cfquery name="insertArtist" datasource="cfartgallery" result="r">
 insert into artists
 (firstName, lastName)
 values(
 'todd','sharp'
 )
 </cfquery>
 <cfquery name="getArtists" datasource="cfartgallery">
 select *
 from artists
 </cfquery>
 <cfdump var="#getArtists#">
 <cfoutput>#getGeneratedKey(r)#</cfoutput>

args:
 - name: resultStruct
   desc: Structure.
   req: true


javaDoc: |
 <!---
  Normalizes the various possible returned keys in the cfquery result struct.
  
  @param resultStruct      Structure. (Required)
  @return Returns a value. 
  @author Todd Sharp (todd@cfsilence.com) 
  @version 1, October 14, 2008 
 --->

code: |
 <cffunction name="getGeneratedKey" hint="i normalize the key returned from cfquery" output="false">
     <cfargument name="resultStruct" hint="the result struct returned from cfquery" />
     <cfif structKeyExists(arguments.resultStruct, "IDENTITYCOL")>
         <cfreturn arguments.resultStruct.IDENTITYCOL />
     <cfelseif structKeyExists(arguments.resultStruct, "ROWID")>
         <cfreturn arguments.resultStruct.ROWID />
     <cfelseif structKeyExists(arguments.resultStruct, "SYB_IDENTITY")>
         <cfreturn arguments.resultStruct.SYB_IDENTITY />
     <cfelseif structKeyExists(arguments.resultStruct, "SERIAL_COL")>
         <cfreturn arguments.resultStruct.SERIAL_COL />    
     <cfelseif structKeyExists(arguments.resultStruct, "GENERATED_KEY")>
         <cfreturn arguments.resultStruct.GENERATED_KEY />
     <cfelse>
         <cfreturn />
     </cfif>
 </cffunction>

---

