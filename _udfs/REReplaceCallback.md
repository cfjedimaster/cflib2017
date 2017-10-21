---
layout: udf
title:  REReplaceCallback
date:   2010-03-10T20:20:18.000Z
library: CFMLLib
argString: "string, pattern, callback[, scope]"
author: Barney Boisvert
authorEmail: bboisvert@gmail.com
version: 1
cfVersion: CF8
shortDescription: REReplaceCallback behaves like REReplace, except instead of supplying a replacement string, you supply a function to invoke on each match.
description: |
 With the built-in REReplace function you can only supply a static replace string (parameterized with backreferences, of course).  This UDF allows you to supply a function callback that will be passed all matches (including subexpressions) allowing you to use arbitrary CFML to construct the replacement string dynamically.

returnValue: Returns a string.

example: |
 <cfscript>
 string = "The catapult bifurcated the bearcat.";
 fancyString = REReplaceCallback(string, "(\w*)(cat)(\w*)", doit, "all");
 function doit(match) {
   if (match[2] EQ "") {
     return '#match[2]#<b><i>#match[3]#</i></b>#match[4]#';
   } else {
     return '<u>#match[2]#<b><i>#match[3]#</i></b>#match[4]#</u>';
   }
 }
 </cfscript>

args:
 - name: string
   desc: String to parse.
   req: true
 - name: pattern
   desc: Regex pattern to use.
   req: true
 - name: callback
   desc: UDF to be used as a callback.
   req: true
 - name: scope
   desc: How many replacements should be made. Defaults to one.
   req: false


javaDoc: |
 <!---
  REReplaceCallback behaves like REReplace, except instead of supplying a replacement string, you supply a function to invoke on each match.
  
  @param string      String to parse. (Required)
  @param pattern      Regex pattern to use. (Required)
  @param callback      UDF to be used as a callback. (Required)
  @param scope      How many replacements should be made. Defaults to one. (Optional)
  @return Returns a string. 
  @author Barney Boisvert (bboisvert@gmail.com) 
  @version 1, March 10, 2010 
 --->

code: |
 <cffunction name="REReplaceCallback" access="private" output="false" returntype="string">
   <cfargument name="string" type="string" required="true" />
   <cfargument name="pattern" type="string" required="true" />
   <cfargument name="callback" type="any" required="true" />
   <cfargument name="scope" type="string" default="one" />
   <cfscript>
   var start = 0;
   var match = "";
   var parts = "";
   var replace = "";
   var i = "";
   var l = "";
   while (true) {
     match = REFind(pattern, string, start, true);
     if (match.pos[1] EQ 0) {
       break;
     }
     parts = [];
     l = arrayLen(match.pos);
     for (i = 1; i LTE l; i++) {
       if (match.pos[i] EQ 0) {
         arrayAppend(parts, "");
       } else {
         arrayAppend(parts, mid(string, match.pos[i], match.len[i]));
       }
     }
     replace = callback(parts);
     start = start + len(replace);
     string = mid(string, 1, match.pos[1] - 1) & replace & removeChars(string, 1, match.pos[1] + match.len[1] - 1);
     if (scope EQ "one") {
       break;
     }
   }
   return string;
   </cfscript>
 </cffunction>

---

