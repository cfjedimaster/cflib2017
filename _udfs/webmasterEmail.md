---
layout: udf
title:  webmasterEmail
date:   2008-07-11T15:08:42.000Z
library: UtilityLib
argString: "input"
author: Michael Muller
authorEmail: michael@mullertech.com
version: 1
cfVersion: CF5
shortDescription: creates a webmaster@... address out of any URL.
tagBased: false
description: |
 This UDF takes a URL string input and creates a webmaster@ e-mail address. String can contain leading http:// or not, ie; webmaster_email(&quot;http://www.yoursite.com/somefolder/somepage.cfm?something=something&quot;) would produce &quot;webmaster@yoursite.com&quot;
 
 This UDF was written as part of a 404 application, which, among other things, culls e-mail addresses from referer pages with broken links to my site. The app pulls e-mail addresses off cgi.http_referer and this little function adds a webmaster address for the domain.

returnValue: Returns a string.

example: |
 <cfoutput>
 webmaster_email("http://www.cflib.org/submit.cfm") produces
 #webmaster_email("http://www.cflib.org/submit.cfm")#
 </cfoutput>

args:
 - name: input
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * creates a webmaster@... address out of any URL.
  * 
  * @param input      URL to parse. (Required)
  * @return Returns a string. 
  * @author Michael Muller (michael@mullertech.com) 
  * @version 1, September 27, 2008 
  */

code: |
 function webmaster_email(input) {
     if(left(input,4) eq "http") return "webmaster@" & listRest(listGetAt(input,2,"/"),".");
     else return "webmaster@" & listRest(listFirst(input,"/"),".");
 }

---

