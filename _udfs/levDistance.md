---
layout: udf
title:  levDistance
date:   2004-03-15T20:33:54.000Z
library: StrLib
argString: "s, t"
author: Nicholas Zographos
authorEmail: nicholas@nezen.net
version: 1
cfVersion: CF5
shortDescription: Computes the Levenshtein distance between two strings.
tagBased: false
description: |
 Computes the Levenshtein distance between two strings which is defined as the number of replacements, insertions or deletions necessary to transform the first string into the second. 
 
 Ported from the Java version at http://www.merriampark.com/ld.htm

returnValue: Returns a number.

example: |
 <cfoutput>#levDistance("first string", "second string")#</cfoutput>
 <!--- should output 6 --->

args:
 - name: s
   desc: First string.
   req: true
 - name: t
   desc: Second string.
   req: true


javaDoc: |
 /**
  * Computes the Levenshtein distance between two strings.
  * 
  * @param s      First string. (Required)
  * @param t      Second string. (Required)
  * @return Returns a number. 
  * @author Nicholas Zographos (nicholas@nezen.net) 
  * @version 1, March 15, 2004 
  */

code: |
 function levDistance(s,t) {
     var d = ArrayNew(2);
     var i = 1;
     var j = 1;
     var s_i = "A";
     var t_j = "A";
     var cost = 0;
     
     var n = len(s)+1;
     var m = len(t)+1;
     
     d[n][m]=0;
     
     if (n is 1) {
         return m;
     }
     
     if (m is 1) {
         return n;
     }
     
      for (i = 1; i lte n; i=i+1) {
       d[i][1] = i-1;
     }
 
     for (j = 1; j lte m; j=j+1) {
       d[1][j] = j-1;
     }
     
     for (i = 2; i lte n; i=i+1) {
       s_i = Mid(s,i-1,1);
 
       for (j = 2; j lte m; j=j+1) {
           t_j = Mid(t,j-1,1);
 
         if (s_i is t_j) {
           cost = 0;
         }
         else {
           cost = 1;
         }
         d[i][j] = min(d[i-1][j]+1, d[i][j-1]+1);
         d[i][j] = min(d[i][j], d[i-1][j-1] + cost);
       }
     }
     
     return d[n][m];
 }

---

