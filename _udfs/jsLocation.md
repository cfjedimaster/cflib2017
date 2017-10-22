---
layout: udf
title:  jsLocation
date:   2003-05-09T17:55:28.000Z
library: UtilityLib
argString: "href"
author: Isaac Dealey
authorEmail: info@turnkey.to
version: 1
cfVersion: CF5
shortDescription: A javascript alternative to the cflocation tag.
tagBased: false
description: |
 This udf takes a url and an optional frame argument and returns a small javascript which replaces the browser's current location in the browser's history stack with the url provided. This can be used after a cfflush tag and to the user is identical to the cflocation tag, preserving the browser's back button and works for both Netscape Navigator and MS Internet Explorer 3.0 and later.

returnValue: Returns a string.

example: |
 <cfif not isdefined("url.hello")>
 <cfoutput>#jslocation(cgi.script_name & "?" & cgi.query_string & "&hello=world")#</cfoutput>
 </cfif>

args:
 - name: href
   desc: New url.
   req: true


javaDoc: |
 /**
  * A javascript alternative to the cflocation tag.
  * 
  * @param href      New url. (Required)
  * @return Returns a string. 
  * @author Isaac Dealey (info@turnkey.to) 
  * @version 1, May 9, 2003 
  */

code: |
 function jslocation(href) { 
     var frame = "window"; 
         
     if (arraylen(arguments) gte 2) { frame = arguments[2]; } 
         
     return "<script language=""javascript"" type=""text/javascript"">" 
         & frame & ".location.replace(""" & jsstringformat(href) & """);</script>";
 }

---

