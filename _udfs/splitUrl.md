---
layout: udf
title:  splitUrl
date:   2004-01-12T14:39:36.000Z
library: StrLib
argString: "inUrl"
author: Samuel Neff
authorEmail: sam@serndesign.com
version: 1
cfVersion: CF5
shortDescription: Splits a URL into it's URL, QueryString, and Anchor parts.
tagBased: false
description: |
 Use this UDF to safely split out or manipulate one portion of a URL.

returnValue: Returns a struct.

example: |
 <cfset ref = splitUrl("http://www.mysite.com/index.cfm?var=val##anchor")>
 <cfdump var="#ref#">

args:
 - name: inUrl
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * Splits a URL into it's URL, QueryString, and Anchor parts.
  * 
  * @param inUrl      URL to parse. (Required)
  * @return Returns a struct. 
  * @author Samuel Neff (sam@serndesign.com) 
  * @version 1, January 12, 2004 
  */

code: |
 function splitUrl(inUrl) {
     var s = inUrl;
     var refUrl = "";
     var refQS = "";
     var refAnchor = "";
     var st = structNew();
     var i = find("?", s);
     
     if (i) {
         refUrl = left(s, i-1);
         refQS = mid(s, i+1, 99999);
         i = find("##", refQS);
         if (i) {
             refAnchor = mid(refQS, i+1, 99999);
             refQS = left(refQS, i-1);
         } else {
         refAnchor = "";
         }
     } else {    
         i = find("##", s);
         if (i) {
             refUrl = left(s, i-1);
             refAnchor = mid(s, i+1, 99999);
         } else {
             refUrl = s;
         }
     }
     
     st.url = refUrl;
     st.queryString = refQS;
     st.anchor = refAnchor;
     
     return st;
 }

---

