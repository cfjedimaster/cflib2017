---
layout: udf
title:  queryConvertForjqGrid
date:   2011-03-24T19:27:28.000Z
library: DataManipulationLib
argString: "q, page, pageSize"
author: Scott Stroz
authorEmail: scott@boyzoid.com
version: 0
cfVersion: CF9
shortDescription: Creates a data structure that can be easily used by jqGrid.
tagBased: false
description: |
 This function works similarly to the native function queryConvertForGrid(). It is used to format query data in a format that is easily used by jqGrid. In order for jqGrid to be able to read/use the data structure, you must specify the following in your jqGrid configuration:
 
 jsonReader : {
      repeatitems: false, 
      id: &quot;{id}}&quot;
 },
 
 Where {id} is the unique identifier for each row in the query object.
 
 If the data contained in a column is a date, it is automatically formatted into yyyy-dd-mm HH:mm:ss format.

returnValue: Returns a structure with the following keys {page, records, rows[], total}

example: |
 <cfset myQuery = queryNew("id,score") />
 <cfloop from="1" to="100" index="i">
     <cfset queryAddRow(myQuery) />
     <cfset querySetCell(myQuery, "id", i) />
     <cfset querySetCell(myQuery, "score", randRange(50, 200)) />
 </cfloop>
 <cfset pagedresults = queryConvertForjqGrid(myQuery, 2, 15) />
 <cfdump var="#pagedresults#">

args:
 - name: q
   desc: The query to be paginated
   req: true
 - name: page
   desc: The page number to be returned
   req: true
 - name: pageSize
   desc: The number of items per page
   req: true


javaDoc: |
 /**
  * Creates a data structure that can be easily used by jqGrid.
  * 
  * @param q      The query to be paginated (Required)
  * @param page      The page number to be returned (Required)
  * @param pageSize      The number of items per page (Required)
  * @return Returns a structure with the following keys {page, records, rows[], total} 
  * @author Scott Stroz (scott@boyzoid.com) 
  * @version 0, March 24, 2011 
  */

code: |
 function queryConvertForjQGrid( q, page, pageSize ){
     /*
     NOTE: In order for jqGrid to be able to use the result of this function
     you MUST add this to you jqGrid config:
     jsonReader : {
             repeatitems: false, 
             id: "{id}}"
         },
     Where {id} is the unique identifier for each row in the query object.
     */
     var ret = {};
     var row = {};
     var cols = listToArray( q.columnList );
     var col = "";
     var i = 0;
     var end = arguments.page * arguments.pageSize;
     var start = end - (arguments.pagesize - 1);
     ret[ "total" ] = 0;
     ret[ "page" ] = arguments.page;
     ret[ "records" ] = arguments.q.recordcount;
     if( q.recordCount ){
         ret[ "total" ] = ceiling( arguments.q.recordcount / arguments.pageSize );
     }
     ret["rows"] = [];
     for( i=start; i LTE min(q.recordCount, end); i++ ){
         structClear( row );
         for(col in cols){
             if(isDate( q[ col ][ i ] ) ){
                 row[ lcase( col ) ] = dateFormat( q[ col ][ i ], "yyyy-dd-mm" ) & " " & timeFormat( q[ col ][ i ], "HH:mm:ss" );
             }
             else{
                 row[ lcase( col )] = q[ col ][ i ];
             }
         }
         arrayAppend( ret[ "rows" ], duplicate( row ) );
     }
     return ret;
 }

---

