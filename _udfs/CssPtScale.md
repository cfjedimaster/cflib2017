---
layout: udf
title:  CssPtScale
date:   2002-12-23T21:04:58.000Z
library: UtilityLib
argString: "size"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: CssPtScale increases the point size of text by one point for browsers other than Microsoft Internet Explorer.
description: |
 CssPtScale increases the point size of text by one point for browsers other than Microsoft Internet Explorer. Other browsers seem to render points at a smaller scale than IE, so to keep consistancy when using points, use this function to auto-size your text accordingly.

returnValue: Returns a number along with the string

example: |
 <cfoutput>#cssPtScale(10)#</cfoutput>

args:
 - name: size
   desc: Size to use.
   req: true


javaDoc: |
 /**
  * CssPtScale increases the point size of text by one point for browsers other than Microsoft Internet Explorer.
  * 
  * @param size      Size to use. (Required)
  * @return Returns a number along with the string 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, December 23, 2002 
  */

code: |
 function CssPtScale(size){
     if (http_user_agent DOES NOT CONTAIN "MSIE") return "#val(size+1)#pt";
     else return "#size#pt";
 }

---

