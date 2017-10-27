---
layout: udf
title:  GetXmlAttribute
date:   2002-12-23T20:36:26.000Z
library: DataManipulationLib
argString: "node, attribute[, default]"
author: Kreig Zimmerman
authorEmail: kkz@foureyes.com
version: 1
cfVersion: CF6
shortDescription: Pass in an XML Node and attribute reference to receive the attribute's value.
tagBased: true
description: |
 This tag will allow you to retrieve an XML attribute from an XML node. Furthermore, if you are in the habit of needing default values in case the attribute's value is empty or the attribute does not exist, you can specify that as well.

returnValue: Returns a string.

example: |
 <cfxml variable="XmlScheme">
 <cfoutput>
 <xmlscheme>
     <xmlnode oneatt="1" threeatt="3">Some Content</xmlnode>
 </xmlscheme>
 </cfoutput>
 </cfxml>
 <cfdump var="#XmlScheme#">
 <cfscript>
     oneVar=GetXmlAttribute(XmlScheme.XmlRoot.XmlChildren[1],"oneatt");
     WriteOutput(oneVar);
     twoVar=GetXmlAttribute(XmlScheme.XmlRoot.XmlChildren[1],"twoatt",0);
     WriteOutput(twoVar);
 </cfscript>

args:
 - name: node
   desc: XML note to retrieve the attribute from.
   req: true
 - name: attribute
   desc: Attribute to retrieve.
   req: true
 - name: default
   desc: If attribute does not exist, return this default.
   req: false


javaDoc: |
 <!---
  Pass in an XML Node and attribute reference to receive the attribute's value.
  
  @param node      XML note to retrieve the attribute from. (Required)
  @param attribute      Attribute to retrieve. (Required)
  @param default      If attribute does not exist, return this default. (Optional)
  @return Returns a string. 
  @author Kreig Zimmerman (kkz@foureyes.com) 
  @version 1, December 23, 2002 
 --->

code: |
 <cffunction name="GetXmlAttribute" output="false" returntype="any">
     <cfargument name="node" type="any" required="yes">
     <cfargument name="attribute" type="string" required="Yes">
     <cfargument name="default" type="string" default="" required="false">
     <cfset var myResult="#arguments.default#">
     <cfif StructKeyExists(node.XmlAttributes, attribute)>
         <cfset myResult=node.XmlAttributes["#attribute#"]>
     </cfif>
     <cfreturn myResult>
 </cffunction>

oldId: 804
---

