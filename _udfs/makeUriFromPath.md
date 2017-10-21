---
layout: udf
title:  makeUriFromPath
date:   2004-09-23T14:48:34.000Z
library: FileSysLib
argString: "path"
author: Samuel Neff
authorEmail: sam@blinex.com
version: 1
cfVersion: CF5
shortDescription: Creates a URI from an absolute path.
description: |
 Accepts an aboluste path as input and returns a full URI as output.  For example, &quot;C:\Temp\Test.xml&quot; returns &quot;file:///C:/Temp/Test.xml&quot;.

returnValue: Returns a URI.

example: |
 <cfoutput>#makeUriFromPath(expandPath("test.xml"))#</cfoutput>

args:
 - name: path
   desc: Path to translate.
   req: true


javaDoc: |
 /**
  * Creates a URI from an absolute path.
  * 
  * @param path      Path to translate. (Required)
  * @return Returns a URI. 
  * @author Samuel Neff (sam@blinex.com) 
  * @version 1, September 23, 2004 
  */

code: |
 function makeUriFromPath(path) {
    var uri = path;
      
    // make all backslashes into slashes
    uri = replace(uri, "\", "/", "all");
    if (left(uri,1) is "/") {
       uri = right(uri, len(uri) - 1);
     }
      
    uri = "file:///" & uri;
     
    return uri;
 }

---

