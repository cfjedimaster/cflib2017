---
layout: udf
title:  dumpVarList
date:   2007-08-22T22:48:09.000Z
library: UtilityLib
argString: "variable"
author: Doug Gibson
authorEmail: email@dgibson.net
version: 2
cfVersion: CF6
shortDescription: Dumps out variables/structs in simple text format.
tagBased: false
description: |
 Dumps out variables/structs in simple text format; useful for plain-text logging and debugging info.
 
 Admin Note: The original UDF allowed you to pass a name of a variable and used evaluate to get the value. The CFLib admin modified it to not use evaluate, and therefore the display is not quite as nice as it used to be. The admin and Doug spoke a bit about this and agreed a nice little note would be helpful.

returnValue: Returns nothing, but outputs directly to screen.

example: |
 <CFOUTPUT>#dumpVarList(thisstruct)#</CFOUTPUT>

args:
 - name: variable
   desc: Variable to dump.
   req: true


javaDoc: |
 /**
  * Dumps out variables/structs in simple text format.
  * Original version used evaluate, so I modified it to require a real var passed in. (ray@camdenfamily.com)
  * 
  * @param variable      Variable to dump. (Required)
  * @return Returns nothing, but outputs directly to screen. 
  * @author Doug Gibson (email@dgibson.net) 
  * @version 2, August 22, 2007 
  */

code: |
 function dumpVarList(variable) { 
     
     // ASSIGN THE delim
     var delim="#Chr(13)##Chr(10)#";
     var var2dump=arguments.variable;
     var label = "";
     var newdump="";
     var keyName="";
     var loopcount=0;
     
     if(arrayLen(arguments) gte 2) delim=arguments[2];
     if(arrayLen(arguments) gte 3) label=arguments[3];
     
     // THE VARIABLE IS A SIMPLE VALUE, SO OUTPUT IT
     if(isSimpleValue(var2dump)) {
         if(label neq "") writeOutput(uCase(label) & " = " & variable & delim);
         else writeOutput(variable & delim);
     } else if(isArray(var2dump)){
         if(label neq "") writeOutput(uCase(label) & " = [Array]" & delim);
         else writeOutput("[Array]" & delim);
         for(loopcount=1; loopcount lte arrayLen(var2dump); loopCount=loopcount+1) {
              if(isSimpleValue(var2dump[loopcount])) writeOutput("[" & loopcount & "] = " & var2dump[loopcount] & delim);
             else DumpVarList(var2dump[loopcount],delim,label);
         }
     }
         // THE VARIABLE IS A STRUCT, SO LOOP OVER IT AND OUTPUT ITS KEY VALUES
     else if(isStruct(var2dump)) {
         if(label neq "") writeOutput(uCase(label) & " = [Struct]" & delim);
         else writeOutput("[Struct]" & delim);
         for(keyName in var2dump) {
             if(isSimpleValue(var2dump[keyName])) {
                 if(label neq "") writeOutput(uCase(label) & "." & uCase(keyname) & " = " & var2dump[keyName] & delim);
                 else writeOutput(uCase(keyname) & " = " & var2dump[keyName] & delim);
             }
             else dumpVarList(var2dump[keyName],delim,keyname);
         }
     }
         // THE VARIABLE EXISTS, BUT IS NOT A TYPE WE WISH TO DUMP OUT
     else {
         if(label neq "") writeOutput(uCase(label) & " = [Unsupported type]" & delim);
         else writeOutput("[Unsupported type]" & delim);
     }
 
     return;
 }

oldId: 1388
---

