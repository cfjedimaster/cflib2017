---
layout: udf
title:  Indent
date:   2001-07-17T13:20:08.000Z
library: StrLib
argString: "string[, indentchar][, repeatcount]"
author: James Ang
authorEmail: james@vertexcs.com
version: 1
cfVersion: CF5
shortDescription: Indents all the lines of a string.
description: |
 Return string with each line prepended with indentchar repeatcount times. This function could be useful for formatting in CFMAIL or PRE tags. 
 A line is defined to be a string terminated by CR/LF or LF.

returnValue: Returns a string.

example: |
 <CFSAVECONTENT VARIABLE="Test">
 To be or not to be, that is the question.
 This is a second line of text.
 And this is a third.
 </CFSAVECONTENT>
 <PRE>
 <CFOUTPUT>
 #Indent(Test)#
 </CFOUTPUT>
 </PRE>

args:
 - name: string
   desc: String to be modified.
   req: true
 - name: indentchar
   desc: Character to use for indenting. Defaults to tab character (Chr(9)).
   req: false
 - name: repeatcount
   desc: Positive integer to repeat indentchar. Defaults to 1.
   req: false


javaDoc: |
 /**
  * Indents all the lines of a string.
  * 
  * @param string      String to be modified. 
  * @param indentchar      Character to use for indenting. Defaults to tab character (Chr(9)). 
  * @param repeatcount      Positive integer to repeat indentchar. Defaults to 1. 
  * @return Returns a string. 
  * @author James Ang (james@vertexcs.com) 
  * @version 1, July 17, 2001 
  */

code: |
 function Indent(str) {
     var chri = CHR(9); // indenting character. Defaults to horizontal tab
     var ncnt = 1; // strIndent = RepeatString(ichr, ncnt)
     var strcr = CHR(13);
     var strlf = CHR(10);
     var strcrlf = strcr & strlf;
     var strIndent = "";
     if (ArrayLen(Arguments) GT 1) {
         chri = Arguments[2];
         if (ArrayLen(Arguments) GT 2) {
             ncnt = Arguments[3];
         }
     }
     strIndent = RepeatString(chri, ncnt);
     return (strIndent & REReplace(str, "([#strcrlf#]+)([^#strcrlf#])", "\1#strIndent#\2", "ALL"));
 }

---

