---
layout: udf
title:  Payment
date:   2001-08-02T12:35:31.000Z
library: FinancialLib
argString: "IR, PV, FV, NP"
author: Raymond Thompson
authorEmail: rayt@qsystems.net
version: 1
cfVersion: CF5
shortDescription: Calculate payment on loan.
tagBased: false
description: |
 Calculate the payment on a loan given the interest rate, periods, and present value. The value returned is negative since the payment represents a reduction in the account. To get the simple value, call Abs on the result.

returnValue: Returns a numeric value.

example: |
 Payment = <cfoutput>#Payment(0.08,20000,0,24)#</cfoutput>

args:
 - name: IR
   desc: Interest rate per year (8.5% = 0.085)
   req: true
 - name: PV
   desc: Present Value
   req: true
 - name: FV
   desc: Future Value (Generally zero for calculating payments. Non zero for pay down to ammount.)
   req: true
 - name: NP
   desc: Number of periods.
   req: true


javaDoc: |
 /**
  * Calculate payment on loan.
  * 
  * @param IR      Interest rate per year (8.5% = 0.085) 
  * @param PV      Present Value 
  * @param FV      Future Value (Generally zero for calculating payments. Non zero for pay down to ammount.) 
  * @param NP      Number of periods. 
  * @return Returns a numeric value. 
  * @author Raymond Thompson (rayt@qsystems.net) 
  * @version 1, August 2, 2001 
  */

code: |
 function Payment(IR,PV,FV,NP) {
   var tir = abs(ir) / 12;
   var tfv = abs(fv);
   var tpv = abs(pv);
   var scale = 0;
   var pmt=0;
   var q = (1 + tir)^ abs(np);
 
   if(ArrayLen(Arguments) gt 4) {
     scale = 10^abs(Arguments[5]);
   }
   pmt = (tir * (tfv + q * tpv)) / (-1 + q);
   if (scale NEQ 0)
     pmt = int(pmt * scale + 0.5) / scale;
   return(-pmt);
 }

oldId: 140
---

