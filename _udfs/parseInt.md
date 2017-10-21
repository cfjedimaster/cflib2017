---
layout: udf
title:  parseInt
date:   2003-05-22T09:52:46.000Z
library: StrLib
argString: "string"
author: Marco G. Williams
authorEmail: email@marcogwilliams.com
version: 1
cfVersion: CF5
shortDescription: Parse out the first set of numbers in a string.
description: |
 This UDF will only grab the first Numbers in a string.  If you have a string &quot; mozilla/ 4.0 (winNT; IE5.0)&quot; It will return 4.0 and ignore all the rest of your string.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 #parseInt("Opera/7.03 (Windows NT 5.0; U) [en]")#
 </CFOUTPUT>
 
 Returns: 7.03

args:
 - name: string
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Parse out the first set of numbers in a string.
  * 
  * @param string      String to parse. (Required)
  * @return Returns a string. 
  * @author Marco G. Williams (email@marcogwilliams.com) 
  * @version 1, May 22, 2003 
  */

code: |
 function parseInt(String){
     var NewString = "";
     var i = 1;
 
     for(i=1; i lt Len(String); i = i + 1) {
         if( isNumeric( mid(String,i,1) ) ) { newString = val( mid( String,i,Len(String) ) ); break;}
     }
     return NewString;
 }

---

