---
layout: udf
title:  XSLTCF5
date:   2004-09-20T12:22:48.000Z
library: DataManipulationLib
argString: "Source, Style"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: Processes an XSL Template against an XML document and returns the transformed content.
description: |
 Returns the Transformed content of an XML document from a specified XSL document. This function uses the MSXML processor. (Tested on MSXML3+)

returnValue: Returns the XML data with formatting.

example: |
 <!---
 <cfset sourceDoc="#GetDirectoryFromPath(GetCurrentTemplatePath())#cd_list.xml">
 <cfset styleDoc="#GetDirectoryFromPath(GetCurrentTemplatePath())#cd_list.xsl">
 <cfoutput>#xsltcf5(sourceDoc,styleDoc)#</cfoutput>
 Commented out since the COM object has issues on this box.
 --->

args:
 - name: Source
   desc: XML Source
   req: true
 - name: Style
   desc: XML Stylesheet
   req: true


javaDoc: |
 /**
  * Processes an XSL Template against an XML document and returns the transformed content.
  * 
  * @param Source      XML Source (Required)
  * @param Style      XML Stylesheet (Required)
  * @return Returns the XML data with formatting. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, September 20, 2004 
  */

code: |
 function xsltcf5(source,style){
     // Instantiate COM Objects
     var objSource=CreateObject("COM", "Microsoft.XMLDOM", "INPROC");
     var objStyle=CreateObject("COM", "Microsoft.XMLDOM", "INPROC");
     var sourceReturn = "";
     var styleReturn = "";
     var styleRoot = "";
     var xsloutput = "";
     // Parse XML
     objSource.async = "false";
     sourceReturn = objSource.load("#source#");
     // Parse XSL
     objStyle.async = "false";
     styleReturn = objStyle.load("#style#");
     // Transform Document 
     styleRoot = objStyle.documentElement;
     xsloutput = objSource.transformNode(styleRoot);
     // Output Results
     return xsloutput;
 }

---

