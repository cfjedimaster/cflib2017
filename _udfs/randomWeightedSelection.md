---
layout: udf
title:  randomWeightedSelection
date:   2006-05-25T15:33:34.000Z
library: DataManipulationLib
argString: "weights, n"
author: Chris Spencer
authorEmail: chrisspen@gmail.com
version: 1
cfVersion: CF5
shortDescription: Returns a number of random selections from a list based on their given weights.
description: |
 Requires a structure and the number of selections to make (with replacement).
 All keys are selectable elements.
 All values are unbounded numeric weights, representing the likelyhood of selection for their respective keys.
 Based on free code by Peter Norvig (http://aima.cs.berkeley.edu/python/search.html).

returnValue: Returns an array.

example: |
 <cfset data = structNew()>
 <cfset data['abc'] = 5>
 <cfset data['def'] = 20>
 <cfset data['mno'] = 50>
 <cfset data['xyz'] = 25>
 
 <cfset counts = structNew()>
 <cfset toLimit = 100>
 <cfloop index="index" from="1" to="#toLimit#">
     <cfset sels = randomWeightedSelection(data,1)>
     <cfif not StructKeyExists(counts,sels[1])><cfset counts[sels[1]] = 0></cfif>
     <cfset counts[sels[1]] = counts[sels[1]]+1>
 </cfloop>
 <cfloop index="key" list="#StructKeyList(counts)#">
     <cfoutput>
         <p>#key#(#data[key]#) = #counts[key]/toLimit#</p>
     </cfoutput>
 </cfloop>

args:
 - name: weights
   desc: Structure with keys and numeric values for weights.
   req: true
 - name: n
   desc: Number of selections to make.
   req: true


javaDoc: |
 /**
  * Returns a number of random selections from a list based on their given weights.
  * 
  * @param weights      Structure with keys and numeric values for weights. (Required)
  * @param n      Number of selections to make. (Required)
  * @return Returns an array. 
  * @author Chris Spencer (chrisspen@gmail.com) 
  * @version 1, May 25, 2006 
  */

code: |
 function randomWeightedSelection(weights, n){
     var seq = structKeyArray(weights);
     var totals = arrayNew(1);
     var runningtotal = 0;
     var selections = arrayNew(1);
     var s = 0;
     var i = 0;
     
     for(i=1; i lte arrayLen(seq); i=i+1){
         runningtotal = runningtotal + weights[seq[i]];
         arrayAppend(totals, runningtotal);
     }
     for(s=1; s lte n; s=s+1){
         r = rand()*runningtotal;
         for(i=1; i lte arrayLen(seq); i=i+1){
             if(totals[i] gt r){
                 arrayAppend(selections,seq[i]);
                 break;
             }
         }
     }
     
     return selections;
 }

---

