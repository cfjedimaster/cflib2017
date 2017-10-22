---
layout: udf
title:  SQLServerPatternMatchingFormat
date:   2002-08-15T11:15:22.000Z
library: StrLib
argString: "string"
author: Matthew Walker
authorEmail: matthew@cabbagetree.co.nz
version: 1
cfVersion: CF5
shortDescription: Strip pattern-matching wildcards from a string appearing in a SQL Server query.
tagBased: false
description: |
 A visitor may enter wildcard characters into a search string without realising. An invalid search string can then produce either a database error or odd results. This is a particular problem with double-byte languages like Japanese where a [ for example may be hidden inside a character.

returnValue: Returns a string.

example: |
 "98.3%" becomes "<cfoutput>#SQLServerPatternMatchingFormat("98.3%")#</cfoutput>"

args:
 - name: string
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Strip pattern-matching wildcards from a string appearing in a SQL Server query.
  * 
  * @param string      String to format. (Required)
  * @return Returns a string. 
  * @author Matthew Walker (matthew@cabbagetree.co.nz) 
  * @version 1, August 15, 2002 
  */

code: |
 function SQLServerPatternMatchingFormat(string) {
     return ReplaceList(string, "[,%,_", "[[],[%],[_]");
 }

---

