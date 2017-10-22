---
layout: udf
title:  quotedListToArray
date:   2007-01-03T13:19:52.000Z
library: StrLib
argString: "theList"
author: Anthony Cooper
authorEmail: ant@outsrc.co.uk
version: 1
cfVersion: CF7
shortDescription: Converts elements in a quoted list to an array.
tagBased: false
description: |
 Like the ListToArray function but accepts quoted lists. Useful when reading from Quoted CSVs and the like.

returnValue: Returns an array.

example: |
 <cfset drinks = '"tea","coffee","vimto","bovril"' >
 <cfset aDrinks = QuotedListToArray( drinks ) >

args:
 - name: theList
   desc: The list to parse.
   req: true


javaDoc: |
 /**
  * Converts elements in a quoted list to an array.
  * 
  * @param theList      The list to parse. (Required)
  * @return Returns an array. 
  * @author Anthony Cooper (ant@outsrc.co.uk) 
  * @version 1, January 3, 2007 
  */

code: |
 function quotedListToArray(theList) {
     var items = arrayNew( 1 );
     var i = 1;
     var start = 1;
     var search = structNew();
     var quoteChar = """";
 
     while(start LT len(theList)) {
         search = reFind('(\#quoteChar#.*?\#quoteChar#)|([0-9\.]*)', theList, start, true );
             
         if (arrayLen(search.LEN) gt 1) {
             items[i] = mid(theList, search.POS[1], (search.LEN[1])); //Extract string
             items[i] = reReplace(items[i], '^\#quoteChar#|\#quoteChar#$', "", "All" );     //Remove double quote character
             start = search.POS[1] + search.LEN[1] + 1;
             i = i + 1;
         }
         else {
             start = Len( theList );
         }
     }
         
     return items;    
 }

---

