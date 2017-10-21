---
layout: udf
title:  Split
date:   2005-02-13T04:18:05.000Z
library: StrLib
argString: "str[, splitstr][, treatsplitstrasstr]"
author: Steven Van Gemert
authorEmail: svg2@placs.net
version: 3
cfVersion: CF5
shortDescription: Splits a string according to another string or multiple delimiters.
description: |
 Splits a string according to another string or multiple delimiters. ColdFusion's native list functions do not allow you to pass a multi-character delimiter. You can use this function to split the string into an array.
 
 Version 2 was written by Raymond Camden (ray@camdenfamily.com).
 
 Split will now correctly return a one item array if the split string is not found. More importantly, the split function now works as the split functions do in other languages - when multiple split strings are found in the original string, then appropriate blank-stringed array elements are made. For example, If you split the string &quot;19991&quot; using the string &quot;9&quot; as the split string, the resulting array will now correctly have 4 elements instead of the previous versions result of 3 elements. This is how the split function behaves in other languages.
 
 Also included is the option to treat the split string as multiple delimiters, as the native ColdFusion list functions do. This might not be necessary for all applications, but I included it to ensure the best functionality. Pass a boolean false as the third parameter to treat the split string as multiple delimiters.
 
 I also changed the split string parameter to be optional, defaulting to a comma.

returnValue: Returns an array.

example: |
 <cfset foo = "99rifle_._2999.00_._199.00_x_ray91">
 <cfoutput>#foo#</cfoutput><hr>
 <cfset x = split(foo,"9")>
 <cfdump var="#x#">
 <hr>
 <cfset x = split(foo,"19","no")>
 <cfdump var="#x#">

args:
 - name: str
   desc: String to split.
   req: true
 - name: splitstr
   desc: String to split on. Defaults to a comma.
   req: false
 - name: treatsplitstrasstr
   desc: If false, splitstr is treated as multiple delimiters, not one string.
   req: false


javaDoc: |
 /**
  * Splits a string according to another string or multiple delimiters.
  * 
  * @param str      String to split. (Required)
  * @param splitstr      String to split on. Defaults to a comma. (Optional)
  * @param treatsplitstrasstr      If false, splitstr is treated as multiple delimiters, not one string. (Optional)
  * @return Returns an array. 
  * @author Steven Van Gemert (svg2@placs.net) 
  * @version 3, February 12, 2005 
  */

code: |
 function split(str) {
     var results = arrayNew(1);
     var splitstr = ",";
     var treatsplitstrasstr = true;
     var special_char_list      = "\,+,*,?,.,[,],^,$,(,),{,},|,-";
     var esc_special_char_list  = "\\,\+,\*,\?,\.,\[,\],\^,\$,\(,\),\{,\},\|,\-";    
     var regex = ",";
     var test = "";
     var pos = 0;
     var oldpos = 1;
 
     if(ArrayLen(arguments) GTE 2){
         splitstr = arguments[2]; //If a split string was passed, then use it.
     }
     
     regex = ReplaceList(splitstr, special_char_list, esc_special_char_list);
     
     if(ArrayLen(arguments) GTE 3 and isboolean(arguments[3])){
         treatsplitstrasstr = arguments[3]; //If a split string method was passed, then use it.
         if(not treatsplitstrasstr){
             pos = len(splitstr) - 1;
             while(pos GTE 1){
                 splitstr = mid(splitstr,1,pos) & "_Separator_" & mid(splitstr,pos+1,len(splitstr) - (pos));
                 pos = pos - 1;
             }
             splitstr = ReplaceList(splitstr, special_char_list, esc_special_char_list);
             splitstr = Replace(splitstr, "_Separator_", "|", "ALL");
             regex = splitstr;
         }
     }
     test = REFind(regex,str,1,1);
     pos = test.pos[1];
 
     if(not pos){
         arrayAppend(results,str);
         return results;
     }
 
     while(pos gt 0) {
         arrayAppend(results,mid(str,oldpos,pos-oldpos));
         oldpos = pos+test.len[1];
         test = REFind(regex,str,oldpos,1);
         pos = test.pos[1];
     }
     //Thanks to Thomas Muck
     if(len(str) gte oldpos) arrayappend(results,right(str,len(str)-oldpos + 1));
 
     if(len(str) lt oldpos) arrayappend(results,"");
 
     return results;
 }

---

