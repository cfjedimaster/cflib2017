---
layout: udf
title:  queryStringToStruct
date:   2006-04-11T12:03:54.000Z
library: UtilityLib
argString: "[qs]"
author: Malessa Brisbane
authorEmail: cflib@brisnicki.com
version: 1
cfVersion: CF5
shortDescription: Converts a URL query string to a structure.
description: |
 Converts a URL query string to a structure. Repeated keys have the values appended as a list. Also removes and URL encoding. Based on code from QueryStringDeleteVar.
 
 This UDF is not typically needed since ColdFusion automatically converts the query string into the URL structure, but since you can pass in a custom query string, it could be useful for parsing those strings instead.

returnValue: Returns a struct.

example: |
 <cfdump var="#udf_QueryStringToStruct()#">
 <cfdump var="#udf_QueryStringToStruct('test=123&test=456&x=apple&y=oranges')#">

args:
 - name: qs
   desc: Query string to parse. Defaults to cgi.query_string.
   req: false


javaDoc: |
 /**
  * Converts a URL query string to a structure.
  * 
  * @param qs      Query string to parse. Defaults to cgi.query_string. (Optional)
  * @return Returns a struct. 
  * @author Malessa Brisbane (cflib@brisnicki.com) 
  * @version 1, April 11, 2006 
  */

code: |
 function queryStringToStruct() {
     //var to hold the final structure
     var struct = StructNew();
     //vars for use in the loop, so we don't have to evaluate lists and arrays more than once
     var i = 1;
     var pairi = "";
     var keyi = "";
     var valuei = "";
     var qsarray = "";
     var qs = CGI.QUERY_STRING; // default querystring value
     
     //if there is a second argument, use that as the query string
     if (arrayLen(arguments) GT 0) qs = arguments[1];
 
     //put the query string into an array for easier looping
     qsarray = listToArray(qs, "&");
     //now, loop over the array and build the struct
     for (i = 1; i lte arrayLen(qsarray); i = i + 1){
         pairi = qsarray[i]; // current pair
         keyi = listFirst(pairi,"="); // current key
         valuei = urlDecode(listLast(pairi,"="));// current value
         // check if key already added to struct
         if (structKeyExists(struct,keyi)) struct[keyi] = listAppend(struct[keyi],valuei); // add value to list
         else structInsert(struct,keyi,valuei); // add new key/value pair
     }
     // return the struct
     return struct;
 }

---

