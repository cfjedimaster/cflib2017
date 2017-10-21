---
layout: udf
title:  detableize
date:   2005-08-26T02:59:28.000Z
library: StrLib
argString: "string"
author: Jared Rypka-Hauer
authorEmail: jared@web-relevant.com
version: 1
cfVersion: CF6
shortDescription: Strips all table and table content tags and extra whitespace from a string.
description: |
 Handy for scraping screens. This will strip all table, tr, td, and th tags from a string. It also removes leading whitespace and extra newline characters to eliminate code formatting.

returnValue: Returns a string.

example: |
 <cfset htmlString = "<table>
     <tr>
         <th width=""18"" height=""11"">
             this
         </th>
     </tr>
     <tr>
         <td>
      | | is (test whitespace stripping)
         </td>
     </tr>
     <tr bgcolor=""red"">
         <td>
             some
         </td>
     </tr>
     <tr>
         <td>
             test
         </td>
     </tr>
     <tr>
         <td>
             code
         </td>
     </tr>
 </table>">
 
 <cfoutput>
 #htmlCodeFormat(htmlString)#
 <br><br>
 #htmlCodeFormat(detableize(htmlString))#
 </cfoutput>

args:
 - name: string
   desc: String to format.
   req: true


javaDoc: |
 <!---
  Strips all table and table content tags and extra whitespace from a string.
  
  @param string      String to format. (Required)
  @return Returns a string. 
  @author Jared Rypka-Hauer (jared@web-relevant.com) 
  @version 1, August 25, 2005 
 --->

code: |
 <cffunction name="detableize">
     <cfargument name="string" type="string" required="true" />
     <cfset var outputString = arguments["string"]>
     <cfset outputString = reReplaceNoCase(outputString , "</*table>", "", "all")>
     <cfset outputString = reReplaceNoCase(outputString , "</*t[rhd](\s*\w*=*""*\w*""*)*>", "", "all")>
     <cfset outputString = reReplaceNoCase(outputString , "(?m)^\s*", "", "all")>
     <cfset outputString = reReplaceNoCase(outputString , "\n{2,}", "#chr(10)#", "all")>
     <cfreturn outputString />
 </cffunction>

---

