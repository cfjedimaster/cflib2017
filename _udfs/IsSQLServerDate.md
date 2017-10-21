---
layout: udf
title:  IsSQLServerDate
date:   2013-06-19T22:18:07.000Z
library: DateLib
argString: "date[, type]"
author: Jon Hartmann
authorEmail: jon.hartmann@gmail.com
version: 1
cfVersion: CF5
shortDescription: Validates a string as valid datetime or smalldatetime string for SQL Server.
description: |
 Validates a string as valid datetime or smalldatetime string for SQL Server. Checks if the input is date and also if it is within the date range acceptable to to datetime or smalldatetime

returnValue: returns a boolean

example: |
 Is 12/25/1752 valid SQL Server datetime? <cfdump var="#IsSQLServerDate('12/25/1752')#"><br />
 Is 12/25/2002 valid SQL Server datetime? <cfdump var="#IsSQLServerDate('12/25/2002')#"><br />
 Is 12/25/9999 valid SQL Server datetime? <cfdump var="#IsSQLServerDate('12/25/9999')#"><br />
 Is 12/25/1899 valid SQL Server smalldatetime? <cfdump var="#IsSQLServerDate('12/25/1899', 'smalldatetime')#"><br />
 Is 12/25/2002 valid SQL Server smalldatetime? <cfdump var="#IsSQLServerDate('12/25/2002', 'smalldatetime')#"><br />
 Is 12/25/2099 valid SQL Server smalldatetime? <cfdump var="#IsSQLServerDate('12/25/2099', 'smalldatetime')#">

args:
 - name: date
   desc: Date to check
   req: true
 - name: type
   desc: Type - smalldatetime or datetime
   req: false


javaDoc: |
 <!---
  Validates a string as valid datetime or smalldatetime string for SQL Server.
  
  @param date      Date to check (Required)
  @param type      Type - smalldatetime or datetime (Optional)
  @return returns a boolean 
  @author Jon Hartmann (jon.hartmann@gmail.com) 
  @version 1, June 19, 2013 
 --->

code: |
 <cffunction name="IsSQLServerDate" returntype="boolean" output="false">
     <cfargument name="date" type="date" required="true"/>
     <cfargument name="type" type="string" required="false" default="datetime"/>
 
     <cfswitch expression="#arguments.type#">
         <cfcase value="datetime">
             <cfreturn IsDate(arguments.date) AND Year(arguments.date) gte 1753 />
         </cfcase>
         <cfcase value="smalldatetime">
             <cfreturn IsDate(arguments.date) AND DateCompare(arguments.date, '1/1/1900') gte 0 AND DateCompare(arguments.date, '6/2/2079') lte 0 />
         </cfcase>
     </cfswitch>
 </cffunction>

---

