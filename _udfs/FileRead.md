---
layout: udf
title:  FileRead
date:   2001-12-03T19:31:29.000Z
library: FileSysLib
argString: "file[, from][, to][, NL]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Reads a file.
description: |
 This UDF will read a file using Java objects. You can also specify a range of line numbers to retrieve.

returnValue: Returns a string.

example: |
 <CFSET TheFile = ExpandPath("includes/cflib_style.css")>
 <CFSET Contents = FileRead(TheFile,1,5)>
 <CFOUTPUT>
 <PRE>
 #HTMLEditFormat(Contents)#
 </PRE>
 </CFOUTPUT>

args:
 - name: file
   desc: The filename to read.
   req: true
 - name: from
   desc: The line number specifying where to begin reading.
   req: false
 - name: to
   desc: The line number specifying where to stop reading.
   req: false
 - name: NL
   desc: Character to use for newlines. Defaults to Chr(13)Chr(10)
   req: false


javaDoc: |
 /**
  * Reads a file.
  * 
  * @param file      The filename to read. 
  * @param from      The line number specifying where to begin reading. 
  * @param to      The line number specifying where to stop reading. 
  * @param NL      Character to use for newlines. Defaults to Chr(13)Chr(10) 
  * @return Returns a string. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, December 3, 2001 
  */

code: |
 function FileRead(filename) {
     var fileStr = "";
     var fileReaderClass = createObject("java", "java.io.FileReader");
     var fileReader = fileReaderClass.init(filename);
     var lineNumberReaderClass = createObject("java","java.io.LineNumberReader");
     var lineReader = lineNumberReaderClass.init(fileReader);
     var notDone = true;
     var lastLine = 0;
     var thisLine = 0;
     var NL = Chr(13) & Chr(10);
     var from = 0;
     var to = 0;
     var line = "";
     
     //optional FROM
     if(arrayLen(arguments) gt 1) from = arguments[2];
     //optional TO
     if(arrayLen(arguments) gt 2) to = arguments[3];
     //optional NL
     if(arrayLen(arguments) gt 3) NL = arguments[4];
     
     if(not fileExists(filename)) return "";
     
     while(notDone) {
         line = lineReader.readLine();
         thisLine = lineReader.getLineNumber();
         if( (from is 0 OR thisLine gte from) AND (to is 0 OR thisLine lte to)) fileStr = fileStr & line & NL;
         if(thisLine is lastLine) notDone = false;
         lastLine = thisLine;
     }
     
     return fileStr;
 }

---

