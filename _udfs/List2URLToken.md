---
layout: udf
title:  List2URLToken
date:   2004-09-20T12:19:25.000Z
library: StrLib
argString: "fields[, excluded][, delim]"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: Converts a list into a QueryString. Allows an &quot;Exclude List&quot; as well.
description: |
 List2URLToken creates a QueryString from a specified list. Each item in the list should be the name of an existing variable. The optional parameter EXCLUDE allows you to pass another list of values you do not want included in the QueryString. Accepts optinal delimiter as well. I use this for transforming form.fieldnames into a QueryString to pass to a NEXT-N tag, however this can be used with ANY list instead of only form fields.

returnValue: Returns a string.

example: |
 <cfscript>
 fname="Mr. William";
 minit="S";
 lname="Burroughs";
 go="GO";
 fieldlist="fname,minit,lname,go";
 excludelist="go";
 </cfscript>
 <cfoutput>#list2UrlToken(fieldlist,excludelist)#</cfoutput>

args:
 - name: fields
   desc: List of variables to loop over.
   req: true
 - name: excluded
   desc: Variables to ignore.
   req: false
 - name: delim
   desc: Delimiter to use. Default is the comma.
   req: false


javaDoc: |
 /**
  * Converts a list into a QueryString. Allows an &quot;Exclude List&quot; as well.
  * 
  * @param fields      List of variables to loop over. (Required)
  * @param excluded      Variables to ignore. (Optional)
  * @param delim      Delimiter to use. Default is the comma. (Optional)
  * @return Returns a string. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, September 20, 2004 
  */

code: |
 function List2UrlToken(fields){
     // Set Local Variables
     var token="";
     var excluded="";
     var delim=",";
     var i = 1;
     var tmpObj = "";
     
     if(arrayLen(arguments) gte 2) excluded = arguments[2];
     if(arrayLen(arguments) gte 3) delim = arguments[3];
     
     // Begin Processing
     for(i=1;i LTE listlen(fields,delim);i=i+1){
         if(not ListFind(excluded,listgetat(fields,i,delim))){
             tmpObj=listgetat(fields,i,delim);
             if(len(token)) token="#token#&#tmpObj#=#urlEncodedFormat(evaluate(tmpObj))#"; 
             else token="#tmpObj#=#URLEncodedFormat(evaluate(tmpObj))#"; 
         }
     }
     return token;
 }

---

