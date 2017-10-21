---
layout: udf
title:  GetContainer
date:   2002-10-02T16:35:00.000Z
library: StrLib
argString: ""
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 0
cfVersion: CF5
shortDescription: Gets the next text container (placeholder, tag, etc.) from a string as designated by starting and ending identifiers.
description: |
 Gets the next text container from a string as designated by starting and ending identifiers. Optionally can search from a specified startIndex. Returns a structure with start, end, len, and str values for both the whole container and for the container's contents (see the cfdumps below for examples). Containers can be HTML tags, tag pairs, placeholders, etc. Useful for any process involving parsing text documents one &quot;container&quot; at a time. Container identifiers are case-insensitive. (Note: the UDFs GetContainer and ReplaceAtNoCase make a very useful pair when parsing templates.)

returnValue: Returns a structure.

example: |
 <cfset string1 = "This is a {!--test--} of GetContainer. This is only a {!--test--}.">
 <cfset string2 = "This is a <b>test</b> of GetContainer. This is only a <b>test</b>.">
 <cfset string3 = "This is a %test% of GetContainer. This is only a %test%.">
 
 <cfoutput>
     GetContainer("#string1#", "{!--", "--}"):<br>
     <br>
     <cfdump var="#GetContainer(string1, "{!--", "--}")#">
     <br>
     <br>
     <br>
     GetContainer("This is a <b>test</b> of GetContainer. This is only a <b>test</b>.", "<b>", "</b>"):<br>
     <br>
     <cfdump var="#GetContainer(string2, "<b>", "</b>")#">
     <br>
     <br>
     <br>
     GetContainer("#string3#", "%", "%", 1):<br>
     <br>
     <cfdump var="#GetContainer(string3, "%", "%", 1)#">
     <br>
     <br>
     <br>
     GetContainer("#string3#", "%", "%", 17):<br>
     <br>
     <cfdump var="#GetContainer(string3, "%", "%", 17)#">
 </cfoutput>

args:


javaDoc: |
 /**
  * Gets the next text container (placeholder, tag, etc.) from a string as designated by starting and ending identifiers.
  * 
  * @return Returns a structure. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 0, October 2, 2002 
  */

code: |
 function GetContainer(theString, startIdentifier, endIdentifier){
     // some code based on Joshua Miller's RePlaceHolders()
     var startIdentifier_len  = Len(startIdentifier);
     var endIdentifier_len    = Len(endIdentifier);
     var container            = StructNew();
 
     var startIndex = 1;
     if(ArrayLen(Arguments) GTE 4) startIndex = Arguments[4];
 
     container.start      = 0;
     container.end        = 0;
     container.len        = 0;
     container.str        = 0;
 
     container.contents         = StructNew();
     container.contents.start   = 0;
     container.contents.end     = 0;
     container.contents.len     = 0;
     container.contents.str     = 0;
 
     container.start = FindNoCase(startIdentifier, theString, startIndex);
     if (container.start GT 0) {
         container.end      = FindNoCase(endIdentifier, theString, container.start+startIdentifier_len) + endIdentifier_len -1;
         container.len      = container.end - container.start +1;
         container.str      = Mid(theString, container.start, container.len);
 
         container.contents.start   = container.start + startIdentifier_len;
         container.contents.end     = container.end - endIdentifier_len;
         container.contents.len     = container.contents.end - container.contents.start +1;
         container.contents.str     = Mid(theString, container.contents.start, container.contents.len);
     }
 
     return container;
 }

---

