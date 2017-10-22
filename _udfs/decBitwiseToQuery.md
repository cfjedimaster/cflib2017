---
layout: udf
title:  decBitwiseToQuery
date:   2005-11-03T23:48:49.000Z
library: UtilityLib
argString: "decVal, colName"
author: Alan McCollough
authorEmail: amccollough@anmc.org
version: 1
cfVersion: CF5
shortDescription: You provide me with a decimal number, and a string for a column name and I will return to you a query containing of the decimal values for each resulting non-zero value when your number is converted to binary.
tagBased: false
description: |
 You give me a number, and a column name. For each place in the resulting binary number, if that place evaluates out to a non-zero decimal number, that number will be added to the query as a row.
     
 If you gave me &quot;13&quot; for the number, you would get back a query with three rows; &quot;1&quot;, &quot;4&quot;, and &quot;8&quot;.

returnValue: Returns a query.

example: |
 <cfset i = 13>
 <cfset qryMyPizzaToppings = decBitwiseToQuery(i,"myChoice")>
 <cfdump var="#qryMyPizzaToppings#">

args:
 - name: decVal
   desc: Decimal value.
   req: true
 - name: colName
   desc: Query column name to use.
   req: true


javaDoc: |
 /**
  * You provide me with a decimal number, and a string for a column name and I will return to you a query containing of the decimal values for each resulting non-zero value when your number is converted to binary.
  * 
  * @param decVal      Decimal value. (Required)
  * @param colName      Query column name to use. (Required)
  * @return Returns a query. 
  * @author Alan McCollough (amccollough@anmc.org) 
  * @version 1, November 3, 2005 
  */

code: |
 function decBitwiseToQuery(decVal,colName) {
     // create an empty counter
     var i = "";
     // create an empty 'current value'
     var cur = "";
     // convert decimal val to binary
     var bVal = FormatBaseN(val(decVal), 2);
     // set our binary seed to 1, the first place in the binary system
     var b = 1;
     
     // create a query object
     var qry = queryNew(colName);
     
     // loop through the places in the binary number, going from right to left.
     // Note, this is a brute-force method, and I'm sure some smart person out there
     // could figure out how to do this with pure bitwise functions. Me, I'm not that person.
     for(i = len(bVal); ; i = i - 1) {
             // set cur to the decimal value of the current binary place value
             cur = val(b * mid( bVal , i , 1 ));
             
             // If the result is greater than zero, add the result as a row to the query
             if (cur gt 0) {
                 queryAddRow(qry);
                 querySetCell(qry,colName,cur);
             };
                 
             // double the value of our binary seed, for the next place if necessary
             b = 2 * b;
             
             //exit loop when the last place is processed
             if (i eq 1) break;
         }
     
     // return the query object
     return qry;
 }

---

