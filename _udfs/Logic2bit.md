---
layout: udf
title:  Logic2bit
date:   2002-06-26T19:03:35.000Z
library: MathLib
argString: "exp"
author: Joseph Flanigan
authorEmail: joseph@switch-box.org
version: 1
cfVersion: CF5
shortDescription: Converts logic bit constants (TRUE, &quot;Yes&quot;, 1,FALSE,&quot;No&quot;,0) or logical expressions to bit values (1,0).  A non-boolean value returns a -1 value.
description: |
 Use this function where logic constants like TRUE and FALSE cannot be used. A non-bit value -1 is used when valid expression is not a logic value.

returnValue: Returns a Boolean.

example: |
 <CFOUTPUT>
 Logic2bit(TRUE): #Logic2bit(TRUE)#<BR>
 Logic2bit("No"): #Logic2bit("No")#<BR>
 Logic2bit("fred"): #Logic2bit("fred")#<BR>
 Logic2bit(NOT TRUE): #Logic2bit(NOT TRUE)#<BR>
 Logic2bit(0): #Logic2bit(0)#<BR>
 Logic2bit(50 NEQ 50): #Logic2bit(50 NEQ 50)#
 </CFOUTPUT>

args:
 - name: exp
   desc: Expresison to evaluate
   req: true


javaDoc: |
 /**
  * Converts logic bit constants (TRUE, &quot;Yes&quot;, 1,FALSE,&quot;No&quot;,0) or logical expressions to bit values (1,0).  A non-boolean value returns a -1 value.
  * 
  * @param exp      Expresison to evaluate (Required)
  * @return Returns a Boolean. 
  * @author Joseph Flanigan (joseph@switch-box.org) 
  * @version 1, June 26, 2002 
  */

code: |
 function Logic2bit(exp){
  if (IsBoolean(exp)){
   if (exp) return 1;
   if (NOT (exp)) return 0;
 }
 else return(-1);
 }

---

