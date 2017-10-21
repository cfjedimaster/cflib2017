---
layout: udf
title:  IsDatasource
date:   2002-06-21T11:53:00.000Z
library: UtilityLib
argString: "nameToCheck"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF6
shortDescription: Returns a boolean if the datasource name exists.
description: |
 Pass in a string, get a boolean back telling you if a datasource of that name exists.

returnValue: Returns a boolean.

example: |
 <cfoutput>#isDatasource("cfsnippets")#</cfoutput>

args:
 - name: nameToCheck
   desc: DSN to check for.
   req: true


javaDoc: |
 /**
  * Returns a boolean if the datasource name exists.
  * 
  * @param nameToCheck      DSN to check for. (Required)
  * @return Returns a boolean. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, June 21, 2002 
  */

code: |
 function isDatasource(nameToCheck) {
     //grab the datasourceService object
     var dsObj = createObject("Java","coldfusion.server.ServiceFactory");
     //check if the name is one of the datasources
     return structKeyExists(dsObj.datasourceService.getDatasources(),nameToCheck);
 }

---

