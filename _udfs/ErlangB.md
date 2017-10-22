---
layout: udf
title:  ErlangB
date:   2004-02-14T10:47:30.000Z
library: MathLib
argString: "Erl, n"
author: Alex Belfor
authorEmail: abelfor@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Calculates the Grade of Service (failure rate) based on Busy Hour Traffic (Erlangs) and number of indepenedent lines
tagBased: false
description: |
 This UDF returns the fraction of incoming calls turned away during the Busy Hour because all lines are busy at the time of the call.        
 
 The algorithm is based on 
 Qiao, L. and Qiao, S. 1998, A Robust and Efficient Algorithm for Evaluating Erlang's Formula, Manuscript. 
 
 Web page with algorithm description is available at http://www.dcss.mcmaster.ca/~qiao/publications/erlang/newerlang.html

returnValue: Returns a number.

example: |
 <cfset traffic=3456.7>
 <cfset lines=2000>
 
 <cfset blocked=ErlangB(traffic,lines)>
 <CFOUTPUT>
 Percent of blocked calls = #evaluate(100*blocked)# 
 </CFOUTPUT>

args:
 - name: Erl
   desc: Busy Hour Traffic (BHT) or the number of hours of call traffic during the busiest hour of operation.
   req: true
 - name: n
   desc: Number of independent lines available for traffic. Positive integer.
   req: true


javaDoc: |
 /**
  * Calculates the Grade of Service (failure rate) based on Busy Hour Traffic (Erlangs) and number of indepenedent lines
  * 
  * @param Erl      Busy Hour Traffic (BHT) or the number of hours of call traffic during the busiest hour of operation. (Required)
  * @param n      Number of independent lines available for traffic. Positive integer. (Required)
  * @return Returns a number. 
  * @author Alex Belfor (abelfor@yahoo.com) 
  * @version 1, February 14, 2004 
  */

code: |
 function ErlangB(erl,n) {
     var s=1;
     var i=1;
     for (i=1; i LTE n; i=i+1) s=s*i/erl+1;
     return (1/s);
 }

---

