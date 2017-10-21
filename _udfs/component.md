---
layout: udf
title:  component
date:   2003-05-13T16:37:39.000Z
library: DataManipulationLib
argString: "path[, type]"
author: Dan G. Switzer, II
authorEmail: dswitzer@pengoworks.com
version: 1
cfVersion: CF6
shortDescription: Creates a CFC instance based upon a relative, absolute or dot notation path.
description: |
 This UDF will create an instance of a CFC based upon a relative or absolute path or even upon the standard dot notation used in the createObject(&quot;component&quot;) function. 
 
 I tried to make the &quot;type&quot; argument somewhat intelligent and it'll probably work correctly 99% of the time for you, but if you want to be absolutely sure you get the expected behavior, specify the type argument for the function.

returnValue: Returns a CFC.

example: |
 // same as createObject("component", 
 //          "normal.dot.notation");
 component("normal.dot.notation");
 
 // invoke a component from a sub
 // directory off the current web
 // directory
 component("./sub/directory/com.cfc");
 
 // invoke a component on another drive
 component("d:\components\com.cfc", "absolute");

args:
 - name: path
   desc: Path for the component.
   req: true
 - name: type
   desc: Type of the path. Possible values are "component" (normal dot notation), "relative" and "absolute". Defaults to component. 
   req: false


javaDoc: |
 /**
  * Creates a CFC instance based upon a relative, absolute or dot notation path.
  * 
  * @param path      Path for the component. (Required)
  * @param type      Type of the path. Possible values are "component" (normal dot notation), "relative" and "absolute". Defaults to component.  (Optional)
  * @return Returns a CFC. 
  * @author Dan G. Switzer, II (dswitzer@pengoworks.com) 
  * @version 1, May 13, 2003 
  */

code: |
 function component(path){
     var sPath=Arguments.path;var oProxy="";var oFile="";var sType="";
     if( arrayLen(Arguments) gt 1 ) sType = lCase(Arguments[2]);
 
     // determine a default type    
     if( len(sType) eq 0 ){
         if( (sPath DOES NOT CONTAIN ".") OR ((sPath CONTAINS ".") AND (sPath DOES NOT CONTAIN "/") AND (sPath DOES NOT CONTAIN "\")) ) sType = "component";
         else sType = "relative";
     }
     
     // create the component
     switch( left(sType,1) ){
         case "c":
             return createObject("component", sPath);
         break;
 
         default:
             if( left(sType, 1) neq "a" ) sPath = expandPath(sPath);
             oProxy = createObject("java", "coldfusion.runtime.TemplateProxy");
             oFile = createObject("java", "java.io.File");
             oFile.init(sPath);
             return oProxy.resolveFile(getPageContext(), oFile);
         break;
     }
 }

---

