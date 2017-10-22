---
layout: udf
title:  viewCSS
date:   2005-12-20T18:55:33.000Z
library: UtilityLib
argString: "cssCode"
author: Shlomy Gantz
authorEmail: shlomy@bluebrick.com
version: 1
cfVersion: CF5
shortDescription: Returns a visual representation of stylesheet elements.
tagBased: false
description: |
 This function returns each stylesheet element (class,id...) name displayed using the same element's style.

returnValue: Returns a string.

example: |
 <cfscript>
 function viewCSS(cssCode) {
     var i ="";
     var cssItem="";
     var ret="";
     for(i=1;i lte listlen(arguments.cssCode,'}');i=i+1)
     {
     cssItem = listgetAt(arguments.cssCode,i,'}');
     if(findNocase('{',cssItem)){
                                 ret = ret & '<div style="#trim(mid(cssItem,findNocase("{",cssItem)+1,len(cssItem)))#">#trim(mid(cssItem,1,findNocase("{",cssItem)-1))#</div><br>';
                                 }
     }
     return ret;
 }
 </cfscript>
 <cfsavecontent variable="cssTxt">
 .panel {
   border-width:1px;
   border-style:solid;
   border-color:#cce6ff #668099 #668099 #cce6ff;
   background-color:#f0f0f0;
 }
 
 
 .header {
   font-family:verdana;
   font-size:14px;
   width:23px;
   text-align:center;
   color:#ffffff;
   background-color:#99b3cc;
   border-width:1px;
   border-style:solid;
   border-color:#cce6ff #668099 #668099 #cce6ff;
   padding:1px;
   cursor:pointer;
 }
 
 
 .footer {
   font-family:verdana;
   font-size:11px;
   width:50px;
   margin:0px 1px;
   text-align:center;
   color:#ffffff;
   background-color:#99b3cc;
   border-width:1px;
   border-style:solid;
   border-color:#cce6ff #668099 #668099 #cce6ff;
   padding:1px;
   cursor:pointer;
 }
 
 
 .title {
   font-family:verdana;
   font-size:11px;
   text-align:center;
   color:#ffffff;
   background-color:#cc9999;
   border-width:1px;
   border-style:solid;
   border-color:#996666 #ffcccc #ffcccc #996666;
   padding:0px 3px;
 }
 
 .time_list {
   font-family:verdana;
   font-size:12px;
 }
 
 </cfsavecontent>
 <CFOUTPUT>#viewCSS(cssTxt)#</CFOUTPUT>

args:
 - name: cssCode
   desc: CSS to parse.
   req: true


javaDoc: |
 /**
  * Returns a visual representation of stylesheet elements.
  * 
  * @param cssCode      CSS to parse. (Required)
  * @return Returns a string. 
  * @author Shlomy Gantz (shlomy@bluebrick.com) 
  * @version 1, December 20, 2005 
  */

code: |
 function viewCSS(cssCode) {
     var i ="";
     var cssItem="";
     var ret="";
     for(i=1;i lte listlen(arguments.cssCode,'}');i=i+1) {
         cssItem = listgetAt(arguments.cssCode,i,'}');
         if(findNocase('{',cssItem)) ret = ret & '<div style="#trim(mid(cssItem,findNocase("{",cssItem)+1,len(cssItem)))#">#trim(mid(cssItem,1,findNocase("{",cssItem)-1))#</div><br>';
     }
     return ret;
 }

---

