---
layout: udf
title:  AccessLinkClean
date:   2002-01-03T15:07:42.000Z
library: StrLib
argString: "strval"
author: Mark Andrachek
authorEmail: hallow@webmages.com
version: 1
cfVersion: CF5
shortDescription: This turns a Microsoft Access hyperlink field into a standard URL.
description: |
 Takes an Access &quot;Hyperlink&quot; field value, and turns it into a regular URL by removing the extra pounds at the beginning and end of the URL. This preserves pounds included as internal references.

returnValue: Returns a string.

example: |
 <CFSET AccessLink="##http://www.cflib.org/##">
 
 <CFOUTPUT>
 Access Link: #AccessLink#<BR>
 Cleaned: #AccessLinkClean(AccessLink)#
 </CFOUTPUT>

args:
 - name: strval
   desc: Variable containing the MS Access link you want to 'clean'.
   req: true


javaDoc: |
 /**
  * This turns a Microsoft Access hyperlink field into a standard URL.
  * 
  * @param strval      Variable containing the MS Access link you want to 'clean'. 
  * @return Returns a string. 
  * @author Mark Andrachek (hallow@webmages.com) 
  * @version 1, January 3, 2002 
  */

code: |
 function AccessLinkClean(strval)  
 {
    return Mid(strval,2,Len(strval)-2); 
 }

---

