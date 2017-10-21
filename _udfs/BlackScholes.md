---
layout: udf
title:  BlackScholes
date:   2003-05-09T18:41:49.000Z
library: FinancialLib
argString: "call_put_flag, S, X, T, r, v"
author: Alex
authorEmail: axs@arbornet.org
version: 1
cfVersion: CF5
shortDescription: Computes the theoretical price of an equity option.
description: |
 Returns the value of call and put options using the Black-Scholes pricing formula. S is the current asset price, X is the exercise price, r is the risk-free interest rate, T is the time to maturity of the option in years, v is annualized volatility. This code requires the cumulative normal distribution function CND().

returnValue: Returns a number.

example: |
 <CFSET CallPutFlag = 'c'>
 <CFSET S='49.25'>
 <CFSET X='50.00'>
 <CFSET T='0.1'>
 <CFSET r='0.35'>
 <CFSET v='0.30'>
 <cfoutput>
 #BlackScholes(CallPutFlag,S,X,T,r,v)#
 </cfoutput>

args:
 - name: call_put_flag
   desc: The Call Put Flag.
   req: true
 - name: S
   desc: The current asset price.
   req: true
 - name: X
   desc: Exercise price.
   req: true
 - name: T
   desc: Time to maturity.
   req: true
 - name: r
   desc: Risk-free Interest rate.
   req: true
 - name: v
   desc: Annualized volatility.
   req: true


javaDoc: |
 /**
  * Computes the theoretical price of an equity option.
  * 
  * @param call_put_flag      The Call Put Flag. (Required)
  * @param S      The current asset price. (Required)
  * @param X      Exercise price. (Required)
  * @param T      Time to maturity. (Required)
  * @param r      Risk-free Interest rate. (Required)
  * @param v      Annualized volatility. (Required)
  * @return Returns a number. 
  * @author Alex (axs@arbornet.org) 
  * @version 1, May 9, 2003 
  */

code: |
 function BlackScholes (call_put_flag,S,X,T,r,v) {
     var d1 = ( log(S / X) + (r + (v^2) / 2) * T ) / ( v * (T^0.5) );
     var d2 = d1 - v * (T^0.5);
 
     if (call_put_flag eq 'c')
         return S * CND(d1) - X * exp( -r * T ) * CND(d2);
     else
         return X * exp( -r * T ) * CND(-d2) - S * CND(-d1);
 }

---

