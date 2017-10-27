---
layout: udf
title:  convertSpecialChars
date:   2011-01-03T16:13:28.000Z
library: StrLib
argString: "str"
author: Glen Salisbury
authorEmail: gsalisbury@collegepublisher.com
version: 2
cfVersion: CF5
shortDescription: Reformats special chars typically found when copying and pasting from Word.
tagBased: false
description: |
 The function is useful for filtering out chars that may not display correctly when viewed in a text only format.
 
 Currently it converts open and close quotes to
 a normal qoute and converts slanted single quotes to normal single quotes

returnValue: Returns a string.

example: |
 <CFSET STR = "?special? quotes?">
 <CFOUTPUT>
 #STR# is converted to 
 #ConvertSpecialChars(STR)#
 </CFOUTPUT>
 <I>You may need to "View Source" to see the changes.</I>

args:
 - name: str
   desc: The string to modify.
   req: true


javaDoc: |
 /**
  * Reformats special chars typically found when copying and pasting from Word.
  * v2 by James Moberg
  * 
  * @param str      The string to modify. (Required)
  * @return Returns a string. 
  * @author Glen Salisbury (gsalisbury@collegepublisher.com) 
  * @version 2, January 3, 2011 
  */

code: |
 function ConvertSpecialChars(textin) {
        var bad = "#chr(145)#,#chr(146)#,#chr(147)#,#chr(148)#,#chr(151)#,#CHR(8217)#,#CHR(8216)#,#chr(188)#,#chr(189)#,#chr(190)#,#chr(174)#,#chr(173)#,#chr(169)#,#chr(160)#,#chr(153)#,#chr(150)#,#chr(149)#,#chr(133)#,#CHR(8220)#,#CHR(8221)#";
        var good = "',',"","",-,',',1/4,1/2,3/4,(R),-,(C), ,TM,--,*,...,"",""";
        return ReplaceList(textin, bad, good);
 }

oldId: 319
---

