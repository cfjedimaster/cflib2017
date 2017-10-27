---
layout: udf
title:  StructRenameKey
date:   2002-06-26T19:02:40.000Z
library: DataManipulationLib
argString: "struct, key, newkey[, allowOverwrite]"
author: Erki Esken
authorEmail: erki@dreamdrummer.com
version: 1
cfVersion: CF5
shortDescription: Renames a specified key in the specified structure.
tagBased: false
description: |
 Renames a specified key in the specified structure. You can optionally choose if overwriting existing key is allowed or not (by default overwriting is not allowed).

returnValue: Returns a structure.

example: |
 <cfscript>
     foo = StructNew();
     foo["foo"] = ArrayNew(1);
     foo["foo"][1] = "foo one";
     foo["foo"][2] = "foo two";
     foo["bar"] = "bar";
     foo["foobar"] = "foobar";
 </cfscript>
 
 Original:
 <cfdump var="#foo#">
 
 <br>
 
 Renamed (allowoverwrite = false):
 <cfset foo = StructRenameKey(foo, "foo", "foobar")>
 <cfdump var="#foo#">
 
 <br>
 
 Renamed (allowoverwrite = true):
 <cfset foo = StructRenameKey(foo, "foo", "foobar", true)>
 <cfdump var="#foo#">

args:
 - name: struct
   desc: The structure to modify.
   req: true
 - name: key
   desc: The key to rename.
   req: true
 - name: newkey
   desc: The new name of the key.
   req: true
 - name: allowOverwrite
   desc: Boolean to determine if an existing key can be overwritten. Defaults to false.
   req: false


javaDoc: |
 /**
  * Renames a specified key in the specified structure.
  * 
  * @param struct      The structure to modify. (Required)
  * @param key      The key to rename. (Required)
  * @param newkey      The new name of the key. (Required)
  * @param allowOverwrite      Boolean to determine if an existing key can be overwritten. Defaults to false. (Optional)
  * @return Returns a structure. 
  * @author Erki Esken (erki@dreamdrummer.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function StructRenameKey(struct, key, newkey) {
     // Allow overwriting existing keys or not?
     var AllowOverWrite = false;
     switch (ArrayLen(Arguments)) {
         case "4":
             AllowOverWrite = Arguments[4];
     }
 
     // No key or keys are the same? Return.
     if (NOT StructKeyExists(struct, key) OR CompareNoCase(key, newkey) EQ 0)
         return struct;
 
     if (NOT AllowOverWrite AND StructKeyExists(struct, newkey)) {
         // New key already exists and overwriting is off? Return.
         return struct;
     } else {
         // Duplicate and delete old. Return.
         struct[newkey] = Duplicate(struct[key]);
         StructDelete(struct, key);
         return struct;
     }
 }

oldId: 561
---

