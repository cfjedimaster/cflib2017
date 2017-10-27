---
layout: udf
title:  unzipFile
date:   2003-09-01T20:31:14.000Z
library: FileSysLib
argString: "zipFilePath, outputPath"
author: Samuel Neff
authorEmail: sam@serndesign.com
version: 1
cfVersion: CF6
shortDescription: Unzips a file to the specified directory.
tagBased: false
description: |
 unzipFile() utilizes the built in java.util.zip package and requires no software be installed on the server.  Pass in the path to a zip file and a target directory and it will unzip the contents.
 
 Due to a bug in CFMX 6.0 the UDF does require CFMX 6.1.

returnValue: void

example: |
 <!--- 
 
 unzipFile(expandPath("test.zip"), expandPath("targetDir/"))
 
 --->

args:
 - name: zipFilePath
   desc: Path to the zip file
   req: true
 - name: outputPath
   desc: Path where the unzipped file(s) should go
   req: true


javaDoc: |
 /**
  * Unzips a file to the specified directory.
  * 
  * @param zipFilePath      Path to the zip file (Required)
  * @param outputPath      Path where the unzipped file(s) should go (Required)
  * @return void 
  * @author Samuel Neff (sam@serndesign.com) 
  * @version 1, September 1, 2003 
  */

code: |
 function unzipFile(zipFilePath, outputPath) {
     var zipFile = ""; // ZipFile
     var entries = ""; // Enumeration of ZipEntry
     var entry = ""; // ZipEntry
     var fil = ""; //File
     var inStream = "";
     var filOutStream = "";
     var bufOutStream = "";
     var nm = "";
     var pth = "";
     var lenPth = "";
     var buffer = "";
     var l = 0;
      
     zipFile = createObject("java", "java.util.zip.ZipFile");
     zipFile.init(zipFilePath);
     
     entries = zipFile.entries();
     
     while(entries.hasMoreElements()) {
         entry = entries.nextElement();
         if(NOT entry.isDirectory()) {
             nm = entry.getName(); 
             
             lenPth = len(nm) - len(getFileFromPath(nm));
             
             if (lenPth) {
             pth = outputPath & left(nm, lenPth);
         } else {
             pth = outputPath;
         }
         if (NOT directoryExists(pth)) {
             fil = createObject("java", "java.io.File");
             fil.init(pth);
             fil.mkdirs();
         }
         filOutStream = createObject(
             "java", 
             "java.io.FileOutputStream");
         
         filOutStream.init(outputPath & nm);
         
         bufOutStream = createObject(
             "java", 
             "java.io.BufferedOutputStream");
         
         bufOutStream.init(filOutStream);
         
         inStream = zipFile.getInputStream(entry);
         buffer = repeatString(" ",1024).getBytes(); 
         
         l = inStream.read(buffer);
         while(l GTE 0) {
             bufOutStream.write(buffer, 0, l);
             l = inStream.read(buffer);
         }
         inStream.close();
         bufOutStream.close();
         }
     }
     zipFile.close();
 }

oldId: 997
---

