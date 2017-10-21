---
layout: udf
title:  AddPathsToDirectoryQuery
date:   2003-07-09T21:10:47.000Z
library: FileSysLib
argString: "theQuery[, basePath]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Adds a &quot;FullPath&quot; column to provided directory query.
description: |
 Adds a &quot;FullPath&quot; column to provided directory query (from &lt;cfdirectory action=&quot;LIST&quot;&gt;). Handy for keeping track of what files were from where when combining directory queries from multiple directories.

returnValue: query

example: |
 <cfset dir = expandPath("./")>
 
 <cfdirectory action="list" directory="#dir#" name="getFiles" filter="*.txt">
 ORIGINAL QUERY:<br />
 <cfdump var="#getFiles#">
 <br /><br />
 QUERY WITH NEW FullPath COLUMN:<br />
 <cfset addPathsToDirectoryQuery (getFiles, dir)>
 <cfdump var="#getFiles#">

args:
 - name: theQuery
   desc: The query returned from CFDIRECTORY
   req: true
 - name: basePath
   desc: String containing the path to the directory used in the CFDIRECTORY call
   req: false


javaDoc: |
 /**
  * Adds a &quot;FullPath&quot; column to provided directory query.
  * 
  * @param theQuery      The query returned from CFDIRECTORY (Required)
  * @param basePath      String containing the path to the directory used in the CFDIRECTORY call (Optional)
  * @return query 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, July 9, 2003 
  */

code: |
 function addPathsToDirectoryQuery(theQuery, basePath) {
     var row = 0;
     var new_col_array = arrayNew(1);
 
     if (listFindNoCase(theQuery.columnList, "FullPath")) {
         for(row=1; row LTE theQuery.recordCount; row=row+1) {
             querySetCell(theQuery, "FullPath", basePath & theQuery.name[row], row);
         }
     } else {
         for(row=1; row LTE theQuery.recordCount; row=row+1) {
             new_col_array[row] = basePath & theQuery.name[row];
         }
         queryAddColumn(theQuery, "FullPath", new_col_array);
     }
 
     return theQuery;
 }

---

