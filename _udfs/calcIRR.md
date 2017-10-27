---
layout: udf
title:  calcIRR
date:   2014-11-13T15:58:00.000Z
library: FinancialLib
argString: "arrCashFlow"
author: CF Ninja
authorEmail: coldfusion.ninja@hotmail.com
version: 1
cfVersion: CF6
shortDescription: Calculate IRR.
tagBased: true
description: |
 Calculates Internal Rate of Return (IRR) similar to excel IRR function.

returnValue: Returns a numeric value.

example: |
 <cfscript>
     cFlow = arrayNew(1);
     cFlow[1] = -4000;
     cFlow[2] = 1200;
     cFlow[3] = 1410;
     cFlow[4] = 1875;
     cFlow[5] = 1050;
     
     myIRR = calcIRR(cFlow);
  </cfscript>    
 
  <cfdump var="#cFlow#">
  <cfoutput>irr = #myIRR#</cfoutput>

args:
 - name: arrCashFlow
   desc: Array of cashflow.
   req: true


javaDoc: |
 <!---
  Calculate IRR.
  
  @param arrCashFlow      Array of cashflow. (Required)
  @return Returns a numeric value. 
  @author CF Ninja (coldfusion.ninja@hotmail.com) 
  @version 1, November 13, 2014 
 --->

code: |
 <cffunction name="calcIRR" output="false">
     <cfargument name="arrCashFlow" type="Array" required="yes" hint="array of cashflow">
     <cfscript>
         var guess = 0.1;
         var inc   = 0.00001;
         do {
             guess += inc;
             npv = 0; //net present value
             for (var i=1; i<=arrayLen(arguments.arrCashFlow); i++)    {
                 npv += arguments.arrCashFlow[i] / ((1 + guess) ^ i);    
             }
             
         } while ( npv > 0 );
         
         guess =  guess * 100;
     </cfscript>
     <cfreturn guess>
 </cffunction>

oldId: 2164
---

