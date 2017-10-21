---
layout: udf
title:  REReplaceList
date:   2007-05-17T12:21:10.000Z
library: StrLib
argString: "str, oldList, newList"
author: Tuyen Tran
authorEmail: tuyen.k.tran@gmail.com
version: 1
cfVersion: CF5
shortDescription: RE replace a list list of regular expression with a list of string.
description: |
 RE replace a list list of regular expression with a list of string.

returnValue: Returns a string.

example: |
 Convert HTML to XML:
 <cfsavecontent variable="thisComment">
 <table border="0">
 <tr height="17">
     <td width="68" height="17">RE Replace List</td>
     <td width="49">HTML to XML (part 1)</td>
 </tr>
 </table>
 </cfsavecontent>
 
 <cfscript>
 thisComment = REReplaceList(thisComment, "<table[^>]*>,<tr[^>]*>,<td[^>]*>,</td>,</tr>,</table>", "<XmlRool>,<Row>,<Cell>,</Cell>,</Row>,</XmlRoot>");
 </cfscript>
 <cfoutput>#htmlCodeFormat(thisComment)#</cfoutput>

args:
 - name: str
   desc: String to parse.
   req: true
 - name: oldList
   desc: List of regular expressions.
   req: true
 - name: newList
   desc: List of replacements.
   req: true


javaDoc: |
 /**
  * RE replace a list list of regular expression with a list of string.
  * 
  * @param str      String to parse. (Required)
  * @param oldList      List of regular expressions. (Required)
  * @param newList      List of replacements. (Required)
  * @return Returns a string. 
  * @author Tuyen Tran (tuyen.k.tran@gmail.com) 
  * @version 1, May 17, 2007 
  */

code: |
 function REReplaceList(str, oldList, newList) {
     var i = 1;
     for (i=1; i lte listLen(oldlist); i=i+1) {
         str = REReplace(str, listGetAt(oldList, i), listGetAt(newList, i), "all");
     }
     return str;
 }

---

