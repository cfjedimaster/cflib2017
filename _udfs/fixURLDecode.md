---
layout: udf
title:  fixURLDecode
date:   2004-09-23T19:35:06.000Z
library: StrLib
argString: "string"
author: Anthony Petruzzi
authorEmail: tonyp@rolist.com
version: 1
cfVersion: CF5
shortDescription: This is a workaround for the URLDecode bug that exists in CF5 and CFMX.
tagBased: false
description: |
 There exists a problem in all versions of ColdFusion when you try to urldecode a string that contain a lone &quot;%&quot; such as &quot;5% credit card&quot;. Usually the &quot;%&quot; will translate to &quot;%25&quot; if URLEncoded. However sometimes when programming you might not scope a variable so that you can get the value from either the URL or a FORM post. The problem is that if you get the variable from a FORM post, the string is not URLEncoded, this is where the bug comes into effect. In CF5 and below the uncoded &quot;%&quot; in the string will be returned as a blank, such as &quot;5 credit card&quot;. However in CFMX this will cause an exception error. This UDF is a workaround for both CF5 and CFMX until a hotfix is available.

returnValue: Returns a string.

example: |
 <cfset variables.string = "5% credit card">
 <cfoutput>#FixURLDecode(variables.string)#</cfoutput>

args:
 - name: string
   desc: String to url decode.
   req: true


javaDoc: |
 /**
  * This is a workaround for the URLDecode bug that exists in CF5 and CFMX.
  * 
  * @param string      String to url decode. (Required)
  * @return Returns a string. 
  * @author Anthony Petruzzi (tonyp@rolist.com) 
  * @version 1, September 23, 2004 
  */

code: |
 function fixURLDecode(string){
     return URLDecode(ReReplaceNoCase(string, "%([^A-F0-9{2}])", "%25\1", "ALL"));
 }

oldId: 1149
---

