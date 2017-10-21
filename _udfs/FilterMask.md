---
layout: udf
title:  FilterMask
date:   2004-10-15T16:23:52.000Z
library: StrLib
argString: "string, mask[, filter]"
author: Joshua Olson
authorEmail: joshua@waetech.com
version: 2
cfVersion: CF5
shortDescription: Applies a filter mask to a string.
description: |
 Applies a formatting mask to a string. Valid masks are:
 &lt;UL&gt;&lt;LI&gt;_ character unchanged &lt;/LI&gt;&lt;LI&gt;0 character is unchanged for numerics and forced to zero for all others &lt;/LI&gt;&lt;LI&gt;9 character is unchanged for numerics and forced to empty for all others &lt;/LI&gt;&lt;LI&gt;a character is forced to lower case, all others are left as is &lt;/LI&gt;&lt;LI&gt;A character is forced to upper case, all others are left as is &lt;/LI&gt;&lt;LI&gt;b character is forced to lower case, numerics are forces to empty &lt;/LI&gt;&lt;LI&gt;B character is forced to upper case, numerics are forces to empty &lt;/LI&gt;&lt;LI&gt;\ following character is literal &lt;/LI&gt;&lt;/UL&gt;

returnValue: Returns a string.

example: |
 <CFSET str="706-555-1212ext123">
 <CFSET mask="(___)___-____">
 <CFSET filter="numeric">
 <CFOUTPUT>
 Given str="#str#", mask="#mask#", and filter="#filter#"<BR>
 The FilterMask version is #FilterMask(str, mask, filter)#
 </CFOUTPUT>

args:
 - name: string
   desc: String to be modified.
   req: true
 - name: mask
   desc: See Mask description above.
   req: true
 - name: filter
   desc: Option filter to apply before applying the mask. May be 'alpha', 'numeric', or 'alphanumeric'. Any characters not within the set specified are removed from the input before the mask is applied.
   req: false


javaDoc: |
 /**
  * Applies a filter mask to a string.
  * 
  * @param string      String to be modified. (Required)
  * @param mask      See Mask description above. (Required)
  * @param filter      Option filter to apply before applying the mask. May be 'alpha', 'numeric', or 'alphanumeric'. Any characters not within the set specified are removed from the input before the mask is applied. (Optional)
  * @return Returns a string. 
  * @author Joshua Olson (joshua@waetech.com) 
  * @version 2, October 15, 2004 
  */

code: |
 function FilterMask(value, mask) {
 
  var filter = ",";
  var t_value = "";
  var pos = 1;
  var t_value_len = 0;
  var character = "";
  var literal = 0;
  var char_at_pos = "";
  var argc = ArrayLen(arguments);
  
  if (argc EQ 2) ArrayAppend(arguments,filter);
  filter = arguments[3];
 
   t_value = value;
   value = "";
 
   if (LCase(filter) IS "alphanumeric")
     t_value = REReplace(t_value, "[^[:alnum:]]", "", "ALL");
   else if (LCase(filter) IS "numeric")
     t_value = REReplace(t_value, "[^[:digit:]]", "", "ALL");
   else if (LCase(filter) IS "alpha")
     t_value = REReplace(t_value, "[^[:alpha:]]", "", "ALL");
 
   t_value_len = Len(t_value);
 
   
   for (i=1; i LTE Len(mask); i = i + 1) {
     character = Mid(mask, i, 1);
     if (literal)
     {
       value = value & character;
       literal = "0";
     } else
     {
       if (t_value_len GTE pos)
         char_at_pos = Mid(t_value, pos, 1);
       else
         char_at_pos = "";
       
       pos = pos + 1;
       if (character IS "9") {
         if (IsNumeric(char_at_pos)) value = value & Val(char_at_pos);
       } else
       if (character IS "0") {
         value = value & Val(char_at_pos);
       } else
       if (character IS "_") {
         value = value & char_at_pos;
       } else
       if (character IS "A") {
         value = value & UCase(char_at_pos);
       } else
       if (character IS "a") {
         value = value & LCase(char_at_pos);
       } else
       if (character IS "B") {
         if (NOT IsNumeric(char_at_pos)) value = value & UCase(char_at_pos);
       } else
       if (character IS "b") {
         if (NOT IsNumeric(char_at_pos)) value = value & LCase(char_at_pos);
       } else
       if (character IS "\") {
         literal = 1;
         pos = pos - 1;
       }
       else {
         value = value & character;
         pos = pos - 1;
       }
     }
   }
   
   return value;
 }

---

