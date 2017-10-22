---
layout: udf
title:  OptArg
date:   2002-08-20T10:42:41.000Z
library: UtilityLib
argString: "args, index[, default]"
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 1
cfVersion: CF5
shortDescription: Pass in an optional UDF argument and define a default value at once.
tagBased: false
description: |
 Easy way to define optional arguments for your functions. If the value isn't passed in, the local variable is still created.

returnValue: Returns a value (any type).

example: |
 <cfscript>
 function foo( p1 ) {
     var p2 = optArg( arguments, 2, "foo" );
     var p3 = optArg( arguments, 3, "bar" );
     return p1 & p2 & p3;
 }
 </cfscript>
 <cfoutput>#foo("moo")#</cfoutput>

args:
 - name: args
   desc: Arguments
   req: true
 - name: index
   desc: Index to check.
   req: true
 - name: default
   desc: Value to use if args[index] doesn't exist. Defaults to an empty string.
   req: false


javaDoc: |
 /**
  * Pass in an optional UDF argument and define a default value at once.
  * 
  * @param args      Arguments (Required)
  * @param index      Index to check. (Required)
  * @param default      Value to use if args[index] doesn't exist. Defaults to an empty string. (Optional)
  * @return Returns a value (any type). 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 1, August 20, 2002 
  */

code: |
 function OptArg( args, index ) {
     if( arrayLen( args ) GTE index ) {
         return args[ index ];
     } else if( arrayLen( arguments ) IS 3 ) {
         return arguments[ 3 ];
     } else {
         return "";
     }
 }

---

