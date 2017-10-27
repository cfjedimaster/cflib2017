---
layout: udf
title:  IPAddress2IPDottedDecimal
date:   2002-09-27T10:52:45.000Z
library: NetLib
argString: "[ipAddress]"
author: Jonathan Pickard
authorEmail: j_pickard@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Converts an IP address to a 32-bit dotted decimal IP number.
tagBased: false
description: |
 Use IPAddress2IPDottedDecimal to convert an IP address string to a decimal value.  Storing decimal values in a database and making comparisons with them is more efficient than using IP address strings.

returnValue: Returns a number.

example: |
 <cfoutput>
 #IPAddress2IPDottedDecimal( "192.168.0.7" )#
 </cfoutput>

args:
 - name: ipAddress
   desc: IP Address to convert.
   req: false


javaDoc: |
 /**
  * Converts an IP address to a 32-bit dotted decimal IP number.
  * 
  * @param ipAddress      IP Address to convert. (Optional)
  * @return Returns a number. 
  * @author Jonathan Pickard (j_pickard@hotmail.com) 
  * @version 1, September 27, 2002 
  */

code: |
 function IPAddress2IPDottedDecimal( ipAddress ) {
     var    ipValue = 0;
     var lBitShifts = "24,16,8,0";
     var i = 1;
 
     if ( ListLen( ipAddress, "." ) EQ 4 )
     {
         for ( ; i LTE 4; i = i + 1 )
         {
             ipValue = ipValue + BitSHLN( ListGetAt( ipAddress, i, "." ), ListGetAt( lBitShifts, i ) );
         }
     }
 
     return ipValue;
 }

oldId: 733
---

