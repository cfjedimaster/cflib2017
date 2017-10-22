---
layout: udf
title:  ListFindReplace
date:   2005-08-04T21:23:48.000Z
library: StrLib
argString: "string, listToMatch, listToReplace[, delim]"
author: BenJamin Prater
authorEmail: bprater@bluefoxlabs.com
version: 1
cfVersion: CF5
shortDescription: Finds a value in one list and returns the matching string at the same index in another list.
tagBased: false
description: |
 Finds a value in one list and returns the matching string at the same index in another list. Useful when a database stores values in a different way than you want to display and you don't want a series of cfcase statements for the display values.

returnValue: Returns a string.

example: |
 <cfset database_return_value = "inactive">
 <cfoutput>
 #listFindReplace(database_return_value, "active,inactive,deleted", "Account Active,Account Inactive,Account Closed")#
 </cfoutput>

args:
 - name: string
   desc: List to parse.
   req: true
 - name: listToMatch
   desc: List of terms to match.
   req: true
 - name: listToReplace
   desc: Matching list of words to use as replacements.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Finds a value in one list and returns the matching string at the same index in another list.
  * 
  * @param string      List to parse. (Required)
  * @param listToMatch      List of terms to match. (Required)
  * @param listToReplace      Matching list of words to use as replacements. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author BenJamin Prater (bprater@bluefoxlabs.com) 
  * @version 1, August 4, 2005 
  */

code: |
 function listFindReplace(string, listToMatch, listToReplace) {
     var index = "";
     var delim = ",";
     
     if(arrayLen(arguments) gte 4) delim = arguments[4];
     
     index = listFind(listToMatch, string, delim);
     
     if(index neq 0) return listGetAt(listToReplace, index, delim);
     else return string;
 }

---

