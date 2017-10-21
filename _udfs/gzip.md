---
layout: udf
title:  gzip
date:   2007-11-14T12:52:49.000Z
library: StrLib
argString: "text[, format]"
author: Oblio Leitch
authorEmail: oleitch@locustcreek.com
version: 1
cfVersion: CF7
shortDescription: Compresses a string using the gzip algorithm; returns binary or a string of (base64|hex|uu).
description: |
 This function will take any string and run it through a gzip compression.  By default it will return the binary result, or you can specify an encoding of &quot;base64&quot;, &quot;hex&quot;, &quot;uu&quot;.

returnValue: Returns a string.

example: |
 <cffile action="read" file="#expandPath("./readme.txt")#" variable="input" />
 <cfset compressed=gzip(input) />
 <cfoutput>
 original: #len(input)#<br />
 compressed: #len(compressed)#<br />
 encoded: #len(gzip(compressed,"base64"))#<br />
 </cfoutput>

args:
 - name: text
   desc: String to compress.
   req: true
 - name: format
   desc: binary,base64,hex, or uu. Defaults to binary.
   req: false


javaDoc: |
 <!---
  Compresses a string using the gzip algorithm; returns binary or a string of (base64|hex|uu).
  
  @param text      String to compress. (Required)
  @param format      binary,base64,hex, or uu. Defaults to binary. (Optional)
  @return Returns a string. 
  @author Oblio Leitch (oleitch@locustcreek.com) 
  @version 1, November 14, 2007 
 --->

code: |
 <cffunction name="gzip"
     returntype="any"
     displayname="gzip"
     hint="compresses a string using the gzip algorithm; returns binary or string(base64|hex|uu)"
     output="no">
     <!---
         Acknowledgements:
         Andrew Scott, original gzip compression routine
          - http://www.andyscott.id.au/index.cfm/2006/9/12/Proof-of-Concept
     --->
     <cfscript>
         var result="";
         var text=createObject("java","java.lang.String").init(arguments[1]);
         var dataStream=createObject("java","java.io.ByteArrayOutputStream").init();
         var compressDataStream=createObject("java","java.util.zip.GZIPOutputStream").init(dataStream);
         compressDataStream.write(text.getBytes());
         compressDataStream.finish();
         compressDataStream.close();
 
         if(arrayLen(arguments) gt 1){
             result=binaryEncode(dataStream.toByteArray(),arguments[2]);
         }else{
             result=dataStream.toByteArray();
         }
         return result;
     </cfscript>
 </cffunction>

---

