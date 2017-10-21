---
layout: udf
title:  Periods
date:   2001-08-02T12:32:10.000Z
library: FinancialLib
argString: "IR, PV, FV, PMT"
author: Raymond Thompson
authorEmail: rayt@qsystems.net
version: 1
cfVersion: CF5
shortDescription: Calculate the number of payments for a loan.
description: |
 Calculate the number of payments for a loan when given the payment, interest rate, and value of the loan.

returnValue: Returns a numeric value.

example: |
 Number of Periods = <cfoutput>#Periods(0.08,20000,0,904.55)#</cfoutput>

args:
 - name: IR
   desc: Interest rate per year (8% = 0.08)
   req: true
 - name: PV
   desc: Present Value
   req: true
 - name: FV
   desc: Future Value
   req: true
 - name: PMT
   desc: Payment Amount
   req: true


javaDoc: |
 /**
  * Calculate the number of payments for a loan.
  * 
  * @param IR      Interest rate per year (8% = 0.08) 
  * @param PV      Present Value 
  * @param FV      Future Value 
  * @param PMT      Payment Amount 
  * @return Returns a numeric value. 
  * @author Raymond Thompson (rayt@qsystems.net) 
  * @version 1, August 2, 2001 
  */

code: |
 function Periods(IR,PV,FV,PMT) {
   var tir = ir / 12;
   var scale = 0;
   var np=0;
   var tpv = -abs(pv);
   var tfv = -abs(fv);
   var tpmt = abs(pmt);
 
   if(ArrayLen(Arguments) gt 4) {
     scale = 10^abs(Arguments[5]);
   }
   np = log((-tfv * tir + tpmt) / (tpmt + tir * tpv)) / log(1 + tir);
   if (scale NEQ 0)
     np = int(np * scale + 0.5) / scale;
   return(np);
 }

---

