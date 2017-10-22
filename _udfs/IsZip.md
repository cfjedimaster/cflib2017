---
layout: udf
title:  IsZip
date:   2002-05-08T11:37:06.000Z
library: StrLib
argString: "str"
author: Jeff Guillaume
authorEmail: jeff@kazoomis.com
version: 1
cfVersion: CF5
shortDescription: Tests passed value to see if it is a properly formatted U.S. zip code.
tagBased: false
description: |
 Tests passed value to see if it is a properly formatted U.S. zip code.  Does not check actual validity/existence of zip code!

returnValue: Returns a boolean.

example: |
 <cfoutput>
 #YesNoFormat(IsZipUS("48084"))#<br>
 #YesNoFormat(IsZipUS("90210"))#<br>
 #YesNoFormat(IsZipUS("02412-0356"))#<br>
 #YesNoFormat(IsZipUS("ABC1234"))#<br>
 </cfoutput>

args:
 - name: str
   desc: String to be checked.
   req: true


javaDoc: |
 /**
  * Tests passed value to see if it is a properly formatted U.S. zip code.
  * 
  * @param str      String to be checked. (Required)
  * @return Returns a boolean. 
  * @author Jeff Guillaume (jeff@kazoomis.com) 
  * @version 1, May 8, 2002 
  */

code: |
 function IsZipUS(str) {
     return REFind('^[[:digit:]]{5}(( |-)?[[:digit:]]{4})?$', str); 
 }

---

