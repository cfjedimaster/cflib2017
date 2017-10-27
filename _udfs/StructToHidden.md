---
layout: udf
title:  StructToHidden
date:   2002-03-10T13:52:22.000Z
library: UtilityLib
argString: "struct"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Converts a structure to hidden form fields.
tagBased: false
description: |
 A quick way to turn a simple structure into hidden form fields.

returnValue: Returns a string.

example: |
 <cfscript>
     st = structNew();
     st.foo = "bar";
     st.another = "some stuff";
     writeOutput(htmlCodeFormat(structToHidden(st)));
 </cfscript>

args:
 - name: struct
   desc: The structure to convert.
   req: true


javaDoc: |
 /**
  * Converts a structure to hidden form fields.
  * 
  * @param struct      The structure to convert. 
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, March 10, 2002 
  */

code: |
 function structToHidden(struct){
     //a variable for iterating
     var key = "";
     //a variable to return stuff
     var outVar = "";
     //now loop through the form scope and make hidden fields
     for(key in struct){
         if(isSimpleValue(struct[key]))
             outVar = outVar & "<input type=""hidden"" name=""" & key & """ value=""" & htmlEditFormat(struct[key]) & """>";
     }
     return outVar;        
 }

oldId: 536
---

