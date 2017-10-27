---
layout: udf
title:  RoundSigFig
date:   2003-10-24T12:32:19.000Z
library: MathLib
argString: "fInput, iDigits"
author: jason snyder
authorEmail: jason.snyder@trw.com
version: 2
cfVersion: CF5
shortDescription: Rounds a number to a specified number of significant digits.
tagBased: false
description: |
 Rounds a number to a specified number of significant digits.

returnValue: Returns a numeric value.

example: |
 <CFSET iOrigNo=10.5660>
 <cfoutput>
 Original=#iOrigNo#<br> 
 After RoungSigFig=#RoundSigFig(iOrigNo, 4)#
 </cfoutput>

args:
 - name: fInput
   desc: Number to round.
   req: true
 - name: iDigits
   desc: Number of significant digits to return.
   req: true


javaDoc: |
 /**
  * Rounds a number to a specified number of significant digits.
  * 
  * @param fInput      Number to round. (Required)
  * @param iDigits      Number of significant digits to return. (Required)
  * @return Returns a numeric value. 
  * @author jason snyder (jason.snyder@trw.com) 
  * @version 2, October 24, 2003 
  */

code: |
 function RoundSigFig(fInput, iDigits) 
 {
   //Local Variables
   var iLog = 0;
   var iTemp = 0;
   var fReturn = 0;
 
   //Execution
   if (fInput NEQ 0) { //If not zero round to significant digits.
     iLog=Int(Log10(Sgn(fInput)*fInput+0.0));
     iTemp=Round(fInput / (10^(iLog-iDigits+1)));
     //return(Log10(fInput+0.0)); //Debugging
     fReturn=evaluate(iTemp*(10^(iLog-iDigits+1)));
   } //End (Round to significant digits.)
   Return(fReturn);
 } //End (RSigFig)

oldId: 254
---

