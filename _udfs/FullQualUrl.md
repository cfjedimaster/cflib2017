---
layout: udf
title:  FullQualUrl
date:   2001-11-02T09:22:11.000Z
library: UtilityLib
argString: "mytext, relpage, FQHost"
author: Ryan Thompson-Jewell
authorEmail: thompsonjewell.ryan@mayo.edu
version: 1
cfVersion: CF5
shortDescription: Replace relative url's with a fully qualified URL
tagBased: false
description: |
 Replace relative url's with a fully qualified URL within HREF tags. Handy for when you syndicating content to clients.

returnValue: Returns a string.

example: |
 <cfscript>
 RelPage="index.cfm";
 FQHost="http://www.yoursite.com";
 // some text you want to parse
 mytext="blah blah blah <a href=""index.cfm"">Home</a> blah blah blah ";
 </cfscript>
 
 <cfoutput>
 Starting text:<br>
 #mytext#<br>
 <br>
 <br>
 Ending:<br>
 #FullQualUrl(mytext,relpage,fqhost)#<br>
 </cfoutput>

args:
 - name: mytext
   desc: The string to search.
   req: true
 - name: relpage
   desc: The page to qualify.
   req: true
 - name: FQHost
   desc: The fully qualified host.
   req: true


javaDoc: |
 /**
  * Replace relative url's with a fully qualified URL
  * 
  * @param mytext      The string to search. 
  * @param relpage      The page to qualify. 
  * @param FQHost      The fully qualified host. 
  * @return Returns a string. 
  * @author Ryan Thompson-Jewell (thompsonjewell.ryan@mayo.edu) 
  * @version 1, November 2, 2001 
  */

code: |
 function FullQualUrl(mytext,RelPage,FQHost) {
     var tmp=rereplacenocase(mytext,"(href\=){1}([""|'| ]*)(/)*(#RelPage#){1}","\1\2#FQHost#/#RelPage#","ALL");
     return tmp;
 }

---

