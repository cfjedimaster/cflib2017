---
layout: udf
title:  showDatabaseTablesMySQL
date:   2004-06-04T19:02:37.000Z
library: DatabaseLib
argString: "Path, Database[, Timeout]"
author: brandon wyckoff
authorEmail: bwyckoff2@cox.net
version: 1
cfVersion: CF6
shortDescription: This function will return all child tables of a mySQL database as an array.
tagBased: true
description: |
 This function will return a MySQL database and all child tables as an array
 without using a cfquery.
 
 provide the argument &quot;path&quot; which is the path to the mySql\bin directory being used.
 
 provide the argument &quot;database&quot; which is the name of the MySQL database.
 
 if necessary, provide the argument &quot;timeout&quot; which is the timeout in seconds for the request

returnValue: Returns an array.

example: |
 <cfscript>
  x = showDatabaseTablesMySQL('c:\mySql\bin', 'myDatabase', '30');
 </cfscript>
 
 <cfdump var="#x#">

args:
 - name: Path
   desc: Path to where mysqlshow exists.
   req: true
 - name: Database
   desc: Database to inspect.
   req: true
 - name: Timeout
   desc: Time to wait for results. Defaults to 30.
   req: false


javaDoc: |
 <!---
  This function will return all child tables of a mySQL database as an array.
  
  @param Path      Path to where mysqlshow exists. (Required)
  @param Database      Database to inspect. (Required)
  @param Timeout      Time to wait for results. Defaults to 30. (Optional)
  @return Returns an array. 
  @author brandon wyckoff (bwyckoff2@cox.net) 
  @version 1, June 4, 2004 
 --->

code: |
 <cffunction name="showDatabaseTablesMySQL">
     <cfargument name="path" required="true">
     <cfargument name="database" required="true">
     <cfargument name="timeout" required="false" default="30">
     <cfscript>
         var a = "";
         var x = "";
         var y = 1;
         database=replace(database, '_', '\_', 'all');
     </cfscript>
     <cfexecute name="#arguments.path#\mysqlshow" arguments="#arguments.database#" timeout="#arguments.timeout#" variable="mySQLDB"></cfexecute>
     <cfscript>
         a=replaceList(mySQLDB,'+,-, ,','');
         a=trim(a);
         x=arrayNew(1);
     </cfscript>
     <cfloop list="#a#" index="i" delimiters="|">
         <cfscript>
             if (not compareNoCase(left(i, 9), "Database:")) {
                     
             } else if (not compareNoCase(trim(replace(i, '|', '', 'all')),"Tables")) {
                     x = arrayNew(1);
             } else if (compareNoCase(trim(i), "")) {
                     x[y]=i;
                     y=y+1;            
             }
         </cfscript>
     </cfloop>
     <cfreturn x>
 </cffunction>

---

