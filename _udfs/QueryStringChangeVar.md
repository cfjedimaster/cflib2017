---
layout: udf
title:  QueryStringChangeVar
date:   2002-09-05T18:48:17.000Z
library: StrLib
argString: "name, value[, qs]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 2
cfVersion: CF5
shortDescription: Changes a var in a query string.
description: |
 Changes the value of a variable in a query string.  By default it will use cgi.query_string, but you can pass in an optional third argument to act as the query string.
 
 This function is handy when you have, for instance, a table with column headers that allow you to sort by different variables -- in that case you could  preserve the entire query string and replace only the sort variable.

returnValue: Returns a string.

example: |
 <cfset qs = "foo=1&goo=2&name=nathan">
 <cfset newqs = QueryStringChangeVar("name","ray",qs)>
 <cfoutput>New QueryString: #newqs#</cfoutput>

args:
 - name: name
   desc: The name of the name/value pair you want to modify.
   req: true
 - name: value
   desc: The new value for the name/value pair you want to modify.
   req: true
 - name: qs
   desc: Query string to modify. Defaults to CGI.QUERY_STRING.
   req: false


javaDoc: |
 /**
  * Changes a var in a query string.
  * 
  * @param name      The name of the name/value pair you want to modify. (Required)
  * @param value      The new value for the name/value pair you want to modify. (Required)
  * @param qs      Query string to modify. Defaults to CGI.QUERY_STRING. (Optional)
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 2, September 5, 2002 
  */

code: |
 function QueryStringChangeVar(variable,value){
     //var to hold the final string
     var string = "";
     //vars for use in the loop, so we don't have to evaluate lists and arrays more than once
     var ii = 1;
     var thisVar = "";
     var thisIndex = "";
     var array = "";
     var changedIt = 0;
     //if there is a third argument, use that as the query string, otherwise default to cgi.query_string
     var qs = cgi.query_string;
     if(arrayLen(arguments) GT 2)
         qs = arguments[3];
 
     //put the query string into an array for easier looping
     array = listToArray(qs,"&");
     //now, loop over the array and rebuild the string
     for(ii = 1; ii lte arrayLen(array); ii = ii + 1){
         thisIndex = array[ii];
         thisVar = listFirst(thisIndex,"=");
         //if this is the var, edit it to the value, otherwise, just append
         if(thisVar is variable){
             string = listAppend(string,thisVar & "=" & value,"&");
             changedIt = 1;
         }
         else{
             string = listAppend(string,thisIndex,"&");
         }
     }
     //if it was not changed, add it!
     if(NOT changedIt)
         string = listAppend(string,variable & "=" & value,"&");
     //return the string
     return string;
 }

---

