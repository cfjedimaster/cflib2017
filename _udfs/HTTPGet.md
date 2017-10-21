---
layout: udf
title:  HTTPGet
date:   2002-11-11T11:17:58.000Z
library: NetLib
argString: "u"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF5
shortDescription: UDF equivelant of &lt;CFHTTP&gt;
description: |
 UDF equivelant of &lt;CFHTTP&gt;, pass it a URL and it'll return the stream. Does not support passing parameters or fields. Requires a complete URL with the protocol (the http://).

returnValue: Returns a string.

example: |
 <cfset page = HTTPGet("http://www.macromedia.com")>
 <cfset page = HTMLEditFormat(page)>
 Here is a portion of the HTML:
 <p>
 <cfloop index="x" from=1 to=5>
     <cfset line = listGetAt(page,x,chr(10))>
     <cfoutput>#line#<br></cfoutput>
 </cfloop>

args:
 - name: u
   desc: The URL to fetch.
   req: true


javaDoc: |
 /**
  * UDF equivelant of &lt;CFHTTP&gt;
  * 
  * @param u      The URL to fetch. (Required)
  * @return Returns a string. 
  * @author Ben Forta (ben@forta.com) 
  * @version 1, November 11, 2002 
  */

code: |
 function HTTPGet(u) {
    // Variables
    var urlclass="";
    var page="";
    var stream="";
    var c="";
    var output="";
    
    // Init class
    urlclass=CreateObject("java", "java.net.URL");
 
    // Get page
    page=urlclass.init(u);
 
    // Get stream
    stream=page.getContent();
     
    // Display it
    for (c=stream.read(); c GT 0; c=stream.read())
    {
       output=output&chr(c);
    }
 
    // don't forget this part
    stream.close();
    
    return output;
 }

---

