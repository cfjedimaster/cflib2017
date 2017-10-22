---
layout: udf
title:  ftpisConnected
date:   2005-09-22T22:00:40.000Z
library: NetLib
argString: "ftpObject"
author: Willy Chang
authorEmail: willy.mx@gmail.com
version: 1
cfVersion: CF6
shortDescription: Checks to see if a CF FTP connection is still connected.
tagBased: true
description: |
 Checks to see if a CF FTP connection is still connected.

returnValue: Returns a boolean.

example: |
 <cfftp connection = "ftpConn" 
    server=ftp.server.com 
        username="user"
        password="pass"
    action = "open" 
    stopOnError = "Yes" passive="Yes"> 
 isConnected ? 
 <cfoutput>#ftpisConnected(ftpConn)#</cfoutput>

args:
 - name: ftpObject
   desc: Result of a previous CFFTP call.
   req: true


javaDoc: |
 <!---
  Checks to see if a CF FTP connection is still connected.
  
  @param ftpObject      Result of a previous CFFTP call. (Required)
  @return Returns a boolean. 
  @author Willy Chang (willy.mx@gmail.com) 
  @version 1, September 22, 2005 
 --->

code: |
 <cffunction name="ftpisConnected" output="false" returnType="boolean">
     <cfargument name="ftpObject" required="yes">
     <cfreturn ftpObject.isConnected()>
 </cffunction>

---

