---
layout: udf
title:  ParseURLData
date:   2005-07-14T12:33:14.000Z
library: StrLib
argString: "[listType][, strParamDelimiter]"
author: Zac Belado
authorEmail: zac@bayleaf.com
version: 1
cfVersion: CF5
shortDescription: An alternative way to retreive data from a URL.
description: |
 The purpose of the parseURLData UDF is to give web developers an alternate way of encoding and retrieving data from URLs. Typically parameters data is sent via a URL using name/value pairs prefaced with a questions mark and separated by ampersands. 
 
 http://www.test.org/somepage.cfm?id=100&amp;type=column
 
 There is nothing wrong with this format but many search engines will not search and store &quot;dynamic&quot; pages with parameter data in the URLs. Clients quite often require that there sites are search engine friendly so you need some way to encode URLs so that they will not get excluded by search engines that do follow this practice.
 
 The parseURLData UDF allows you to create URLs that do not use the question mark and ampersand to delimit data but still store and retrieve data from your URLS. Instead of  using URLs with the older format
 
 http://www.test.org/somepage.cfm?id=100&amp;type=column
 
 you can now delineate name/value pairs using a forward slash
 
 http://www.test.org/somepage.cfm/id/100/type/column
 
 You can also store and read the name/value pairs in a &quot;staggered&quot; format
 
 http://www.test.org/somepage.cfm/id/type/100/column

returnValue: Returns either a struct of data or an error string.

example: |
 <cfset paramData = parseURLData("linear","+")>

args:
 - name: listType
   desc: Defines how the URL vars are encoded. Values are either "linear" (index.cfm/foo/1/goo/2) or "staggered" (foo/goo/1/2). Default is linear.
   req: false
 - name: strParamDelimiter
   desc: What character is used to split values.
   req: false


javaDoc: |
 /**
  * An alternative way to retreive data from a URL.
  * 
  * @param listType      Defines how the URL vars are encoded. Values are either "linear" (index.cfm/foo/1/goo/2) or "staggered" (foo/goo/1/2). Default is linear. (Optional)
  * @param strParamDelimiter      What character is used to split values. (Optional)
  * @return Returns either a struct of data or an error string. 
  * @author Zac Belado (zac@bayleaf.com) 
  * @version 1, July 14, 2005 
  */

code: |
 function parseURLData() {
         
         var strListType = "";
         var strParamDelimiter = "";
         var strPathInfo = "";
         var thisLen  = 0;
         var URLLen = 0;
         var URLData = "";
         var evenNumberOfParams = true;
         var containsDelim = 0;
         var paramList = "";
         var paramStruct = structNew();
         var offset = 0;
 
         // get the listType if one was provided
         if (arrayLen(arguments) eq 1) {
         
             strListType = arguments[1];
 
         } else If(arrayLen(arguments) eq 2) {
         
             strListType = arguments[1];
             strParamDelimiter = arguments[2];
             
         }
         
         // see if we can user the listType arg
         if (trim(strListType) neq "" AND NOT isNumeric(strListType) ) {
             strListType = strListType;
         } else {
             strListType = "linear";
         }
         
         // see if we can user the listType arg
         if (trim(strParamDelimiter) neq "" AND NOT isNumeric(strParamDelimiter) ) {
             if (len(strParamDelimiter) eq 1) {
                 strParamDelimiter = strParamDelimiter;
             } else {
                 strParamDelimiter = "/";
             }
         } else {
             strParamDelimiter = "/";
         }
         
         // default back to "linear" if the list type isn't staggered or linear
         if (strListType neq "linear" AND strListType neq "staggered") {
             strListType = "linear";
         }
 
         // get the path info from either path_info or request_uri
         if (isDefined("CGI.path_info")) {
             strPathInfo = CGI.path_info;
         } else {
             strPathInfo = CGI.request_uri;
         }
 
         thisLen = len(CGI.script_name);
         URLLen =  len(strPathInfo);
         
         if (URLLen eq 0) return paramStruct;
 
         //URLData = right(strPathInfo, URLLen - thisLen - 1);
         urlData = strPathInfo;
         // make sure there is the required data
         containsDelim = Find(strParamDelimiter, URLData);
         
         if (containsDelim) {
         
             // it does so make a list and read them in
             paramList = listChangeDelims(URLData, ",", strParamDelimiter);
             paramLimit = listLen(paramList);
             
             // trim the list if its got an odd number of items
             if ( NOT (int(paramLimit/2) eq (paramLimit/2))) {
                 evenNumberOfParams = false;
             }
 
             if (strListType eq "linear") {
                 
                 // check to make sure that there are an even number of params
                 if (NOT evenNumberOfParams) {
                     // cut the last entry off as this list has an odd number of elements
                     paramList = listDeleteAt(paramList, paramLimit);
                     paramLimit = paramLimit - 1;
                 }
                 
                 // param and param data are in pairs
                 for ( i = 1; i lte paramLimit; i = i + 2) {
                     structInsert (paramStruct, listGetAt(paramList, i), listGetAt(paramList, i+1));
                 }
                 
             } else {
                 
                 // staggered which means the params are listed then the param data
                 offset = paramLimit / 2;
 
                 // check to make sure that there are an even number of params
                 if (NOT evenNumberOfParams) {
                    offset = fix(paramLimit / 2);
                    paramList = listDeleteAt(paramList, offset + 1);
                 }
 
                  for ( i = 1; i lte offset; i = i + 1) {
                     structInsert (paramStruct, listGetAt(paramList, i), listGetAt(paramList, i + offset));
                 }
                 
             }
             
             // return a copy of the struct and clear the local version
             return structCopy(paramStruct);
             
         } 
     }

---

