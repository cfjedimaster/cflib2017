---
layout: udf
title:  jsonencode
date:   2008-06-27T19:46:08.000Z
library: StrLib
argString: "arg"
author: Jehiah Czebotar
authorEmail: jehiah@gmail.com
version: 2
cfVersion: CF6
shortDescription: Serialize native ColdFusion objects into a JSON formated string.
tagBased: true
description: |
 Serialize native ColdFusion objects (simple values, arrays, structures, queries) into a JSON format string. This is usefull for passing data to the browser using AJAX where JSON is the dataformat.
 
  * http://json.org/
  * http://jehiah.com/projects/cfjson/

returnValue: Returns a string.

example: |
 <cfscript>
 thestruct = StructNew();
 thestruct.key1="string value";
 thestruct.key2 = ArrayNew(1);
 thestruct.key2[1]="array";
 thestruct.key2[2]="of";
 thestruct.key2[3]="elements";
 thestruct.key3 = 123;
 </cfscript>
 
 <cfoutput>
 #jsonencode(thestruct)#
 </cfoutput>

args:
 - name: arg
   desc: The data to encode.
   req: true


javaDoc: |
 <!---
  Serialize native ColdFusion objects into a JSON formated string.
  
  @param arg      The data to encode. (Required)
  @return Returns a string. 
  @author Jehiah Czebotar (jehiah@gmail.com) 
  @version 2, June 27, 2008 
 --->

