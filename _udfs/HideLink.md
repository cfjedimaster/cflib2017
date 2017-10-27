---
layout: udf
title:  HideLink
date:   2002-09-20T11:02:39.000Z
library: StrLib
argString: "href, display, caption"
author: Jeff Guillaume
authorEmail: jeff@kazoomis.com
version: 1
cfVersion: CF5
shortDescription: Disguise a link using JavaScript's window.status attribute.
tagBased: false
description: |
 Creates a disguised link by using JavaScript's window.status attribute to display a desired string in the browser's status bar instead of the actual location of the link.  Uses XMLFormat to be XHTML-compliant.

returnValue: Returns a string.

example: |
 <cfoutput>
 #HideLink("http://www.kazoomis.com/", "Click here to visit Kazoomis.com", "Kazoomis.com")#
 </cfoutput>

args:
 - name: href
   desc: URL for the link.
   req: true
 - name: display
   desc: Text to disply in window.status.
   req: true
 - name: caption
   desc: Text for the link.
   req: true


javaDoc: |
 /**
  * Disguise a link using JavaScript's window.status attribute.
  * 
  * @param href      URL for the link. (Required)
  * @param display      Text to disply in window.status. (Required)
  * @param caption      Text for the link. (Required)
  * @return Returns a string. 
  * @author Jeff Guillaume (jeff@kazoomis.com) 
  * @version 1, September 20, 2002 
  */

code: |
 function HideLink(href, display, caption) {
 
     var str = "";
     
     str = "<a href=""#XMLFormat(href)#"" onmouseover=""window.status='#XMLFormat(display)#'; return true;"" onmouseout=""window.status=''; return true;""";
     str = str & ">";
     str = str & "#caption#</a>";
     
     return str;
     
 }

oldId: 746
---

