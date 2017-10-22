---
layout: udf
title:  celticMcCaps
date:   2010-12-05T19:32:44.000Z
library: StrLib
argString: "lastName"
author: Kyle McNamara
authorEmail: kyle@themacs.info
version: 2
cfVersion: CF5
shortDescription: Proper capitalization for us Mc's and Mac's!
tagBased: false
description: |
 You can use this function whenever you output an undetermined list of last names in order to be sure that the McNamaras and the MacGreggors names are output correctly.

returnValue: Returns a string.

example: |
 <cfset last_name = "mcnamara">
 
 <cfoutput>
 #celticMcCaps(last_name)#
 </cfoutput>

args:
 - name: lastName
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * Proper capitalization for us Mc's and Mac's!
  * v2 by Kris Korsmo
  * 
  * @param lastName      String to modify. (Required)
  * @return Returns a string. 
  * @author Kyle McNamara (kyle@themacs.info) 
  * @version 2, December 5, 2010 
  */

code: |
 function celticMcCaps(lastName) {
     var capLastName = lCase(lastName);
     if (left(lastName,2) eq "Mc") {
         capLastName = uCase(left(lastName,1)) & lCase(mid(lastName,2,1)) & uCase(mid(lastName,3,1)) & lCase(right(lastName,len(lastName)-3));
         return capLastName;
     }
     else if (left(lastName,3) eq "Mac") {
         capLastName = uCase(left(lastName,1)) & lCase(mid(lastName,2,1)) & lCase(mid(lastName,3,1)) & uCase(mid(lastName,4,1)) & lCase(right(lastName,len(lastName)-4));
         return capLastName;
     }
     else if (left(lastName,2) eq "O'") {
         capLastName = uCase(left(lastName,1)) & "'" & uCase(mid(lastName,3,1)) & lCase(right(lastName,len(lastName)-3));
         return capLastName;
     }
     else return lastName;
 }

---

