---
layout: udf
title:  limit
date:   2009-02-13T15:41:21.000Z
library: DatabaseLib
argString: "inQry, arg1, arg2"
author: Andy Jarrett
authorEmail: mail@andyjarrett.co.uk
version: 2
cfVersion: CF6
shortDescription: Mimics MySQL limit's function.
tagBased: true
description: |
 To be used on a recordset like a QoQ. Mimics MySQL's Limit function i.e.
 
 SELECT * FROM myTable LIMIT 0, 10
 
 The above code will display the first 10 results from your table
 
 SELECT * FROM myTable LIMIT 5, 5
 
 Starting from the 5th record this will bring back rows 5, 6, 7, 8, and 9.
 
 This functions aims to mimic this.

returnValue: Returns a query.

example: |
 <cfset qry = yourQuery />
 <!--- Return rows 5-10 --->
 <cfset newQuery = limit(qry, 5,5) />

args:
 - name: inQry
   desc: Query to modify.
   req: true
 - name: arg1
   desc: Row to begin the limit.
   req: true
 - name: arg2
   desc: Number of rows to limit the result to.
   req: true


javaDoc: |
 <!---
  Mimics MySQL limit's function.
  v2 mods by Raymond Camden and Steven Van Gemert
  
  @param inQry      Query to modify. (Required)
  @param arg1      Row to begin the limit. (Required)
  @param arg2      Number of rows to limit the result to. (Required)
  @return Returns a query. 
  @author Andy Jarrett (mail@andyjarrett.co.uk) 
  @version 2, February 13, 2009 
 --->

code: |
 <cffunction name="limit" returntype="query" description="WORKS LIKE MYSQL LIMIT(N,N)" output="false">
     <cfargument name="inQry" type="query" hint="I am the query" />
     <cfargument name="arg1" type="numeric" />
     <cfargument name="arg2" type="numeric" />
     
     <cfscript>
     var outQry = arguments.inQry;
     var a1 = arguments.arg1-1;
     
     if(arg1 GT 1){
         outQry.RemoveRows(JavaCast( "int", 0 ), JavaCast( "int", a1 ));
     }
     
     outQry.RemoveRows(JavaCast( "int", arg2 ),JavaCast( "int", outQry.recordcount-arg2));
     
     return outQry;
     </cfscript>
 </cffunction>

---

