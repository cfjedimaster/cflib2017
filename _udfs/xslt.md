---
layout: udf
title:  xslt
date:   2006-01-16T20:27:34.000Z
library: DataManipulationLib
argString: "xmlSource, xslSource[, stParameters]"
author: Mark Mandel
authorEmail: mark@compoundtheory.com
version: 2
cfVersion: CF6
shortDescription: Provides CFMX native XSL transformations using Java, with support for parameter pass through and relative &amp;lt;xsl&#58;import&amp;gt; tags.
description: |
 This UDF using CFMX's underlying Java XML/XSL engine to provide support for XSL transformations.  Natively CFMX does not provide support for parameters to be passed through to XSL stylesheets, nor does it allow for relative use of &amp;lt;xsl:import&amp;gt; tags due to the fact that xsl files must first be read into memory via &lt;CFFILE&gt;.  This UDF works around this by leveraging the underlying Java which supports parameter pass through, and also allows you enter a file path for your xml/xsl document.
 
 Syntax:
 XSLT(xmlsource, xslsource [, stParameters])
 
 Arguments:
 xmlSource - either a valid xml document as a string, or a absolute file path to a XML file.
 xslSource - either a valid XSL document as a string, or a absolute file path to a XSL file.
 stParameters (optional) - a structure of xsl:param elements to pass through where the key is the name of the param, and the value is the value of the param being passed through.  Do note that StructInsert() will need to be used as param names are case sensitive, and otherwise the struct key value will be in uppercase.

returnValue: Returns a string.

example: |
 <cfxml variable="xml">
 <!--- valid xml doc --->
 </cfxml>
 
 <cfxml variable="xsl">
 <!--- valid xsl doc --->
 </cfxml>
 
 <cfscript>
  stParams = StructNew();
  StructInsert(stParams, "root", "http://www.mysite.com");
 </cfscript>
 
 <cfoutput>#xslt(xml, xsml, stParams)#</cfoutput>
 OR
 
 <cfoutput>#xslt("c:\xmlFile.xml", xsl, stParams)#</cfoutput>
 
 OR
 
 <cfoutput>#xslt(xml, "c:\xslFile.xsl", stParams)#</cfoutput>
 
 OR
 
 <cfoutput>#xslt(("c:\xmlFile.xml", "c:\xslFile.xsl", stParams)#</cfoutput>

args:
 - name: xmlSource
   desc: The XML Source.
   req: true
 - name: xslSource
   desc: The XSL Source.
   req: true
 - name: stParameters
   desc: XSL Parameters.
   req: false


javaDoc: |
 <!---
  Provides CFMX native XSL transformations using Java, with support for parameter pass through and relative &amp;lt;xsl:import&amp;gt; tags.
  Version 1 was by Dan Switzer
  
  @param xmlSource      The XML Source. (Required)
  @param xslSource      The XSL Source. (Required)
  @param stParameters      XSL Parameters. (Optional)
  @return Returns a string. 
  @author Mark Mandel (mark@compoundtheory.com) 
  @version 2, January 16, 2006 
 --->

code: |
 <cffunction name="xslt" returntype="string" output="No">
     <cfargument name="xmlSource" type="string" required="yes">
     <cfargument name="xslSource" type="string" required="yes">
     <cfargument name="stParameters" type="struct" default="#StructNew()#" required="No">
     
     <cfscript>
         var source = "";        var transformer = "";    var aParamKeys = "";    var pKey = "";
         var xmlReader = "";        var xslReader = "";        var pLen = 0;
         var xmlWriter = "";        var xmlResult = "";        var pCounter = 0;
         var tFactory = createObject("java", "javax.xml.transform.TransformerFactory").newInstance();
         
         //if xml use the StringReader - otherwise, just assume it is a file source.
         if(Find("<", arguments.xslSource) neq 0)
         {
             xslReader = createObject("java", "java.io.StringReader").init(arguments.xslSource);
             source = createObject("java", "javax.xml.transform.stream.StreamSource").init(xslReader);
         }
         else
         {
             source = createObject("java", "javax.xml.transform.stream.StreamSource").init("file:///#arguments.xslSource#");
         }
         
         transformer = tFactory.newTransformer(source);
         
         //if xml use the StringReader - otherwise, just assume it is a file source.
         if(Find("<", arguments.xmlSource) neq 0)
         {
             xmlReader = createObject("java", "java.io.StringReader").init(arguments.xmlSource);
             source = createObject("java", "javax.xml.transform.stream.StreamSource").init(xmlReader);
         }
         else
         {
             source = createObject("java", "javax.xml.transform.stream.StreamSource").init("file:///#arguments.xmlSource#");
         }
         
         //use a StringWriter to allow us to grab the String out after.
         xmlWriter = createObject("java", "java.io.StringWriter").init();
         
         xmlResult = createObject("java", "javax.xml.transform.stream.StreamResult").init(xmlWriter);        
         
         if(StructCount(arguments.stParameters) gt 0)
         {
             aParamKeys = structKeyArray(arguments.stParameters);
             pLen = ArrayLen(aParamKeys);
             for(pCounter = 1; pCounter LTE pLen; pCounter = pCounter + 1)
             {
                 //set params
                 pKey = aParamKeys[pCounter];
                 transformer.setParameter(pKey, arguments.stParameters[pKey]);            
             }    
         }
         
         transformer.transform(source, xmlResult);
         
         return xmlWriter.toString();
     </cfscript>
 </cffunction>

---

