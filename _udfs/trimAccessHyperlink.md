---
layout: udf
title:  trimAccessHyperlink
date:   2008-06-25T15:59:47.000Z
library: StrLib
argString: "str"
author: Kurtis D. Leatham
authorEmail: KDL@KomputerMan.com
version: 0
cfVersion: CF5
shortDescription: Convert an Access hyperlink field to text.
description: |
 MS Access stores hyperlink information like: www.KomputerMan.com#http://www.KomputerMan.com#.  This tag removes the second part of that data leaving you with just www.KomputerMan.com.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="myString">
  www.KomputerMan.com#http://www.KomputerMan.com#
 </cfsavecontent>
 
 <cfoutput>#trimAccessHyperlink(mystring)#</cfoutput>

args:
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Convert an Access hyperlink field to text.
  * 
  * @param str      String to parse. (Required)
  * @return Returns a string. 
  * @author Kurtis D. Leatham (KDL@KomputerMan.com) 
  * @version 0, June 25, 2008 
  */

code: |
 function trimAccessHyperlink(str) {
     var endTag = "";
     var extract = "";
     str = trim(str);    
     endTag = findNoCase("##", str);
     if (endTag gt 0) {
         endTag = endTag - 1;
         extract = left(str, endTag);
     } else {
         extract = str;
     }
     return trim(extract);
 }

---

