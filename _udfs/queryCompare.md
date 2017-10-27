---
layout: udf
title:  queryCompare
date:   2005-11-04T23:06:19.000Z
library: DataManipulationLib
argString: "query1, query2"
author: Qasim Rasheed
authorEmail: qasimrasheed@hotmail.com
version: 2
cfVersion: CF6
shortDescription: This function will compare two queries and returns a struct which shows the difference between two queries if any.
tagBased: true
description: |
 This function will compare two queries and returns a struct with the following keys
 
 in_query1_butnotin_query2 = A query which contains records from query 1 which are different than query 2.
 in_query2_butnotin_query1 = A query which contains records from query 2 which are different than query 1.
 message = a message which may be 1. Record are indential 2. Records do not match or 3. Query 1 had different nummber of columns than query 2.

returnValue: Returns a struct.

example: |
 <cfset test = querynew("language,rating")>
 <cfset queryaddrow(test,3)>
 <cfset querysetcell(test,"language","ColdFusion","1")>
 <cfset querysetcell(test,"language","ASP","2")>
 <cfset querysetcell(test,"language","Java","3")>
 <cfset querysetcell(test,"rating","10","1")>
 <cfset querysetcell(test,"rating","9","2")>
 <cfset querysetcell(test,"rating","8","3")>
 
 <cfset test1 = querynew("language,rating")>
 <cfset queryaddrow(test1,3)>
 <cfset querysetcell(test1,"language","ColdFusion","1")>
 <cfset querysetcell(test1,"language","ASP","2")>
 <cfset querysetcell(test1,"language","Java","3")>
 <cfset querysetcell(test1,"rating","10","1")>
 <cfset querysetcell(test1,"rating","9","2")>
 <cfset querysetcell(test1,"rating","7","3")>
     
 <cfset temp = queryCompare(test,test1)>
 <cfdump var="#temp#">

args:
 - name: query1
   desc: First query.
   req: true
 - name: query2
   desc: Second query.
   req: true


javaDoc: |
 <!---
  This function will compare two queries and returns a struct which shows the difference between two queries if any.
  Fix by Rob Schimp
  
  @param query1      First query. (Required)
  @param query2      Second query. (Required)
  @return Returns a struct. 
  @author Qasim Rasheed (qasimrasheed@hotmail.com) 
  @version 2, November 4, 2005 
 --->

code: |
 <cffunction name="queryCompare" returntype="struct" output="false">
     <cfargument name="query1" type="query" required="true" />
     <cfargument name="query2" type="query" required="true" />
     
     <cfset var rStruct = StructNew()>
     <cfset var q1 = arguments.query1>
     <cfset var q2 = arguments.query2>
     <cfset var q3 = QueryNew( q1.columnlist )>
     <cfset var q4 = QueryNew( q2.columnlist )>
     <cfset var message = "">
     <cfset var rowch = false>
     <cfset var colArray = listtoarray(q1.columnlist)>
     <cfset var thisCol = "">
     <cfset var count = 1>
     <cfset var i = "">
     <cfset var j = "">
     
     <cfloop from="1" to="#listlen(q1.columnlist)#" index="thisCol">
         <cfif listfindnocase(q2.columnlist,listgetat(q1.columnlist,thisCol)) eq 0>
             <cfset message = "Columns in query1 (#q1.columnlist#) and query2 (#q2.columnlist#) doesn't match">
         </cfif>
     </cfloop>
     <cfif not len(trim(message))>
         <cfloop from="1" to="#listlen(q2.columnlist)#" index="thisCol">
             <cfif listfindnocase(q1.columnlist,listgetat(q2.columnlist,thisCol)) eq 0>
                 <cfset message = "Columns in query1 (#q1.columnlist#) and query2 (#q2.columnlist#) doesn't match">
             </cfif>
         </cfloop>
     </cfif> 
     
     <cfif not len(trim(message))>
         <cfloop from="1" to="#q1.recordcount#" index="i">
             <cfset rowch = false>
             <cfloop from="1" to="#arraylen(colArray)#" index="j">
                 <cfif comparenocase(q1[colArray[j]][i],q2[colArray[j]][i])>
                     <cfset rowch = true>
                 </cfif>
             </cfloop>
             <cfif rowch>
                 <cfset queryaddrow(q3)>
                 <cfloop from="1" to="#arraylen(colArray)#" index="k">
                     <cfset querysetcell( q3, colArray[k], q1[colArray[k]][count] )>
                 </cfloop>
             </cfif>
             <cfset count = count + 1>
         </cfloop>
         <cfset count = 1>
         <cfloop from="1" to="#q2.recordcount#" index="i">
             <cfset rowch = false>
             <cfloop from="1" to="#arraylen(colArray)#" index="j">
                 <cfif comparenocase(q1[colArray[j]][i],q2[colArray[j]][i])>
                     <cfset rowch = true>
                 </cfif>
             </cfloop>
             <cfif rowch>
                 <cfset queryaddrow(q4)>
                 <cfloop from="1" to="#arraylen(colArray)#" index="k">
                     <cfset querysetcell( q4, colArray[k], q2[colArray[k]][count] )>
                 </cfloop>
             </cfif>
             <cfset count = count + 1>
         </cfloop>
         <cfif q4.recordcount OR q3.recordcount>
             <cfset message = "Records do not match">
         </cfif>
     </cfif>
     <cfif len(trim(message))>
         <cfset structinsert(rStruct,"message",message)>
         <cfset structinsert(rStruct,"in_query1_butnotin_query2",q3)>
         <cfset structinsert(rStruct,"in_query2_butnotin_query1",q4)>
     <cfelse>
         <cfset structinsert(rStruct,"message","Query 1 and Query 2 are identical")>
     </cfif>
     <cfreturn rStruct />
 </cffunction>

oldId: 1093
---

