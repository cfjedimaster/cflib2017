---
layout: udf
title:  JSCompressor
date:   2010-03-25T15:05:40.000Z
library: StrLib
argString: "JScode[, bRem]"
author: Jose Alberto Guerra
authorEmail: cheveguerra@gmail.com
version: 1
cfVersion: CF6
shortDescription: Compresses javascript code
tagBased: true
description: |
 This UDF compresses javascript code removing line comments, block comments, spaces, tabs and line feeds.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="str">
    // line commet 0
    text0=0;
    //line comment 1
    /**
    block comment 1
    ****/
    text1=1;
    /* ****
    block comment 2
    */
    text2=2;    // line comment 2
    // line comment 3
    /**********************************
    block comment 3
    *************************************/
    text3=3;
 </cfsavecontent>
 RESULT:"<cfoutput>#JSCompressor(str)#</cfoutput>"
 
 RESULT:"text0=0;text1=1;text2=2;text3=3;"

args:
 - name: JScode
   desc: javascript code to compress
   req: true
 - name: bRem
   desc: Boolean flag to remove block comments
   req: false


javaDoc: |
 <!---
  Compresses javascript code
  
  @param JScode      javascript code to compress (Required)
  @param bRem      Boolean flag to remove block comments (Optional)
  @return Returns a string. 
  @author Jose Alberto Guerra (cheveguerra@gmail.com) 
  @version 1, March 25, 2010 
 --->

code: |
 <cffunction name="jsCompressor" returntype="string" description="Compresses javascript code" output="false">
     <cfargument name="jscode" type="string" required="yes">
     <cfargument name="brem" type="boolean" required="no" default="true">
     <cfargument name="lrem" type="boolean" required="no" default="true">
     <cfargument name="spc" type="boolean" required="no" default="true">
     <cfargument name="ret" type="boolean" required="no" default="true">
     <cfset var linerem= "[^:]\/\/[^#chr(13)##chr(10)#]*">
     <cfset var blockrem1="/\*">
     <cfset var blockrem2="\*/">
     <cfset var blockrem="#chr(172)#[^#chr(172)#]*#chr(172)#">
     <cfset var spaces="[\s]*([\=|\{|\}|\(|\)|\;|[|\]|\+|\-|\n|\r]+)[\s]*">
     <cfset var retornos="[\r\n\f]*">
     <cfif brem>
         <cfset jscode = rereplacenocase(jscode,blockrem1,"#chr(172)#","all")>
         <cfset jscode = rereplacenocase(jscode,blockrem2,"#chr(172)#","all")>
         <cfset jscode = rereplacenocase(jscode,blockrem,"","all")>
     </cfif>
     <cfif lrem><cfset jscode = rereplacenocase(jscode,linerem,"","all")></cfif>
     <cfif spc><cfset jscode = rereplacenocase(jscode,spaces,"\1","all")></cfif>
     <cfif ret><cfset jscode = rereplacenocase(jscode,retornos,"","all")></cfif>
     <cfreturn jscode>
 </cffunction>

oldId: 2011
---

