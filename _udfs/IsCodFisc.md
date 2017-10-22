---
layout: udf
title:  IsCodFisc
date:   2004-04-12T11:09:30.000Z
library: FinancialLib
argString: "codFisc"
author: Giampaolo Bellavite
authorEmail: giampaolo@bellavite.com
version: 1
cfVersion: CF5
shortDescription: Check if a string is a well formed italian Fiscal Code.
tagBased: false
description: |
 Check if a string is a well formed italian Fiscal Code, useful for validating purposes.

returnValue: Returns a boolean.

example: |
 <cfset myCode="BLLGPL79P19L781S">
 <cfoutput>
 Is #myCode# a well formed italian fiscal code? #YesNoFormat(IsCodFisc(myCode))#.
 </cfoutput>

args:
 - name: codFisc
   desc: Financial code.
   req: true


javaDoc: |
 /**
  * Check if a string is a well formed italian Fiscal Code.
  * 
  * @param codFisc      Financial code. (Required)
  * @return Returns a boolean. 
  * @author Giampaolo Bellavite (giampaolo@bellavite.com) 
  * @version 1, April 12, 2004 
  */

code: |
 function IsCodFisc(codFisc) {
     return ReFind("^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$", trim(codFisc));
 }

---

