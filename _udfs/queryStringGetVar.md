---
layout: udf
title:  queryStringGetVar
date:   2005-08-02T03:22:44.000Z
library: StrLib
argString: "query_string, this_var_name"
author: Shawn Seley
authorEmail: shawnse@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Gets the value of a variable in a query string.
tagBased: false
description: |
 Gets the value of a variable in a query string. Useful for parsing variables from URLs outside of the current &quot;url.&quot; scope. Note: &quot;query string&quot; is also referred to as &quot;search part&quot; within cflib.org's library.

returnValue: Returns a string.

example: |
 <cfoutput>
 queryStringGetVar("?x=123", "x"):<br>
 #queryStringGetVar("?x=123", "x")#<br>
 <br>
 queryStringGetVar("x=1&y=2&z=3", "y"):<br>
 #queryStringGetVar("x=1&y=2&z=3", "y")#<br>
 <br>
 queryStringGetVar("http://www.cflib.org/search.cfm?searchterms=%25&sort=lastupdated&sortorder=desc", "sortorder"):<br>
 #queryStringGetVar("http://www.cflib.org/search.cfm?searchterms=%25&sort=lastupdated&sortorder=desc", "sortorder")#<br>
 </cfoutput>

args:
 - name: query_string
   desc: The query string to examine.
   req: true
 - name: this_var_name
   desc: The variable to look for.
   req: true


javaDoc: |
 /**
  * Gets the value of a variable in a query string.
  * 
  * @param query_string      The query string to examine. (Required)
  * @param this_var_name      The variable to look for. (Required)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@hotmail.com) 
  * @version 1, August 1, 2005 
  */

code: |
 function queryStringGetVar(querystring, this_var_name){
     var re_found_struct = "";
     querystring = trim(querystring);
     
     re_found_struct = REFindNoCase("(^|[\?|&])#this_var_name#=([^\&]*)", querystring, 1, "true");
     // = re_found_struct.len & re_found_struct.pos
     
     if(arrayLen(re_found_struct.pos) gte 3) {
         if (re_found_struct.pos[3] GT 0) return urlDecode(mid(querystring, re_found_struct.pos[3], re_found_struct.len[3]));
         else return "";
     } else return "";
 }

oldId: 1255
---

