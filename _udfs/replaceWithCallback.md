---
layout: udf
title:  replaceWithCallback
date:   2013-07-18T14:19:28.000Z
library: CFMLLib
argString: "string, regex, callback[, scope][, caseSensitive]"
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF9
shortDescription: Analogous to reReplace()/reReplaceNoCase(), except the replacement is the result of a callback, not a hard-coded string
tagBased: false
description: |
 Analogous to reReplace()/reReplaceNoCase(), except the replacement is the result of a callback, not a hard-coded string

returnValue: A string with substitutions made

example: |
 function reverseEm(required string match, required struct found, required numeric offset, required string string){
     return reverse(match);
 }
 
 input = "abCDefGHij";
 result = replaceWithCallback(input, "[a-z]{2}", reverseEm, "ALL", true);
 writeOutput(input & "<br>" & result & "<br><hr>")

args:
 - name: string
   desc: The string to process
   req: true
 - name: regex
   desc: The regular expression to match
   req: true
 - name: callback
   desc: A UDF which takes arguments match (substring matched), found (a struct of keys pos,len,substring, which is subexpression breakdown of the match), offset (where in the string the match was found), string (the string the match was found within)
   req: true
 - name: scope
   desc: Number of replacements to make&#58; either ONE or ALL
   req: false
 - name: caseSensitive
   desc: Whether the regex is handled case-sensitively
   req: false


javaDoc: |
 /**
  * Analogous to reReplace()/reReplaceNoCase(), except the replacement is the result of a callback, not a hard-coded string
  * v1.0 by Adam Cameron
  * 
  * @param string      The string to process (Required)
  * @param regex      The regular expression to match (Required)
  * @param callback      A UDF which takes arguments match (substring matched), found (a struct of keys pos,len,substring, which is subexpression breakdown of the match), offset (where in the string the match was found), string (the string the match was found within) (Required)
  * @param scope      Number of replacements to make: either ONE or ALL (Optional)
  * @param caseSensitive      Whether the regex is handled case-sensitively (Optional)
  * @return A string with substitutions made 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.0, July 18, 2013 
  */

code: |
 string function replaceWithCallback(required string string, required string regex, required any callback, string scope="ONE", boolean caseSensitive=true){
     if (!isCustomFunction(callback)){ // for CF10 we could specify a type of "function", but not in CF9
         throw(type="Application", message="Invalid callback argument value", detail="The callback argument of the replaceWithCallback() function must itself be a function reference.");
     }
     if (!isValid("regex", scope, "(?i)ONE|ALL")){
         throw(type="Application", message="The scope argument of the replaceWithCallback() function has an invalid value #scope#.", detail="Allowed values are ONE, ALL.");
     }
     var startAt    = 1;
 
     while (true){    // there's multiple exit conditions in multiple places in the loop, so deal with exit conditions when appropriate rather than here
         if (caseSensitive){
             var found = reFind(regex, string, startAt, true);
         }else{
             var found = reFindNoCase(regex, string, startAt, true);
         }
         if (!found.pos[1]){ // ie: it didn't find anything
             break;
         }
         found.substring=[];    // as well as the usual pos and len that CF gives us, we're gonna pass the actual substrings too
         for (var i=1; i <= arrayLen(found.pos); i++){
             found.substring[i] = mid(string, found.pos[i], found.len[i]);
         }
         var match = mid(string, found.pos[1], found.len[1]);
         var offset = found.pos[1];
 
         var replacement = callback(match, found, offset, string);
 
         string = removeChars(string, found.pos[1], found.len[1]);
         string = insert(replacement, string, found.pos[1]-1);
 
         if (scope=="ONE"){
             break;
         }
         startAt = found.pos[1] + len(replacement);
     }
     return string;
 }

oldId: 2260
---

