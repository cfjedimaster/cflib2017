---
layout: udf
title:  IsSecureSite
date:   2004-02-18T00:55:37.000Z
library: SecurityLib
argString: "[localServers]"
author: Mike Hughes
authorEmail: mike@gne-ws.com
version: 1
cfVersion: CF5
shortDescription: Checks to see if the current page is being run on a secure server.
description: |
 It checks to see if the code is on a SSL site by checking the value of CGI.Server_Port_Secure. You can also pass a list of servers to the UDF so you can use your code on a listed sever, local and development servers.

returnValue: Returns a boolean.

example: |
 <cfif NOT IsSecureSite("localhost,gne550d")>
     <cflocation url="#Request.WebPath.SecureDomain#index.cfm">            
 </cfif>

args:
 - name: localServers
   desc: If the current server matches one of the servers in this list, the UDF will return true. Defaults to an empty string.
   req: false


javaDoc: |
 /**
  * Checks to see if the current page is being run on a secure server.
  * 
  * @param localServers      If the current server matches one of the servers in this list, the UDF will return true. Defaults to an empty string. (Optional)
  * @return Returns a boolean. 
  * @author Mike Hughes (mike@gne-ws.com) 
  * @version 1, February 17, 2004 
  */

code: |
 function IsSecureSite() {
     if(arrayLen(arguments)) localServers = arguments[1]; 
     if(cgi.server_port_secure OR listFindNoCase(localServers, cgi.server_name)) return true;
     else return false;
 }

---

