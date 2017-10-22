---
layout: udf
title:  LenStruct
date:   2004-10-05T17:12:53.000Z
library: DataManipulationLib
argString: "structIn[, excludeList][, ending]"
author: Peter J. Farrell
authorEmail: pjf@maestropublishing.com
version: 1
cfVersion: CF5
shortDescription: Computes the length of every key in the passed structure and returns a structure with unique key names of the lengths.
tagBased: false
description: |
 Computes the length of every key in the passed structure.  Optionally allows you to set the end stem of the returned struct. The return structure keys are the same as the passed structure keys plus the end stem is appended (default: &quot;_Len&quot;).  Also, allows you to pass an exclude list of keys not to return if you wish to only get lens on some of the passed structure.  This UDF will not process complex data types - simple values only.  Great to use on the form scope (which is a stucture itself) if you do len checking for data validation passed from forms.
 
 Feel free to modify if you wish to recursively go through nested structures.
 
 Thanks to Mike Gillespie and Raymond Camden and their TrimStruct UDF for giving me this idea.

returnValue: Returns a struct.

example: |
 <cfscript>
 // Create test struct and set vars
 test = StructNew();
 test.a = "a";
 test.bb = "bb";
 test.ccc = "ccc";
 // With no optional ending or exludelist
 test_len = LenStruct(test);
 </cfscript>
 
 <cfdump var="#test_len#">

args:
 - name: structIn
   desc: The struct to check.
   req: true
 - name: excludeList
   desc: List of keys to ignore.
   req: false
 - name: ending
   desc: String to append to key names in resulting struct.
   req: false


javaDoc: |
 /**
  * Computes the length of every key in the passed structure and returns a structure with unique key names of the lengths.
  * 
  * @param structIn      The struct to check. (Required)
  * @param excludeList      List of keys to ignore. (Optional)
  * @param ending      String to append to key names in resulting struct. (Optional)
  * @return Returns a struct. 
  * @author Peter J. Farrell (pjf@maestropublishing.com) 
  * @version 1, October 5, 2004 
  */

code: |
 function LenStruct(structIn) {
     var i = 0;
     var structIn_count = StructCount(structIn);
     var struct0ut = StructNew();
     var ending = "_Len";
     var excludeList = "";
     var key = "";
     
     // Check if excludeList was passed
     if(arrayLen(Arguments) GT 1) {
         excludeList = Arguments[2];
     } 
     
     // Check if different ending was passed
     if(arrayLen(Arguments) GT 2) {
         ending = Arguments[3];
     } 
     for (key IN structIn) {
         if (NOT listFindNoCase(excludeList,key) AND isSimpleValue(structIn[key])) {
             structOut[key&ending] = Len(structIn[key]);
         } 
     } 
     return structOut;
 }

---

