---
layout: udf
title:  ListFix
date:   2004-07-31T09:57:47.000Z
library: StrLib
argString: "list[, delimiter][, null]"
author: Steven Van Gemert
authorEmail: svg2@placs.net
version: 3
cfVersion: CF5
shortDescription: Fixes a list by replacing null entries.
description: |
 By default, ColdFusion will ignore empty elements in a list. This can be a problem if you want to treat empty elements as null entries. For example, the list &quot;Goo,Foo,,Moo&quot; is considered a 3 item list, since the &quot;,,&quot; entry is ignored. ListFix will take these entries and replace them with a null character of your choosing.
 
 Version 3 now correctly handles multiple delimiters.

returnValue: Returns a list.

example: |
 <cfoutput>
 <cfset l = "raymond,camden,,goober,pile">
 #listFix(l)#<br>
 <cfset l2 = "raymond,camden,,goober,pile,">
 #listFix(l2)#<br>
 <cfset l3 = "@raymond@camden@@goober@pile">
 #listFix(l3,"@","_null_")#<br>
 </cfoutput>

args:
 - name: list
   desc: The list to parse.
   req: true
 - name: delimiter
   desc: The delimiter to use. Defaults to a comma.
   req: false
 - name: null
   desc: Null string to insert. Defaults to "NULL".
   req: false


javaDoc: |
 /**
  * Fixes a list by replacing null entries.
  * This is a modified version of the ListFix UDF 
  * written by Raymond Camden. It is significantly
  * faster when parsing larger strings with nulls.
  * Version 2 was by Patrick McElhaney (pmcelhaney@amcity.com)
  * 
  * @param list      The list to parse. (Required)
  * @param delimiter      The delimiter to use. Defaults to a comma. (Optional)
  * @param null      Null string to insert. Defaults to "NULL". (Optional)
  * @return Returns a list. 
  * @author Steven Van Gemert (svg2@placs.net) 
  * @version 3, July 31, 2004 
  */

code: |
 function listFix(list) {
 var delim = ",";
   var null = "NULL";
   var special_char_list      = "\,+,*,?,.,[,],^,$,(,),{,},|,-";
   var esc_special_char_list  = "\\,\+,\*,\?,\.,\[,\],\^,\$,\(,\),\{,\},\|,\-";
   var i = "";
        
   if(arrayLen(arguments) gt 1) delim = arguments[2];
   if(arrayLen(arguments) gt 2) null = arguments[3];
 
   if(findnocase(left(list, 1),delim)) list = null & list;
   if(findnocase(right(list,1),delim)) list = list & null;
 
   i = len(delim) - 1;
   while(i GTE 1){
     delim = mid(delim,1,i) & "_Separator_" & mid(delim,i+1,len(delim) - (i));
     i = i - 1;
   }
 
   delim = ReplaceList(delim, special_char_list, esc_special_char_list);
   delim = Replace(delim, "_Separator_", "|", "ALL");
 
   list = rereplace(list, "(" & delim & ")(" & delim & ")", "\1" & null & "\2", "ALL");
   list = rereplace(list, "(" & delim & ")(" & delim & ")", "\1" & null & "\2", "ALL");
       
   return list;
 }

---

