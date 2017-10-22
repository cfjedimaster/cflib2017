---
layout: udf
title:  Left2
date:   2002-02-24T12:33:10.000Z
library: StrLib
argString: "string, length"
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 1
cfVersion: CF5
shortDescription: Adds zero and negative support to the length parameter of left().
tagBased: false
description: |
 Parameters are the same as left().
 0 Length returns no value. Negative lengths will return the the full string minus the specified number of characters from the right.

returnValue: Returns a string.

example: |
 <cfoutput>
 left2( "CFlib.org", 0 ) = #left2( "CFlib.org", 0 )#<br>
 left2( "CFlib.org", 2 ) = #left2( "CFlib.org", 2 )#<br>
 left2( "CFlib.org", -3 ) = #left2( "CFlib.org", -3 )#<br>
 </cfoutput>

args:
 - name: string
   desc: The string to modify.
   req: true
 - name: length
   desc: The length to use.
   req: true


javaDoc: |
 /**
  * Adds zero and negative support to the length parameter of left().
  * 
  * @param string      The string to modify. 
  * @param length      The length to use. 
  * @return Returns a string. 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 1, February 24, 2002 
  */

code: |
 function left2( string, length )
 {
   if( length GT 0 )
     return left( string, length );
   else if( length LT 0 )
     return left( string, len( string ) + length );
   else return "";
 }

---

