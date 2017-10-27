---
layout: udf
title:  NextN
date:   2002-10-10T11:19:09.000Z
library: UtilityLib
argString: "count, numToDiplay, href[, startMarker]"
author: Joel Richards
authorEmail: joel@brainstormin.net
version: 2
cfVersion: CF5
shortDescription: Enables next 'n' browsing of a record set.
tagBased: false
description: |
 Displays a list of pages with links to records within.

returnValue: Returns a string.

example: |
 <cfoutput>
 <p>
 #nextN(30,5,"index.cfm","start")#
 </p>
 </cfoutput>
 <!--- pretend we are on start=16 ---->
 <cfset url.start = 16>
 <cfoutput>
 <p>
 #nextN(30,5,"index.cfm","start")#
 </p>
 </cfoutput>

args:
 - name: count
   desc: The record count of the query.
   req: true
 - name: numToDiplay
   desc: How many records are displayed per page.
   req: true
 - name: href
   desc: The URL to link to. This can include query string information.
   req: true
 - name: startMarker
   desc: The name of the url variable that will signify which record to start with. Defaults to "nextStart."
   req: false


javaDoc: |
 /**
  * Enables next 'n' browsing of a record set.
  * Modified by Ray Camden to: Make the url var dynamic, and disable the link on current page.
  * 
  * @param count      The record count of the query. (Required)
  * @param numToDiplay      How many records are displayed per page. (Required)
  * @param href      The URL to link to. This can include query string information. (Required)
  * @param startMarker      The name of the url variable that will signify which record to start with. Defaults to "nextStart." (Optional)
  * @return Returns a string. 
  * @author Joel Richards (joel@brainstormin.net) 
  * @version 2, October 10, 2002 
  */

code: |
 function nextN(count,numToDisplay,href) {
     var totalRecords = count; // query recordcount
     var NsListLength = ceiling(totalRecords / numToDisplay); // this will give us the number of pages needed to display the full record set
     var NextStartList = ""; // list of start numbers
     var nextStart=1; // where to start outputting record
     var content = "";
     var i = 1;
     var startMarker = "nextStart"; // name of the url var to create
     
     if(arrayLen(arguments) gte 4) startMarker = arguments[4];
     
     for ( i = 1; i lte NsListLength; i = i + 1 ) {
         NextStartlist = listAppend(NextStartlist,nextStart); 
         // this will be the next start number in our list
         nextStart = nextStart + numToDisplay;
     }
 
     //output the links
     if (len(NextStartList) gt 1) {
         content = "Page ";
         for (i = 1; i lte listlen(NextStartList);  i = i + 1) {
             if(isDefined("url.#startMarker#") and url[startMarker] is listGetAt(NextStartList,i)) content = content & i;
             else content = content & " <a href=""" & href & "&#startMarker#=" & listGetAt(NextStartList,i) & """>" & i & "</a> ";
         } 
     }
 
     return content;
 }

oldId: 750
---

