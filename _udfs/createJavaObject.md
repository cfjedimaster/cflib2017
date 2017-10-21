---
layout: udf
title:  createJavaObject
date:   2004-10-19T12:47:58.000Z
library: UtilityLib
argString: "directory"
author: Wayne Graham
authorEmail: wsgrah@wm.edu
version: 1
cfVersion: CF6
shortDescription: Allows one to use virtual paths to Java objects.
description: |
 Instantiates Java objects in virtual paths so you do not need to change the classpath for your application.

returnValue: Returns a Java object.

example: |
 <cfscript>
     loader = createJavaObject("./");
     helloWorld = loader.loadClass("GpgTool").newInstance();
 </cfscript>
 
 <cfdump var="#helloWorld#">

args:
 - name: directory
   desc: Directory where the class can be found.
   req: true


javaDoc: |
 /**
  * Allows one to use virtual paths to Java objects.
  * Returns a Java object for a given virtual path. 
  * This allows you to place your Java class files 
  * anywhere you want. Based on Stephen Milligan's blog entry at http://www.spike.org.uk/blog/index.cfm?data=20040603#EBB52433-D565-E33F-353D2664926C59B5
  * 
  * @param directory      Directory where the class can be found. (Required)
  * @return Returns a Java object. 
  * @author Wayne Graham (wsgrah@wm.edu) 
  * @version 1, October 19, 2004 
  */

code: |
 function createJavaObject(directory){
     var URLObject = createObject("java", "java.net.URL");
     var ArrayClass = createObject("java","java.lang.reflect.Array");
     var loader = createObject("java","java.net.URLClassLoader");
     var URLArray = "";
     
     directory = replace(expandPath(directory), "\", "/", "all");        
     URLObject.init("file:" & directory);
     URLArray = createObject("java", "java.lang.reflect.Array").newInstance(URLObject.getClass(), 1);
         
     ArrayClass.set(URLArray,0,URLObject);
     return loader.init(URLArray);
 }

---

