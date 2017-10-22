---
layout: udf
title:  Ping
date:   2008-10-14T21:12:25.000Z
library: NetLib
argString: "host"
author: Elias
authorEmail: eliasjp@msn.com
version: 1
cfVersion: CF8
shortDescription: Pings a website using .net framework
tagBased: true
description: |
 Sometime you would like to ping URLs to check their availability just like using windows run command ping &lt;ip/url&gt;

returnValue: A string containing the results of the ping.

example: |
 <h3>Ping Test</h3>
 <cfoutput>
     Almontel 1: #Ping("www.almontel1.com")#<br>
     Almontel 2: #Ping("www.almontel2.com")#<br>
 </cfoutput>

args:
 - name: host
   desc: URL/IP that you would like to ping.
   req: true


javaDoc: |
 <!---
  Pings a website using .net framework
  
  @param host      URL/IP that you would like to ping. (Required)
  @return A string containing the results of the ping. 
  @author Elias (eliasjp@msn.com) 
  @version 1, October 14, 2008 
 --->

code: |
 <cffunction name="Ping" returntype="string" output="false" access="public">
     <cfargument name="host" type="string" required="yes">
     <!--- Local vars --->
     <cfset var pingClass="">
     <cfset var pingReply="">
     <!--- Get Ping class --->
     <cfobject type=".NET" name="pingClass"
             class="System.Net.NetworkInformation.Ping">
     <!--- Perform synchronous ping (using defaults) ---> 
     <cfset pingReply=pingClass.Send(Arguments.host)>
     <!--- Return result --->
     <cfreturn pingReply.Get_Status().ToString()>
 </cffunction>

---

