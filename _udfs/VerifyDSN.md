---
layout: udf
title:  VerifyDSN
date:   2002-07-01T18:36:32.000Z
library: DatabaseLib
argString: "dsn"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF6
shortDescription: Verifies a DSN is working.
tagBased: true
description: |
 Verifies a DSN is working.  It will verify whether the specified DSN is working, not whether it exists.  This UDF uses the coldfusion.server.ServiceFactory object.

returnValue: Returns a Boolean.

example: |
 <CFOUTPUT>
 Is CFLib.org's main DSN working?: #VerifyDSN("#Request.App.dsn#")#
 </CFOUTPUT>

args:
 - name: dsn
   desc: Name of a DSN you want to verify.
   req: true


javaDoc: |
 <!---
  Verifies a DSN is working.
  
  @param dsn      Name of a DSN you want to verify. (Required)
  @return Returns a Boolean. 
  @author Ben Forta (ben@forta.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <CFFUNCTION NAME="VerifyDSN" RETURNTYPE="boolean">
    <CFARGUMENT NAME="dsn" TYPE="string" REQUIRED="yes">
 
    <!--- initialize variables --->
    <CFSET var dsService="">
    <!--- Try/catch block, throws errors if bad DSN --->
    <CFSET var result="true">
 
 
    <CFTRY>
       <!--- Get "factory" --->
       <CFOBJECT ACTION="CREATE"
                 TYPE="JAVA"
                 CLASS="coldfusion.server.ServiceFactory"
                 NAME="factory">
       <!--- Get datasource service --->
       <CFSET dsService=factory.getDataSourceService()>
       <!--- Validate DSN --->
       <CFSET result=dsService.verifyDatasource(dsn)>
 
       <!--- If any error, return FALSE --->
       <CFCATCH TYPE="any">
          <CFSET result="false">
       </CFCATCH>
    </CFTRY>
 
    <CFRETURN result>
 </CFFUNCTION>

oldId: 685
---

