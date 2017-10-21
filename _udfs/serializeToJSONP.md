---
layout: udf
title:  serializeToJSONP
date:   2009-06-11T23:05:54.000Z
library: UtilityLib
argString: "data, callback"
author: Steve Good
authorEmail: sgood@lanctr.com
version: 0
cfVersion: CF8
shortDescription: Serializes data to JSONP format for cross domain JSON requests.
description: |
 This method takes two arguments, the data to be serialized and the callback in which to wrap the data. It then serializes the data and wraps it with the callback in JSONP format. This allows javascript to make cross domain requests.  I will extend my facade CFCs from a base CFC that contains this method so I can call it internally.

returnValue: Returns a string.

example: |
 <cfset foo = [1,2,9,20]>
 <cfoutput>#serializeToJSONP(foo, "runit")#</cfoutput>

args:
 - name: data
   desc: Data to be converted into JSON.
   req: true
 - name: callback
   desc: The function call that will wrap the output.
   req: true


javaDoc: |
 <!---
  Serializes data to JSONP format for cross domain JSON requests.
  
  @param data      Data to be converted into JSON. (Required)
  @param callback      The function call that will wrap the output. (Required)
  @return Returns a string. 
  @author Steve Good (sgood@lanctr.com) 
  @version 0, June 11, 2009 
 --->

code: |
 <cffunction name="serializeToJSONP" displayname="Serialize to JSONp" hint="Serializes supplied data in JSONp format" output="false" returntype="any">
     <cfargument name="data" displayName="data" type="any" hint="The data to serialize" required="true" />
     <cfargument name="callback" displayName="callback" type="string" hint="the jsonp callback to use" required="true" />
     
     <cfscript>
     var local = {};
     local.json = serializeJSON(arguments.data);
     local.jsonp = arguments.callback & '(' & local.json & ')';
     </cfscript>
     
     <cfreturn local.jsonp />
 </cffunction>

---

