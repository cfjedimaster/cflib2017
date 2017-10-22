---
layout: udf
title:  xmlExtractList
date:   2004-01-13T21:19:09.000Z
library: DataManipulationLib
argString: "inString, tagName[, delimiter]"
author: Samuel Neff
authorEmail: sam@serndesign.com
version: 1
cfVersion: CF6
shortDescription: Extracts the text of named XML elements and returns it in a list.
tagBased: true
description: |
 This UDF searches for all elements matching the specified tag name and returns a list from the text within those elements.

returnValue: Returns a string.

example: |
 <cfxml variable="EntryXML">
 <users>
  <salesman>
   <systemname>user</systemname>
   <fullname>Mike Smith</fullname>
   <email>MSmith@noDomain.com</email>
  </salesman>
  <salesman>
   <systemname>user</systemname>
   <fullname>mark Hendrix Smith</fullname>
   <email>MHendrix@noDomain.com</email>
  </salesman>
  <salesman>
   <systemname>user</systemname>
   <fullname>Tammy Cochran</fullname>
   <email>MCochran@noDomain.com</email>
  </salesman>
  <salesman>
   <systemname>user</systemname>
   <fullname>Mike Smith</fullname>
   <email>MSmith@noDomain.com</email>
  </salesman>
 </users>
 </cfxml>
 
 <cfoutput>#xmlExtractList(EntryXML, "email")#</cfoutput>

args:
 - name: inString
   desc: Either an XML object or a string representation.
   req: true
 - name: tagName
   desc: Tag to look for.
   req: true
 - name: delimiter
   desc: Delimiter for returned string. Defaults to a comma.
   req: false


javaDoc: |
 <!---
  Extracts the text of named XML elements and returns it in a list.
  
  @param inString      Either an XML object or a string representation. (Required)
  @param tagName      Tag to look for. (Required)
  @param delimiter      Delimiter for returned string. Defaults to a comma. (Optional)
  @return Returns a string. 
  @author Samuel Neff (sam@serndesign.com) 
  @version 1, March 16, 2004 
 --->

code: |
 <cffunction name="xmlExtractList" returnType="string" output="no">
    <cfargument name="inString" type="any">
    <cfargument name="tagName" type="string">
    <cfargument name="delim" default=",">
    
    <cfset var inXML = "">
    
    <cfset var elementsArray = "">
    <cfset var valuesArray = arrayNew(1)>
    <cfset var i=1>
    <cfset var j=1>
    <cfset var ret = "">
    
    <cfif isXmlDoc(arguments.inString)>
       <cfset inXML = arguments.inString>
    <cfelse>
       <cfset inXML  = xmlParse(arguments.inString)>
    </cfif>
    
    <cfset elementsArray = xmlSearch(inXML, "//" & arguments.tagName)>
 
    
    <cfloop index="j" from="1" to="#arrayLen(elementsArray)#">
       <cfif elementsArray[j].xmlText neq "">
          <cfset valuesArray[i] = elementsArray[j].xmlText>
          <cfset i=i+1>
       </cfif>
    </cfloop>
    
    <cfset ret = arrayToList(valuesArray, arguments.delim)>
    <cfreturn ret>
 </cffunction>

---

