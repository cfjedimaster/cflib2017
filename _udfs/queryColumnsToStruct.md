---
layout: udf
title:  queryColumnsToStruct
date:   2011-01-24T23:41:23.000Z
library: DataManipulationLib
argString: "query, keyColumn[, valueColumn][, reverse][, retainSort]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 2
cfVersion: CF6
shortDescription: Makes a struct for all values in a given column(s) of a query.
tagBased: false
description: |
 Creates a structure keyed off one column in a given query.  You can choose to either have the value be the same as the key or choose another column for the value.  Since this function uses only simple values as the values in the structure duplicate keys will be overwritten.  You can control this to some extent with the optional 4th argument, which you set to &quot;true&quot; if you want to go through the query in reverse order (which would result in the top-most value of a given key being used as opposed to the bottom-most value).  Typically, you'll use the primary key of the table in the query as the key in the struct, so it should not be an issue in most cases.

returnValue: struct

example: |
 <cfscript>
     q = queryNew("id,name,group");
     queryAddRow(q,4);
     querySetCell(q,"id","a",1);
     querySetCell(q,"id","b",2);
     querySetCell(q,"id","c",3);
     querySetCell(q,"id","d",4);
     querySetCell(q,"name","Raymond",1);
     querySetCell(q,"name","Ben",2);
     querySetCell(q,"name","Joel",3);
     querySetCell(q,"name","Scott",4);
     querySetCell(q,"group","marines",1);
     querySetCell(q,"group","navy",2);
     querySetCell(q,"group","airforce",3);
     querySetCell(q,"group","marines",4);    
 </cfscript>
 
 HERE'S THE QUERY<br />
 <cfdump var="#q#">
 <br />
 USING ONLY THE ID COLUMN:<br />
 <cfdump var="#queryColumnsToStruct(q,"id")#">
 <br />
 USING "ID" AS THE KEY, AND "NAME" AS THE VALUE:<br />
 <cfdump var="#queryColumnsToStruct(q,"id","name")#">
 <br />
 USING "GROUP" AS THE KEY, AND "NAME" AS THE VALUE:<br />
 <cfdump var="#queryColumnsToStruct(q,"group","name")#">
 <br />
 SAME AS ABOVE, BUT RUN IN REVERSE (notice a different "marines" value):<br />
 <cfdump var="#queryColumnsToStruct(q,"group","name",true)#">

args:
 - name: query
   desc: The query to operate on
   req: true
 - name: keyColumn
   desc: The name of the column to use for the key in the struct
   req: true
 - name: valueColumn
   desc: The name of the column in the query to use for the values in the struct (defaults to whatever the keyColumn is)
   req: false
 - name: reverse
   desc: Boolean value for whether to go through the query in reverse (default is false)
   req: false
 - name: retainSort
   desc: If true, a Java LinkedHashMap will be used to create the result. This will create a struct with ordered keys. Defaults to false.
   req: false


javaDoc: |
 /**
  * Makes a struct for all values in a given column(s) of a query.
  * v2 by James Moberg
  * 
  * @param query      The query to operate on (Required)
  * @param keyColumn      The name of the column to use for the key in the struct (Required)
  * @param valueColumn      The name of the column in the query to use for the values in the struct (defaults to whatever the keyColumn is) (Optional)
  * @param reverse      Boolean value for whether to go through the query in reverse (default is false) (Optional)
  * @param retainSort      If true, a Java LinkedHashMap will be used to create the result. This will create a struct with ordered keys. Defaults to false. (Optional)
  * @return struct 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 2, January 24, 2011 
  */

code: |
 function queryColumnsToStruct(query,keyColumn){
        var valueColumn = keyColumn;
        var reverse = false;
        var retainSort = false;
        var struct = structNew();
        var increment = 1;
        var ii = 1;
        var rowsGotten = 0;
        if(arrayLen(arguments) GT 2) valueColumn = arguments[3];
        if(arrayLen(arguments) GT 3) reverse = arguments[4];
        if(arrayLen(arguments) GT 4) retainSort = arguments[5];
        if(retainSort){
                struct = CreateObject("java", "java.util.LinkedHashMap").init();
        }
        if(reverse){
                ii = query.recordCount;
                increment = -1;
        }
        while(rowsGotten LT query.recordCount){
                struct[query[keyColumn][ii]] = query[valueColumn][ii];
                ii = ii + increment;
                rowsGotten = rowsGotten + 1;
        }
        return struct;
 }

---

