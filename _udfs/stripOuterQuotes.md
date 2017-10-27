---
layout: udf
title:  stripOuterQuotes
date:   2010-12-13T17:45:51.000Z
library: StrLib
argString: "string"
author: Pete Ruckelshaus
authorEmail: pruckelshaus@gmail.com
version: 0
cfVersion: CF5
shortDescription: Strips doublequotes from the beginning and end of a string.
tagBased: false
description: |
 Strips doublequotes from the beginning and end of a string.  Useful for cleaning up CSV data that uses quoted columns.

returnValue: Returns a string.

example: |
 <cfset sample = """ray""">
 <cfoutput>#stripOuterQuotes(sample)#</cfoutput>

args:
 - name: string
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * Strips doublequotes from the beginning and end of a string.
  * 
  * @param string      String to modify. (Required)
  * @return Returns a string. 
  * @author Pete Ruckelshaus (pruckelshaus@gmail.com) 
  * @version 0, December 13, 2010 
  */

code: |
 function stripOuterQuotes(string) {
     if (left(string, 1) EQ """") {
         string = right(string, len(string) -1);
     }
     if (right(string, 1) EQ """") {
         string = left(string, len(string) -1);
     }
     return string;
 }

oldId: 2085
---

