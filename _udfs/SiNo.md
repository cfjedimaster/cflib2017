---
layout: udf
title:  SiNo
date:   2004-03-19T10:20:33.000Z
library: UtilityLib
argString: "b"
author: Giampaolo Bellavite
authorEmail: giampaolo@bellavite.com
version: 1
cfVersion: CF5
shortDescription: The same as YesNoFormat() function, but in Italian.
description: |
 The same as YesNoFormat() function, but in Italian. Returns &quot;S�&quot;(&quot;No&quot;) if input is True (False). Returns &quot;Boh&quot; if input is not a boolean value.

returnValue: Returns a string.

example: |
 <cfoutput>
 1 = 1? #SiNo(1 EQ 1)#
 </cfoutput>

args:
 - name: b
   desc: A boolean value.
   req: true


javaDoc: |
 /**
  * The same as YesNoFormat() function, but in Italian.
  * 
  * @param b      A boolean value. (Required)
  * @return Returns a string. 
  * @author Giampaolo Bellavite (giampaolo@bellavite.com) 
  * @version 1, March 19, 2004 
  */

code: |
 function SiNo(b) {
     if (isBoolean(b)) {
         if (b) return "S�";
         else return "No";
     } else return "Boh";
 }

---

