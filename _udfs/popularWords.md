---
layout: udf
title:  popularWords
date:   2005-08-12T12:35:18.000Z
library: StrLib
argString: "qQuery, targetCol[, returnCount][, ignoreWords]"
author: C. Hatton Humphrey
authorEmail: hat@guardian-web.com
version: 2
cfVersion: CF6
shortDescription: Returns the most popular words in a query column and their count.
description: |
 Generates a query that contains the x most popular words contained in a query column as well as their count.  It is called by sending a query, the column to count, the number of rows to return and a stop list.

returnValue: Returns a query.

example: |
 <!--- This is just a query to get the initial column --->
 <cfquery name="qGetColumn" datasource="xxxxxx">
 SELECT Description
 FROM Events
 </cfquery>
 
 <cfdump var="#popularWords(qGetColumn, "Description", 3)#">

args:
 - name: qQuery
   desc: The query to inspect.
   req: true
 - name: targetCol
   desc: The column to inspect.
   req: true
 - name: returnCount
   desc: Number of top words to return. Defaults to 10.
   req: false
 - name: ignoreWords
   desc: Words to ignore. Defaults to&#58; I,me,the,and,if,but,not,as,a,an,for,of,this,on,to,is
   req: false


javaDoc: |
 <!---
  Returns the most popular words in a query column and their count.
  Version 2 mods by Raymond Camden
  
  @param qQuery      The query to inspect. (Required)
  @param targetCol      The column to inspect. (Required)
  @param returnCount      Number of top words to return. Defaults to 10. (Optional)
  @param ignoreWords      Words to ignore. Defaults to: I,me,the,and,if,but,not,as,a,an,for,of,this,on,to,is (Optional)
  @return Returns a query. 
  @author C. Hatton Humphrey (hat@guardian-web.com) 
  @version 2, August 12, 2005 
 --->

code: |
 <cffunction name="popularWords" returntype="query" output="No">
     <cfargument name="qQuery" type="query" required="true">
     <cfargument name="targetCol" type="string" required="true">
     <cfargument name="returnCount" type="numeric" required="false" default="10">
     <cfargument name="ignoreWords" type="string" required="false" default="I,me,the,and,if,but,not,as,a,an,for,of,this,on,to,is">
 
     <cfset var thisRow = "">
     <cfset var thisLine = "">
     <cfset var thisWord = "">
     <cfset var wordData = structNew()>
     <cfset var qFinalResults = "">
     
     <!--- Create a query to contain the results, prime it so that loops
     don't fail since we can't INSERT or UPDATE using QoQ --->
     <cfset var qResults = queryNew("word,times")>
 
     <!--- Begin the looping, go through the query to check --->
     <cfloop from="1" to="#arguments.qQuery.RecordCount#" index="thisRow">
         <!--- Ease of use; set a "nickname" for the current line --->
         <cfset thisLine = arguments.qQuery[targetcol][thisRow]>
 
          <!--- Loop through the line treating it as a list --->
          <cfloop list="#thisLine#" delimiters=" " index="thisWord">
    
             <!--- Test for the words that we need to ignore (include all one-letter words) --->
              <cfif not listFindNoCase(arguments.ignoreWords, thisWord) and len(trim(thisWord)) gt 1>
                   <cfif not structKeyExists(wordData, thisWord)>
                         <cfset wordData[thisWord] = 0>
                 </cfif>
                 <cfset wordData[thisWord] = wordData[thisWord] + 1>
             </cfif>
 
        </cfloop>
     </cfloop>
 
     <cfloop item="thisWord" collection="#wordData#">
         <cfset queryAddRow(qResults)>
         <cfset querySetCell(qResults, "word", thisWord)>
         <cfset querySetCell(qResults, "times", wordData[thisWord])>
     </cfloop>
     
     <!--- We've built our query, now use QoQ to get the "top 10" by count --->
     <cfquery name="qFinalResults" dbtype="query" maxrows="#arguments.returnCount#">
     select word, times
     from qresults
     order by times desc
     </cfquery>
     
     <cfreturn qFinalResults>
 </cffunction>

---

