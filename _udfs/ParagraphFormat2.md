---
layout: udf
title:  ParagraphFormat2
date:   2002-06-26T18:59:53.000Z
library: StrLib
argString: "string"
author: Ben Forta
authorEmail: ben@forta.com
version: 3
cfVersion: CF5
shortDescription: An &quot;enhanced&quot; version of ParagraphFormat.
tagBased: false
description: |
 An &quot;enhanced&quot; version of ParagraphFormat. It will replace any CR/LF combination with a &lt;BR&gt; tag and any double CR/LF pair with a &lt;P&gt; tag. 
 
 The new version also replaces tabs with 3 non-breaking spaces.

returnValue: Returns a string.

example: |
 <CFSAVECONTENT VARIABLE="Text">
 This is my original paragraph. It will begin with one paragraph of text, then it will continue to an address.
 
 Raymond Camden
 XXXX My Street
 My City, Virginia XXXXX
 </CFSAVECONTENT>
 
 <CFOUTPUT>
 The formatted version:<P>
 #ParagraphFormat2(Text)#
 </CFOUTPUT>

args:
 - name: string
   desc: The string to format.
   req: true


javaDoc: |
 /**
  * An &quot;enhanced&quot; version of ParagraphFormat.
  * Added replacement of tab with nonbreaking space char, idea by Mark R Andrachek.
  * Rewrite and multiOS support by Nathan Dintenfas.
  * 
  * @param string      The string to format. (Required)
  * @return Returns a string. 
  * @author Ben Forta (ben@forta.com) 
  * @version 3, June 26, 2002 
  */

code: |
 function ParagraphFormat2(str) {
     //first make Windows style into Unix style
     str = replace(str,chr(13)&chr(10),chr(10),"ALL");
     //now make Macintosh style into Unix style
     str = replace(str,chr(13),chr(10),"ALL");
     //now fix tabs
     str = replace(str,chr(9),"&nbsp;&nbsp;&nbsp;","ALL");
     //now return the text formatted in HTML
     return replace(str,chr(10),"<br />","ALL");
 }

oldId: 38
---

