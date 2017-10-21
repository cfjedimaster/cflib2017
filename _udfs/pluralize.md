---
layout: udf
title:  pluralize
date:   2004-02-19T01:08:01.000Z
library: StrLib
argString: "quantity, singular, plural"
author: Tony Felice, Ken Fricklas
authorEmail: sites@breckcomm.com; ken@breckcomm.com
version: 1
cfVersion: CF5
shortDescription: Very simple function to display either the plural or singular form for a numeric that is passed in.
description: |
 Very simple function to display either the plural or singular form for a numeric that is passed in.

returnValue: Returns a string.

example: |
 <cfoutput>
 #pluralize(randrange(1,3),"leaf","leaves")#
 </cfoutput>

args:
 - name: quantity
   desc: Quantity.
   req: true
 - name: singular
   desc: Singular version of the string.
   req: true
 - name: plural
   desc: Plural version of the string.
   req: true


javaDoc: |
 /**
  * Very simple function to display either the plural or singular form for a numeric that is passed in.
  * 
  * @param quantity      Quantity. (Required)
  * @param singular      Singular version of the string. (Required)
  * @param plural      Plural version of the string. (Required)
  * @return Returns a string. 
  * @author Tony Felice, Ken Fricklas (sites@breckcomm.com; ken@breckcomm.com) 
  * @version 1, February 18, 2004 
  */

code: |
 function pluralize(quantity, singular, plural){
     return IIF(quantity EQ 1, DE(singular), DE(plural));
 }

---

