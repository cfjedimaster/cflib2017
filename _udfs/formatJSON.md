---
layout: udf
title:  formatJSON
date:   2012-09-16T18:25:39.000Z
library: StrLib
argString: "str"
author: Ben Koshy
authorEmail: cf@animex.com
version: 0
cfVersion: CF9
shortDescription: Formats a JSON string with indents &amp; new lines.
description: |
 formatJSON() :: formats and indents JSON string
 based on blog post @ http://ketanjetty.com/coldfusion/javascript/format-json/
 modified for CFScript V9 By Ben Koshy @animexcom
 usage: result = formatJSON('STRING TO BE FORMATTED') OR result = formatJSON(StringVariableToFormat);

returnValue: Returns a string of indent-formated JSON

example: |
 <cfset jsonString='{key1:"string value",key2:["array","of","elements"],key3:123,key4:{key5:50,key6:"string"}}'>
 <pre>
 <cfoutput>#formatJSON(jsonString)#</cfoutput>
 </pre>

args:
 - name: str
   desc: JSON string
   req: true


javaDoc: |
 /**
  * Formats a JSON string with indents &amp; new lines.
  * v1.0 by Ben Koshy
  * 
  * @param str      JSON string (Required)
  * @return Returns a string of indent-formated JSON 
  * @author Ben Koshy (cf@animex.com) 
  * @version 0, September 16, 2012 
  */

code: |
 // formatJSON() :: formats and indents JSON string
 // based on blog post @ http://ketanjetty.com/coldfusion/javascript/format-json/
 // modified for CFScript By Ben Koshy @animexcom
 // usage: result = formatJSON('STRING TO BE FORMATTED') OR result = formatJSON(StringVariableToFormat);
 
 public string function formatJSON(str) {
     var fjson = '';
     var pos = 0;
     var strLen = len(arguments.str);
     var indentStr = chr(9); // Adjust Indent Token If you Like
     var newLine = chr(10); // Adjust New Line Token If you Like <BR>
     
     for (var i=1; i<strLen; i++) {
         var char = mid(arguments.str,i,1);
         
         if (char == '}' || char == ']') {
             fjson &= newLine;
             pos = pos - 1;
             
             for (var j=1; j<pos; j++) {
                 fjson &= indentStr;
             }
         }
         
         fjson &= char;    
         
         if (char == '{' || char == '[' || char == ',') {
             fjson &= newLine;
             
             if (char == '{' || char == '[') {
                 pos = pos + 1;
             }
             
             for (var k=1; k<pos; k++) {
                 fjson &= indentStr;
             }
         }
     }
     
     return fjson;
 }

---

