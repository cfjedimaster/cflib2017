---
layout: udf
title:  GetMetaHeaders
date:   2007-05-02T12:43:13.000Z
library: StrLib
argString: "str"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 4
cfVersion: CF5
shortDescription: Parses an HTML string and returns META tag information.
tagBased: false
description: |
 This UDF will parse an HTML string (normally returned from CFFILE) and return an array containing information about all meta tags. Each element of the array is a structure. Each structure will contain either a name or &quot;http-equiv&quot; key. The value is the name or http-equiv entry. Each structure will contain a content key as well. This contains the content for the meta tag.

returnValue: Returns an array.

example: |
 <CFOUTPUT>
 <CFSAVECONTENT VARIABLE="Page">
 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
 <HTML>
 <HEAD>
     <title>Home</title>
     
     <META NAME='Keywords' CONTENT='Goober'>
     <META NAME="description" CONTENT="">
     <META NAME="abstract" CONTENT="">
     <META HTTP-EQUIV="Content-Language" CONTENT="EN">
     <META NAME="author" CONTENT="foo@foo.com">
     <META NAME="distribution" CONTENT="Global">
     <META NAME="revisit-after" CONTENT="30 days">
     <META NAME="copyright" CONTENT="FOO Corporation">
     <META NAME="robots" CONTENT="FOLLOW,INDEX">
         <LINK REL="STYLESHEET" TYPE="text/css" HREF="includes/foo.css">
 </HEAD>
 <BODY>
 Stuff.
 </BODY>
 </HTML>
 </CFSAVECONTENT>
 </CFOUTPUT>
 
 <CFSET res = GetMetaHeaders(Page)>
 <CFDUMP var="#res#">

args:
 - name: str
   desc: The string to check.
   req: true


javaDoc: |
 /**
  * Parses an HTML string and returns META tag information.
  * Regex fix for names with spaces by Johan Steenkamp (johan@orbital.co.nz).
  * Fix for self closing tags.
  * 
  * @param str      The string to check. (Required)
  * @return Returns an array. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 4, May 2, 2007 
  */

code: |
 function GetMetaHeaders(str) {
     var matchStruct = structNew();
     var name = "";
     var content = "";
     var results = arrayNew(1);
     var pos = 1;
     var regex = "<meta[[:space:]]*(name|http-equiv)[[:space:]]*=[[:space:]]*(""|')([^""]*)(""|')[[:space:]]*content=(""|')([^""]*)(""|')[[:space:]]*/{0,1}>";     
     
     matchStruct = REFindNoCase(regex,str,pos,1);
     while(matchStruct.pos[1]) {
         results[arrayLen(results)+1] = structNew();
         results[arrayLen(results)][ Mid(str,matchStruct.pos[2],matchStruct.len[2])] = Mid(str,matchStruct.pos[4],matchStruct.len[4]);
         results[arrayLen(results)].content = Mid(str,matchStruct.pos[7],matchStruct.len[7]);
         pos = matchStruct.pos[6] + matchStruct.len[6] + 1;
         matchStruct = REFindNoCase(regex,str,pos,1);
     }
     return results;
 }

---

