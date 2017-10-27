---
layout: udf
title:  Right2
date:   2002-02-24T12:31:07.000Z
library: StrLib
argString: "string, length"
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 1
cfVersion: CF5
shortDescription: Adds zero and negative support to the length parameter of right().
tagBased: false
description: |
 Parameters are the same as right().
 0 Length returns no value. Negative lengths will return the the full string minus the specified number of characters from the left.

returnValue: Returns a string.

example: |
 <cfoutput>
 right2( "CFlib.org", 0 ) = #right2( "CFlib.org", 0 )#<br>
 right2( "CFlib.org", 3 ) = #right2( "CFlib.org", 3 )#<br>
 right2( "CFlib.org", -2 ) = #right2( "CFlib.org", -2 )#<br>
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
  * Adds zero and negative support to the length parameter of right().
  * 
  * @param string      The string to modify. 
  * @param length      The length to use. 
  * @return Returns a string. 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 1, February 24, 2002 
  */

code: |
 function right2( string, length )
 {
   if( length GT 0 )
     return right( string, length );
   else if( length LT 0 )
     return right( string, len( string ) + length );
   else return "";
 }

oldId: 480
---

