---
layout: udf
title:  IsZipNL
date:   2005-07-15T20:48:22.000Z
library: StrLib
argString: "str"
author: Martijn Verhoeven
authorEmail: MVerhoeven@Rhinofly.nl
version: 2
cfVersion: CF5
shortDescription: Tests passed value to see if it is a properly formatted Dutch zip code.
tagBased: false
description: |
 Tests passed value to see if it is a properly formatted Dutch zip code. Does not check actual validity/existence of zip code!

returnValue: Returns a Boolean value.

example: |
 <cfoutput>
 4808 CW: #YesNoFormat(IsZipNL("4808 CW"))#<br>
 902 WS: #YesNoFormat(IsZipNL("902 WS"))#<br>
 0241 WS: #YesNoFormat(IsZipNL("0241 WS"))#<br>
 ARCS 14: #YesNoFormat(IsZipNL("ARCS 14"))#<br>
 2345 AB: #YesNoFormat(IsZipNL("2345 AB"))#<br>
 </cfoutput>

args:
 - name: str
   desc: String to be checked.
   req: true


javaDoc: |
 /**
  * Tests passed value to see if it is a properly formatted Dutch zip code.
  * Thanks to Jeff Guillaume on who's UDF IsZip I based this UDF.
  * Version 2 by pjf@maestropublishing.com
  * 
  * @param str      String to be checked. (Required)
  * @return Returns a Boolean value. 
  * @author Martijn Verhoeven (MVerhoeven@Rhinofly.nl) 
  * @version 2, July 15, 2005 
  */

code: |
 function IsZipNL(str) {
     /* All dutch zip codes contains four numbers and two letters  (NNNN AA) with an optional space for the regex. */
     /* Zips start at 1000 so if the first number is a 0 the zip is wrong. */
     return REFind("^[1-9][[:digit:]]{3}( )?[[:alpha:]]{2}$", arguments.str);
 }

oldId: 382
---

