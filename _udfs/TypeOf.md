---
layout: udf
title:  TypeOf
date:   2002-08-16T11:57:53.000Z
library: DataManipulationLib
argString: "x"
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 3
cfVersion: CF5
shortDescription: Returns the type of the variable.
description: |
 Enhanced typeof() function with added checking for binary, custom function, and date values.

returnValue: Returns a string.

example: |
 <cfscript>
    function foo() { return; }
    foo2 = createDate( 2002, 4, 1 );
    foo3 = Tobinary( ToBase64( "foo" ) );
 </cfscript>
 <cfoutput>
    #typeof( foo )#<br>
    #typeof( foo2 )#<br>
    #typeof( foo3 )#<br>
 </cfoutput>

args:
 - name: x
   desc: The data to inspect.
   req: true


javaDoc: |
 /**
  * Returns the type of the variable.
  * Made it cf5/mx compat with use of getFunctionList
  * 
  * @param x      The data to inspect. (Required)
  * @return Returns a string. 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 3, August 16, 2002 
  */

code: |
 function TypeOf(x) {
    if(isArray(x)) return "array";
    if(isStruct(x)) return "structure";
    if(isQuery(x)) return "query";
    if(isSimpleValue(x) and isWddx(x)) return "wddx";
    if(isBinary(x)) return "binary";
    if(isCustomFunction(x)) return "custom function";
    if(isDate(x)) return "date";
    if(isNumeric(x)) return "numeric";
    if(isBoolean(x)) return "boolean";
    if( listFindNoCase( structKeyList( GetFunctionList() ), "isXMLDoc" ) AND
 isXMLDoc(x)) return "xml";
    if(isSimpleValue(x)) return "string";
    return "unknown";  
 }

---

