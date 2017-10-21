---
layout: udf
title:  arrayAppend2D
date:   2006-03-21T13:25:08.000Z
library: DataManipulationLib
argString: "aName, value1, value2"
author: Minh Lee Goon
authorEmail: contact@digeratidesignstudios.com
version: 1
cfVersion: CF5
shortDescription: Appends two values to a 2D array.
description: |
 This UDF appends allows the user to append a key-value set to a two-dimensional array. The code is easily modifiable for more than two dimensions.

returnValue: Returns the array.

example: |
 <cfset aSideNav = ArrayNew(2)>
 <cfset aSideNav[1][1] = "New Project">
 <cfset aSideNav[1][2] = "project.cfm?ID=0">
 
 <cfset aSideNav = arrayAppend2D(aSideNav, "Bid Results", "bidresults.cfm")>

args:
 - name: aName
   desc: The array.
   req: true
 - name: value1
   desc: First value.
   req: true
 - name: value2
   desc: Second value.
   req: true


javaDoc: |
 /**
  * Appends two values to a 2D array.
  * 
  * @param aName      The array. (Required)
  * @param value1      First value. (Required)
  * @param value2      Second value. (Required)
  * @return Returns the array. 
  * @author Minh Lee Goon (contact@digeratidesignstudios.com) 
  * @version 1, March 21, 2006 
  */

code: |
 function arrayAppend2D(aName, value1, value2) {
     var theLen = arrayLen(aName);
         
     aName[theLen+1][1] = value1;
     aName[theLen+1][2] = value2;
         
     return aName;
 }

---

