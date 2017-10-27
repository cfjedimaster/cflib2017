---
layout: udf
title:  IsSSN
date:   2005-04-27T14:14:09.000Z
library: StrLib
argString: "str"
author: Jeff Guillaume
authorEmail: jeff@kazoomis.com
version: 2
cfVersion: CF5
shortDescription: Checks passed value to see if it is a properly formatted U.S. social security number.
tagBased: false
description: |
 Checks passed value to see if it is a properly formatted U.S. social security number.  Returns True or False.

returnValue: Returns a Boolean.

example: |
 <cfoutput>
 379-80-0001: #YesNoFormat(IsSSN("379-80-0001"))#<br>
 572394546: #YesNoFormat(IsSSN("572394546"))#<br>
 237-33-0000: #YesNoFormat(IsSSN("237-33-0000"))#<br>
 000-33-5786: #YesNoFormat(IsSSN("000-33-5786"))#<br>
 </cfoutput>

args:
 - name: str
   desc: String you want to validate.
   req: true


javaDoc: |
 /**
  * Checks passed value to see if it is a properly formatted U.S. social security number.
  * Cameron Childress found a bug in the right(str,4) line.
  * 
  * @param str      String you want to validate. (Required)
  * @return Returns a Boolean. 
  * @author Jeff Guillaume (jeff@kazoomis.com) 
  * @version 2, April 27, 2005 
  */

code: |
 function IsSSN(str) {
   // these may actually be valid, but for business purposes they are not allowed
   var InvalidList = "111111111,222222222,333333333,444444444,555555555,666666666,777777777,888888888,999999999,123456789";
     
   // validation based on info from: http://www.ssa.gov/employer/ssnweb.htm
   if (REFind('^([0-9]{3}(-?)[0-9]{2}(-?)[0-9]{4})$', str)) {
     if (Val(Left(str, 3)) EQ 0) return FALSE;
     if (Val(Right(str, 4)) EQ 0) return FALSE;
     if (ListFind(InvalidList, REReplace(str, "[ -]", "", "ALL"))) return FALSE;
     // still here, so SSN is valid
     return True;
   }
   // return default
   return False;
     
 }

oldId: 383
---

