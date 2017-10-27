---
layout: udf
title:  nullPad
date:   2016-05-11T20:00:00.000Z
library: StrLib
argString: "plainText, blockSize[, encoding]"
author: Leigh
authorEmail: cfsearching@yahoo.com
version: 1
cfVersion: CF10
shortDescription: Needs short description.
tagBased: true
description: |
 Pads a string with null bytes, to a multiple of the given block size. Useful for encryption compatibility.

returnValue: The supplied string padded with null bytes.

example: |
 <cfscript>
     // Note: Verify using string length (null bytes are not visible when displayed with writeOutput)
     originalText = "Four";
     writeOutput("<br>Original Text  Length = "& len(originalText));
     paddedText = nullPad(originalText, 8);
     writeOutput("<br>Padded Text Length = "& len(paddedText));
 </cfscript>

args:
 - name: plainText
   desc: Input string.
   req: true
 - name: blockSize
   desc: Size of desired output.
   req: true
 - name: encoding
   desc: Encoding of string, defaults to UTF-8.
   req: false


javaDoc: |
 

code: |
 string function nullPad( string plainText, numeric blockSize, string encoding="UTF-8")
 {
     if (arguments.blockSize <= 0) {
         throw("Block size must be greater than 0");
     }
     local.newText = arguments.plainText;
     local.bytes = charsetDecode(arguments.plainText, arguments.encoding);
     local.remain = arrayLen( local.bytes ) % arguments.blockSize;
 
     if (local.remain != 0) 
     {
         local.padSize = arguments.blockSize - local.remain;
         local.newText &= repeatString( urlDecode("%00"), local.padSize );
     }
 
     return local.newText;
 }

oldId: undefined
---

