---
layout: udf
title:  rankScores
date:   2013-07-16T08:49:45.000Z
library: DataManipulationLib
argString: "query, scoreColumn, rankColumn[, sortOrder]"
author: John Ceci
authorEmail: tigeryan55@gmail.com
version: 1
cfVersion: CF9
shortDescription: Takes a query and ranks the scores, including ties at the same rank.
description: |
 Pass in a query with scores and a blank rank column and it will return the query with the rank column populated.  When ties are encountered it will assign them the same number and when a non-tie is found it will be incremented based on the number of ties.

returnValue: Nothing. Updates the query inline

example: |
 qBase = queryNew("id,score,rank");
 for (i=1; i <= 10; i++){
     queryAddRow(qBase);
     querySetCell(qBase, "id", i);
     querySetCell(qBase, "score", randRange(1,5));
 }
 
 qSorted = new Query(sql="SELECT * FROM qBase ORDER BY score", dbtype="query", qBase=qBase).execute().getResult();
 writeDump(var=qSorted, label="Before");
 
 rankScores(qSorted, "score", "rank", "ASC");
 
 writeDump(var=qSorted, label="After");

args:
 - name: query
   desc: A query containing data to rank
   req: true
 - name: scoreColumn
   desc: The column within the query argument containing the data to rank. Must be ordered according to sortOrder argument
   req: true
 - name: rankColumn
   desc: The column to put the rankings in 
   req: true
 - name: sortOrder
   desc: One of ASC (default) or DESC
   req: false


javaDoc: |
 /**
  * Takes a query and ranks the scores, including ties at the same rank.
  * v0.9 by John Ceci
  * v1.0 by Adam Cameron (improved validation, variable-naming; simplified logic)
  * 
  * @param query      A query containing data to rank (Required)
  * @param scoreColumn      The column within the query argument containing the data to rank. Must be ordered according to sortOrder argument (Required)
  * @param rankColumn      The column to put the rankings in  (Required)
  * @param sortOrder      One of ASC (default) or DESC (Optional)
  * @return Nothing. Updates the query inline 
  * @author John Ceci (tigeryan55@gmail.com) 
  * @version 1.0, July 16, 2013 
  */

code: |
 void function rankScores(required query query, required string scoreColumn, required string rankColumn, sortOrder="ASC"){
     var currentRank        = 0;
     var previousScore    = 0;
     var rankIncrement    = 1;
     var row                = 0;
 
     if (!(listFindNoCase(query.columnlist, scoreColumn) || listFindNoCase(query.columnlist, rankColumn))) {
         throw(type="InvalidColumnException", message="Invalid score or rank column", detail="One or both of #scoreColumn# or #rankColumn# not found in #query.columnlist#");
     }
 
     if (!isValid("Regex", sortOrder, "(?i)^(?:ASC|DESC)$" )){
         throw(type="InvalidArgumentException", message="Invalid sortOrder", detail="The sortOrder argument - current value #sortOrder# - must be one of ASC or DESC");
     }
 
     if (sortOrder == "ASC"){
         previousScore = arrayMin(query[scoreColumn]) - 1;
     }else{
         previousScore = arrayMax(query[scoreColumn]) + 1;
     }
 
     for (row=1; row <= arrayLen(query[scoreColumn]); row++){
         if (query[scoreColumn][row] == previousScore){
             rankIncrement++;
         }else{
             currentRank += rankIncrement;
             rankIncrement = 1;
         }
         query[rankColumn][row] = currentRank;
 
         previousScore = query[scoreColumn][row];
     }
 }

---

