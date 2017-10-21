---
layout: udf
title:  FutureValue
date:   2001-08-02T12:45:12.000Z
library: FinancialLib
argString: "IT, PMT, PV, NP"
author: Raymond Thompson
authorEmail: rayt@qsystems.net
version: 1
cfVersion: CF5
shortDescription: Calculate the future value of investment with regular deposits.
description: |
 Calculate the future value of investment with regular deposits.

returnValue: Returns a numeric value.

example: |
 Future Value = <cfoutput>#FutureValue(0.08,500,0,24)#</cfoutput>

args:
 - name: IT
   desc: Interest rate per year (8% = 0.08)
   req: true
 - name: PMT
   desc: Number of payments.
   req: true
 - name: PV
   desc: Present value.
   req: true
 - name: NP
   desc: Number of periods.
   req: true


javaDoc: |
 /**
  * Calculate the future value of investment with regular deposits.
  * 
  * @param IT      Interest rate per year (8% = 0.08) 
  * @param PMT      Number of payments. 
  * @param PV      Present value. 
  * @param NP      Number of periods. 
  * @return Returns a numeric value. 
  * @author Raymond Thompson (rayt@qsystems.net) 
  * @version 1, April 23, 2002 
  */

code: |
 function FutureValue(IR,PMT,PV,NP) {
   var tpv = abs(pv);
   var tnp = abs(np);
   var fv = pv;
   var tpmt = -abs(pmt);
   var tir = abs(ir) / 12;
   var scale=0;
 
   if(ArrayLen(Arguments) gt 4) {
     scale = 10^abs(Arguments[4]);
   }
   if (ir eq 0) {
     fv = tpv + abs(tpmt * tnp);
   } else {
     q = (1 + tir)^tnp;
     fv = (-pmt + q * pmt + tir * q * tpv) / tir;
   }
   if (scale NEQ 0) {
     fv = int(fv * scale + 0.5) / scale;
   }
   return(-fv);
 }

---

