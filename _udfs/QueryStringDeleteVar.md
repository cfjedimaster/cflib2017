---
layout: udf
title:  QueryStringDeleteVar
date:   2002-02-24T23:59:54.000Z
library: StrLib
argString: "variable[, qs]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Deletes a var from a query string.
description: |
 Delete a variable (or a set of variables) and its value from a query string.  By default, it uses the cgi.query_string, but you can pass in an optional second argument to replace the query string.
 
 This function is handy when you need to preserve an entire query string, but you want to kill off one of the variables.  For example, if you have a button that appends &quot;logout=yes&quot; to the existing URL and you want to preserve that URL but no longer have the logout variable.

returnValue: Returns a string.

example: |
 <cfset qs = "arg1=1&arg2=2&arg3=3&arg4=4">
 <cfoutput>
 #queryStringDeleteVar("arg1",qs)#<br>
 #queryStringDeleteVar("arg1,arg4",qs)#<br>
 </cfoutput>

args:
 - name: variable
   desc: A variable, or a list of variables, to delete from the query string.
   req: true
 - name: qs
   desc: Query string to modify. Defaults to CGI.QUERY_STRING.
   req: false


javaDoc: |
 /**
  * Deletes a var from a query string.
  * Idea for multiple args from Michael Stephenson (michael.stephenson@adtran.com)
  * 
  * @param variable      A variable, or a list of variables, to delete from the query string. 
  * @param qs      Query string to modify. Defaults to CGI.QUERY_STRING. 
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1.1, February 24, 2002 
  */

code: |
 function queryStringDeleteVar(variable){
     //var to hold the final string
     var string = "";
     //vars for use in the loop, so we don't have to evaluate lists and arrays more than once
     var ii = 1;
     var thisVar = "";
     var thisIndex = "";
     var array = "";
     //if there is a second argument, use that as the query string, otherwise default to cgi.query_string
     var qs = cgi.query_string;
     if(arrayLen(arguments) GT 1)
         qs = arguments[2];
     //put the query string into an array for easier looping
     array = listToArray(qs,"&");        
     //now, loop over the array and rebuild the string
     for(ii = 1; ii lte arrayLen(array); ii = ii + 1){
         thisIndex = array[ii];
         thisVar = listFirst(thisIndex,"=");
         //if this is the var, edit it to the value, otherwise, just append
         if(not listFind(variable,thisVar))
             string = listAppend(string,thisIndex,"&");
     }
     //return the string
     return string;
 }

---

