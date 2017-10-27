---
layout: udf
title:  format
date:   2013-03-10T15:34:38.000Z
library: StrLib
argString: "str, args"
author: Anthony Cole
authorEmail: acole76@gmail.com
version: 1
cfVersion: CF9
shortDescription: Uses the Java String format() method to format a string in CFML.
tagBased: false
description: |
 CFML-friendly wrapper for a call to Java String's format() function.
 
 You can read more about the syntax on Oracle's site:
 http://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html

returnValue: A formatted string

example: |
 format("%s is a required field", ["email"])
 
 Explicit argument indices may be used to re-order output.
 format("My last name is %2$s and my first name is %1$s", ["john","doe"])

args:
 - name: str
   desc: A format string
   req: true
 - name: args
   desc: Array of arguments referenced by the format specifiers in the format string.
   req: true


javaDoc: |
 /**
  * Uses the Java String format() method to format a string in CFML.
  * v0.9 by Anthony Cole
  * v1.0 by Adam Cameron (renamed from sprintf to format, as this more closely reflects the underlying implementation; improved argument/variable names and tweaked the logic slightly)
  * 
  * @param str      A format string (Required)
  * @param args      Array of arguments referenced by the format specifiers in the format string. (Required)
  * @return A formatted string 
  * @author Anthony Cole (acole76@gmail.com) 
  * @version 1.0, March 10, 2013 
  */

code: |
 string function format(required string str, required array args){
     return str.format(str, args);
 }

oldId: 2214
---

