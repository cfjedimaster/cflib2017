---
layout: udf
title:  columnTotal
date:   2003-05-13T16:14:24.000Z
library: DataManipulationLib
argString: "qryColumn"
author: Scott Barber
authorEmail: charlesbarber@hotmail.com
version: 2
cfVersion: CF5
shortDescription: This UDF calculates the total of a column from a query.
tagBased: false
description: |
 With this UDF, you can get the total of all rows for any given query column. Assuming of course that the column you specify contains numbers! :-)

returnValue: Returns a number.

example: |
 <cfset foo = queryNew("total")>
 <cfset queryAddRow(foo,10)>
 
 <cfloop index="x" from=1 to=10>
     <cfset querySetCell(foo,"total",x,x)>
 </cfloop>
 
 <cfoutput>#columnTotal("foo.total")#</cfoutput>

args:
 - name: qryColumn
   desc: The name and column of the query, i.e. foo.total
   req: true


javaDoc: |
 /**
  * This UDF calculates the total of a column from a query.
  * Version 2 by Raymond Camden
  * 
  * @param qryColumn      The name and column of the query, i.e. foo.total (Required)
  * @return Returns a number. 
  * @author Scott Barber (charlesbarber@hotmail.com) 
  * @version 2, May 13, 2003 
  */

code: |
 function columnTotal(qryColumn){
     return arraySum(listToArray(evaluate("valueList(" & qryColumn & ")")));
 }

---

