---
layout: udf
title:  getNameInitials
date:   2007-10-04T17:52:14.000Z
library: StrLib
argString: "str"
author: Anonymous
authorEmail: anonymous@gmail.com
version: 1
cfVersion: CF5
shortDescription: Extracts the initials of a name from long string.
description: |
 Creates a sequence of initials based on an input name string. The UDF essentially takes the first characters of each word in the input string, capitalizes them and puts them together.

returnValue: Returns a string.

example: |
 <cfset name="John Alexander Smith"><br>
 <cfoutput>Initials for #name# are #getNameInitials(name)#</cfoutput>

args:
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Extracts the initials of a name from long string.
  * 
  * @param str      String to parse. (Required)
  * @return Returns a string. 
  * @author Anonymous (anonymous@gmail.com) 
  * @version 1, October 4, 2007 
  */

code: |
 function getNameInitials(str) {
     var newstr = "";
     var word = "";
     var i = 1;
     var strlen = listlen(str," ");
     for(i=1;i lte strlen;i=i+1) {
         word = ListGetAt(str,i," ");
         newstr = newstr & UCase(Left(word,1));
     }
     return newstr;
 }

---

