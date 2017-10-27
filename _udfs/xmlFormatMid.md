---
layout: udf
title:  xmlFormatMid
date:   2007-05-29T23:05:06.000Z
library: StrLib
argString: "inString, start, count"
author: Adam Mihlfried
authorEmail: adam@emscharts.com
version: 1
cfVersion: CF5
shortDescription: Properly performs substring functionality on XML-Formatted strings.
tagBased: false
description: |
 Combines XmlFormat and Mid, but avoids problem of XMLFormat creating an invalid length string by converting special characters such as ampersands, quotes, and less than/greater than symbols.

returnValue: Returns a string.

example: |
 <CFSET address = xmlFormatMid("5th & Washington's Landing",1,15)>
 
 <CFOUTPUT>#address#</CFOUTPUT>

args:
 - name: inString
   desc: String to parse.
   req: true
 - name: start
   desc: Starting position for substring.
   req: true
 - name: count
   desc: Length of returned string.
   req: true


javaDoc: |
 /**
  * Properly performs substring functionality on XML-Formatted strings.
  * 
  * @param inString      String to parse. (Required)
  * @param start      Starting position for substring. (Required)
  * @param count      Length of returned string. (Required)
  * @return Returns a string. 
  * @author Adam Mihlfried (adam@emscharts.com) 
  * @version 1, May 29, 2007 
  */

code: |
 function xmlFormatMid(inString, start, count) {
    
    var lowStr = "";
    var retStr = "";
    var tmpStr = "";
    var reversed = "";
    var revpos = 0;
    var realpos = 0;
    var realendpos = 0;
    //Convert high ascii characters to their low ascii equivalents
    lowStr = Replace(inString, Chr(8211), Chr(45), "ALL");
    lowStr = Replace(lowStr, Chr(8212), Chr(45), "ALL");
    lowStr = Replace(lowStr, Chr(8216), Chr(39), "ALL");
    lowStr = Replace(lowStr, Chr(8217), Chr(39), "ALL");
    lowStr = Replace(lowStr, Chr(8220), Chr(34), "ALL");
    lowStr = Replace(lowStr, Chr(8221), Chr(34), "ALL");
    retStr = XmlFormat(mid(trim(lowStr), start, count));
    //if string is longer than mid intended then XmlFormat converted/added extra chars.
    if (len(retStr) gt count) {
    //find position of last ampersand if too long
   
    reversed = reverse(retStr);
    revpos = find("&", reversed);
   
    //length of string - reversed position (characters from right) 
    realpos = len(retStr) - revpos + 1;
    
    //new tmpStr is the substring of previous mid from 1 to position BEFORE ampersand
    tmpStr = mid(retStr,1,realpos-1); 
   
     realendpos = find(";",retStr,realpos);
     
    //if length of new string is zero, then string began with & and we should include symbol
     //as long as count under length of special symbol
    if (len(tmpStr) eq 0 and count gt realendpos-realpos) 
     retStr =  mid(retStr,1,count);
     //if tmpStr + symbol length less than count, then we can use
    else if ( len(tmpStr) + (realendpos - realpos + 1) lte count)
       retStr = mid(retStr, 1, count);
    else
     retStr = tmpStr;
    }
    
    return trim(retStr);
 }

oldId: 1592
---

