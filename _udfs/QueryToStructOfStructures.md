---
layout: udf
title:  QueryToStructOfStructures
date:   2011-01-26T21:39:31.000Z
library: DataManipulationLib
argString: "theQuery, primaryKey[, retainSort]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 2
cfVersion: CF6
shortDescription: Converts a query object into a structure of structures accessible by its primary key.
tagBased: false
description: |
 Dumps an entire query into a structure of structures, with each row being easily accessible by knowing its primaryKey value. By making the passed primaryKey a foreign key from another table, you can effectively &quot;join&quot; tables that you couldn't join otherwise.  Some code based on QueryToArrayOfStructures() by Nathan Dintenfass (nathan@changemedia.com)

returnValue: Returns a structure.

example: |
 <CFSET Query = QueryNew("id,name,age")>
 <CFLOOP INDEX="X" FROM=1 TO=3>
     <CFSET QueryAddRow(Query,1)>
     <CFSET QuerySetCell(Query,"ID",X+10)>
     <CFSET QuerySetCell(Query,"Name","Name #X#")>
     <CFSET QuerySetCell(Query,"Age",X+15)>
 </CFLOOP>
 
 <CFSET structStruct = QueryToStructOfStructures(Query, "ID")>
 <CFDUMP VAR="#structStruct#">
 <br>
 <cfloop index="id" from="11" to="13">
     <cfoutput>structStruct[#id#] = #structStruct[id].name#, #structStruct[id].age#<br></cfoutput>
 </cfloop>

args:
 - name: theQuery
   desc: The query you want to convert to a structure of structures.
   req: true
 - name: primaryKey
   desc: Query column to use as the primary key.
   req: true
 - name: retainSort
   desc: If true, a Java LinkedHashMap will be used to create the result. This will create a struct with ordered keys. Defaults to false.
   req: false


javaDoc: |
 /**
  * Converts a query object into a structure of structures accessible by its primary key.
  * v2 mod by James Moberg - added retainSort
  * 
  * @param theQuery      The query you want to convert to a structure of structures. (Required)
  * @param primaryKey      Query column to use as the primary key. (Required)
  * @param retainSort      If true, a Java LinkedHashMap will be used to create the result. This will create a struct with ordered keys. Defaults to false. (Optional)
  * @return Returns a structure. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 2, January 26, 2011 
  */

code: |
 function QueryToStructOfStructures(theQuery, primaryKey){
        var theStructure  = structnew();
        /* remove primary key from cols listing */
        var cols          = ListToArray(ListDeleteAt(theQuery.columnlist, ListFindNoCase(theQuery.columnlist, primaryKey)));
        var row           = 1;
        var thisRow       = "";
        var col           = 1;
        var retainSort = false;
        if(arrayLen(arguments) GT 2) retainSort = arguments[3];
        if(retainSort){
                theStructure = CreateObject("java", "java.util.LinkedHashMap").init();
        }
        for(row = 1; row LTE theQuery.recordcount; row = row + 1){
                thisRow = structnew();
                for(col = 1; col LTE arraylen(cols); col = col + 1){
                        thisRow[cols[col]] = theQuery[cols[col]][row];
                }
                theStructure[theQuery[primaryKey][row]] = duplicate(thisRow);
        }
        return(theStructure);
 }

---

