---
layout: udf
title:  ungzip
date:   2007-11-14T12:55:40.000Z
library: StrLib
argString: "text"
author: Oblio Leitch
authorEmail: oleitch@locustcreek.com
version: 1
cfVersion: CF7
shortDescription: Decompresses a binary or (base64|hex|uu) encoded string using the gzip algorithm; returns a string.
description: |
 This function accepts a binary or string encoded as (base64, hex, or uuencode), decompresses it with gzip, and returns a string.

returnValue: Returns a string.

example: |
 <cffile action="read" file="#expandPath("./readme.txt")#" variable="input" />
 <cfset compressed=binaryEncode(gzip(input),"base64") />
 <cfoutput>
 #compressed#<br />
 #ungzip(compressed,"base64")#
 </cfoutput>

args:
 - name: text
   desc: Compressed string to decompress.
   req: true


javaDoc: |
 <!---
  Decompresses a binary or (base64|hex|uu) encoded string using the gzip algorithm; returns a string.
  
  @param text      Compressed string to decompress. (Required)
  @return Returns a string. 
  @author Oblio Leitch (oleitch@locustcreek.com) 
  @version 1, November 14, 2007 
 --->

code: |
 <cffunction name="ungzip"
     returntype="any"
     displayname="ungzip"
     hint="decompresses a binary|(base64|hex|uu) using the gzip algorithm; returns string"
     output="no">
     <!---
         Acknowledgements:
         Christian Cantrell, byte array for CF
          - http://weblogs.macromedia.com/cantrell/archives/2004/01/byte_arrays_and_1.cfm
     --->
     <cfscript>
         var bufferSize=8192;
         var byteArray = createObject("java","java.lang.reflect.Array").newInstance(createObject("java","java.lang.Byte").TYPE,bufferSize);
         var decompressOutputStream=createObject("java","java.io.ByteArrayOutputStream").init();
         var input=0;
         var decompressInputStream=0;
         var l=0;
         if(not isBinary(arguments[1]) and arrayLen(arguments) is 1) return;
         if(arrayLen(arguments) gt 1){
             input=binaryDecode(arguments[1],arguments[2]);
         }else{
             input=arguments[1];
         }
         decompressInputStream=createObject("java","java.util.zip.GZIPInputStream").init(createObject("java","java.io.ByteArrayInputStream").init(input));
         l=decompressInputStream.read(byteArray,0,bufferSize);
 
         while (l gt -1){
             decompressOutputStream.write(byteArray,0,l);
             l=decompressInputStream.read(byteArray,0,bufferSize);
         }
         decompressInputStream.close();
         decompressOutputStream.close();
 
         return decompressOutputStream.toString();
     </cfscript>
 </cffunction>

---

