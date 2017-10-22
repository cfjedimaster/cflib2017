---
layout: udf
title:  Get
date:   2002-11-15T18:31:13.000Z
library: DataManipulationLib
argString: "BVar, loc"
author: John Bartlett
authorEmail: jbartlett@strangejourney.net
version: 1
cfVersion: CF6
shortDescription: Examine the contents of a BINARY file.
tagBased: false
description: |
 This UDF will return the ASCII value of a specified character in a BINARY file.
 
 (Get is a throwback to the BASIC days of GET/POKE for fetching/changing bytes in memory.)
 
 Note: You may not change any value stored in the binary array - an error will occur.

returnValue: Returns a string.

example: |
 <!---
 <cffile action="READBINARY" file="file name" variable="Data">
 <CFLOOP index="loop" from="1" to="100">
     <CFOUTPUT>#Chr(Get(Data,loop))#</CFOUTPUT>
 </CFLOOP>
 --->

args:
 - name: BVar
   desc: Binary variable.
   req: true
 - name: loc
   desc: Location in the binary file.
   req: true


javaDoc: |
 /**
  * Examine the contents of a BINARY file.
  * 
  * @param BVar      Binary variable. (Required)
  * @param loc      Location in the binary file. (Required)
  * @return Returns a string. 
  * @author John Bartlett (jbartlett@strangejourney.net) 
  * @version 1, November 15, 2002 
  */

code: |
 function Get(BVar,loc) {
     if (isBinary(BVar) EQ "No") return 0;
     if (BVar[loc] GTE 0) return BVar[loc];
     return BVar[loc] + 256;
 }

---

