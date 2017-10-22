---
layout: udf
title:  TrueFalseFormat
date:   2001-11-29T16:59:38.000Z
library: StrLib
argString: "exp"
author: Rob Brooks-Bilson and Raymond Camden
authorEmail: rbils@amkor.com, ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Converts Boolean values to either True or False.
tagBased: false
description: |
 Converts Boolean values to either True or False.  In ColdFusion, both 'yes', 'no', and numbers can be boolean. This UDF will transate Yes/No 0/N to a 'real' True/False.

returnValue: 

example: |
 <CFOUTPUT>
 #TrueFalseFormat(0)#<BR>
 #TrueFalseFormat("Yes")#<BR>
 #TrueFalseFormat(1)#<BR>
 #TrueFalseFormat("No")#<BR>
 #TrueFalseFormat(3)#<BR>
 </CFOUTPUT>

args:
 - name: exp
   desc: value (expression) you want converted to True/False.
   req: true


javaDoc: |
 /**
  * Converts Boolean values to either True or False.
  * 
  * @param exp      value (expression) you want converted to True/False. 
  * @author Rob Brooks-Bilson and Raymond Camden (rbils@amkor.com, ray@camdenfamily.com) 
  * @version 1, January 29, 2002 
  */

code: |
 function TrueFalseFormat(exp){
   if (exp) return True;
   return False;
 }

---

