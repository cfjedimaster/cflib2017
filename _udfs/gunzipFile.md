---
layout: udf
title:  gunzipFile
date:   2010-05-03T21:35:15.000Z
library: UtilityLib
argString: "infilePath[, outputPath]"
author: Vaughan Allan
authorEmail: vallan@abnamromorgans.com.au
version: 1
cfVersion: CF6
shortDescription: Unzip a gzipped (.gz) file.
description: |
 This function takes one or two parameters (the FULL absolute path to the file to be unzipped) and optionally a directory to unzip the contained file to.  Note that this does not extract files in a tar.gz file (it only removes the gzip compression).  It assumes that both the source file and option destination exist and are valid.

returnValue: Returns a boolean.

example: |
 <cfset result = gunzipFile(expandPath("./Ray Bio.doc.gz"), "c:\flextemp")>
 <cfoutput>#result#</cfoutput>

args:
 - name: infilePath
   desc: Full path to gz file.
   req: true
 - name: outputPath
   desc: Where to extract the gzfile. Defaults to current directory.
   req: false


javaDoc: |
 /**
  * Unzip a gzipped (.gz) file.
  * 
  * @param infilePath      Full path to gz file. (Required)
  * @param outputPath      Where to extract the gzfile. Defaults to current directory. (Optional)
  * @return Returns a boolean. 
  * @author Vaughan Allan (vallan@abnamromorgans.com.au) 
  * @version 1, May 3, 2010 
  */

code: |
 function gunzipFile(infilePath) {
     var zipfile = "";
     var outfile = "";
     var outputPath = "";
     var infile = "";
     var gzInStream = createObject('java','java.util.zip.GZIPInputStream');
     var outStream = createObject('java','java.io.FileOutputStream');
     var inStream = createObject('java','java.io.FileInputStream');
     var buffer = repeatString(" ",1024).getBytes();
     var length = 0;
     var rv = true;
    
     if (arrayLen(Arguments) gte 2) outputPath = arguments[2];
     else outputPath = getDirectoryFromPath(infilePath);
 
     if (right(infilePath,3) neq '.gz') infilePath = infilePath & '.gz';
 
     if(right(outputPath,1) neq "/" and right(outputPath,1) neq "\") outputPath = outputPath & "/";
    
     try {
         infile = getFileFromPath(infilePath);
         outfile = outputPath & left(infile,len(infile) - 3);
         inStream.init(infilePath);
         gzInStream.init(inStream);
         outStream.init(outfile);
         do {
             length = gzInStream.read(buffer,0,1024);
             if (length neq -1) outStream.write(buffer,0,length);
         } while (length neq -1);
         outStream.close();
         gzInStream.close();
     } 
     catch (any e) {
         rv = false;
         try {
             outStream.close();
         } catch (any e) { }
             try {
                 gzInStream.close();
             } catch (any e) { }
     }
     return rv;
 }

---

