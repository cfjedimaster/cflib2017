---
layout: udf
title:  swfHeader
date:   2009-08-21T22:52:09.000Z
library: UtilityLib
argString: "filePath"
author: Alan Rother
authorEmail: alan.rother@gmail.com
version: 0
cfVersion: CF6
shortDescription: swfHeader reads a swf file's header and returns it's meta information, including height, width and Flash version.
tagBased: false
description: |
 swfHeader reads a swf file's header and returns it's meta information, including height, width and Flash version. Function based on code example by Rupesh Kumar (http://coldfused.blogspot.com)

returnValue: Returns a struct.

example: |
 <cfset temp     =    getSWFHeaderInfo('C:\Inetpub\wwwroot\Playground\swfHeader\swf\IMG_030612_11363237_2UX1Q.swf')>
 
 
 <cfdump var="#temp#">

args:
 - name: filePath
   desc: Path to SWF file.
   req: true


javaDoc: |
 /**
  * swfHeader reads a swf file's header and returns it's meta information, including height, width and Flash version.
  * 
  * @param filePath      Path to SWF file. (Required)
  * @return Returns a struct. 
  * @author Alan Rother (alan.rother@gmail.com) 
  * @version 0, August 21, 2009 
  */

code: |
 function getSWFHeaderInfo(filePath) {
     //setup the vars
     var headerValues     =     StructNew();
     var fis                =    '';
     var decoder            =    '';
     var header            =    '';
     var rect            =    '';
     
     //create defaults for the return struct
     headerValues.IsCompressed            =    '';
     headerValues.FrameCount                =    0;
     headerValues.FrameRate                =    0;
     headerValues.FlashVersion            =    0;
     headerValues.Height                    =    0;//returned in px
     headerValues.Width                    =    0;//returned in px
     headerValues.Errors                    =    '';
     
     if(ListLast(filePath, ".") IS "swf")
         {
             try
                 {
                     //Create a file input stream to load the SWF file into Java
                     fis = createObject("java", "java.io.FileInputStream").init(filePath);
                     //create a decoder object to read the file
                     decoder = createObject("java", "macromedia.swf.TagDecoder").init(fis);
                     // Decode the header
                     header = decoder.decodeHeader(); 
                     //close the input stream
                     fis.close();
                     //pull out the dimensions of the swf for later parsing
                     rect = header.size;    
                     //load the values returned from Java into the return struct
                     headerValues.IsCompressed            =    header.compressed;
                     headerValues.FrameCount                =    header.framecount;
                     headerValues.FrameRate                =    header.rate;
                     headerValues.FlashVersion            =    header.version;
                     headerValues.Height                    =    (rect.getHeight()/20);//divided by 20 to return the value in px (the orig value is in twips)
                     headerValues.Width                    =    (rect.getWidth()/20);//divided by 20 to return the value in px (the orig value is in twips)
                 }
             catch(Any excpt)
                 {
                     headerValues.Errors                    =    excpt.RootCause.Cause.Message;
                 }
         }
 
 
     //return the struct
     return headerValues;
 }

oldId: 1999
---

