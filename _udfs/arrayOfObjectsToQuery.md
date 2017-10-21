---
layout: udf
title:  arrayOfObjectsToQuery
date:   2009-06-11T22:54:42.000Z
library: DataManipulationLib
argString: "theArray"
author: Don Quist
authorEmail: don.sigmaprojects@gmail.com
version: 0
cfVersion: CF6
shortDescription: Converts an array of objects to a CF Query Object.
description: |
 Converts an array of objects to a CF Query Object. Only works with &quot;Bean&quot; style CFCs. Uses the result of all getX methods to populate the query. 
 
 Based on arrayOfStructuresToQuery by David Crawford http://cflib.org/udf/ArrayOfStructuresToQuery

returnValue: Returns a query.

example: |
 <cfset test1 = CreateObject('component','someObj').init( 'foo', 'bar' ) />
 <cfset test2 = CreateObject('component','someObj').init( 'foo1', 'bar1' ) />
 <cfset myArray = ArrayNew(1) />
 <cfset arrayAppend(myArray,test1) />
 <cfset arrayAppend(myArray,test2) />
 
 <cfset QoQ = arrayOfObjectsToQuery(myArray)>
 
 <cfdump var="#QoQ#" />

args:
 - name: theArray
   desc: The array of CFCs.
   req: true


javaDoc: |
 /**
  * Converts an array of objects to a CF Query Object.
  * 
  * @param theArray      The array of CFCs. (Required)
  * @return Returns a query. 
  * @author Don Quist (don.sigmaprojects@gmail.com) 
  * @version 0, June 11, 2009 
  */

code: |
 function arrayOfObjectsToQuery(theArray){
     var colNames = ArrayNew(1);
     var theQuery = queryNew("");
     var i=0;
     var j=0;
     var o=0;
     var functions = '';
     //if there's nothing in the array, return the empty query
     if(NOT arrayLen(theArray)) return theQuery;
     
     //get meta data for the first object in the array and set the functions
     functions = getMetaData(theArray[1]).functions;
     //get the column names into an array =    
     for(o=1; o LTE arrayLen(functions); o=o+1){
         if( REFindNoCase( 'get+', functions[o].NAME ) and functions[o].NAME IS NOT 'init' ) {
             arrayAppend(colNames, LCase(REReplaceNoCase(functions[o].NAME, "^get",'' )) );
         }
     }
 
     theQuery = queryNew(arrayToList(colNames));
     
     //add the right number of rows to the query
     queryAddRow(theQuery, arrayLen(theArray));
     //for each element in the array, loop through the columns, populating the query
     for(i=1; i LTE arrayLen(theArray); i=i+1){
         for(j=1; j LTE arrayLen(colNames); j=j+1){
             //bug out incase something isnt defined in the object
             try {
                 querySetCell(theQuery, colNames[j], Evaluate('theArray[i].get#colNames[j]#()'), i);
             }
             catch(Any excpt) { }
         }
     }
     return theQuery;
 }

---

