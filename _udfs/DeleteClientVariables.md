---
layout: udf
title:  DeleteClientVariables
date:   2001-11-19T02:33:52.000Z
library: UtilityLib
argString: "[safeList]"
author: Bernd VanSkiver
authorEmail: bernd@shadowdesign.net
version: 2
cfVersion: CF5
shortDescription: This function deletes all client variables for a user.
tagBased: false
description: |
 This function deletes all client variables for a user. An optional list can be passed to ignore certain client variables.

returnValue: Returns true.

example: |
 No example for this code since we do not use client variables on cflib.org.

args:
 - name: safeList
   desc: A list of client vars to NOT delete.
   req: false


javaDoc: |
 /**
  * This function deletes all client variables for a user.
  * Version 2 mods by Tony Petruzzi
  * 
  * @param safeList      A list of client vars to NOT delete. 
  * @return Returns true. 
  * @author Bernd VanSkiver (bernd@shadowdesign.net) 
  * @version 2, January 29, 2002 
  */

code: |
 function DeleteClientVariables() {
     var ClientVarList = GetClientVariablesList();
     var safeList = "";
     var i = 1;
 
     if(ArrayLen(Arguments) gte 1) safeList = Arguments[1];
 
     for(i=1; i lte listLen(ClientVarList); i=i+1) {
         if(NOT ListFindNoCase(safeList, ListGetAt(ClientVarList, i )))  DeleteClientVariable(ListGetAt(ClientVarList, i));
     }
     return true;
 }

oldId: 318
---

