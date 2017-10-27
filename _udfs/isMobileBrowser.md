---
layout: udf
title:  isMobileBrowser
date:   2008-12-18T21:36:43.000Z
library: UtilityLib
argString: "apikey"
author: Chris Brickhouse
authorEmail: cbrickhouse@gmail.com
version: 2
cfVersion: CF7
shortDescription: Mobile browser detector.
tagBased: true
description: |
 Detects whether or not user is using mobile browser by using the user-agent. Requires an API key from handsetdetection.com.

returnValue: Returns a boolean.

example: |
 <cfif isMobileBrowser("apikey")>
    <cflocation url="#cgi.server_name#/mobile">
 <cfelse>
 <!--- do nothing --->
 </cfif>

args:
 - name: apikey
   desc: Required API key.
   req: true


javaDoc: |
 <!---
  Mobile browser detector.
  v2 by Raymond Camden. Fixed var scoping, and made API key a argument.
  
  @param apikey      Required API key. (Required)
  @return Returns a boolean. 
  @author Chris Brickhouse (cbrickhouse@gmail.com) 
  @version 2, December 18, 2008 
 --->

code: |
 <cffunction name="isMobileBrowser" returntype="boolean" output="false">
     <cfargument name="strAPI" type="string" required="true" hint="API Key">
     <cfset var cfhttp = "">
     <!---     
     set options for http post. 
     see the handsetdetection api for more options.
     http://www.handsetdetection.com/pages/api 
     --->
     <cfset var options = "geoip, product_info, display">
     <cfset var str ="">
     <!---    
     sign up for an API key from handsetdetection.com, otherwise this will not work.
     --->
     <cfset var thisxmlok = "">
     <cfset var thisxml = "">
     <cfset var server = "http://c1.handsetdetection.com/devices/vendors.xml">
     
     <cfset str = str & "<?xml version='1.0'?>">
     <cfset str = str & "<request>">
     <cfset str = str & "<apikey>#strAPI#</apikey>">
     <cfset str = str & "<options>#options#</options>">
     <cfset str = str & "<User-Agent>#cgi.http_user_agent#</User-Agent>">
     <cfset str = str & "</request>">
     <cftry>
         <cfhttp method="Post" url='http://c1.handsetdetection.com/devices/detect.xml' resolveurl="false" timeout="10" >
             <cfhttpparam type="xml" value="#str#" >
         </cfhttp>
         <cfset thisXML = xmlparse(cfhttp.FileContent)>
         <cfset thisXMLOK = thisxml.reply.message.xmlText>
         <cfcatch type="any">
             <cfreturn false>
         </cfcatch>            
     </cftry>
     <!--- throw if bad api, don't hide it... --->
     <cfif findNoCase("Invalid API", thisxmlok)>
         <cfthrow message="#thisxmlok#">
     </cfif>
     <cfif not comparenocase(thisxmlok,"OK")>
         <cftry>
             <cfset thisXMLOK = len(thisxml.reply.product_info.is_wireless_device.xmlText)>
             <cfif thisXMLOK>
                 <cfreturn true>
             <cfelse>
                 <cfreturn false>
             </cfif>
             <cfcatch type="any">
                 <cfreturn false>
             </cfcatch>
         </cftry>
     <cfelse>
         <cfreturn false>
     </cfif>
 </cffunction>

oldId: 1887
---

