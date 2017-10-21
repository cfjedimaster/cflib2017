---
layout: udf
title:  readPropertiesFile
date:   2010-09-01T20:22:31.000Z
library: UtilityLib
argString: "filepath[, varScope]"
author: Chris Carey
authorEmail: ccarey@fi.net.au
version: 1
cfVersion: CF6
shortDescription: Load and parse a .properties file into a struct
description: |
 Read a properties file (such as an ANT build props file) and return a structure.
 
 Properties file contain one entry per line in this format:
 
 #comment starts with hash
 variable=value
 variable2=value2
 
 # you may assign placeholders for other struct keys
 foo=one
 bar=${foo}     # this will take the value of foo

returnValue: Returns a structure.

example: |
 -------------------------------------------
 Example:
 -------------------------------------------
 <cfscript>
 stProps = readPropertiesFile(ExpandPath('./my.properties'));
 </cfscript>
 
 Example 2: pass in a structure to use for external values
 
 
 properties file:
     foo=$(vars.foo)
 
 <cfscript>
 foo=hello
 stProps = readPropertiesFile(ExpandPath('./my.properties', variables));
 </cfscript>
 
 stProps will contain the key "foo" with value "hello"
 
 Notice: Why not use ColdFusion's built in INI file functions? They require sections and do not support recognizing comments.

args:
 - name: filepath
   desc: Path to the properties file.
   req: true
 - name: varScope
   desc: A structure containing variables that can be used as token replacements within the properties file.
   req: false


javaDoc: |
 <!---
  Load and parse a .properties file into a struct
  
  @param filepath      Path to the properties file. (Required)
  @param varScope      A structure containing variables that can be used as token replacements within the properties file. (Optional)
  @return Returns a structure. 
  @author Chris Carey (ccarey@fi.net.au) 
  @version 1, September 1, 2010 
 --->

code: |
 <cffunction name="readPropertiesFile" output="true" returnType="Struct" hint="Read a properties file and return a structure">
     <cfargument name="filePath" type="string" required="true" hint="path to properties file">
     <cfargument name="varScope" type="Struct" required="false" hint="optional variable scope for value replacement">
 
     <cfset VAR stProps = StructNew()>
     <cfset VAR sProps = "">
     <cfset VAR i=0>
     <cfset VAR prop = "">
     <cfset VAR value = "">
     <cfset VAR line = "">
     <cfset VAR aMatch = ArrayNew(1)>
 
     <cfif NOT FileExists(arguments.filePath)>
         <cfreturn stProps>
     </cfif>
     <!--- read props file --->
     <cffile action="read" file="#arguments.filePath#" variable="sProps">
 
     <!--- remove any whitespace at top and tail --->
     <cfset sProps = trim(sProps)>
 
     <!--- remove comments and blank lines --->
     <cfset sProps = ReReplace(sProps,"(?m)\##.*?$", "","all")>
     <cfset sProps = ReReplace(sProps,"[#Chr(13)##Chr(10)#]{2,}", "#Chr(13)##Chr(10)#","all")>
 
     <!--- loop over each line, ignore comments (#...) and insert keys/values into return struct --->
     <cfloop list="#sProps#" index="line" delimiters="#CHR(10)##CHR(13)#">
         <cfset line = trim(line)>
         <cfif LEN(line) AND line CONTAINS "=">
             <cfset prop = trim(ListFirst(line,"="))>
             <cfset value = trim(ListRest(line,"="))>
             <!--- parse value for other keys like ${foo} and replace from previously created struct keys --->
             <cfset aMatch = REMatch("\${.*?}",value)>
             <cfloop from="1" to="#ArrayLen(aMatch)#" index="i">
                 <cfset aMatch[i] = ReReplace(aMatch[i],"\${(.*)?}", "\1")>
                 <cfif StructKeyExists(stProps, aMatch[i])>
                     <cfset value = ReplaceNoCase(value, "${#aMatch[i]#}", stProps[aMatch[i]], "all")>
                 <cfelseif IsDefined("arguments.varScope")
                             AND ListFirst(aMatch[i],".") eq "vars"
                             AND StructKeyExists(arguments.varScope, ListRest(aMatch[i], "."))>
                     <cfset value = ReplaceNoCase(value, "${#aMatch[i]#}", arguments.varScope[ListRest(aMatch[i], ".")], "all")>
                 </cfif>
             </cfloop>
             <cfset stProps[prop] = value>
         </cfif>
     </cfloop>
 
     <cfreturn stProps>
 </cffunction>

---

