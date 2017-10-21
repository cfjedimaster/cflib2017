---
layout: udf
title:  REListFindNoCaseMultiple
date:   2004-10-19T12:51:56.000Z
library: StrLib
argString: "reg_expr, tlist[, delims]"
author: Robert Munn
authorEmail: robert.munn@alumni.tufts.edu
version: 1
cfVersion: CF5
shortDescription: When given a list of values, returns a list of element locations that match a given regular expression.
description: |
 The function takes a given regular expression and evaluates each element of a given list of values against the regular expression. The match is case-insensitive. If the regular expression matches an element in the list, the list location of that element is added to a list of matched locations. The function returns the list of matched locations.

returnValue: Returns a list of matches.

example: |
 <cfset mylist = "Rob Munn|Robert Munn|RDM|Fred|Gregg|Rob">
 <cfset myReturn = REListFindNoCaseMultiple("Rob[^\|]*",mylist,"|")>
 
 <cfoutput>#myReturn#</cfoutput>

args:
 - name: reg_expr
   desc: The regular expression for the search.
   req: true
 - name: tlist
   desc: The list.
   req: true
 - name: delims
   desc: List delimeter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * When given a list of values, returns a list of element locations that match a given regular expression.
  * 
  * @param reg_expr      The regular expression for the search. (Required)
  * @param tlist      The list. (Required)
  * @param delims      List delimeter. Defaults to a comma. (Optional)
  * @return Returns a list of matches. 
  * @author Robert Munn (robert.munn@alumni.tufts.edu) 
  * @version 1, October 19, 2004 
  */

code: |
 function REListFindNoCaseMultiple(reg_expr,tlist){
      var results="";
     var expr_location = 0;
     var i = 1;
     var delims = ",";
     
     if(arrayLen(arguments) gt 2) delims = arguments[3];
     
     for(; i lte listlen(tlist,delims); i=i+1){
         expr_location = REFindNoCase(reg_expr,listgetat(tlist,i,delims));
         if(expr_location gt 0) results=listappend(results,i);
     }            
     return results;
 }

---

