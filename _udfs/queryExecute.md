---
layout: udf
title:  queryExecute
date:   2014-09-22T12:10:09.000Z
library: CFMLLib
argString: "sql_statement[, queryParams][, queryOptions]"
author: Henry Ho
authorEmail: henryho167@gmail.com
version: 1
cfVersion: CF9
shortDescription: Backport of QueryExecute in CF11 to CF9 &amp; CF10
description: |
 Include a cfm with this function if server.coldfusion.productVersion is 9 or 10.

returnValue: Returns a query.

example: |
 QueryExecute ("select from Employees where empid=1");
   
 QueryExecute("select from Employee where country=:country and citizenship=:country", {country='USA'});
   
 More example: https://wikidocs.adobe.com/wiki/display/coldfusionen/QueryExecute

args:
 - name: sql_statement
   desc: SQL.
   req: true
 - name: queryParams
   desc: Struct of query param values.
   req: false
 - name: queryOptions
   desc: Query options.
   req: false


javaDoc: |
 <!---
  Backport of QueryExecute in CF11 to CF9 &amp; CF10
  
  @param sql_statement      SQL. (Required)
  @param queryParams      Struct of query param values. (Optional)
  @param queryOptions      Query options. (Optional)
  @return Returns a query. 
  @author Henry Ho (henryho167@gmail.com) 
  @version 1, September 22, 2014 
 --->

code: |
 <cffunction name="QueryExecute" output="false"
             hint="
                 * result struct is returned to the caller by utilizing URL scope (no prefix needed) * 
                 https://wikidocs.adobe.com/wiki/display/coldfusionen/QueryExecute">
     <cfargument name="sql_statement" required="true">
     <cfargument name="queryParams"  default="#structNew()#">
     <cfargument name="queryOptions" default="#structNew()#">
     
     <cfset var parameters = []>
     
     <cfif isArray(queryParams)>
         <cfloop array="#queryParams#" index="local.param">
             <cfif isSimpleValue(param)>
                 <cfset arrayAppend(parameters, {value=param})>
             <cfelse>
                 <cfset arrayAppend(parameters, param)>
             </cfif>
         </cfloop>
     <cfelseif isStruct(queryParams)>
         <cfloop collection="#queryParams#" item="local.key">
             <cfif isSimpleValue(queryParams[key])>
                 <cfset arrayAppend(parameters, {name=local.key, value=queryParams[key]})>
             <cfelse>
                 <cfset var parameter = {name=key}>
                 <cfset structAppend(parameter, queryParams[key])>
                 <cfset arrayAppend(parameters, parameter)>
             </cfif>
         </cfloop>
     <cfelse>
         <cfthrow message="unexpected type for queryParams">
     </cfif>
     
     <cfif structKeyExists(queryOptions, "result")>
         <!--- strip scope, not supported --->
         <cfset queryOptions.result = listLast(queryOptions.result, '.')>
     </cfif>
     
     <cfset var executeResult = new Query(sql=sql_statement, parameters=parameters, argumentCollection=queryOptions).execute()>
     
     <cfif structKeyExists(queryOptions, "result")>
         <!--- workaround for passing result struct value out to the caller by utilizing URL scope (no prefix needed) --->
         <cfset URL[queryOptions.result] = executeResult.getPrefix()>
     </cfif>
     
     <cfreturn executeResult.getResult()>
 </cffunction>

---

