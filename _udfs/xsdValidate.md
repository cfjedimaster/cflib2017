---
layout: udf
title:  xsdValidate
date:   2004-09-23T14:42:40.000Z
library: DataManipulationLib
argString: "xmlPath, noNamespaceXsdUri, namespaceXsdUri, parseError"
author: Samuel Neff
authorEmail: sam@blinex.com
version: 1
cfVersion: CF6
shortDescription: Validates an XML file against an XML Schema (XSD).
description: |
 This UDF accepts a single XML file any one or more XSD files and validates the XML against the specified XSD(s).  Supports no-namespace validation and namespace-aware validation.  Returns true/false if valid and optionally a structure with the detailed error message if the XML file doesn't validate properly.
 
 Requires that the Xerces Java 2 parser be installed on the CFMX server.  http://xml.apache.org/xerces2-j/index.html
 
 The file paths must be specified as valid URI's.  The UDF makeUriFromPath can be used to convert absolute paths to URI's.

returnValue: Returns a boolean.

example: |
 <cfset err = structNew()>
 
 <cfset xmlUri = "file:///c:/test/bad.xml">
 <cfset xsdUri = "file:///c:/test/test.xsd">
 
 <cfoutput>
 Valid: #xsdValidate(xmlUri, xsdUri, "", err)#<br />
 </cfoutput>
 
 <cfdump var="#err#" label="Information about the error, if any">

args:
 - name: xmlPath
   desc: Path to XML file.
   req: true
 - name: noNamespaceXsdUri
   desc: Path to XML Schema file.
   req: true
 - name: namespaceXsdUri
   desc: Name space.
   req: true
 - name: parseError
   desc: Struct to contain error information.
   req: true


javaDoc: |
 <!---
  Validates an XML file against an XML Schema (XSD).
  
  @param xmlPath      Path to XML file. (Required)
  @param noNamespaceXsdUri      Path to XML Schema file. (Required)
  @param namespaceXsdUri      Name space. (Required)
  @param parseError      Struct to contain error information. (Required)
  @return Returns a boolean. 
  @author Samuel Neff (sam@blinex.com) 
  @version 1, April 14, 2005 
 --->

code: |
 <cffunction name="xsdValidate" returnType="boolean" output="false">
   <cfargument name="xmlPath" type="string">
   <cfargument name="noNamespaceXsdUri" type="string">
   <cfargument name="namespaceXsdUri" type="string">
   <cfargument name="parseError" type="struct">
   
   <cfscript>
     var parser = createObject("java","org.apache.xerces.parsers.SAXParser");
     
     var err = structNew();
     var k = "";
     var success = true;
     
     var eHandler = createObject(
                      "java",
                      "org.apache.xml.utils.DefaultErrorHandler");
     
     var apFeat = "http://apache.org/xml/features/";
     var apProp = "http://apache.org/xml/properties/";
     
     eHandler.init();
     
     if (structKeyExists(arguments, "parseError")) {
        err = arguments.parseError;
      }
     
     
     try {
        parser.setErrorHandler(eHandler);
        
        parser.setFeature(
           "http://xml.org/sax/features/validation", 
           true);
           
        parser.setFeature(
           apFeat & "validation/schema", 
           true);
           
        parser.setFeature(
           apFeat & "validation/schema-full-checking", 
           true);
        
        if (structKeyExists(arguments, "noNamespaceXsdUri") and 
            arguments.noNamespaceXsdUri neq "") {
           
           parser.setProperty(
             apProp & "schema/external-noNamespaceSchemaLocation",
             arguments.noNamespaceXsdUri
           
           );
         }
        
        if (structKeyExists(arguments, "namespaceXsdUri") and 
            arguments.namespaceXsdUri neq "") {
           
           parser.setProperty(
             apProp & "schema/external-schemaLocation",
             arguments.namespaceXsdUri
           );
         }
        
        
        parser.parse(arguments.xmlPath);
      } catch (Any ex) {
        structAppend(err, ex, true);
        success = false;
      }
   </cfscript>
 
   <cfreturn success>
   
 </cffunction>

---

