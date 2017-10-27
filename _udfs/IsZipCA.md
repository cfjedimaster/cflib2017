---
layout: udf
title:  IsZipCA
date:   2005-07-15T20:45:59.000Z
library: StrLib
argString: "str"
author: Jeff Guillaume
authorEmail: jeff@kazoomis.com
version: 4
cfVersion: CF5
shortDescription: Tests passed value to see if it is a properly formatted Canadian zip code.
tagBased: false
description: |
 Tests passed value to see if it is a properly formatted Canadian zip code.  Does not check actual validity/existence of zip code!

returnValue: Returns a boolean.

example: |
 <cfoutput>
 #YesNoFormat(IsZipCA("C9G 5B6"))#<br>
 #YesNoFormat(IsZipCA("C9G5B6"))#<br>
 #YesNoFormat(IsZipCA("L6V-1F3"))#<br>
 #YesNoFormat(IsZipCA("R32 G2E"))#<br>
 </cfoutput>

args:
 - name: str
   desc: String to be checked.
   req: true


javaDoc: |
 /**
  * Tests passed value to see if it is a properly formatted Canadian zip code.
  * Peter J. Farrell (pjf@maestropublishing.com) Now checks if 1st digit if the FDA (Foward Delivery Area - 1st three digits of postal code) is one of the current 18 characters used by Canada Post as of April 2004 to signalfy a province or provincial area
  * 
  * @param str      String to be checked. (Required)
  * @return Returns a boolean. 
  * @author Jeff Guillaume (jeff@kazoomis.com) 
  * @version 4, July 15, 2005 
  */

code: |
 function IsZipCA(str) {
  return REFind('^[A-CEG-NPR-TVXYa-ceg-npr-tvxy][[:digit:]][A-CEG-NPR-TVW-Za-ceg-npr-tvw-z]( |-)?[[:digit:]][A-CEG-NPR-TVW-Za-ceg-npr-tvw-z][[:digit:]]$', str);
 }

oldId: 218
---

