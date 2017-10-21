---
layout: udf
title:  validateXMLFile
date:   2004-02-19T00:50:15.000Z
library: DataManipulationLib
argString: "xmlUrl[, throwOnError][, fileLocktimeout]"
author: Massimo Foti
authorEmail: massimo@massimocorner.com
version: 1
cfVersion: CF6
shortDescription: Validate an XML file against a DTD.
description: |
 Validate an XML file against a DTD.

returnValue: Returns a boolean.

example: |
 Please see the example at: http://www.massimocorner.com/demos/validateXMLFile.zip

args:
 - name: xmlUrl
   desc: File location of the XML document.
   req: true
 - name: throwOnError
   desc: Determines if the UDF should throw an error if the XML file doesn't validate. Defaults to false.
   req: false
 - name: fileLocktimeout
   desc: Specifies how long CF should wait to obtain a lock on the file. Defaults to 5.
   req: false


javaDoc: |
 <!---
  Validate an XML file against a DTD.
  
  @param xmlUrl      File location of the XML document. (Required)
  @param throwOnError      Determines if the UDF should throw an error if the XML file doesn't validate. Defaults to false. (Optional)
  @param fileLocktimeout      Specifies how long CF should wait to obtain a lock on the file. Defaults to 5. (Optional)
  @return Returns a boolean. 
  @author Massimo Foti (massimo@massimocorner.com) 
  @version 1, February 18, 2004 
 --->

code: |
 <cffunction name="validateXMLFile" output="false" returntype="boolean" hint="Validate an XML file against a DTD">
     <cfargument name="xmlUrl" type="string" required="true" hint="XML document url">
     <cfargument name="throwerror" type="boolean" required="false" default="false" hint="Throw an exception if the document isn't valid">
     <cfargument name="fileLockTimeout" type="numeric" required="false" default="5" hint="Specifies the maximum amount of time, to wait to obtain a lock on the file">
     <cfset var isValid=true>
     <cfset var saxFactory="">
     <cfset var xmlReader="">
     <cfset var eHandler="">
     <!--- Better to be sure the file exist --->
     <cfif NOT FileExists(arguments.xmlUrl)>
         <cfthrow message="validateXMLFile: #arguments.xmlUrl# doesn't exist" type="validateXMLFile">
     </cfif>
     <cftry>
         <cfscript>
         //Call the SAX parser factory
         saxFactory = CreateObject("java","javax.xml.parsers.SAXParserFactory").newInstance();
         //Creates a SAX parser and get the XML Reader
         xmlReader = saxFactory.newSAXParser().getXMLReader();
         //Turn on validation
         xmlReader.setFeature("http://xml.org/sax/features/validation",true);
         //Create an error handler
         eHandler = CreateObject("java","org.apache.xml.utils.DefaultErrorHandler").init();
         //Assign the error handler
         xmlReader.setErrorHandler(eHandler);
         </cfscript>
         <!--- Throw an exception in case any Java initialization failed --->
         <cfcatch type="Object">
             <cfthrow message="validateXMLFile: failed to initialize Java objects" type="validateXMLFile">
         </cfcatch>
     </cftry>
     <cftry>
         <!--- 
         Since we are reading the file, we better lock it.
         Safer thing to do is to use the file's url as name for the lock
          --->
         <cflock name="#arguments.xmlUrl#" timeout="#arguments.fileLockTimeout#" throwontimeout="yes" type="readonly">
             <cfset xmlReader.parse(arguments.xmlUrl)>
         </cflock>
         <!--- Catch SAX's exception and set the flag --->
     <cfcatch type="org.xml.sax.SAXParseException">
         <!--- The SAX parser failed to validate the document --->
         <cfset isValid=false>
         <cfif arguments.throwerror>
             <!--- Throw an exception with the error message if required    --->
             <cfthrow message="validateXMLFile: Failed to validate the document, #cfcatch.Message#" type="validateXMLFile">
         </cfif>
     </cfcatch>
     </cftry>
     <!--- Return the boolean --->
     <cfreturn isValid>
 </cffunction>

---

