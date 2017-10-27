---
layout: udf
title:  cidrToNetMask
date:   2005-07-20T03:04:56.000Z
library: NetLib
argString: "cidr"
author: Sufiyan bin Yasa
authorEmail: cinod_79@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Converts CIDR numbers to valid network mask numbers.
tagBased: false
description: |
 CIDR numbers such as /24,/32,/12 are converted to the appropiate netmask address form.

returnValue: Returns a string.

example: |
 #cidrToNetMask(24)#<br>
 #cidrToNetMask(12)#<br>

args:
 - name: cidr
   desc: CIDR number.
   req: true


javaDoc: |
 /**
  * Converts CIDR numbers to valid network mask numbers.
  * 
  * @param cidr      CIDR number. (Required)
  * @return Returns a string. 
  * @author Sufiyan bin Yasa (cinod_79@yahoo.com) 
  * @version 1, July 19, 2005 
  */

code: |
 function cidrToNetMask (cidr) {
     var netMask = "";    
 
     var post = 0;
     var remainder = cidr MOD 8;
     var divide = cidr \ 8;
 
     while(divide gt 0) {
         netMask = listAppend(netMask, 255,'.'); 
         divide = divide - 1;
         post = post + 1;        
     }
 
     if(remainder gt 0) {            
         netMask = listAppend(NetMask,
                   bitSHLN(BitOr(0,2^remainder-1), 8-remainder),
                   '.');         
         post = post +1;            
     }
 
     while(post lt 4) {
         netMask = listAppend(netMask, "0",'.');             
         post = post + 1;
     }
     
     if(right(netMask, 1) eq "."){        
         netMask = left(netMask,len(netMask));
     }
     return netMask;
 }

oldId: 1230
---

