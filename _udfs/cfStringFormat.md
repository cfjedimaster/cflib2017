---
layout: udf
title:  cfStringFormat
date:   2003-05-09T18:23:44.000Z
library: StrLib
argString: "mystring"
author: Isaac Dealey
authorEmail: info@turnkey.to
version: 1
cfVersion: CF5
shortDescription: companion to jsstringformat - formats a string for use as a coldfusion literal value
description: |
 escapse all double-quotes and pound symbols in a string and replaces all ascii non-printing characters with a #chr(x)# equivalent

returnValue: Returns a string.

example: |
 <cfset str = "<cfset x = " & "##z## plus hello"">">
 <cfoutput>
 str = #htmlEditFormat(str)#<br>
 cfStringFormat(str) = #htmlEditFormat(cfstringformat(str))#
 </cfoutput>

args:
 - name: mystring
   desc: String to format.
   req: true


javaDoc: |
 /**
  * companion to jsstringformat - formats a string for use as a coldfusion literal value
  * 
  * @param mystring      String to format. (Required)
  * @return Returns a string. 
  * @author Isaac Dealey (info@turnkey.to) 
  * @version 1, May 9, 2003 
  */

code: |
 function cfStringFormat(mystring) { 
     var x = 0; 
     var npc = ""; 
     var npcc = ""; 
 
     mystring = rereplacenocase(mystring,"(""|##)","\1\1","ALL"); 
     for (x = 1; x lte 31; x = x + 1) { 
         npc = listappend(npc,chr(x)); 
         npcc = listappend(npcc,"##chr(#x#)##"); 
     } 
     return replacelist(mystring,npc,npcc); 
 }

---

