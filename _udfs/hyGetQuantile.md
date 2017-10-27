---
layout: udf
title:  hyGetQuantile
date:   2006-07-13T15:17:17.000Z
library: MathLib
argString: "qtil, range"
author: Ralf Guttmann
authorEmail: ralf.guttmann@hyperspace.de
version: 1
cfVersion: CF5
shortDescription: Function which returns the value of a certain quantile from a list of numeric values.
tagBased: false
description: |
 Function which returns the value of a certain quantile from a list of numeric values. Similar to the quantile(matrix,alpha) function in ms excel.

returnValue: Returns a number.

example: |
 <cfset quantile = hyGetQuantile("30","1,2,3,4")>
 <cfoutput>#quantile#</cfoutput>

args:
 - name: qtil
   desc: Threshold value for the quantile, numeric between 1 and 100
   req: true
 - name: range
   desc: Comma delimited list of numeric values
   req: true


javaDoc: |
 /**
  * Function which returns the value of a certain quantile from a list of numeric values.
  * Rewritten by Raymond Camden to include VAR statements.
  * 
  * @param qtil      Threshold value for the quantile, numeric between 1 and 100 (Required)
  * @param range      Comma delimited list of numeric values (Required)
  * @return Returns a number. 
  * @author Ralf Guttmann (ralf.guttmann@hyperspace.de) 
  * @version 1, July 13, 2006 
  */

code: |
 function hyQuantile(qtil, range) {
     var rangeArr = ListToArray(range);
     var hyqtil = "";
      var nrofelms = "";
      var nrofsteps = "";
     var percpos = "";
     var percpos1 = "";
      var percpos2 = "";
     var rP1 = "";
     var rP2 = "";
     var deltarp = "";
     var wfactor = "";
     var deltarp_v = "";
 
     qtil = qtil * 0.01;
     arraySort(rangeArr, "numeric");
   
     nrofelms = arrayLen(rangeArr);
     nrofsteps = qtil * (nrofelms - 1);
     
     if(int(nrofsteps) eq nrofsteps) {
         percpos = nrofsteps + 1;
         hyqtil = rangeArr[percpos];
     } else {
         percpos1 = Int(nrofsteps) + 1;
         percpos2 = percpos1 + 1;
         rP1 = rangeArr[percpos1];
         rP2 = rangeArr[percpos2];
         deltarp = rP2 - rP1;
         wfactor = nrofsteps - (Int(nrofsteps));
         deltarp_v = deltarp * wfactor;
         hyqtil = rP1 + deltarp_v;
     }
     return hyqtil;
 }

oldId: 1381
---

