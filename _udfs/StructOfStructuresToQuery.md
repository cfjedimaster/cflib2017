---
layout: udf
title:  StructOfStructuresToQuery
date:   2002-06-28T12:57:46.000Z
library: DataManipulationLib
argString: "theStruct, primaryKey"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Converts a structure of structures to a CF Query.
description: |
 Takes a structure of structures as created by the QueryToStructOfStructures UDF and converts it back to a ColdFusion Query. These two functions combined allow you to directly read and manipulate the rows of a query simply by knowing the value of the Primary Key. Some code based on Casey Broich's StructOfArraysToQuery.

returnValue: Returns a query.

example: |
 <cfset s = structNew()>
 <cfset s.ray = structNew()>
 <cfset s.ray.name = "Raymond">
 <cfset s.ray.age = 29>
 <cfset s.foo = structNew()>
 <cfset s.foo.name = "Foo">
 <cfset s.foo.age = 32>
 <cfset s.jacob = structNew()>
 <cfset s.jacob.name = "Jacob">
 <cfset s.jacob.age = 2>
 <cfdump var="#structOfStructuresToQuery(s,"username")#">

args:
 - name: theStruct
   desc: The structure to translate.
   req: true
 - name: primaryKey
   desc: The query column name to use for the primary key.
   req: true


javaDoc: |
 /**
  * Converts a structure of structures to a CF Query.
  * 
  * @param theStruct      The structure to translate. (Required)
  * @param primaryKey      The query column name to use for the primary key. (Required)
  * @return Returns a query. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 28, 2002 
  */

code: |
 function StructOfStructuresToQuery(theStruct, primaryKey){
     var primary_key_list   = StructKeyList(theStruct);
     var field_list         = StructKeyList(theStruct[ListFirst(primary_key_list)]);
     var num_rows           = ListLen(primary_key_list);
     var the_query          = QueryNew(primaryKey & "," & field_list);
     var primary_key_value  = "";
     var field_name         = "";
     var the_value          = "";
     var row                = 0;
     var col                = 0;
 
     for(row=1; row LTE num_rows; row=row+1) {
         QueryAddRow(the_query);
         primary_key_value = ListGetAt(primary_key_list, row);
         QuerySetCell(the_query, primaryKey, primary_key_value);
         for(col=1; col LTE ListLen(field_list); col=col+1) {
             field_name = ListGetAt(field_list, col);
             the_value  = theStruct[primary_key_value][field_name];
             QuerySetCell(the_query, field_name, the_value);
         }
     }
 
     return(the_query);
 }

---

