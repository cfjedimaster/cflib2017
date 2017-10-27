---
layout: udf
title:  GetTagContent
date:   2002-09-16T16:50:47.000Z
library: StrLib
argString: "tag, string"
author: Johan Steenkamp
authorEmail: johan@orbital.co.nz
version: 1
cfVersion: CF5
shortDescription: Returns the content enclosed in a tag pair.
tagBased: false
description: |
 Returns the contents enclosed in a tag pair if found tag pair is found in the string. If the tag is not found the UDF will return an empty string. Uses two regular expressions to find start and end tag postions and then extract content. Single regular expression solutions that use a subexpression, typically (.^), to extract content do not always work.

returnValue: Returns a string.

example: |
 <cfhttp method="get" url="http://www.hp.com" resolveurl="yes">
 <cfset importedContent = cfhttp.fileContent>
 
 <cfoutput>
 Title = #HTMLEditFormat(getTagContent("title",importedContent))#
 </cfoutput>

args:
 - name: tag
   desc: The tag to look for. Should be passed without < or > and without attributes.
   req: true
 - name: string
   desc: The string to search.
   req: true


javaDoc: |
 /**
  * Returns the content enclosed in a tag pair.
  * 
  * @param tag      The tag to look for. Should be passed without < or > and without attributes. (Required)
  * @param string      The string to search. (Required)
  * @return Returns a string. 
  * @author Johan Steenkamp (johan@orbital.co.nz) 
  * @version 1, September 16, 2002 
  */

code: |
 function getTagContent(tag,str) {
     var matchStruct = structNew();
     var startTag = "<#tag#[^>]*>";
     var endTag = "</#tag#>";
     var endTagStart = 0;
     matchStruct = REFindNoCase(startTag,str,1,"true");
     if(matchStruct.len[1] eq 0 ) return ""; 
     endTagStart = REFindNoCase(endTag,str,matchStruct.pos[1],"false");
     return Mid(str,matchStruct.pos[1]+matchStruct.len[1],endTagStart-matchStruct.pos[1]-matchStruct.len[1]);
 }

oldId: 738
---

