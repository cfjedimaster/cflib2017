---
layout: udf
title:  getTagContentAll
date:   2008-10-24T16:50:19.000Z
library: StrLib
argString: "tag, str"
author: Todd Sharp
authorEmail: todd@cfsilence.com
version: 1
cfVersion: CF5
shortDescription: Extract all occurrences of a given tag pair from a string.
tagBased: false
description: |
 Based on getTagContent, this UDF will extract all occurrences of a given tag pair from a string (getTagContent only returns a single occurrence of the tag) and return the individual occurrences as elements in an array.  If the tag is not found the UDF will return an empty array.

returnValue: Returns an array.

example: |
 <cfhttp method="get" url="http://cfsilence.com" resolveurl="yes">
 <cfset importedContent = cfhttp.fileContent>
 
 <cfdump var="#getTagContentAll("code",importedContent)#">

args:
 - name: tag
   desc: Tag to look for. Do not include brackets.
   req: true
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Extract all occurrences of a given tag pair from a string.
  * 
  * @param tag      Tag to look for. Do not include brackets. (Required)
  * @param str      String to parse. (Required)
  * @return Returns an array. 
  * @author Todd Sharp (todd@cfsilence.com) 
  * @version 1, October 24, 2008 
  */

code: |
 function getTagContentAll(tag,str) {
     var matchStruct = structNew();
     var matchPos = "";
     var matchLen = "";
     var startTag = "<#lcase(tag)#";
     var endTag = "</#tag#>";
     var endTagStart = 0;
     var firstOcc = REFindNoCase(startTag,str,1,true);
     var returnArray = ArrayNew(1);
 
     //check the char following the tag - if it closes the tag then set the startTag accordingly
     if(mid(str, firstOcc.pos[1]+len(startTag),1) eq ">") {
         startTag = "<#tag#>";
     } else {
     //there are attributes so the RE should accommodate
     //include a space following the tag name so that searching
     //for 'b' does not find 'b' and 'body', etc
     startTag = "<#tag# [^>]*>";
     }
 
     matchStruct = REFindNoCase(startTag,str,1,"true");
     matchPos = matchStruct.pos [1];
     matchLen = matchStruct.len[1];
     
     if(matchLen eq 0) return returnArray;
     endTagStart = REFindNoCase(endTag,str,matchPos,"false");
     //if no end tag exists return out
     if(endTagStart eq 0) return returnArray;
 
     ArrayAppend(returnArray,Mid(str,matchPos+matchLen,endTagStart-matchPos-matchLen));
 
     while (matchLen neq 0) {
         matchStruct = REFindNoCase(startTag,str,matchPos+matchLen,"true");
         matchPos = matchStruct.pos [1];
         matchLen = matchStruct.len[1];
         if(matchLen eq 0) return returnArray;
         endTagStart = REFindNoCase(endTag,str,matchPos,"false");
         ArrayAppend(returnArray,Mid(str,matchPos+matchLen,endTagStart-matchPos-matchLen));
     }
 
     return returnArray;
 }

---

