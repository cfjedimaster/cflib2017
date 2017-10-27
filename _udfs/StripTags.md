---
layout: udf
title:  StripTags
date:   2004-09-22T10:17:43.000Z
library: StrLib
argString: "stripmode, mytags, mystring[, findonly]"
author: Isaac Dealey
authorEmail: info@turnkey.to
version: 2
cfVersion: CF5
shortDescription: Strip xml-like tags from a string when they are within or not within a list of tags.
tagBased: false
description: |
 Enter a mode, list of tags and a string to either strip all tags in or not in the list from the string, or return the first substring matching or not matching an item in the list.

returnValue: Returns either a string or the first instance of a match.

example: |
 <cfset mymodes = ListToArray("allow,disallow")>
 <cfset mytags = ListToArray("a,div,span,br,table|cf*|%*","|")>
 <cfset far = structnew()>
 <cfset far["true"] = "find only">
 <cfset far["false"] = "find and replace">
 <cfoutput>
 <cfsavecontent variable="variables.teststring">
 This is a string containing a <a href="http://www.macromedia.com" target="_blank">link</a>
 and some <div>other</div> miscellaneous <table>tags</table><span>whether</span>
 <br /> you like them or #chr(asc("<"))#cfabort> not. <#chr(asc("%"))#=with some asp stuff %>
 </cfsavecontent><p>#htmleditformat(variables.teststring)#</p>
 
 <cfloop index="y" from="1" to="#arraylen(mytags)#">
     <cfloop index="x" from="1" to="#arraylen(mymodes)#">
         <cfloop index="z" list="true,false">
             <p><b>#mymodes[x]# #mytags[y]# #far[z]#</b><br />
             #htmleditformat(stripTags(mymodes[x],mytags[y],variables.teststring,z))#</p>
         </cfloop>
     </cfloop>
 </cfloop>
 
 </cfoutput>

args:
 - name: stripmode
   desc: A string, disallow or allow. Specifies if the list of tags in the mytags attribute is a list of tags to allow or disallow.
   req: true
 - name: mytags
   desc: List of tags to either allow or disallow.
   req: true
 - name: mystring
   desc: The string to check.
   req: true
 - name: findonly
   desc: Boolean value. If true, returns the first match. If false, all instances are replaced.
   req: false


javaDoc: |
 /**
  * Strip xml-like tags from a string when they are within or not within a list of tags.
  * 
  * @param stripmode      A string, disallow or allow. Specifies if the list of tags in the mytags attribute is a list of tags to allow or disallow. (Required)
  * @param mytags      List of tags to either allow or disallow. (Required)
  * @param mystring      The string to check. (Required)
  * @param findonly      Boolean value. If true, returns the first match. If false, all instances are replaced. (Optional)
  * @return Returns either a string or the first instance of a match. 
  * @author Isaac Dealey (info@turnkey.to) 
  * @version 2, September 22, 2004 
  */

code: |
 function stripTags(stripmode,mytags,mystring) {
     var spanquotes = "([^"">]*""[^""]*"")*";
     var spanstart = "[[:space:]]*/?[[:space:]]*";
     var endstring = "[^>$]*?(>|$)";
     var x = 1;
     var currenttag = structNew();
     var subex = "";
     var findonly = false;
     var cfversion = iif(structKeyExists(GetFunctionList(),"getPageContext"), 6, 5);
     var backref = "\\1"; // this backreference works in cf 5 but not cf mx
     var rexlimit = len(mystring);
 
     if (arraylen(arguments) gt 3) { findonly = arguments[4]; }
     if (cfversion gt 5) { backref = "\#backref#"; } // fix backreference for mx and later cf versions
     else { rexlimit = 19000; } // limit regular expression searches to 19000 characters to support CF 5 regex character limit
 
     if (len(trim(mystring))) {
         // initialize defaults for examining this string
         currenttag.pos = ListToArray("0");
         currenttag.len = ListToArray("0");
 
         mytags = ArrayToList(ListToArray(mytags)); // remove any empty items in the list
         if (len(trim(mytags))) {
             // turn the comma delimited list of tags with * as a wildcard into a regular expression
             mytags = REReplace(mytags,"[[:space:]]","","ALL");
             mytags = REReplace(mytags,"([[:punct:]])",backref,"ALL");
             mytags = Replace(mytags,"\*","[^$>[:space:]]*","ALL");
             mytags = Replace(mytags,"\,","[$>[:space:]]|","ALL");
             mytags = "#mytags#[$>[:space:]]";
         } else { mytags = "$"; } // set the tag list to end of string to evaluate the "allow nothing" condition
 
         // loop over the string
         for (x = 1; x gt 0 and x lt len(mystring); x = x + currenttag.pos[1] + currenttag.len[1] -1)
         { 
             // find the next tag within rexlimit characters of the starting point
             currenttag = REFind("<#spanquotes##endstring#",mid(mystring,x,rexlimit),1,true); 
             if (currenttag.pos[1])
             { 
                 // if a tag was found, compare it to the regular expression
                 subex = mid(mystring,x + currenttag.pos[1] -1,currenttag.len[1]); 
                 if (stripmode is "allow" XOR REFindNoCase("^<#spanstart#(#mytags#)",subex,1,false) eq 1)
                 {
                     if (findonly) { return subex; } // return invalid tag as an error message
                     else { // remove the invalid tag from the string
                         myString = RemoveChars(myString,x + currenttag.pos[1] -1,currenttag.len[1]);
                         currenttag.len[1] = 0; // set the length of the tag string found to zero because it was removed
                     }
                 }
             }
             // no tag was found within rexlimit characters
             // move to the next block of rexlimit characters -- CF 5 regex limitation
             else { currenttag.pos[1] = rexlimit; }
         }
     }
     if (findonly) { return ""; } // return an empty string indicating no invalid tags found
     else { return mystring; } // return the new string discluding any invalid tags
 }

oldId: 774
---

