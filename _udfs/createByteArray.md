---
layout: udf
title:  createByteArray
date:   2012-08-17T16:01:55.000Z
library: StrLib
argString: "string"
author: Marcos Placona
authorEmail: marcos.placona@gmail.com
version: 1
cfVersion: CF6
shortDescription: Converts a ColdFusion string to a Java byte array
tagBased: false
description: |
 When using Java classes, you sometimes need to pass in Java byte arrays. ColdFusion can't do it out of the box, but with this UDF, you can turn a string into a Java byte array.

returnValue: Returns a byte array

example: |
 <cfset myString = "CFLib.org">
 <cfset myByteArray= createByteArray(myString)>

args:
 - name: string
   desc: A string to convert to a byte array
   req: true


javaDoc: |
 /**
  * Converts a ColdFusion string to a Java byte array
  * * version 1.0 by Marcos Placona
  * 
  * @param string      A string to convert to a byte array (Required)
  * @return Returns a byte array 
  * @author Marcos Placona (marcos.placona@gmail.com) 
  * @version 1.0, August 17, 2012 
  */

code: |
 function createByteArray(string){
     var objString = createObject("Java", "java.lang.String").init(JavaCast("string", string));
     return objString.getBytes();
 }

oldId: 2211
---

