---
layout: udf
title:  QueryToVars
date:   2002-03-11T11:49:12.000Z
library: DataManipulationLib
argString: "q[, scope][, row]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Change a row in a query to variables in a scope.
tagBased: false
description: |
 A quick way to get the variables in one row of a query into local variables (or any other scope).  You pass in a query and the variables are created based on the column names in the query.  You can also optionally specify a scope and a row in the query to use.

returnValue: Returns an empty string.

example: |
 <cfscript>
     //make a simple query
     q = queryNew("fname,lname");
     queryAddRow(q,2);
     querySetCell(q,"fname","Jedi",1);
     querySetCell(q,"lname","Master",1);
     querySetCell(q,"fname","Ben",2);
     querySetCell(q,"lname","Archibald",2);    
     //make local variables
     queryToVars(q);
     //now, put the second row into the request scope
     queryToVars(q,"request",2);
 </cfscript>
 <!--- output the variables to the screen --->
 <cfoutput>
     #fname# #lname#<br>
     #request.fname# #request.lname#
 </cfoutput>

args:
 - name: q
   desc: The query to use.
   req: true
 - name: scope
   desc: Scope to save data in. Defaults to "" or local scope.
   req: false
 - name: row
   desc: Row number to use. Defaults to 1.
   req: false


javaDoc: |
 /**
  * Change a row in a query to variables in a scope.
  * 
  * @param q      The query to use. 
  * @param scope      Scope to save data in. Defaults to "" or local scope. 
  * @param row      Row number to use. Defaults to 1. 
  * @return Returns an empty string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, March 11, 2002 
  */

code: |
 function queryToVars(q){
     //first, an array of the column names for looping
     var cols = listToArray(q.columnList);
     //a var to use as iterator
     var ii = 1;
     //by default, use no scope
     var scope = "";
     //by default, use the first row
     var row = 1;
     //if there is a second argument, use that as the scope
     if(arrayLen(arguments) GT 1)
         scope = arguments[2] & ".";
     //if there is a third argument and it is numeric, use that as the row (make sure it is a positive integer)
     if(arrayLen(arguments) GT 2 and isNumeric(arguments[3]))
         row = ceiling(abs(arguments[3]));        
     //loop over the columns, making a variables for each one
     for(ii = 1; ii lte arrayLen(cols); ii = ii + 1)
         setVariable(scope & cols[ii],q[cols[ii]][row]);
     //return nothing
     return "";    
 }

---

