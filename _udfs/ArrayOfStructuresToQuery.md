---
layout: udf
title:  ArrayOfStructuresToQuery
date:   2003-03-19T12:11:55.000Z
library: DataManipulationLib
argString: "Array"
author: David Crawford
authorEmail: dcrawford@acteksoft.com
version: 2
cfVersion: CF5
shortDescription: Converts an array of structures to a CF Query Object.
description: |
 Converts an array of structures to a CF Query Object.  Mirror Image of Nathan Dintenfass' QueryToArrayOfStructures function.

returnValue: Returns a query object.

example: |
 <!--- create an array calledMyArray --->
 <CFSET Stooges = ArrayNew(1)>
 <!--- create a structure as the first array element --->
 <CFSET Stooges[1] = StructNew()>
 <CFSET Stooges[1].Name = "Larry">
 <CFSET Stooges[1].Age = "34">
 <!--- create a structure as the second array element --->
 <CFSET Stooges[2] = StructNew()>
 <CFSET Stooges[2].Name = "Moe">
 <CFSET Stooges[2].Age = "38">
 <!--- create a structure as the third array element --->
 <CFSET Stooges[3] = StructNew()>
 <CFSET Stooges[3].Name = "Curly">
 <CFSET Stooges[3].Age = "33">
 
 <CFSET StoogesQuery=ArrayOfStructuresToQuery(Stooges)>
 <B>Array of Structures:</B>
 <CFDUMP Var="#Stooges#">
 <P>
 <B>Query Object:</B>
 <CFDUMP VAR="#StoogesQuery#">

args:
 - name: Array
   desc: The array of structures to be converted to a query object.  Assumes each array element contains structure with same 
   req: true


javaDoc: |
 /**
  * Converts an array of structures to a CF Query Object.
  * 6-19-02: Minor revision by Rob Brooks-Bilson (rbils@amkor.com)
  * 
  * Update to handle empty array passed in. Mod by Nathan Dintenfass. Also no longer using list func.
  * 
  * @param Array      The array of structures to be converted to a query object.  Assumes each array element contains structure with same  (Required)
  * @return Returns a query object. 
  * @author David Crawford (dcrawford@acteksoft.com) 
  * @version 2, March 19, 2003 
  */

code: |
 function arrayOfStructuresToQuery(theArray){
     var colNames = "";
     var theQuery = queryNew("");
     var i=0;
     var j=0;
     //if there's nothing in the array, return the empty query
     if(NOT arrayLen(theArray))
         return theQuery;
     //get the column names into an array =    
     colNames = structKeyArray(theArray[1]);
     //build the query based on the colNames
     theQuery = queryNew(arrayToList(colNames));
     //add the right number of rows to the query
     queryAddRow(theQuery, arrayLen(theArray));
     //for each element in the array, loop through the columns, populating the query
     for(i=1; i LTE arrayLen(theArray); i=i+1){
         for(j=1; j LTE arrayLen(colNames); j=j+1){
             querySetCell(theQuery, colNames[j], theArray[i][colNames[j]], i);
         }
     }
     return theQuery;
 }

---

