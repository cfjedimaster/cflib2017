---
layout: udf
title:  GetHTTPDir
date:   2001-10-09T10:48:54.000Z
library: FileSysLib
argString: "[pathType]"
author: Spike
authorEmail: spike@spike.org.uk
version: 1
cfVersion: CF5
shortDescription: Retrieves the url for the current directory in full or relative format.
tagBased: false
description: |
 Retrieves the url for the current directory in full or relative format. Depends on cgi.server_name and cgi.script_name variables.

returnValue: Returns a string.

example: |
 <STRONG>Full Format:</STRONG><BR>
 <CFOUTPUT>#GetHTTPDir('full')#</CFOUTPUT>
 <BR>
 <BR>
 <STRONG>Relative Format:</STRONG> <BR>
 <CFOUTPUT>#GetHTTPDir('relative')#</CFOUTPUT>
 <BR>
 <BR>
 <STRONG>Default Format:</STRONG> <BR>
 <CFOUTPUT>#GetHTTPDir()#</CFOUTPUT><BR>
 <BR>
 <STRONG>Invalid Parameter:</STRONG><BR>
 <CFOUTPUT>#GetHTTPDir('part')#</CFOUTPUT>

args:
 - name: pathType
   desc: Format to return the path in.  Valid values are 'full' and 'relative'.  Returns the text string 'invalid paramter' if the parameter is not 'full' or 'relative'. Default value for the parameter is 'relative'.  
   req: false


javaDoc: |
 /**
  * Retrieves the url for the current directory in full or relative format.
  * 
  * @param pathType      Format to return the path in.  Valid values are 'full' and 'relative'.  Returns the text string 'invalid paramter' if the parameter is not 'full' or 'relative'. Default value for the parameter is 'relative'.   
  * @return Returns a string. 
  * @author Spike (spike@spike.org.uk) 
  * @version 1, October 9, 2001 
  */

code: |
 function GetHTTPDir() {
         var format = "";
     if (arraylen(arguments)) {
      format = arguments[1];
         if (format EQ 'full') {
             return "http://#cgi.server_name##listDeleteAt(cgi.script_name,listlen(cgi.script_name,'/'),'/')#/";
         }
         else if (format EQ 'relative') {
             return "#listDeleteAt(cgi.script_name,listlen(cgi.script_name,'/'),'/')#/";
         }
         else {
             return 'invalid argument';
         }
     }
     else {
         return "#listDeleteAt(cgi.script_name,listlen(cgi.script_name,'/'),'/')#/";
     }
 }

---

