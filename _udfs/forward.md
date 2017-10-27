---
layout: udf
title:  forward
date:   2003-10-20T11:56:59.000Z
library: UtilityLib
argString: "theurl"
author: Thomas Bukowski
authorEmail: me@neodude.net
version: 1
cfVersion: CF6
shortDescription: Performs a serverside redirection.
tagBased: false
description: |
 This UDF performs a serverside redirection through getPageContext(). This redirect must be to a relative location on the server. Unlike &lt;cflocation&gt;, this UDF does not send a 302 header to the browser to ask for a redirect - instead, the Coldfusion server stops executing the current page and starts executing the new page; this is done by accessing the J2EE backend behind Coldfusion MX with the use of the internal function getPageContext().
 
 For furthering information on accessing the J2EE backend, see:
 http://www.macromedia.com/devnet/mx/coldfusion/articles/java.html
 
 Also, note that using this function (or the getPageContext().forward() function) when you have data in the Form scope throws the java err.io.short_read error in Coldfusion MX versions eariler then Update Release 3. More information:
 http://www.macromedia.com/support/coldfusion/releasenotes/mx/releasenotes_mx_updater01.html
 (Scroll down to CFML Function-Related Issues)

returnValue: Returns nothing.

example: |
 <cfscript>
 /* view only example
 forward("/foo.cfm");
 */
 </cfscript>

args:
 - name: theurl
   desc: The URL to redirect to. Must be relative.
   req: true


javaDoc: |
 /**
  * Performs a serverside redirection.
  * 
  * @param theurl      The URL to redirect to. Must be relative. (Required)
  * @return Returns nothing. 
  * @author Thomas Bukowski (me@neodude.net) 
  * @version 1, October 20, 2003 
  */

code: |
 function forward(theurl){
     getPageContext().forward(theurl);
 }

oldId: 971
---

