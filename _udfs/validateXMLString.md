---
layout: udf
title:  validateXMLString
date:   2004-02-19T00:42:43.000Z
library: DataManipulationLib
argString: "xmlString[, throwError][, baseURL]"
author: Massimo Foti
authorEmail: massimo@massimocorner.com
version: 1
cfVersion: CF6
shortDescription: Validate a formatted XML string against a DTD.
description: |
 Validate a formatted XML string against a DTD.

returnValue: Returns a boolean.

example: |
 Please see the examples here: http://www.massimocorner.com/demos/validateXMLString.zip

args:
 - name: xmlString
   desc: XML to validate.
   req: true
 - name: throwError
   desc: Determines if the UDF should throw an error if the XML string doesnt validate. Defaults to false.
   req: false
 - name: baseURL
   desc: Needed to resolve url found in the DOCTYPE declaration and external entity references. Format must be&#58; http&#58;//www.mydomain.com/xmldirectory/
   req: false


javaDoc: |
 <!---
  Validate a formatted XML string against a DTD.
  
  @param xmlString      XML to validate. (Required)
  @param throwError      Determines if the UDF should throw an error if the XML string doesnt validate. Defaults to false. (Optional)
  @param baseURL      Needed to resolve url found in the DOCTYPE declaration and external entity references. Format must be: http://www.mydomain.com/xmldirectory/ (Optional)
  @return Returns a boolean. 
  @author Massimo Foti (massimo@massimocorner.com) 
  @version 1, February 18, 2004 
 --->

code: |
 <cffunction name="validateXMLString" output="false" returntype="boolean" hint="Validate a formatted XML string against a DTD">
     <cfargument name="xmlString" type="string" required="true" hint="XML document as string">
     <cfargument name="throwerror" type="boolean" required="false" default="false" hint="Throw an exception if the document isn't valid">
     <cfargument name="baseUrl" type="string" required="false" default="" hint="Needed to resolve url found in the DOCTYPE declaration and external entity references. Format must be: http://www.mydomain.com/xmldirectoty/">
     <cfset var isValid=true>
     <cfset var jStringReader="">
     <cfset var xmlInputSource="">
     <cfset var saxFactory="">
     <cfset var xmlReader="">
     <cfset var eHandler="">
     <cftry>
         <cfscript>
         //Use Java string reader to read the CFML variable
         jStringReader = CreateObject("java","java.io.StringReader").init(arguments.xmlString);
         //Turn the string into a SAX input source 
         xmlInputSource = CreateObject("java","org.xml.sax.InputSource").init(jStringReader);
         //Call the SAX parser factory
         saxFactory = CreateObject("java","javax.xml.parsers.SAXParserFactory").newInstance();
         //Creates a SAX parser and get the XML Reader
         xmlReader = saxFactory.newSAXParser().getXMLReader();
         //Turn on validation
         xmlReader.setFeature("http://xml.org/sax/features/validation",true);
         //Add a system id if required
         if(IsDefined("arguments.baseUrl")){
             xmlInputSource.setSystemId(arguments.baseUrl);
         }
         //Create an error handler
         eHandler = CreateObject("java","org.apache.xml.utils.DefaultErrorHandler").init();
         //Assign the error handler
         xmlReader.setErrorHandler(eHandler);
         </cfscript>
         <!--- Throw an exception in case any Java initialization failed --->
         <cfcatch type="Object">
             <cfthrow message="validateXMLString: failed to initialize Java objects" type="validateXMLString">
         </cfcatch>
     </cftry>
     <cftry>
         <cfset xmlReader.parse(xmlInputSource)>
         <!--- Catch SAX's exception and set the flag --->
     <cfcatch type="org.xml.sax.SAXParseException">
         <!--- The SAX parser failed to validate the document --->
         <cfset isValid=false>
         <cfif arguments.throwerror>
             <!--- Throw an exception with the error message if required    --->
             <cfthrow message="validateXMLString: Failed to validate the document, #cfcatch.Message#" type="validateXMLString">
         </cfif>
     </cfcatch>
     </cftry>
     <!--- Return the boolean --->
     <cfreturn isValid>
 </cffunction>

---

