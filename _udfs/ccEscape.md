---
layout: udf
title:  ccEscape
date:   2009-04-26T14:00:39.000Z
library: StrLib
argString: "ccnum"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 2
cfVersion: CF5
shortDescription: Escapes a credit card number, showing only the last 4 digits. The other digits are replaced with the * character.
tagBased: false
description: |
 Escapes a credit card number, showing only the last 4 digits. The other digits are replaced with the * character.

returnValue: Returns a string.

example: |
 <cfset creditcard="4343010125259797">
 <cfoutput>#ccEscape(creditcard)#</cfoutput>

args:
 - name: ccnum
   desc: Credit card number you want to escape.
   req: true


javaDoc: |
 /**
  * Escapes a credit card number, showing only the last 4 digits. The other digits are replaced with the * character.
  * return just stars if str too short, found by Tony Monast
  * 
  * @param ccnum      Credit card number you want to escape. (Required)
  * @return Returns a string. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 2, April 26, 2009 
  */

code: |
 function ccEscape(ccnum){
     if(len(ccnum) lte 4) return "****";
     return "#RepeatString("*",val(Len(ccnum)-4))##Right(ccnum,4)#";
 }

oldId: 657
---

