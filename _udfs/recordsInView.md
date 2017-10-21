---
layout: udf
title:  recordsInView
date:   2009-01-20T22:54:21.000Z
library: StrLib
argString: "rowsPerPage, currentPage, recordCount"
author: Tony Felice
authorEmail: sites@breckcomm.com
version: 0
cfVersion: CF5
shortDescription: Creates an easy reccord pagination indicator.
description: |
 Creates easy pagination output ie: (now showing) 101 to 105 of 105 (records) sort of thing.

returnValue: Returns a string.

example: |
 <cfoutput>recordsInView(20,6,105) produces:<br /> #recordsInView(20,6,105)#</cfoutput>

args:
 - name: rowsPerPage
   desc: Number of rows per page.
   req: true
 - name: currentPage
   desc: Current page.
   req: true
 - name: recordCount
   desc: Total number of rows.
   req: true


javaDoc: |
 /**
  * Creates an easy reccord pagination indicator.
  * 
  * @param rowsPerPage      Number of rows per page. (Required)
  * @param currentPage      Current page. (Required)
  * @param recordCount      Total number of rows. (Required)
  * @return Returns a string. 
  * @author Tony Felice (sites@breckcomm.com) 
  * @version 0, January 20, 2009 
  */

code: |
 function recordsInView(rowsPerPage,currentPage,recordCount){
     var first = "";
     var last = "";
     var output = "";
     if(currentPage eq 1){
         first = 1;
     }else{
         first = rowsPerPage*(currentPage - 1)+1;
     }
     if(rowsPerPage - ((currentPage*rowsPerPage) - recordCount) gt rowsPerPage){
         last = currentPage*rowsPerPage;
     }else{
         last = recordCount;
     }        
     
     if(first lt last){
         output = first & " to " & last & " of " & recordCount;
     }else if (first eq recordCount){
         output = first & " of " & recordCount;
     }else if (first gt recordCount){
         output = recordCount & " of " & recordCount;
     }
     return output;
 }

---

