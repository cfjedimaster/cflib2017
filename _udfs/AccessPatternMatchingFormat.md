---
layout: udf
title:  AccessPatternMatchingFormat
date:   2002-08-14T10:54:54.000Z
library: StrLib
argString: "string"
author: Matthew Walker
authorEmail: matthew@cabbagetree.co.nz
version: 2
cfVersion: CF5
shortDescription: Strip pattern-matching wildcards from a string appearing in an Access query.
tagBased: false
description: |
 A visitor may enter wildcard characters into a search string without realising. An invalid search string can then produce either a database error or odd results. This is a particular problem with double-byte languages like Japanese where a [ for example may be hidden inside a character.

returnValue: Returns a string.

example: |
 <cfoutput>
 "98.3%" becomes "#AccessPatternMatchingFormat("98.3%")#"
 </cfoutput>

args:
 - name: string
   desc: The string to format.
   req: true


javaDoc: |
 /**
  * Strip pattern-matching wildcards from a string appearing in an Access query.
  * Modded list order (rkc 8/14/02)
  * 
  * @param string      The string to format. (Required)
  * @return Returns a string. 
  * @author Matthew Walker (matthew@cabbagetree.co.nz) 
  * @version 2, August 14, 2002 
  */

code: |
 function AccessPatternMatchingFormat(string) {
     return ReplaceList(string, "[,%,_,##", "[[],[%],[_],[##]");
 }

oldId: 702
---

