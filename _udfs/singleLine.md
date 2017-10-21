---
layout: udf
title:  singleLine
date:   2010-12-13T17:34:03.000Z
library: StrLib
argString: "s"
author: James Moberg
authorEmail: james@ssmedia.com
version: 0
cfVersion: CF5
shortDescription: Strips characters that cause line wrap when exporting.
description: |
 Strips Tab, Line Feed, Form Feed, Carriage Return, and non-breaking space (ASCII 160) from strings.  Reduces all space characters to a single occurrence.

returnValue: Returns a string.

example: |
 <cfset Test = "a#chr(10)#
 b#chr(10)##chr(12)#
 #CHR(9)##CHR(9)##CHR(9)#c#chr(13)#
 #chr(32)##chr(32)##chr(32)##chr(32)##chr(32)#d#chr(13)#
 #chr(160)##chr(160)##chr(160)##chr(160)##chr(160)#e">
 
 <cfoutput>
 multi-line<br>
 <textarea>#Test#</textarea><br>
 single line<br>
 <textarea>#singleLine(test)#</textarea>
 </cfoutput>

args:
 - name: s
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * Strips characters that cause line wrap when exporting.
  * 
  * @param s      String to modify. (Required)
  * @return Returns a string. 
  * @author James Moberg (james@ssmedia.com) 
  * @version 0, December 13, 2010 
  */

code: |
 function singleLine(s){
     s = replacelist(s, "#chr(9)#,#chr(10)#,#chr(12)#,#chr(13)#,#chr(160)#", " , , , , ");
     return trim(reReplace(s, "[[:space:]]{2,}", " ", "all"));
 }

---

