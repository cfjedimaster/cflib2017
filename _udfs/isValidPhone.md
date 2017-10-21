---
layout: udf
title:  isValidPhone
date:   2009-09-25T14:45:50.000Z
library: StrLib
argString: "valueIn"
author: Alberto Genty
authorEmail: agenty@houston.rr.com
version: 3
cfVersion: CF5
shortDescription: Simple Validation for Phone Number syntax.
description: |
 Simple Validation for Phone Number syntax.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 333-333-3333 - #isValidPhone("333-333-3333")#<br>
 333-333-333 - #isValidPhone("333-333-333")#<br>
 333-333 - #isValidPhone("333-333")#<br>
 333A333 - #isValidPhone("333A3333")#<br>
 333-333@3333 - #isValidPhone("333-333@3333")#<br>
 </cfoutput>

args:
 - name: valueIn
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Simple Validation for Phone Number syntax.
  * version 2 by Ray Camden - added 7 digit support
  * version 3 by Tony Petruzzi Tony_Petruzzi@sheriff.org
  * 
  * @param valueIn      String to check. (Required)
  * @return Returns a boolean. 
  * @author Alberto Genty (agenty@houston.rr.com) 
  * @version 3, September 25, 2009 
  */

code: |
 function IsValidPhone(valueIn) {
      var re = "^(([0-9]{3}-)|\([0-9]{3}\) ?)?[0-9]{3}-[0-9]{4}$";
      return    ReFindNoCase(re, valueIn);
 }

---

