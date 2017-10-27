---
layout: udf
title:  formatUKPostcode
date:   2012-07-27T18:22:06.000Z
library: StrLib
argString: "str"
author: Steve Chandler
authorEmail: cflib@chandler.it
version: 1
cfVersion: CF5
shortDescription: Formats a string to become a valid UK postcode
tagBased: false
description: |
 Formats a string to become a valid UK postcode

returnValue: Returns a string

example: |
 #formatUKPostcode(form.postcode)#

args:
 - name: str
   desc: String to format
   req: true


javaDoc: |
 /**
  * Formats a string to become a valid UK postcode
  * version 1.0 by Steve Chandler
  * 
  * @param str      String to format (Required)
  * @return Returns a string 
  * @author Steve Chandler (cflib@chandler.it) 
  * @version 1, July 27, 2012 
  */

code: |
 function formatUKPostcode(str){
     var strPostcode = ucase(trim(replaceNoCase(str,' ','','all')));
     return left(strPostcode,len(strPostcode)-3) & ' ' & right(strPostcode,3);
 }

oldId: 2177
---

