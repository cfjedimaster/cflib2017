---
layout: udf
title:  isORM
date:   2010-05-30T22:14:30.000Z
library: DatabaseLib
argString: "item"
author: John Farrar
authorEmail: johnfarrar@sosensible.com
version: 1
cfVersion: CF9
shortDescription: Validates if item is orm entity or collection.
tagBased: false
description: |
 There is no built in way to check this with a single function at this time. So I created a way to check if the element was either and ORM entity or collection of entities.

returnValue: Returns a boolean.

example: |
 <cfscript>
 myStruct = structNew();
 myQuery = queryNew();
 selector = { id = 12 };
 myEntity = EntityLoad('entityClass',selector,true);
 </cfscript>
 
 <cfoutput>
 myStruct : #is_orm(myStruct)#<br>
 myQuery : #is_orm(myQuery)#<br>
 myEntity: #is_orm(myEntity)#<br>
 </cfoutput>
 - - - - - 
 This will give the following result.
 - - - - -
 myStruct : false
 myQuery : false
 myEntity : true
 
 - - - - -
 
 We are using this logic inside our ReturnData.cfc inside COOP. It enables us to treat the entity as a generic data source and integrate lists, array of structures, queries and entities as data sources without having to manually set an attribute on custom tags and object methods. It's nice to have some intuition in our code.

args:
 - name: item
   desc: Value to check.
   req: true


javaDoc: |
 /**
  * Validates if item is orm entity or collection.
  * 
  * @param item      Value to check. (Required)
  * @return Returns a boolean. 
  * @author John Farrar (johnfarrar@sosensible.com) 
  * @version 1, May 30, 2010 
  */

code: |
 function isORM(item) {
     var metaItem = {};
     try {
         if(isArray(arguments.item) && arrayLen(arguments.item)){
             metaItem = getMetadata(arguments.item[1]);
         } else {
             metaItem = getMetadata(arguments.item);
         }
         if(structKeyExists(metaItem,'persistent') && metaItem.persistent){
             return true;
         } else {
             return false;
         }
     } catch(any e) {
         return false;
     }
 }

---

