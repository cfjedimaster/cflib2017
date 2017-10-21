---
layout: udf
title:  removeHTML
date:   2007-11-14T13:32:25.000Z
library: StrLib
argString: "source"
author: Scott Bennett
authorEmail: scott@coldfusionguy.com
version: 1
cfVersion: CF5
shortDescription: Removes All HTML from a string removing tags, script blocks, style blocks, and replacing special character code.
description: |
 Removes All HTML from a string, Removing tags, script blocks, style blocks, Head blocks, and replaces common special character code with text equivalents.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="htmlstring">
 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
 
 <html>
 <head>
     <title>My Title should be removed</title>
 </head>
 <script language="JavaScript">
 // Script block will be removed
 function myfunction(){
     alert("this is my function");
 }
 </script>
 <style type="text/css">
     body, p, td, li, form  { font-family: verdana, sans-serif; font-size: 13px; color: #000000;
                             margin-top: 0px }
 </style>
 <body>
 <div align="center">
 <!-- HtML comments should be removed-->
 <p>This is the body of my page it should show up fine. </p><br>
 <b><i>This sentance should not be bold or italic</i></b> These special characters should be replaced
 <ul>
     <li>&nbsp;</li>
     <li>&bull;</li>
     <li>&lsaquo;</li>
     <li>&rsaquo;</li>
     <li>&trade;</li>
     <li>&frasl;</li>
     <li>&lt;</li>
     <li>&gt;</li>
     <li>&copy;</li>
     <li>&copy;</li>
     <li>&reg;</li>
 </ul>
 <table><tr><td>There should be no table here</td></tr></table>
 </div>
 </body>
 </html>
 </cfsavecontent>
 <cfoutput>#RemoveHTML(htmlString)#</cfoutput>

args:
 - name: source
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Removes All HTML from a string removing tags, script blocks, style blocks, and replacing special character code.
  * 
  * @param source      String to format. (Required)
  * @return Returns a string. 
  * @author Scott Bennett (scott@coldfusionguy.com) 
  * @version 1, November 14, 2007 
  */

code: |
 function removeHTML(source){
     
     // Remove all spaces becuase browsers ignore them
     var result = ReReplace(trim(source), "[[:space:]]{2,}", " ","ALL");
     
     // Remove the header
     result = ReReplace(result, "<[[:space:]]*head.*?>.*?</head>","", "ALL");
     
     // remove all scripts
     result = ReReplace(result, "<[[:space:]]*script.*?>.*?</script>","", "ALL");
     
     // remove all styles
     result = ReReplace(result, "<[[:space:]]*style.*?>.*?</style>","", "ALL");
     
     // insert tabs in spaces of <td> tags
     result = ReReplace(result, "<[[:space:]]*td.*?>","    ", "ALL");
     
     // insert line breaks in places of <BR> and <LI> tags
     result = ReReplace(result, "<[[:space:]]*br[[:space:]]*>",chr(13), "ALL");
     result = ReReplace(result, "<[[:space:]]*li[[:space:]]*>",chr(13), "ALL");
     
     // insert line paragraphs (double line breaks) in place
     // if <P>, <DIV> and <TR> tags
     result = ReReplace(result, "<[[:space:]]*div.*?>",chr(13), "ALL");
     result = ReReplace(result, "<[[:space:]]*tr.*?>",chr(13), "ALL");
     result = ReReplace(result, "<[[:space:]]*p.*?>",chr(13), "ALL");
     
     // Remove remaining tags like <a>, links, images,
     // comments etc - anything thats enclosed inside < >
     result = ReReplace(result, "<.*?>","", "ALL");
     
     // replace special characters:
     result = ReReplace(result, "&nbsp;"," ", "ALL");
     result = ReReplace(result, "&bull;"," * ", "ALL");    
     result = ReReplace(result, "&lsaquo;","<", "ALL");        
     result = ReReplace(result, "&rsaquo;",">", "ALL");        
     result = ReReplace(result, "&trade;","(tm)", "ALL");        
     result = ReReplace(result, "&frasl;","/", "ALL");        
     result = ReReplace(result, "&lt;","<", "ALL");        
     result = ReReplace(result, "&gt;",">", "ALL");        
     result = ReReplace(result, "&copy;","(c)", "ALL");        
     result = ReReplace(result, "&reg;","(r)", "ALL");    
     
     // Remove all others. More special character conversions
     // can be added above if needed
     result = ReReplace(result, "&(.{2,6});", "", "ALL");    
     
     // Thats it.
     return result;
 
 }

---

