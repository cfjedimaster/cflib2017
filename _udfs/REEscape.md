---
layout: udf
title:  REEscape
date:   2002-06-26T19:03:05.000Z
library: StrLib
argString: "theString"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Escapes all regular expression &quot;special characters&quot; in a string with &quot;\&quot;.
description: |
 Escapes all regular expression &quot;special characters&quot; in a string with &quot;\&quot;. Useful for dynamic uses of REFind and REReplace.

returnValue: Returns a string.

example: |
 <cfoutput>
 "this and (that)" => #REEscape("this and (that)")#<br>
 "$1 + $2 = $3" => #REEscape("$1 + $2 = $3")#<br>
 "\,+,*,?,.,[,],^,$,(,),{,},|,-" => #REEscape("\,+,*,?,.,[,],^,$,(,),{,},|,-")#<br>
 <br>
 <cfset price = "$3">
 Escaped regular expression search string that works:<br>
 "= #price#" found at character: #REFind("=.*#REEscape(price)#",  "An example of simple financial math: $1 + $2 = $3")#<br>
 <br>
 Unescaped regular expression search string that doesn't work:<br>
 "= #price#" not found (search returns zero): #REFind("=.*#price#",  "An example of simple financial math: $1 + $2 = $3")#
 </cfoutput>

args:
 - name: theString
   desc: The string to format.
   req: true


javaDoc: |
 /**
  * Escapes all regular expression &quot;special characters&quot; in a string with &quot;\&quot;.
  * 
  * @param theString      The string to format. (Required)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function REEscape(theString){
     var special_char_list      = "\,+,*,?,.,[,],^,$,(,),{,},|,-";
     var esc_special_char_list  = "\\,\+,\*,\?,\.,\[,\],\^,\$,\(,\),\{,\},\|,\-";
     return ReplaceList(theString, special_char_list, esc_special_char_list);
 }

---

