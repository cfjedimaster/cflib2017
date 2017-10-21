---
layout: udf
title:  VarToScript
date:   2002-09-18T10:35:02.000Z
library: DataManipulationLib
argString: "lObj, lName"
author: Bert Dawson
authorEmail: bdawson@redbanner.com
version: 1
cfVersion: CF5
shortDescription: Reverses a CF variable into CFScript.
description: |
 Pass a CF variable, and a valid variable name, and the UDF returns a chunk of CFscript that will, when run, recreate the original var as a variable with the name passed as the second argument.
 Designed as a way of caching complex variables when usind in conjunction with CFfile (or similar).

returnValue: Returns a string.

example: |
 <cfscript>
 /* "house" is a complex variable that takes a while to build from scratch, but for this demo i'll hard code it.
 N.B. CFMX can handle query cells with complex variables, but CF5 can't, hence the check on the variables scope... */
 house=StructNew();
 tmpQuery=QueryNew('name,pictures');
 QueryAddRow(tmpQuery,1);
 QuerySetCell(tmpQuery, 'name', 'diningroom', 1);
 tmpArray=ArrayNew(2);
 tmpArray[1][1]='Fish on table';
 tmpArray[1][2]='still life';
 if (IsDefined('variables') AND IsStruct(variables)){
  QuerySetCell(tmpQuery, 'pictures', tmpArray, 1);
 } else {
  QuerySetCell(tmpQuery, 'pictures', ArrayToList(tmpArray[1]), 1);
 }
 house.rooms=tmpQuery;
 </cfscript>
 
 <!--- convert the CF variable into a string of CFSCRIPT --->
 <cfset stufftosave = varToScript(house,"cachedhouse")>
 
 <!--- save the generated script to file, along with <script> tags --->
 <cfset filename = CreateUUID()>
 <cfset filepath = GetDirectoryFromPath(GetCurrentTemplatePath()) & '/' & filename>
 <cffile action="WRITE"
   file="#filepath#"
   output="<cfscript>#stufftosave#</cfscript>">
 
 <!--- include the cached file to recreate the object --->
 <cfinclude template="#filename#">
 
 <!--- this delete is just here in the demo.... --->
 <cffile action="DELETE"
   file="#filepath#"> 
 
 <table>
 <tr><th>Original "#house#"</th>
 </tr>
 <tr><td><cfdump var="#house#"></td>
 </tr>
 <tr><th>Output from the UDF (#stufftosave#)</th>
 </tr>
 <tr><td><pre><cfoutput>#stufftosave#</cfoutput></pre></td>
 </tr>
 <tr><th>Recreated "#cachedhouse#"</th>
 </tr>
 <tr><td><cfdump var="#cachedhouse#"></td>
 </tr>
 </table>

args:
 - name: lObj
   desc: The object to be recreated in script.
   req: true
 - name: lName
   desc: The name for the object.
   req: true


javaDoc: |
 /**
  * Reverses a CF variable into CFScript.
  * 
  * @param lObj      The object to be recreated in script. (Required)
  * @param lName      The name for the object. (Required)
  * @return Returns a string. 
  * @author Bert Dawson (bdawson@redbanner.com) 
  * @version 1, September 18, 2002 
  */

code: |
 function VarToScript(lObj,lName) {
     var i="";
     var j="";
     var k="";
     var l="";
     var crlf=chr(13) & chr(10);
     var s="";
     var t="";
     var u='",##';
     var v='"",####';
 
     if (IsStruct(lObj)) {
         s = s & crlf & lName & "=StructNew();";
         for (i IN lObj) {
             if (IsSimpleValue( lObj[i] )) {
                 s = s & crlf & lName & "[""" & i & """]=""" & ReplaceList(lObj[i],u,v) & """;";
             } else {
                 s = s & varToScript(lObj[i], lName & "[""" & i & """]");
             }
         }
 
     } else if (IsArray(lObj)) {
         s = s & crlf & lName & "=ArrayNew(1);";
         for(i=1; i LTE ArrayLen(lObj); i=i+1) {
             if (IsSimpleValue( lObj[i] )) {
                 s = s & crlf & lName & "[" & i & "]=""" & ReplaceList(lObj[i],u,v) & """;";
             } else {
                 s = s & varToScript(lObj[i], lName & "[""" & i & """]");
             }
         }
 
     } else if (IsQuery(lObj)) {
         l = lObj.columnList;
 
         s = s & crlf & lName & "=QueryNew(""" & l & """);";
         s = s & crlf & "QueryAddRow(" & lName & ", " & lObj.recordcount & ");";
 
         for(i=1; i LTE lObj.recordcount; i=i+1) {
             for(j=1; j LTE ListLen(l); j=j+1) {
                 k = lObj[ListGetAt(l,j)][i];
                 if (IsSimpleValue(k)) {
                     s = s & crlf & "QuerySetCell(" & lName & ",""" & ListGetAt(l,j) & """, """ & ReplaceList(k,u,v) & """," & i & ");";
                 } else {
                     t = "request.var2script_" & Replace(CreateUUID(),'-','_','all');
                     s = s & crlf & "QuerySetCell(" & lName & ",""" & ListGetAt(l,j) & """, " & t & "," & i & ");";
                     s = varToScript(k, t) & s;
                     s = s & crlf & "StructDelete(variables,""#t#"");";
                 }
             }
         }
 
     } else if (IsSimpleValue(lObj)) {
         s = s & crlf & lName & "=""" & ReplaceList(lObj,u,v) & """;";
 
     } else if (IsCustomFunction(lObj)) {
         s = s & crlf & "/* " & lName & " is a custom fuction, but i can't cfscript it */";
 
     } else {
         s = s & crlf & "/* " & lName & " - not sure what it is.... */";
     }
 
     return s;
 }

---

