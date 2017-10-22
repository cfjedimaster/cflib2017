---
layout: udf
title:  BRCurrencyFormat
date:   2002-11-01T19:36:56.000Z
library: StrLib
argString: "valor"
author: Fernando Segalla
authorEmail: segalla@intralab.com.br
version: 1
cfVersion: CF6
shortDescription: Works like the built-in function lsCurrencyFormat, but do it right for Brazilian Currency (R$ - Real).
tagBased: false
description: |
 Works like the built-in function lsCurrencyFormat, but do it right for Brazilian Currency (R$ - Real).

returnValue: Returns a string.

example: |
 <cfoutput>
 BRCurrencyFormat(12345.678) = #BRCurrencyFormat(12345.678)#<br>
 BRCurrencyFormat(-12345.678) = #BRCurrencyFormat(-12345.678)#<br>
 </cfoutput>

args:
 - name: valor
   desc: Number to be formatted.
   req: true


javaDoc: |
 /**
  * Works like the built-in function lsCurrencyFormat, but do it right for Brazilian Currency (R$ - Real).
  * 
  * @param valor      Number to be formatted. (Required)
  * @return Returns a string. 
  * @author Fernando Segalla (segalla@intralab.com.br) 
  * @version 1, November 1, 2002 
  */

code: |
 function BRCurrencyFormat(valor) {
     valor = DecimalFormat(valor);
     valor = Replace(valor,',','.','ALL');
     valor = Reverse(Replace(Reverse(valor),'.',',','ONE'));
     if(valor LT 0) return "(R$" & Right(valor,Len(valor)-1) & ")";
     else return "R$" & valor;
 }

---

