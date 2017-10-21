---
layout: udf
title:  getFileMimeType
date:   2005-07-20T03:00:53.000Z
library: FileSysLib
argString: "filePath"
author: Ben Rogers
authorEmail: ben@c4.net
version: 1
cfVersion: CF6
shortDescription: Returns the mime type of the specified file.
description: |
 Utilizes the getMimeType() method of the ServletContext object to determine the mime type of the specified file. Returns an empty string if the mime type of the file is unknown. The function takes one argument, the physical file path of the file.

returnValue: Returns a string.

example: |
 <cfoutput>
     #getFileMimeType("C:\Inetpub\wwwroot\cfdocs\htmldocs\images\babelfi2.jpg")#
 </cfoutput>

args:
 - name: filePath
   desc: The file to examine,
   req: true


javaDoc: |
 <!---
  Returns the mime type of the specified file.
  
  @param filePath      The file to examine, (Required)
  @return Returns a string. 
  @author Ben Rogers (ben@c4.net) 
  @version 1, July 19, 2005 
 --->

code: |
 <cffunction name="getFileMimeType" returntype="string" output="no">
     
     <cfargument name="filePath" type="string" required="yes">
     
     <cfreturn getPageContext().getServletContext().getMimeType(arguments.filePath)>
     
 </cffunction>

---

