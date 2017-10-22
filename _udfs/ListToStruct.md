---
layout: udf
title:  ListToStruct
date:   2010-04-01T22:38:02.000Z
library: DataManipulationLib
argString: "list[, delimiter]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 2
cfVersion: CF5
shortDescription: Converts a delimited list of key/value pairs to a structure.
tagBased: false
description: |
 Converts a delimited list of key/value pairs to a structure.  This function gives you the equivalent of StructNew() with constructor support.

returnValue: Returns a structure.

example: |
 <CFSET MyList="key1=value1&key2=value2&key3=value3">
 <CFSET x=ListToStruct(MyList, "&")>
 <CFSET y=ListToStruct("a=1: b=2: c=3", ":")>
 
 <CFDUMP VAR="#x#">
 <CFDUMP VAR="#y#">

args:
 - name: list
   desc: List of key/value pairs to initialize the structure with.  Format follows key=value.
   req: true
 - name: delimiter
   desc: Delimiter seperating the key/value pairs.  Default is the comma.
   req: false


javaDoc: |
 /**
  * Converts a delimited list of key/value pairs to a structure.
  * v2 mod by James Moberg
  * 
  * @param list      List of key/value pairs to initialize the structure with.  Format follows key=value. (Required)
  * @param delimiter      Delimiter seperating the key/value pairs.  Default is the comma. (Optional)
  * @return Returns a structure. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 2, April 1, 2010 
  */

code: |
 function listToStruct(list){
        var myStruct = StructNew();
        var i = 0;
        var delimiter = ",";
        var tempList = arrayNew(1);
        if (ArrayLen(arguments) gt 1) {delimiter = arguments[2];}
        tempList = listToArray(list, delimiter);
        for (i=1; i LTE ArrayLen(tempList); i=i+1){
                if (not structkeyexists(myStruct, trim(ListFirst(tempList[i], "=")))) {
                        StructInsert(myStruct, trim(ListFirst(tempList[i], "=")), trim(ListLast(tempList[i], "=")));
                }
        }
        return myStruct;
 }

---

