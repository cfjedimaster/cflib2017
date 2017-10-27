---
layout: udf
title:  maketree
date:   2005-02-17T18:40:38.000Z
library: DataManipulationLib
argString: "query, unique, parent"
author: Qasim Rasheed
authorEmail: qasimrasheed@hotmail.com
version: 1
cfVersion: CF5
shortDescription: This function is a UDF for maketree custom tag developed by Michael Dinowitz.
tagBased: false
description: |
 This function will take a query that is in a LEGAL parent/child relationship and sort it. The entire query will be sorted and an additional field called &quot;sortlevel&quot; will be added to specify the level of a particular item.

returnValue: Returns a query.

example: |
 <cfscript>
     q = querynew( 'id,text,parent' );
     queryaddrow( q );
     querysetcell( q, 'id', 1 );
     querysetcell( q, 'text', 'One' );
     querysetcell( q, 'parent', 0 );
     queryaddrow( q );
     querysetcell( q, 'id', 2 );
     querysetcell( q, 'text', 'Two' );
     querysetcell( q, 'parent', 1 );
     queryaddrow( q );
     querysetcell( q, 'id', 3 );
     querysetcell( q, 'text', 'Three' );
     querysetcell( q, 'parent', 0 );
 </cfscript>
 <cfset temp = maketree( q, 'id', 'parent' )>
 <cfdump var="#temp#">

args:
 - name: query
   desc: Query to be sorted.
   req: true
 - name: unique
   desc: Name of the column containing the primary key.
   req: true
 - name: parent
   desc: Name of the column containing the parent.
   req: true


javaDoc: |
 /**
  * This function is a UDF for maketree custom tag developed by Michael Dinowitz.
  * 
  * @param query      Query to be sorted. (Required)
  * @param unique      Name of the column containing the primary key. (Required)
  * @param parent      Name of the column containing the parent. (Required)
  * @return Returns a query. 
  * @author Qasim Rasheed (qasimrasheed@hotmail.com) 
  * @version 1, February 17, 2005 
  */

code: |
 function maketree( query, unique, parent ){
     var current = 0;
     var path = 0;
     var i = 0;
     var j = 0;
     var items = "";
     var parents = "";
     var position = "";
     var column = "";
     var retQuery = querynew( query.columnlist & ',sortlevel' );
     for (i=1;i lte query.recordcount;i=i+1)
         items = listappend( items, query[unique][i] );
     for (i=1;i lte query.recordcount;i=i+1)
         parents = listappend( parents, query[parent][i] );
     
     for (i=1;i lte query.recordcount;i=i+1){
         queryaddrow( retQuery );
         position = listfind( parents, current );
         while (not position){
             path= listrest( path );
             current = listfirst( path );
             position = listfind( parents, current );
         }
         for (j=1;j lte listlen( query.columnlist ); j=j+1){
             column = listgetat( query.columnlist, j );
             querysetcell( retQuery, column, evaluate( 'query.'&column&'[position]') );
         }
         querysetcell( retQuery, 'sortlevel', listlen( path ) );
         current = listgetat( items, position );
         parents = listsetat( parents, position, '-' );
         path = listprepend( path, current);
     }
     return retQuery;
 }

oldId: 1188
---

