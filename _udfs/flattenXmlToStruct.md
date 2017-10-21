---
layout: udf
title:  flattenXmlToStruct
date:   2011-02-25T04:01:57.000Z
library: DateLib
argString: "xmlObject[, delimiter][, prefix][, stResult][, addPrefix]"
author: Arden Harrell
authorEmail: ArdMan_Da_Codehead@YAHOO.com
version: 1
cfVersion: CF8
shortDescription: Converts an XML Object into a single flattened struct.
description: |
 Recursively traverses through an XML object with nested nodes and builds a flattened structure object with a concatenated-key from the nested nodes.  This is useful for capturing data values from a PDF Form submitted in an XML format.  (http://ardenharrell.blogspot.com/2011/02/coldfusion-flatten-xml-object-to-struct.html)

returnValue: Returns a struct.

example: |
 <cfxml variable="xmlText">
 <?xml version="1.0" encoding="UTF-8"?>
 <fields xmlns:xfdf="http://ns.adobe.com/xfdf-transition/">
   <first_name>Stanley</first_name>
   <last_name>Silvers</last_name>
   <department>Marketing</department>
   <email>Stanley.Silvers@funkyDomain.com</email>
   <favorite_info>
     <favorite_food>Muffins</favorite_food>
     <favorite_shoe>Crocs</favorite_shoe>
     <favorite_place>Tim Horton's</favorite_place>
   </favorite_info>
 </fields>
 </cfxml>
 
 <cfset stFlattened = flattenXmlToStruct(xmlText.fields)>
 
 <cfset stFlattened = flattenXmlToStruct(xmlObject: xmlText.fields, delimiter: "@")>

args:
 - name: xmlObject
   desc: XML object to flatten.
   req: true
 - name: delimiter
   desc: Delimits keys. Defaults to .
   req: false
 - name: prefix
   desc: Prefixes keys. Defaults to nothing.
   req: false
 - name: stResult
   desc: Result struct. Allows you to pass in a structure by reference.
   req: false
 - name: addPrefix
   desc: Boolean that determines if the prefix attribute is used. Defaults to tru.
   req: false


javaDoc: |
 <!---
  Converts an XML Object into a single flattened struct.
  
  @param xmlObject      XML object to flatten. (Required)
  @param delimiter      Delimits keys. Defaults to . (Optional)
  @param prefix      Prefixes keys. Defaults to nothing. (Optional)
  @param stResult      Result struct. Allows you to pass in a structure by reference. (Optional)
  @param addPrefix      Boolean that determines if the prefix attribute is used. Defaults to tru. (Optional)
  @return Returns a struct. 
  @author Arden Harrell (ArdMan_Da_Codehead@YAHOO.com) 
  @version 1, February 24, 2011 
 --->

code: |
 <cffunction name="flattenXmlToStruct" access="public" output="false" returntype="struct">
     <cfargument name="xmlObject" required="true" type="xml" />
     <cfargument name="delimiter" required="false" type="string" default="." />
     <cfargument name="prefix"      required="false" type="string" default="" />
     <cfargument name="stResult" required="false" type="struct" />
     <cfargument name="addPrefix" required="false" type="boolean" default="true" />
     
     <cfset var sKey = '' />
     <cfset var currentKey = "">
     <cfset var arrIndx = "">
     
     <cfif NOT isDefined("arguments.stResult")>
       <cfset arguments.stResult = structNew()>
     </cfif>
     
     <cfloop from="1" to="#ArrayLen(arguments.xmlObject.XmlChildren)#" index="arrIndx">
        
        <cfset sKey = arguments.xmlObject.XmlChildren[arrIndx].XmlName>
        
        <cfif ArrayLen(arguments.xmlObject.XmlChildren[arrIndx].XmlChildren) EQ 0>
             <cfif arguments.addPrefix and len(arguments.prefix)>
                 <cfset arguments.stResult["#arguments.prefix##arguments.delimiter##sKey#"] = arguments.xmlObject.XmlChildren[arrIndx].XmlText />
             <cfelse>
                 <cfset arguments.stResult[sKey] = arguments.xmlObject.XmlChildren[arrIndx].XmlText />
             </cfif>
          
        <cfelse>    <!--- Node has more children... --->
 
             <cfif arguments.prefix EQ "">
               <cfset currentKey = sKey>
             <cfelse>
               <cfset currentKey = "#arguments.prefix##arguments.delimiter##sKey#">
             </cfif>
             <cfset flattenXmlToStruct(arguments.xmlObject.XmlChildren[arrIndx], arguments.delimiter, currentKey, arguments.stResult) />    
        
        </cfif>
     </cfloop>
     
     <cfreturn arguments.stResult />
 </cffunction>

---

