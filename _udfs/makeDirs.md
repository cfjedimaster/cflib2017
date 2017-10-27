---
layout: udf
title:  makeDirs
date:   2004-09-21T11:50:44.000Z
library: FileSysLib
argString: "p"
author: Jorge Iriso
authorEmail: jiriso@fitquestsl.com
version: 1
cfVersion: CF6
shortDescription: Create all non exitant directories in a path.
tagBased: false
description: |
 It will create all non existant directories in a path withouth looping by using java.io.File class.

returnValue: Returns nothing.

example: |
 #makeDirs('c:\www\grandpa\parent\son')#

args:
 - name: p
   desc: The path to create.
   req: true


javaDoc: |
 /**
  * Create all non exitant directories in a path.
  * 
  * @param p      The path to create. (Required)
  * @return Returns nothing. 
  * @author Jorge Iriso (jiriso@fitquestsl.com) 
  * @version 1, September 21, 2004 
  */

code: |
 function makeDirs(p){
     createObject("java", "java.io.File").init(p).mkdirs();
 }

oldId: 1116
---

