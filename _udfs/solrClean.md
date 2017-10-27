---
layout: udf
title:  solrClean
date:   2012-10-02T23:12:04.000Z
library: UtilityLib
argString: "input"
author: Sami Hoda
authorEmail: sami@bytestopshere.com
version: 2
cfVersion: CF9
shortDescription: Like VerityClean, massages text input to make it Solr compatible.
tagBased: false
description: |
 Like VerityClean, massages text input to make it Solr compatible. NOTE: requires uCaseWordsForSolr UDF.

returnValue: Returns a string.

example: |
 <cfset cleanSolrSearchText = solrClean(userSearchText) />

args:
 - name: input
   desc: String to run against
   req: true


javaDoc: |
 /**
  * Like VerityClean, massages text input to make it Solr compatible.
  * v1.0 by Sami Hoda
  * v2.0 by Daria Norris to deal with wildcard characters used as the first letter of the search
  * v2.1 by Paul Alkema - updated list of characters to escape
  * v2.2 by Adam Cameron - Merge Paul's &amp; Daria's versions of the function, improve some regexes, fix logic error with input argument (was both required and had a default), converted wholly to script
  * 
  * @param input      String to run against (Required)
  * @return Returns a string. 
  * @author Sami Hoda (sami@bytestopshere.com) 
  * @version 2.2, October 2, 2012 
  */

code: |
 string function solrClean(required string input){
     var cleanText = trim(arguments.input);
     // List of bad charecters. "+ - && || ! ( ) { } [ ] ^ " ~ * ? : \" 
     // http://lucene.apache.org/core/3_6_0/queryparsersyntax.html#Escaping Special Characters
     var reBadChars = "\+|-|&&|\|\||!|\(|\)|{|}|\[|\]|\^|\""|\~|\*|\?|\:|\\";
     
     // Replace comma with OR
     cleanText = replace(cleanText, "," , " or " , "all");
 
     // Strip bad characters
     cleanText = reReplace(cleanText, reBadChars, " ", "all");
 
     // Clean up sequences of space characters
     cleanText = reReplace(cleanText, "\s+", " ", "all");
 
     // clean up wildcard characters as first characters
     cleanText = reReplace(cleanText, "(^[\*\?]{1,})", "");
 
     // uCaseWords - and=AND, etc - lcase rest. if keyword is mixed case - solr treats as case-sensitive!
     cleanText = uCaseWordsForSolr(cleanText);
     return trim(cleanText);
 }

oldId: 2122
---

