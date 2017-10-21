---
layout: udf
title:  DiscountingInterest
date:   2002-04-23T12:01:46.000Z
library: FinancialLib
argString: "p, r, t"
author: Stephan Scheele
authorEmail: stephan@stephan-t-scheele.de
version: 1
cfVersion: CF5
shortDescription: Calculate the actual value of an amount by discounting the interest over n years.
description: |
 Calculate the actual value of an amount by discounting the interest over n years.

returnValue: Returns a numeric value.

example: |
 <cfoutput>
 $133.10 discounted at 10% over 1 year: #discountingInterest(0.1, 133.1, 1)#<br>
 $133.10 discounted at 10% over 2 years: #discountingInterest(0.1, 133.1, 2)#<br>
 $133.10 discounted at 10% over 3 years: #discountingInterest(0.1, 133.1, 3)#
 </cfoutput>

args:
 - name: p
   desc: Principal
   req: true
 - name: r
   desc: Interest rate (0.03 = 3%)
   req: true
 - name: t
   desc: Time in years.
   req: true


javaDoc: |
 /**
  * Calculate the actual value of an amount by discounting the interest over n years.
  * 
  * @param p      Principal 
  * @param r      Interest rate (0.03 = 3%) 
  * @param t      Time in years. 
  * @return Returns a numeric value. 
  * @author Stephan Scheele (stephan@stephan-t-scheele.de) 
  * @version 1.0, April 23, 2002 
  */

code: |
 function DiscountingInterest(r, p, t){
  return (p / (1 + r)^t);
 }

---

