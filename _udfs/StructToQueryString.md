---
layout: udf
title:  StructToQueryString
date:   2001-12-17T19:47:29.000Z
library: DataManipulationLib
argString: "struct[, keyValueDelim][, queryStrDelim]"
author: Erki Esken
authorEmail: erki@dreamdrummer.com
version: 1
cfVersion: CF5
shortDescription: Converts a structure to a URL query string.
tagBased: false
description: |
 Converts a structure to a URL query string. Query string delimiters can be changed: second function argument is the key/value delimiter (default is =) and third argument is the other delimiter (default is &).

returnValue: Returns a string.

example: |
 <cfscript>
    test = StructNew();
    test.foo = "bar";
    test.another = "foobar";
    normalQueryString = StructToQueryString(test);
    sesQueryString = StructToQueryString(test, "/", "/");
 </cfscript>
 
 <cfdump var="#normalQueryString#">
 <P>
 <cfdump var="#sesQueryString#">

args:
 - name: struct
   desc: Structure of key/value pairs you want converted to URL parameters
   req: true
 - name: keyValueDelim
   desc: Delimiter for the keys/values.  Default is the equal sign (=).
   req: false
 - name: queryStrDelim
   desc: Delimiter separating url parameters.  Default is the ampersand (&).
   req: false


javaDoc: |
 /**
  * Converts a structure to a URL query string.
  * 
  * @param struct      Structure of key/value pairs you want converted to URL parameters 
  * @param keyValueDelim      Delimiter for the keys/values.  Default is the equal sign (=). 
  * @param queryStrDelim      Delimiter separating url parameters.  Default is the ampersand (&). 
  * @return Returns a string. 
  * @author Erki Esken (erki@dreamdrummer.com) 
  * @version 1, December 17, 2001 
  */

code: |
 function StructToQueryString(struct) {
   var qstr = "";
   var delim1 = "=";
   var delim2 = "&";
 
   switch (ArrayLen(Arguments)) {
     case "3":
       delim2 = Arguments[3];
     case "2":
       delim1 = Arguments[2];
   }
     
   for (key in struct) {
     qstr = ListAppend(qstr, URLEncodedFormat(LCase(key)) & delim1 & URLEncodedFormat(struct[key]), delim2);
   }
   return qstr;
 }

---