code: |
 <cffunction name="jsonencode" access="remote" returntype="string" output="No"
         hint="Converts data from CF to JSON format">
     <cfargument name="data" type="any" required="Yes" />
     <cfargument name="queryFormat" type="string" required="No" default="query" /> <!-- query or array -->
     <cfargument name="queryKeyCase" type="string" required="No" default="lower" /> <!-- lower or upper -->
     <cfargument name="stringNumbers" type="boolean" required="No" default=false >
     <cfargument name="formatDates" type="boolean" required="No" default=false >
     <cfargument name="columnListFormat" type="string" required="No" default="string" > <!-- string or array -->
     
     <!--- VARIABLE DECLARATION --->
     <cfset var jsonString = "" />
     <cfset var tempVal = "" />
     <cfset var arKeys = "" />
     <cfset var colPos = 1 />
     <cfset var i = 1 />
     <cfset var column = ""/>
     <cfset var datakey = ""/>
     <cfset var recordcountkey = ""/>
     <cfset var columnlist = ""/>
     <cfset var columnlistkey = ""/>
     <cfset var dJSONString = "" />
     <cfset var escapeToVals = "\\,\"",\/,\b,\t,\n,\f,\r" />
     <cfset var escapeVals = "\,"",/,#Chr(8)#,#Chr(9)#,#Chr(10)#,#Chr(12)#,#Chr(13)#" />
     
     <cfset var _data = arguments.data />
 
     <!--- BOOLEAN --->
     <cfif IsBoolean(_data) AND NOT IsNumeric(_data) AND NOT ListFindNoCase("Yes,No", _data)>
         <cfreturn LCase(ToString(_data)) />
         
     <!--- NUMBER --->
     <cfelseif NOT stringNumbers AND IsNumeric(_data) AND NOT REFind("^0+[^\.]",_data)>
         <cfreturn ToString(_data) />
     
     <!--- DATE --->
     <cfelseif IsDate(_data) AND arguments.formatDates>
         <cfreturn '"#DateFormat(_data, "medium")# #TimeFormat(_data, "medium")#"' />
     
     <!--- STRING --->
     <cfelseif IsSimpleValue(_data)>
         <cfreturn '"' & ReplaceList(_data, escapeVals, escapeToVals) & '"' />
     
     <!--- ARRAY --->
     <cfelseif IsArray(_data)>
         <cfset dJSONString = createObject('java','java.lang.StringBuffer').init("") />
         <cfloop from="1" to="#ArrayLen(_data)#" index="i">
             <cfset tempVal = jsonencode( _data[i], arguments.queryFormat, arguments.queryKeyCase, arguments.stringNumbers, arguments.formatDates, arguments.columnListFormat ) />
             <cfif dJSONString.toString() EQ "">
                 <cfset dJSONString.append(tempVal) />
             <cfelse>
                 <cfset dJSONString.append("," & tempVal) />
             </cfif>
         </cfloop>
         
         <cfreturn "[" & dJSONString.toString() & "]" />
     
     <!--- STRUCT --->
     <cfelseif IsStruct(_data)>
         <cfset dJSONString = createObject('java','java.lang.StringBuffer').init("") />
         <cfset arKeys = StructKeyArray(_data) />
         <cfloop from="1" to="#ArrayLen(arKeys)#" index="i">
             <cfset tempVal = jsonencode( _data[ arKeys[i] ], arguments.queryFormat, arguments.queryKeyCase, arguments.stringNumbers, arguments.formatDates, arguments.columnListFormat ) />
             <cfif dJSONString.toString() EQ "">
                 <cfset dJSONString.append('"' & arKeys[i] & '":' & tempVal) />
             <cfelse>
                 <cfset dJSONString.append("," & '"' & arKeys[i] & '":' & tempVal) />
             </cfif>
         </cfloop>
         
         <cfreturn "{" & dJSONString.toString() & "}" />
     
     <!--- QUERY --->
     <cfelseif IsQuery(_data)>
         <cfset dJSONString = createObject('java','java.lang.StringBuffer').init("") />
         
         <!--- Add query meta data --->
         <cfif arguments.queryKeyCase EQ "lower">
             <cfset recordcountKey = "recordcount" />
             <cfset columnlistKey = "columnlist" />
             <cfset columnlist = LCase(_data.columnlist) />
             <cfset dataKey = "data" />
         <cfelse>
             <cfset recordcountKey = "RECORDCOUNT" />
             <cfset columnlistKey = "COLUMNLIST" />
             <cfset columnlist = _data.columnlist />
             <cfset dataKey = "data" />
         </cfif>
         
         <cfset dJSONString.append('"#recordcountKey#":' & _data.recordcount) />
         <cfif arguments.columnListFormat EQ "array">
             <cfset columnlist = "[" & ListQualify(columnlist, '"') & "]" />
             <cfset dJSONString.append(',"#columnlistKey#":' & columnlist) />
         <cfelse>
             <cfset dJSONString.append(',"#columnlistKey#":"' & columnlist & '"') />
         </cfif>
         <cfset dJSONString.append(',"#dataKey#":') />
         
         <!--- Make query a structure of arrays --->
         <cfif arguments.queryFormat EQ "query">
             <cfset dJSONString.append("{") />
             <cfset colPos = 1 />
             
             <cfloop list="#_data.columnlist#" delimiters="," index="column">
                 <cfif colPos GT 1>
                     <cfset dJSONString.append(",") />
                 </cfif>
                 <cfif arguments.queryKeyCase EQ "lower">
                     <cfset column = LCase(column) />
                 </cfif>
                 <cfset dJSONString.append('"' & column & '":[') />
                 
                 <cfloop from="1" to="#_data.recordcount#" index="i">
                     <!--- Get cell value; recurse to get proper format depending on string/number/boolean data type --->
                     <cfset tempVal = jsonencode( _data[column][i], arguments.queryFormat, arguments.queryKeyCase, arguments.stringNumbers, arguments.formatDates, arguments.columnListFormat ) />
                     
                     <cfif i GT 1>
                         <cfset dJSONString.append(",") />
                     </cfif>
                     <cfset dJSONString.append(tempVal) />
                 </cfloop>
                 
                 <cfset dJSONString.append("]") />
                 
                 <cfset colPos = colPos + 1 />
             </cfloop>
             <cfset dJSONString.append("}") />
         <!--- Make query an array of structures --->
         <cfelse>
             <cfset dJSONString.append("[") />
             <cfloop query="_data">
                 <cfif CurrentRow GT 1>
                     <cfset dJSONString.append(",") />
                 </cfif>
                 <cfset dJSONString.append("{") />
                 <cfset colPos = 1 />
                 <cfloop list="#columnlist#" delimiters="," index="column">
                     <cfset tempVal = jsonencode( _data[column][CurrentRow], arguments.queryFormat, arguments.queryKeyCase, arguments.stringNumbers, arguments.formatDates, arguments.columnListFormat ) />
                     
                     <cfif colPos GT 1>
                         <cfset dJSONString.append(",") />
                     </cfif>
                     
                     <cfif arguments.queryKeyCase EQ "lower">
                         <cfset column = LCase(column) />
                     </cfif>
                     <cfset dJSONString.append('"' & column & '":' & tempVal) />
                     
                     <cfset colPos = colPos + 1 />
                 </cfloop>
                 <cfset dJSONString.append("}") />
             </cfloop>
             <cfset dJSONString.append("]") />
         </cfif>
         
         <!--- Wrap all query data into an object --->
         <cfreturn "{" & dJSONString.toString() & "}" />
     
     <!--- UNKNOWN OBJECT TYPE --->
     <cfelse>
         <cfreturn '"' & "unknown-obj" & '"' />
     </cfif>
 </cffunction>

oldId: 1288
---

