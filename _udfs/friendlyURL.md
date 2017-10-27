---
layout: udf
title:  friendlyURL
date:   2008-11-30T05:06:37.000Z
library: UtilityLib
argString: "title"
author: Nick Maloney
authorEmail: nmaloney@prolucid.com
version: 2
cfVersion: CF6
shortDescription: UDF that returns an SEO friendly string.
tagBased: false
description: |
 This function was developed to create SEO friendly urls from article titles (similar to digg and cnn). It removes all non alpha characters and replaces them with a hyphen. It also removes trailing hyphens, apostrophes, etc.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="myTitle">
 This wouldn't be a very SEO friendly URL, would it?
 </cfsavecontent>
 <cfoutput>
 #friendlyUrl(myTitle)#
 </cfoutput>

args:
 - name: title
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * UDF that returns an SEO friendly string.
  * Fix for - in front by B
  * 
  * @param title      String to modify. (Required)
  * @return Returns a string. 
  * @author Nick Maloney (nmaloney@prolucid.com) 
  * @version 2, November 29, 2008 
  */

code: |
 function friendlyUrl(title) {
     title = replaceNoCase(title,"&amp;","and","all"); //replace &amp;
     title = replaceNoCase(title,"&","and","all"); //replace &
     title = replaceNoCase(title,"'","","all"); //remove apostrophe
     title = reReplaceNoCase(trim(title),"[^a-zA-Z]","-","ALL");
     title = reReplaceNoCase(title,"[\-\-]+","-","all");
     //Remove trailing dashes
     if(right(title,1) eq "-") {
         title = left(title,len(title) - 1);
     }
     if(left(title,1) eq "-") {
         title = right(title,len(title) - 1);
     }    
     return lcase(title);
 }

oldId: 1845
---

