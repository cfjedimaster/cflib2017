---
layout: udf
title:  WAPSafe
date:   2002-04-24T19:24:33.000Z
library: StrLib
argString: "string"
author: Ben Forta
authorEmail: ben@forta.com
version: 2
cfVersion: CF5
shortDescription: Returns a WAP safe string.
description: |
 Returns a WAP safe string. All dollar signs ($) are escaped ($$). All ampersands (&amp;) are escaped (&amp;).

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 <CFSET STR = "Some random string that may have a $ or & in it.">
 The WAPSafe version of<BR>
 <FONT COLOR="green">#STR#</FONT><BR>
 is:<BR>
 <FONT COLOR="green">#WapSafe(STR)#</FONT>
 </CFOUTPUT>

args:
 - name: string
   desc: The string to format.
   req: true


javaDoc: |
 /**
  * Returns a WAP safe string.
  * Update by anthony petruzzi
  * 
  * @param string      The string to format. 
  * @return Returns a string. 
  * @author Ben Forta (ben@forta.com) 
  * @version 2, April 24, 2002 
  */

code: |
 function WAPSafe(string) {
         string = Replace(string, "&", "&amp;", "ALL");
     return Replace(string, "$", "$$", "ALL");
 }

---

