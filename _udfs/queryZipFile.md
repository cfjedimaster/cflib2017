---
layout: udf
title:  queryZipFile
date:   2006-10-09T21:43:35.000Z
library: UtilityLib
argString: "filePath[, returnBinary][, regexFilter]"
author: Dan G. Switzer, II
authorEmail: dswitzer@pengoworks.com
version: 1
cfVersion: CF6
shortDescription: Reads a zip file and converts the entries into a query object (including optional binary data.)
description: |
 Reads a zip file and converts the entries into a query object (including optional binary data).

returnValue: Returns a query.

example: |
 This would grab all the basic information regarding the contents of a zip file, useful for creating a "browse" interface to compressed files:
 
 <cfset getZipFile = queryZipFile(expandPath("./image.zip")) />
 
 NOTE: This would not include the binary data.
 
 
 This would display the first GIF found in a zip file:
 
 <cfset getImage = queryZipFile(expandPath("./image.zip"), true, "\.gif$")>
 
 <cfcontent
     variable="#getImage.binary[1]#"
     type="#getImage.mimeType[1]#"
     reset="true" />

args:
 - name: filePath
   desc: Full path to zip file.
   req: true
 - name: returnBinary
   desc: True/False; default is false. Should binary data be returned in the query. This is useful if you need to write the contents of a zip file to a database or you want to dynamically render contents of a zip file using cfcontent.
   req: false
 - name: regexFilter
   desc: A regex string to filter query results by the name in the zip file (the name would include pathing information.) For more advanced filtering, you can use a Query-of-Queries on the resultset.
   req: false


javaDoc: |
 /**
  * Reads a zip file and converts the entries into a query object (including optional binary data.)
  * 
  * @param filePath      Full path to zip file. (Required)
  * @param returnBinary      True/False; default is false. Should binary data be returned in the query. This is useful if you need to write the contents of a zip file to a database or you want to dynamically render contents of a zip file using cfcontent. (Optional)
  * @param regexFilter      A regex string to filter query results by the name in the zip file (the name would include pathing information.) For more advanced filtering, you can use a Query-of-Queries on the resultset. (Optional)
  * @return Returns a query. 
  * @author Dan G. Switzer, II (dswitzer@pengoworks.com) 
  * @version 1, October 9, 2006 
  */

code: |
 function queryZipFile(filePath) {
     // create a new zip file object
     var zipFile = createObject("java", "java.util.zip.ZipFile").init(filePath); // ZipFile
     // used to enumeration the ZipEntry
     var entries = "";
     // the current enumerated ZipEntry
     var entry = "";
     // should we return binary data
     var bReturnBinary = false;
     // the regex filter to use to filter out specific entries
     var sRegExMatch = "";
     // the query object we'll return
     var getZipInfo = queryNew("id, name, size, date, mimeType, compressedSize, crc, method, type", "integer, varchar, integer, date, varchar, integer, varchar, varchar, varchar");
     // the current name of the entry
     var sName = "";
     // if the current entry is a directory
     var bDirectory = false;
     // the current entry's compression method
     var sMethod = "";
     // the number of entries
     var iFilesLen = 1;
     // a Java Date object, for converting time to CF
     var jDate = createObject("java", "java.util.Date");
     // a Java Long object, for converting CRC to Hex string
     var jLong = createObject("java", "java.lang.Long");
     // the Servlet context, for attempting to determine mime type of file
     var jServerContext = getPageContext().getServletContext();
     // buffer string used for getting the file contents
     var buffer = repeatString(" ", 1024).getBytes();
     // the input stream of the zip file
     var inStream = "";
     // create an BAOS as the output stream, this will allow us to store the file in memory
     var outStream = createObject("java", "java.io.ByteArrayOutputStream");
     // the length of the current stream
     var length = 0;
     // track valid compression methods
     var stMethods = structNew();
 
     // if the second argument is supplied, check to see if we should return binary data
     if( arrayLen(arguments) gt 1 ) bReturnBinary = arguments[2];
     // if the third argument is supplied, check to see if we should filter data based on a string
     if( arrayLen(arguments) gt 2 ) sRegExMatch = trim(arguments[3]);
 
     // if we're to add the binary data, add the column now
     if( bReturnBinary ) queryAddColumn(getZipInfo, "binary", "binary", arrayNew(1));
 
     // define the valid methods for a compression
     stMethods["-1"] = "unspecified";
     stMethods["0"] = "stored";
     stMethods["8"] = "deflated";
 
     // get the entries in the zip file
     entries = zipFile.entries();
 
     // loop through the all the entries
     while( entries.hasMoreElements() ){
         // get the next element
         entry = entries.nextElement();
 
         // get the current name
         sName = entry.getName();
         // is the entry a directory
         bDirectory = entry.isDirectory();
         // the method of compression
         sMethod = entry.getMethod();
 
         // if there hasn't been a search string supplied, or the match is found grab the entry
         if( (len(sRegExMatch) eq 0) or (NOT bDirectory and (reFindNoCase(sRegExMatch, sName) gt 0)) ){
             // convert the epoch time to a Java Date object
             jDate.setTime(entry.getTime());
 
             // add a row to the query for the current entry
             queryAddRow(getZipInfo);
             querySetCell(getZipInfo, "id", iFilesLen);
             querySetCell(getZipInfo, "name", sName);
             querySetCell(getZipInfo, "size", entry.getSize());
             querySetCell(getZipInfo, "date", createODBCDateTime(jDate.toString()));
             querySetCell(getZipInfo, "compressedSize", entry.getCompressedSize());
             if( structKeyExists(stMethods, sMethod) ){
                 querySetCell(getZipInfo, "method", stMethods[sMethod]);
             } else {
                 querySetCell(getZipInfo, "method", sMethod);
             }
             // return a type similar to cfdirectory (either "dir" or "file")
             if( bDirectory ){
                 querySetCell(getZipInfo, "type", "dir");
             } else {
                 // convert the CRC-32 to a hex string
                 querySetCell(getZipInfo, "crc", uCase(jLong.toHexString(entry.getCrc())));
                 querySetCell(getZipInfo, "mimeType", jServerContext.getMimeType(sName));
                 querySetCell(getZipInfo, "type", "file");
             }
 
             // only grab the uncompressed binary data if it's a file and we've requested it
             if( NOT bDirectory and bReturnBinary ){
                 // get the current entry's file stream
                 inStream = zipFile.getInputStream(entry);
 
                 // read in the 1K buffer chuck
                 length = inStream.read(buffer);
                 // loop through the inStream and grab each data chunk
                 while( length GTE 0 ){
                     outStream.write(buffer, 0, length);
                     length = inStream.read(buffer);
                 }
                 // close the input stream
                 inStream.close();
 
                 // save the binary stream to the query
                 querySetCell(getZipInfo, "binary", outStream.toByteArray());
                 // reset the outStream -- close() has no affect, this will clear the contents
                 outStream.reset();
             }
 
             // increase the zip file count
             iFilesLen = iFilesLen + 1;
         }
     }
 
     // close the zip file
     zipFile.close();
 
     // return the query object
     return getZipInfo;
 }

---

