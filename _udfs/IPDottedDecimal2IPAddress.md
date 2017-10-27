---
layout: udf
title:  IPDottedDecimal2IPAddress
date:   2002-09-27T10:53:55.000Z
library: NetLib
argString: "ipValue"
author: Jonathan Pickard
authorEmail: j_pickard@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Converts a 32-bit dotted decimal IP number to an IP address.
tagBased: false
description: |
 Use IPDottedDecimal2IPAddress to convert an IP dotted decimal value to an IP address string.  Storing decimal values in a database and making comparisons with them is more efficient than using IP address strings.

returnValue: Returns a string.

example: |
 <cfoutput>
 #IPDottedDecimal2IPAddress( -1062731769)#
 </cfoutput>

args:
 - name: ipValue
   desc: Dotted decimal value of IP address.
   req: true


javaDoc: |
 /**
  * Converts a 32-bit dotted decimal IP number to an IP address.
  * 
  * @param ipValue      Dotted decimal value of IP address. (Required)
  * @return Returns a string. 
  * @author Jonathan Pickard (j_pickard@hotmail.com) 
  * @version 1, September 27, 2002 
  */

code: |
 function IPDottedDecimal2IPAddress( ipvalue ) {
     var ipAddress = "";
     var lBitMasks = "24,16,8,0";
     var i = 1;
 
     for ( ; i LTE 4; i = i + 1 )
     {
         ipAddress = ipAddress & "." & BitMaskRead( ipvalue, ListGetAt( lBitMasks, i ), 8 );
     }
     ipAddress = Right( ipAddress, Len( ipAddress ) - 1 );
 
     return ipAddress;
 }

oldId: 734
---

