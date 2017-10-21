---
layout: udf
title:  easySocket
date:   2009-08-28T04:04:35.000Z
library: NetLib
argString: "host, port, message"
author: George Georgiou
authorEmail: george1977@gmail.com
version: 1
cfVersion: CF6
shortDescription: Connect to sockets through your ColdFusion application.
description: |
 This function allows ColdFusion developers to connect to remote hosts through the TCP/IP protocol and transmit messages. Very useful for implementing chat rooms, integrate with third party applications such as merchant carts etc.

returnValue: Returns a string.

example: |
 #easySocket('127.0.0.1','9999','Hello from ColdFusion')#

args:
 - name: host
   desc: Host to connect to.
   req: true
 - name: port
   desc: Port for connection.
   req: true
 - name: message
   desc: Message to be sent.
   req: true


javaDoc: |
 <!---
  Connect to sockets through your ColdFusion application.
  Mods by Raymond Camden
  
  @param host      Host to connect to. (Required)
  @param port      Port for connection. (Required)
  @param message      Message to be sent. (Required)
  @return Returns a string. 
  @author George Georgiou (george1977@gmail.com) 
  @version 1, August 27, 2009 
 --->

code: |
 <cffunction name="easySocket" access="private" returntype="any" hint="Uses Java Sockets to connect to a remote socket over TCP/IP" output="false">
 
     <cfargument name="host" type="string" required="yes" default="localhost" hint="Host to connect to and send the message">
     <cfargument name="port" type="numeric" required="Yes" default="8080" hint="Port to connect to and send the message">
     <cfargument name="message" type="string" required="yes" default="" hint="The message to transmit">
 
    <cfset var result = "">
    <cfset var socket = createObject( "java", "java.net.Socket" )>
    <cfset var streamOut = "">
     <cfset var output = "">
     <cfset var input = "">
 
    <cftry>
       <cfset socket.init(arguments.host,arguments.port)>
       <cfcatch type="Object">
          <cfset result = "Could not connected to host <strong>#arguments.host#</strong>, port <strong>#arguments.port#</strong>.">
          <cfreturn result>
       </cfcatch>  
    </cftry>
 
    <cfif socket.isConnected()>
        <cfset streamOut = socket.getOutputStream()>
        
        <cfset output = createObject("java", "java.io.PrintWriter").init(streamOut)>
        <cfset streamInput = socket.getInputStream()>
        
        <cfset inputStreamReader= createObject( "java", "java.io.InputStreamReader").init(streamInput)>
        <cfset input = createObject( "java", "java.io.BufferedReader").init(InputStreamReader)>
         
        <cfset output.println(arguments.message)>
        <cfset output.println()> 
        <cfset output.flush()>
        
        <cfset result=input.readLine()>
        <cfset socket.close()>
    <cfelse>
       <cfset result = "Could not connected to host <strong>#arguments.host#</strong>, port <strong>#arguments.port#</strong>.">
    </cfif>
    
    <cfreturn result>
 </cffunction>

---

