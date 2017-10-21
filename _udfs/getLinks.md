---
layout: udf
title:  getLinks
date:   2011-02-21T13:26:56.000Z
library: StrLib
argString: "BodyText"
author: James Moberg
authorEmail: james@ssmedia.com
version: 1
cfVersion: CF5
shortDescription: Finds all anchor or frame tags and creates a structure that you can use to look up a URL by name.
description: |
 Creates a structure with the following contents:
     link:  An array of all the URL's in the text.
     desc:  An array of all the descriptions in the text.
     index: A structure with the link description as the key, and the corresponding array position as the value.
 You can use the &quot;index&quot; structure to look up the array position of a particular URL.  For example, if you know the text contains a link titled &quot;Next&quot;, you can look up &quot;Next&quot; in the index structure with StructFind(), and use the resulting number to get the corresponding URL from the link array.
 NOTE: If you use this with CFHTTP, you may want to use the RESOLVEURL option.
 ORIGINAL AUTHOR: Joel Mueller - Creative Internet Solutions (v2, 10/23/1998)

returnValue: Returns a structure of matches.

example: |
 <cfsavecontent variable="theHTML">
 <a href="http://www.adobe.com/products/coldfusion/">Adobe ColdFusion</a>
 <a href="http://www.microsoft.com/">Microsoft</a>
 <a href="http://www.google.com/">Google</a>
 </cfsavecontent>
 <CFDUMP VAR="#GetLinks(theHTML)#">

args:
 - name: BodyText
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Finds all anchor or frame tags and creates a structure that you can use to look up a URL by name.
  * 
  * @param BodyText      String to parse. (Required)
  * @return Returns a structure of matches. 
  * @author James Moberg (james@ssmedia.com) 
  * @version 1, February 21, 2011 
  */

code: |
 function getLinks(BodyText){
     var objLinks = StructNew();
     var objIndex = StructNew();
     var arrLink = ArrayNew(1);
     var arrDesc = ArrayNew(1);
     var nextMatch = 1;
     var Counter = 1;
     do { /* find opening anchor tag. */
         objMatch = REFindNoCase("<(A|FRAME)[[:space:]]+[^>]*(HREF|SRC) ?= ?[""']?([^[:space:]""'>]+)(>|(([""']|[[:space:]])[^>]*>))", BodyText, nextMatch, true);
         nextMatch = objMatch.pos[1] + objMatch.len[1];
         if (ArrayLen(objMatch.pos) GTE 4) {
             thisURL = Mid(BodyText, objMatch.pos[4], objMatch.len[4]);
             thisTag = Mid(BodyText, objMatch.pos[2], objMatch.len[2]);
             if (CompareNoCase(thisTag, "A") EQ 0) {
                 descEnd = FindNoCase("</A>", BodyText, nextMatch);
                 thisDesc = Mid(BodyText, nextMatch, descEnd - nextMatch);
                 nextMatch = descEnd + 4;
             } else { /* get the frame name */
                 fullTag = Mid(BodyText, objMatch.pos[1], objMatch.len[1]);
                 frameName = "";
                 objFrame = REFindNoCase("NAME ?= ?[""']?([^[:space:]""'>]+)(>|(([""']|[[:space:]])[^>]*>))", fullTag, 1, true);
                 if (ArrayLen(objFrame.pos) GT 1) {
                     frameName = Mid(fullTag, objFrame.pos[2], objFrame.len[2]);
                 }
                 thisDesc = "FRAME: " & frameName;
             }
             StructInsert(objIndex, thisDesc, Counter, true);
             arrLink[Counter] = thisURL;
             arrDesc[Counter] = thisDesc;
             Counter = Counter + 1;
         }
     } while (nextMatch NEQ 0);
     StructInsert(objLinks, "index", objIndex);
     StructInsert(objLinks, "link", arrLink);
     StructInsert(objLinks, "desc", arrDesc);
     return objLinks;
 }

---

