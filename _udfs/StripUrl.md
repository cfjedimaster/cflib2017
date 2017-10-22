---
layout: udf
title:  StripUrl
date:   2001-09-06T18:40:45.000Z
library: StrLib
argString: "URL"
author: Steven Ketterman
authorEmail: beans@pghsonicweb.com
version: 1
cfVersion: CF5
shortDescription: The function deletes non-needed characters (ie. http&#58;//)
tagBased: false
description: |
 This Function will strip the following:
 <UL>
 <LI>http://
 <LI>http://www.
 <LI>www.
 </UL>

returnValue: Returns a string.

example: |
 <cfoutput>
 #StripUrl("http://www.btp.pghsonicweb.com/someonehelp.htm")#
 </cfoutput>

args:
 - name: URL
   desc: URL to strip
   req: true


javaDoc: |
 /**
  * The function deletes non-needed characters (ie. http://)
  * 
  * @param URL      URL to strip 
  * @return Returns a string. 
  * @author Steven Ketterman (beans@pghsonicweb.com) 
  * @version 1, September 6, 2001 
  */

code: |
 function StripUrl(UrltoStrip)
 {
   Var oldurl = UrltoStrip;
   
   if(oldurl CONTAINS 'http://www.'){
       oldurl = ReplaceNoCase(oldurl, 'http://www.', '');
   }
   if(oldurl CONTAINS 'http://'){
       oldurl = ReplaceNoCase(oldurl, 'http://', '');
   }
   if(oldurl CONTAINS 'www.'){
       oldurl = ReplaceNoCase(oldurl, 'www.', '');
   }
   
   oldurl = ListFirst(oldurl, '/');
   Return OldUrl;
 }

---

