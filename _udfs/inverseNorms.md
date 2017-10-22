---
layout: udf
title:  inverseNorms
date:   2009-03-07T19:11:08.000Z
library: MathLib
argString: "v"
author: Paul Kukiel
authorEmail: kukielp@gmail.com
version: 0
cfVersion: CF5
shortDescription: Calculating the inverse normal cumulative distribution function
tagBased: false
description: |
 Generally calculating Inverse norms is via a lookup table.  This is very slow and for a lage data set requires alot of static data and a complex look up structure.  This is converted to Coldfusion but the mathematics was produced by Peter J. Acklam from: http://home.online.no/~pjacklam/notes/invnorm/

returnValue: returns inverse of a number

example: |
 <!--- number must be > 0 and < 1 --->
 <cfset aNumber = 0.04 />
 <cfoutput>Inverse Norm of #aNumber# = #inverseNorms(aNumber)#</cfoutput>

args:
 - name: v
   desc: Numeric between 0 and 1
   req: true


javaDoc: |
 /**
  * Calculating the inverse normal cumulative distribution function
  * 
  * @param v      Numeric between 0 and 1 (Required)
  * @return returns inverse of a number 
  * @author Paul Kukiel (kukielp@gmail.com) 
  * @version 0, March 7, 2009 
  */

code: |
 function inverseNorms(v){
         
         var a1 = -39.69683028665376;
         var a2 = 220.9460984245205;
         var a3 = -275.9285104469687;
         var a4 = 138.3577518672690;
         var a5 = -30.66479806614716;
         var a6 = 2.506628277459239;
         
         var b1 = -54.47609879822406;
         var b2 = 161.5858368580409;
         var b3 = -155.6989798598866;
         var b4 = 66.80131188771972;
         var b5 = -13.28068155288572;
     
         var c1 = -0.007784894002430293;
         var c2 = -0.3223964580411365;
         var c3 = -2.400758277161838;
         var c4 = -2.549732539343734;
         var c5 = 4.374664141464968;
         var c6 = 2.938163982698783;
     
         var d1 = 0.007784695709041462;
         var d2 = 0.3224671290700398;
         var d3 = 2.445134137142996;
         var d4 = 3.754408661907416;
         
         var p_low = 0.02425;
         var p_high = 1 - p_low;
         var q = 0;
         var r = 0;
         var result = 0;
         
         //Rational approximation for lower region
         if((0 lt arguments.v) and  (arguments.v lt p_low)){
             q = sqr(-2*log(arguments.v));
             result = (((((c1*q+c2)*q+c3)*q+c4)*q+c5)*q+c6) / ((((d1*q+d2)*q+d3)*q+d4)*q+1);
         //Rational approximation for central region
         }else{
             if((p_low lte arguments.v) and (arguments.v lte p_high )){
                 q = arguments.v - 0.5;
                 r = q*q;
                 result = (((((a1*r+a2)*r+a3)*r+a4)*r+a5)*r+a6)*q / (((((b1*r+b2)*r+b3)*r+b4)*r+b5)*r+1);
                 //Rational approximation for upper region
             }else{
                 if((p_high lt arguments.v) and (arguments.v lt 1)){
                     q = sqr(-2*log(1-arguments.v));
                     result = -(((((c1*q+c2)*q+c3)*q+c4)*q+c5)*q+c6) / ((((d1*q+d2)*q+d3)*q+d4)*q+1);
                 }
             }
         }
         
         return result;
     }

---

