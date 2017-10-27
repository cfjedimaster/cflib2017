---
layout: udf
title:  StructOfArraysToQuery
date:   2002-03-28T02:59:45.000Z
library: DataManipulationLib
argString: "theStruct"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Converts a structure of arrays to a CF Query.
tagBased: false
description: |
 Converts a structure of arrays to a CF Query.

returnValue: Returns a query object.

example: |
 <!--- create structure with column names as keys --->
 
    <cfset stcolums = structNew()>
    <cfset stcolums.ContentID = ArrayNew(1)>
    <cfset stcolums.title = ArrayNew(1)>
    <cfset stcolums.created = ArrayNew(1)>
 
    <!--- add an array to each key column in the above structure  --->
 
    <cfloop from=1 to=5 index="row">
        <cfset title = mid('abcdefghijklmonpqrstuvwxyz',RandRange(1,26),1)>
        <cfset tmp = arrayappend(stcolums.title, "title " & row)>
        <cfset tmp = arrayappend(stcolums.created, DateFormat(DateAdd('d',RandRange(1,30),now()),'dd mmm yyyy') )>
        <cfset tmp = arrayappend(stcolums.ContentID, createuuid() )>
    </cfloop>
 
 
    <cfdump var="#stcolums#"> <!--- output from above --->
 
    <cfset myQuery = StructOfArraysToQuery(stcolums)> <!--- Pass structure to function --->
 
    <cfdump var="#myQuery#"> <!--- query result --->

args:
 - name: theStruct
   desc: The structure of arrays you want converted to a query.
   req: true


javaDoc: |
 /**
  * Converts a structure of arrays to a CF Query.
  * 
  * @param theStruct      The structure of arrays you want converted to a query. 
  * @return Returns a query object. 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, March 27, 2002 
  */

code: |
 function StructOfArraysToQuery(thestruct){
    var fieldlist = structkeylist(thestruct);
    var numrows   = arraylen( thestruct[listfirst(fieldlist)] );
    var thequery  = querynew(fieldlist);
    var fieldname="";
    var thevalue="";
    var row=1;
    var col=1;
    for(row=1; row lte numrows; row = row + 1)
    {
       queryaddrow(thequery);
       for(col=1; col lte listlen(fieldlist); col = col + 1)
       {
      fieldname = listgetat(fieldlist,col);
      thevalue  = thestruct[fieldname][row];
      querysetcell(thequery,fieldname,thevalue);
       }
    }
 return(thequery); }

oldId: 555
---

