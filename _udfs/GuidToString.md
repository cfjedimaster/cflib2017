---
layout: udf
title:  GuidToString
date:   2002-09-06T11:41:04.000Z
library: DataManipulationLib
argString: "guidByteArray"
author: Samuel Neff
authorEmail: sam@blinex.com
version: 1
cfVersion: CF6
shortDescription: Accepts a numeric GUID stored in a Byte Array and converts it to a string in the normal convention.
tagBased: false
description: |
 Useful when returning GUIDs (16-byte globally unique identifier, aka Replication ID's) from a database in CFMX. CF5 returned the GUIDs as a string when retrieved from a database and as such could easily be copied into SQL for another database call.  However, CFMX returns byte arrays and they need to be converted before they can be inserted into SQL.

returnValue: Returns a string.

example: |
 <!--- Non Working Example
 <cfquery name="source" datasource="#ds#">
    SELECT ID
    FROM RepID_Source
 </cfquery>
 
 <cfoutput>#guidToString(source.ID)#</cfoutput>
 --->

args:
 - name: guidByteArray
   desc: GUID Byte array returned from a query.
   req: true


javaDoc: |
 /**
  * Accepts a numeric GUID stored in a Byte Array and converts it to a string in the normal convention.
  * 
  * @param guidByteArray      GUID Byte array returned from a query. (Required)
  * @return Returns a string. 
  * @author Samuel Neff (sam@blinex.com) 
  * @version 1, September 6, 2002 
  */

code: |
 function guidToString(guidByteArray) {
    var hexString='';
    
    if (IsArray(guidByteArray) AND ArrayLen(guidByteArray) GTE 16) {
      hexString=hexString & guidByteToHex(guidByteArray[4]);
      hexString=hexString & guidByteToHex(guidByteArray[3]);
      hexString=hexString & guidByteToHex(guidByteArray[2]);
      hexString=hexString & guidByteToHex(guidByteArray[1]);
      hexString=hexString & "-";
      hexString=hexString & guidByteToHex(guidByteArray[6]);
      hexString=hexString & guidByteToHex(guidByteArray[5]);
      hexString=hexString & "-";
      hexString=hexString & guidByteToHex(guidByteArray[8]);
      hexString=hexString & guidByteToHex(guidByteArray[7]);
      hexString=hexString & "-";
      hexString=hexString & guidByteToHex(guidByteArray[9]);
      hexString=hexString & guidByteToHex(guidByteArray[10]);
      hexString=hexString & "-";
      hexString=hexString & guidByteToHex(guidByteArray[11]);
      hexString=hexString & guidByteToHex(guidByteArray[12]);
      hexString=hexString & guidByteToHex(guidByteArray[13]);
      hexString=hexString & guidByteToHex(guidByteArray[14]);
      hexString=hexString & guidByteToHex(guidByteArray[15]);
      hexString=hexString & guidByteToHex(guidByteArray[16]);
    }
    
    return hexString;
 }
 
 function guidByteToHex(guidByte) {
    // Accepts a single byte and converts it to a two digit Hex number.
    
    var hexByte=Ucase(Right(FormatBaseN(guidByte, 16),2));
    if (Len(hexByte) IS 0) {
       hexByte='00';
    } else if (Len(hexByte) IS 1) {
       hexByte='0' & hexByte;
    }
    
    return hexByte;
 }

---

