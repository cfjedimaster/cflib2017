---
layout: udf
title:  xmlDoctoString
date:   2003-08-02T11:59:27.000Z
library: DataManipulationLib
argString: "xmlDoc"
author: Massimo Foti
authorEmail: massimo@massimocorner.com
version: 1
cfVersion: CF6
shortDescription: Converts an CF XML objects to string without the XML declaration.
tagBased: true
description: |
 Converts an CF XML objects to string without the XML declaration.
 In order to understand the need to have such a UDF you have to remember that CF always return the XML declaration when you turn an XML Doc to a string.

returnValue: Returns a string.

example: |
 <!--- Generate the XML doc --->
 <cfsavecontent variable="xmlString">
     <geeks_list>
         <geek city="Washinton D.C." name="Tom Muck">The only guy I know able to write a whole book using more than 6 different server-side languages</geek>
         <geek city="Lugano (Switzerland)" name="Massimo Foti">The man who learned JavaScript in order to avoid learning german</geek>
         <geek city="Los Angeles" name="Angela Buraglia">By far the cutiest geek in town</geek>
         <geek city="Seattle" name="Dan Short">Be careful with him, he married a trained killer...</geek>
     </geeks_list>    
 </cfsavecontent>
 
 <cfoutput>#htmlEditFormat(xmlDoctoString(xmlString))#</cfoutput>
 
 <!--- 
 In order to understand the need to have such a UDF try the CFML code below. 
 Basically CF always return the XML declaration when you turn an XML  Doc to string:
 --->
 <cfset XMLDoc=XmlParse(xmlString, "yes")>
 <cfoutput>#htmlEditFormat(ToString(XMLDoc))#</cfoutput>

args:
 - name: xmlDoc
   desc: Either a XML document or string.
   req: true


javaDoc: |
 <!---
  Converts an CF XML objects to string without the XML declaration.
  
  @param xmlDoc      Either a XML document or string. (Required)
  @return Returns a string. 
  @author Massimo Foti (massimo@massimocorner.com) 
  @version 1, August 2, 2003 
 --->

code: |
 <cffunction name="xmlDoctoString" output="no" returntype="string" displayname="xmlDoctoString" hint="Extract the root element inside an XML Doc and return it as a string">
     <cfargument name="xmlDoc" type="string" required="true" displayname="xmlDoc" hint="An XML Doc or a well formed XML string">
     <cfset var xmlToParse="">
     <!--- Check to see if the argument is already an XMLDoc --->
     <cfif IsXmlDoc(arguments.xmlDoc)>
         <cfset xmlToParse=arguments.xmlDoc>
     <cfelse>
         <!--- We need a parsed XML doc, not just a simple string --->
         <cftry>
             <cfset xmlToParse=XmlParse(arguments.xmlDoc, "yes")>
             <!--- Failed parsing, the string culd be not a well formed XML, throw an exception --->
             <cfcatch type="Any">
                 <cfthrow message="xmlDoctoString: failed to parse argument.xmlDoc" type="xmlDoctoString">
             </cfcatch>
         </cftry>
     </cfif>
     <cfreturn xmlToParse.getDocumentElement().toString()>
 </cffunction>

oldId: 944
---

