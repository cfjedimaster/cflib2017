---
layout: udf
title:  UCaseAll
date:   2002-05-14T16:51:03.000Z
library: StrLib
argString: "str"
author: Ivan Rodriguez
authorEmail: ivan.rodriguez@de-net.net
version: 1
cfVersion: CF5
shortDescription: Returns a string with all words capitalized with special non english characters.
description: |
 It replaces all the ocurrencies in a string of French and Spanish letters and accents, with its equivalents capitalized.

returnValue: Returns a string.

example: |
 <cfoutput>
 #UCaseAll("�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�")#
 </cfoutput>

args:
 - name: str
   desc: The string to format.
   req: true


javaDoc: |
 /**
  * Returns a string with all words capitalized with special non english characters.
  * 
  * @param str      The string to format. (Required)
  * @return Returns a string. 
  * @author Ivan Rodriguez (ivan.rodriguez@de-net.net) 
  * @version 1, May 14, 2002 
  */

code: |
 function UCaseAll(str){
     var newstr = "";
     var list1 ="�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,";
     var list2 = "�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�";
 
     newstr = Ucase(str);
     newstr = ReplaceList(newstr,list1,list2);
     return newstr;
 }

---

