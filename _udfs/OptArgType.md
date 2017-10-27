---
layout: udf
title:  OptArgType
date:   2002-08-20T10:49:20.000Z
library: UtilityLib
argString: "args, index, type[, default]"
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 1
cfVersion: CF5
shortDescription: Pass in an optional UDF argument of a specific type and define a default value at once.
tagBased: false
description: |
 This function is similar to optArg() except that it allows you to specify a type of the argument, if the provided arg isn't the correct type, then the default  value is used. Also when types &quot;structure&quot; and &quot;array&quot; are used an empty array / struct is created when no default value is specified. This tag requires the typeOf() udf to work.

returnValue: Returns a value (any type).

example: |
 <cfscript>
 function foo( p1 ) {
     var s = structNew();
     var p2 = optArgType( arguments, 2, "structure" );
     var p3 = optArgType( arguments, 3, "array", listToArray( "foo,bar,grill" ));
 
     s.p2 = p2;
     s.p3 = p3;
     return s;
 }
 </cfscript>
 <cfdump var="#foo(1)#">

args:
 - name: args
   desc: Arguments to check.
   req: true
 - name: index
   desc: Index to check.
   req: true
 - name: type
   desc: Type to use.
   req: true
 - name: default
   desc: Value to use if args[index] doesn't exist. Defaults to an empty string if type isn't struct or array.
   req: false


javaDoc: |
 /**
  * Pass in an optional UDF argument of a specific type and define a default value at once.
  * 
  * @param args      Arguments to check. (Required)
  * @param index      Index to check. (Required)
  * @param type      Type to use. (Required)
  * @param default      Value to use if args[index] doesn't exist. Defaults to an empty string if type isn't struct or array. (Optional)
  * @return Returns a value (any type). 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 1, August 20, 2002 
  */

code: |
 function OptArgType( args, index, type ) {
     if( arrayLen( args ) GTE index AND typeOf( args[ index ] ) IS type ) {
         return args[ index ];
     } else if( arrayLen( arguments ) IS 4 ) {
         return arguments[ 4 ];
     } else {
         switch( type ) {
             case "structure" : return structNew();
             case "array" : return arrayNew( 1 );
             default : return "";
         }
     }
 }

oldId: 703
---

