---
layout: udf
title:  EmailDomainLink
date:   2003-09-29T17:36:27.000Z
library: StrLib
argString: "theEmailAddress[, theTarget]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Formats an e-mail address so that its domain is a link to its web site.
description: |
 Formats specified e-mail address so that its domain is a link to its www.domain.com web site. Helpful when analyzing where your subscribers come from.

returnValue: Returns a string.

example: |
 <cfoutput>
 EmailDomainLink("admin@cflib.org"):<br>
 #EmailDomainLink("admin@cflib.org")#<br>
 <br>
 EmailDomainLink("shawnse@aol.com", "_blank"):<br>
 #EmailDomainLink("shawnse@aol.com", "_blank")#<br>
 </cfoutput>

args:
 - name: theEmailAddress
   desc: Email address.
   req: true
 - name: theTarget
   desc: Optional target for new window.
   req: false


javaDoc: |
 /**
  * Formats an e-mail address so that its domain is a link to its web site.
  * 
  * @param theEmailAddress      Email address. (Required)
  * @param theTarget      Optional target for new window. (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, September 29, 2003 
  */

code: |
 function emailDomainLink(theEmailAddress) {
     var this_username  = listFirst(theEmailAddress, "@");
     var this_domain    = listLast(theEmailAddress, "@");
     var theTarget      = "";
     if(arrayLen(arguments) gte 2) theTarget = arguments[2];
     if(Len(theTarget) GT 0) return "#this_username#@<a href=""http://www.#this_domain#"" target=""#theTarget#"">#this_domain#</a>";
     else return "#this_username#@<a href=""http://www.#this_domain#"">#this_domain#</a>";
 }

---

