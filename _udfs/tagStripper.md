---
layout: udf
title:  tagStripper
date:   2008-07-02T20:18:58.000Z
library: StrLib
argString: "str[, action][, tagList]"
author: Rick Root
authorEmail: rick@webworksllc.com
version: 2
cfVersion: CF5
shortDescription: Function to strip HTML tags, with options to preserve certain tags.
description: |
 tagStripper is an extension of your standard regex to strip HTML tags, but allows you to either strip all tags and optionally preserve certain tags, or strip only certain html tags.  This can come in handy for stripping &quot;dangerous&quot; HTML code from user published HTML content.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="myString">
 <p>This is a <b>test</b></p>
 <p><a href="http://www.cflib.org">CFLib</a> rocks.</p>
 </cfsavecontent>
 <!--- example to strip all tags except P and B --->
 <cfoutput>#tagStripper(myString,'strip','p,b')#</cfoutput>

args:
 - name: str
   desc: String to manipulate.
   req: true
 - name: action
   desc: Strip or preserve. Default is strip.
   req: false
 - name: tagList
   desc: Tags to strip or perserve.
   req: false


javaDoc: |
 /**
  * Function to strip HTML tags, with options to preserve certain tags.
  * v2 by Ray Camden, fix to closing tag
  * 
  * @param str      String to manipulate. (Required)
  * @param action      Strip or preserve. Default is strip. (Optional)
  * @param tagList      Tags to strip or perserve. (Optional)
  * @return Returns a string. 
  * @author Rick Root (rick@webworksllc.com) 
  * @version 2, July 2, 2008 
  */

code: |
 function tagStripper(str) {
     var i = 1;
     var action = 'strip';
     var tagList = '';
     var tag = '';
     
     if (ArrayLen(arguments) gt 1 and lcase(arguments[2]) eq 'preserve') {
         action = 'preserve';
     }
     if (ArrayLen(arguments) gt 2) tagList = arguments[3];
 
     if (trim(lcase(action)) eq "preserve") {
         // strip only those tags in the tagList argument
         for (i=1;i lte listlen(tagList); i = i + 1) {
             tag = listGetAt(tagList,i);
             str = REReplaceNoCase(str,"</?#tag#.*?>","","ALL");
         }
     } else {
         // strip all, except those in the tagList argument
         // if there are exclusions, mark them with NOSTRIP
         if (tagList neq "") {
             for (i=1;i lte listlen(tagList); i = i + 1) {
                 tag = listGetAt(tagList,i);
                 str = REReplaceNoCase(str,"<(/?#tag#.*?)>","___TEMP___NOSTRIP___\1___TEMP___ENDNOSTRIP___","ALL");
             }
         }
         // strip all remaining tsgs.  This does NOT strip comments
         str = reReplaceNoCase(str,"</{0,1}[A-Z].*?>","","ALL");
         // convert unstripped back to normal
         str = replace(str,"___TEMP___NOSTRIP___","<","ALL");
         str = replace(str,"___TEMP___ENDNOSTRIP___",">","ALL");
     }
     
     return str;    
 }

---

