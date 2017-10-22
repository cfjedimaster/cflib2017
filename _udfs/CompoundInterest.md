---
layout: udf
title:  CompoundInterest
date:   2002-04-23T11:54:50.000Z
library: FinancialLib
argString: "r, p, t"
author: Stephan Scheele
authorEmail: stephan@stephan-t-scheele.de
version: 1
cfVersion: CF5
shortDescription: Calculate the compound interest after n years.
tagBased: false
description: |
 Calculate the compound interest after n years.

returnValue: Returns a numeric value.

example: |
 <cfoutput>
 Future value:
 <P>
 100 dollars for 1 year at 10%: #DollarFormat(compoundInterest(0.1, 100, 1))#<br>
 100 dollars for 2 years at 10%: #DollarFormat(compoundInterest(0.1, 100, 2))#<br>
 100 dollars for 3 years at 10%: #DollarFormat(compoundInterest(0.1, 100, 3))#
 </cfoutput>

args:
 - name: r
   desc: Interest rate (3% = 0.03).
   req: true
 - name: p
   desc: Principal
   req: true
 - name: t
   desc: Duration of the loan in years.
   req: true


javaDoc: |
 /**
  * Calculate the compound interest after n years.
  * 
  * @param r      Interest rate (3% = 0.03). 
  * @param p      Principal 
  * @param t      Duration of the loan in years. 
  * @return Returns a numeric value. 
  * @author Stephan Scheele (stephan@stephan-t-scheele.de) 
  * @version 1, April 23, 2002 
  */

code: |
 function compoundInterest(r, p, t){
   return (p* (1 + r)^t);
 }

---

