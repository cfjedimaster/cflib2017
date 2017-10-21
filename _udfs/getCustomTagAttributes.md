---
layout: udf
title:  getCustomTagAttributes
date:   2008-04-11T02:43:52.000Z
library: UtilityLib
argString: "filePath"
author: Steve Bryant
authorEmail: steve@bryantwebconsulting.com
version: 1
cfVersion: CF6
shortDescription: Get an array of the attributes used in the given custom tag file.
description: |
 Pass in the full path of a custom tag to get an array of the attributes in the file.

returnValue: Returns a struct.

example: |
 <cfset filepath = "C:\CFusionMX7\CustomTags\EzCalendar.cfm">
 <cfdump var="#getCustomTagAttributes(filepath)#">

args:
 - name: filePath
   desc: Full path to the custom tag.
   req: true


javaDoc: |
 <!---
  Get an array of the attributes used in the given custom tag file.
  
  @param filePath      Full path to the custom tag. (Required)
  @return Returns a struct. 
  @author Steve Bryant (steve@bryantwebconsulting.com) 
  @version 1, October 14, 2008 
 --->

code: |
 <cffunction name="getCustomTagAttributes" returntype="array" output="false">
     <cfargument name="FilePath" type="string" required="yes">
     
     <cfset var MyFile = "">
     <cfset var reDefault = "\bsetDefaultAtt\(\#chr(34)#[\w\d]*\#chr(34)#">
     <cfset var reDot = "\battributes\.[\w\d]*\b">
     <cfset var reBracket = "\battributes\[\#chr(34)#[\w\d]*\#chr(34)#\]">
     <cfset var aRawAttributes = ArrayNew(1)>
     <cfset var find = 0>
     <cfset var temp = "">
     <cfset var attlist = "">
     <cfset var i = 0>
     <cfset var aAttributes = 0>
     
     <cffile action="read" file="#arguments.FilePath#" variable="MyFile">
     
     <cfscript>
     //Find all attributes set by my own UDF
     find = ReFindNoCase(reDefault,MyFile,1,1);
     while ( find.pos[1] GT 0 ) {
         temp = Mid(MyFile,find.pos[1],find.len[1]);
         temp = ReplaceNoCase(temp,"setDefaultAtt(#chr(34)#","");
         temp = Left(temp,Len(temp)-1);
         ArrayAppend(aRawAttributes,temp);
         find = ReFindNoCase(reDefault,MyFile,find.pos[1]+find.len[1]+1,1);
     }
     
     //Find all attributes with dot syntax
     find = ReFindNoCase(reDot,MyFile,1,1);
     while ( find.pos[1] GT 0 ) {
         temp = Mid(MyFile,find.pos[1],find.len[1]);
         temp = ListRest(temp,".");
         ArrayAppend(aRawAttributes,temp);
         find = ReFindNoCase(reDot,MyFile,find.pos[1]+find.len[1]+1,1);
     }
     
     //Find all attributes with bracket syntax
     find = ReFindNoCase(reBracket,MyFile,1,1);
     while ( find.pos[1] GT 0 ) {
         temp = Mid(MyFile,find.pos[1],find.len[1]);
         temp = ReplaceNoCase(temp,"attributes[#chr(34)#","");
         temp = Left(temp,Len(temp)-2);
         ArrayAppend(aRawAttributes,temp);
         find = ReFindNoCase(reBracket,MyFile,find.pos[1]+find.len[1]+1,1);
     }
     
     //Loop through array and build list (to ensure no duplicate attributes)
     attlist = "";
     for (i=1; i LTE ArrayLen(aRawAttributes); i=i+1) {
         if ( NOT ListFindNoCase(attlist,aRawAttributes[i]) ) {
             attlist = ListAppend(attlist,aRawAttributes[i]);
         }
     }
     aAttributes = ListToArray(attlist);
     </cfscript>
     
     <cfreturn aAttributes>
 </cffunction>

---

