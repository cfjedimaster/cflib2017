---
layout: udf
title:  getJavaMetadata
date:   2004-05-10T09:41:24.000Z
library: UtilityLib
argString: "Object"
author: Paul Kenney
authorEmail: paul_kenney_77@yahoo.com
version: 1
cfVersion: CF6
shortDescription: Introspect Java object's fields, methods, and all inheritance info.
tagBased: true
description: |
 This returns a data structure that contains all the fields and methods for a given Java object and all of the classes from which it inherits.  It is similar in nature to the CFMX function getMetadata().  It is very useful for inspecting objects for which you haven't any documented API... like all of CFMX!

returnValue: Returns a struct.

example: |
 <cfset struct = StructNew()>
 <cfdump var="#getJavaMetadata(struct)#"/>

args:
 - name: Object
   desc: Object to introspect.
   req: true


javaDoc: |
 <!---
  Introspect Java object's fields, methods, and all inheritance info.
  
  @param Object      Object to introspect. (Required)
  @return Returns a struct. 
  @author Paul Kenney (paul_kenney_77@yahoo.com) 
  @version 1, May 10, 2004 
 --->

code: |
 <cffunction name="getJavaMetadata" returntype="struct" output="false">
     <cfargument name="Object" type="any" required="true"/>
     <cfargument name="AccessLimit" type="string" required="false" default="public">
     <cfargument name="isMetadata" type="boolean" required="false" default="false"/>
     <!---  --->
     <cfset var NULL = Chr(0)>
     <cfset var Modifier = CreateObject("java", "java.lang.reflect.Modifier")>
     <cfset var class = NULL>
     <cfset var i = 0>
     <cfset var j = 0>
     <cfset var methods = NULL>
     <cfset var fields = NULL>
     <cfset var extends = NULL>
     <cfset var Current = StructNew()>
     <cfset var Data = StructNew()>
     <cfset var Limits = StructNew()>
     <cfset var LimitName = Arguments.AccessLimit>
     <cfset var ret = StructNew()>
     
     <cfif NOT Arguments.isMetadata>
         <cfset class = Arguments.Object.getClass()>
     <cfelse>
         <cfset class = Arguments.Object>
     </cfif>
     <cfif class.isArray()>
         <cfset class = class.getComponentType()>
     </cfif>    
     <cfset methods = class.getDeclaredMethods()>
     <cfset fields = class.getDeclaredFields()>
     
     <!-------------------------------------------------------------------------------->
     
     <cfset Limits["public"] = "public">
     <cfset Limits["protected"] = "public,protected">
     <cfset Limits["private"] = "public,protected,private">
     
     <!-------------------------------------------------------------------------------->
     
     <cfset Current["Method"] = NULL>
     <cfset Current["Params"] = NULL>
     <cfset Current["Param"] = StructNew()>
     <cfset Current["Param"]["Type"] = NULL>
     <cfset Current["Param"]["Name"] = NULL>
     <cfset Current["Return"] = StructNew()>
     <cfset Current["Return"]["Type"] = NULL>
     <cfset Current["Return"]["Name"] = NULL>
     <cfset Current["Exceptions"] = NULL>
     <cfset Current["Modifiers"] = NULL>
     <cfset Current["Field"] = StructNew()>
     <cfset Current["Field"]["Value"] = NULL>
     <cfset Current["Field"]["Class"] = NULL>
     <cfset Current["Field"]["Type"] = NULL>
     <cfset Current["Field"]["TypeName"] = NULL>
     
     <!-------------------------------------------------------------------------------->
     
     <cfset Current["Data"] = StructNew()>
     <cfset Current["Data"]["Methods"] = NULL>
     <cfset Current["Data"]["Method"] = NULL>
     <cfset Current["Data"]["Params"] = NULL>
     <cfset Current["Data"]["Param"] = NULL>
     <cfset Current["Data"]["Exceptions"] = NULL>
     <cfset Current["Data"]["Fields"] = NULL>
     <cfset Current["Data"]["Field"] = NULL>
             
     <!-------------------------------------------------------------------------------->
 
     <cfset ret["Class"] = class.getName()>
     <cfset ret["Name"] = class.getName()>
     <cfset ret["Package"] = class.getPackage().getName()>
     <cfset ret["Type"] = "java">
 
     <!-------------------------------------------------------------------------------->
     
     <cfif ArrayLen(Methods)>
         <cfset Current.Data.Methods = ArrayNew(1)>
         
         <cfloop index="i" from="1" to="#ArrayLen(Methods)#">
             <cfset Current.Data.Method = StructNew()>
             
             <cfset Current.Method = methods[i]>
             <cfset Current.Params = Current.Method.getParameterTypes()>
             
             <!---  --->
             
             <cfset Current.Modifiers = Current.Method.getModifiers()>
             <cfif Modifier.isPublic(Current.Modifiers)>
                 <cfset Current.Data.Method["Access"] = "public">
             <cfelseif Modifier.isPrivate(Current.Modifiers)>
                 <cfset Current.Data.Method["Access"] = "private">
             <cfelse>
                 <cfset Current.Data.Method["Access"] = "protected">
             </cfif>
             
             <!---  --->
             
             <cfif ListFindNoCase(Limits[LimitName], Current.Data.Method.Access, ",")>
             
                 <cfset Current.Data.Method["Declaration"] = Current.Method.toString()>
                 <cfset Current.Data.Method["Name"] = Current.Method.getName()>
                 
                 <!---  --->
                 
                 <cfset Current.Return.Type = Current.Method.getReturnType()>
                 <cfset Current.Return.Name = NULL>
                 <cfloop condition="TRUE">
                     <cfif Current.Return.Type.isArray()>
                         <cfset Current.Return.Name = Current.Return.Name & "[]">
                         <cfset Current.Return.Type = Current.Return.Type.getComponentType()>
                     <cfelse>
                         <cfset Current.Return.Name = Current.Return.Type.getName() & Current.Return.Name>
                         <cfbreak/>
                     </cfif>
                 </cfloop>
                     
                 <cfset Current.Data.Method["ReturnType"] = Current.Return.Name>
     
                 <!---  --->
                 
                 <cfset Current.Data.Method["Modifiers"] = ListToArray(Modifier.toString(Current.Modifiers), " ")>
                 
                 <!---  --->
                 
                 <cfif ArrayLen(Current.Params)>
                     <cfset Current.Data.Params = ArrayNew(1)>
                     
                     <cfloop index="j" from="1" to="#ArrayLen(Current.Params)#">
                         <cfset Current.Param.Type = Current.Params[j]>
                         <cfset Current.Param.Name = NULL>
                         
                         <cfloop condition="TRUE">
                             <cfif Current.Param.Type.isArray()>
                                 <cfset Current.Param.Name = Current.Param.Name & "[]">
                                 <cfset Current.Param.Type = Current.Param.Type.getComponentType()>
                             <cfelse>
                                 <cfset Current.Param.Name = Current.Param.Type.getName() & Current.Param.Name>
                                 <cfbreak/>
                             </cfif>
                         </cfloop>
                         
                         <cfset ArrayAppend(Current.Data.Params, Current.Param.Name)>
                     </cfloop>
                     
                     <cfset Current.Data.Method["Parameters"] = Current.Data.Params>
                 </cfif>                    
                 
                 <!---  --->
     
                 <cfset Current.Exceptions = Current.Method.getExceptionTypes()>
                 <cfif ArrayLen(Current.Exceptions)>
                     <cfset Current.Data.Exceptions = ArrayNew(1)>
                     <cfloop index="j" from="1" to="#ArrayLen(Current.Exceptions)#">
                         <cfset ArrayAppend(Current.Data.Exceptions, Current.Exceptions[j].getName())>
                     </cfloop>
                     <cfset Current.Data.Method["Throws"] = Current.Data.Exceptions>                        
                 </cfif>
                 
                 <!---  --->
                 <cfset ArrayAppend(Current.Data.Methods, Current.Data.Method)>
             </cfif>
         </cfloop>
         
         <cfif ArrayLen(Current.Data.Methods)>
             <cfset ret["Methods"] = Current.Data.Methods>
         </cfif>
     </cfif>
             
     <!-------------------------------------------------------------------------------->
             
     <cfif ArrayLen(Fields)>
         <cfset Current.Data.Fields = ArrayNew(1)>
         
         <cfloop index="i" from="1" to="#ArrayLen(Fields)#">
             <cfset Current.Data.Field = StructNew()>
         
             <cfset Current.Field.Value = fields[i]>
             <cfset Current.Field.Class = fields[i].getType()>
             
             <!---  --->
             
             <cfset Current.Modifiers = Current.Field.Value.getModifiers()>
             <cfif Modifier.isPublic(Current.Modifiers)>
                 <cfset Current.Data.Field["Access"] = "public">
             <cfelseif Modifier.isPrivate(Current.Modifiers)>
                 <cfset Current.Data.Field["Access"] = "private">
             <cfelse>
                 <cfset Current.Data.Field["Access"] = "protected">
             </cfif>            
             
             <cfif ListFindNoCase(Limits[LimitName], Current.Data.Field.Access, ",")>
             
                 <!---  --->
                 <cfset Current.Data.Field["Declaration"] = Current.Field.Value.toString()>
                 <cfset Current.Data.Field["Name"] = Current.Field.Value.getName()>
                 <!---  --->
                 
                 <cfset Current.Field.Type = Current.Field.Class>
                 <cfset Current.Field.TypeName = NULL>
                 
                 <cfloop condition="TRUE">
                     <cfif Current.Field.Type.isArray()>
                         <cfset Current.Field.TypeName = Current.Field.TypeName & "[]">
                         <cfset Current.Field.Type = Current.Field.Type.getComponentType()>
                     <cfelse>
                         <cfset Current.Field.TypeName = Current.Field.Type.getName() & Current.Field.TypeName>
                         <cfbreak/>
                     </cfif>
                 </cfloop>
                 <cfset Current.Data.Field["Type"] = Current.Field.TypeName>
     
                 <!---  --->
                 <cfset Current.Data.Field["Modifiers"] = ListToArray(Modifier.toString(Current.Modifiers), " ")>
                 <!---  --->
                 
                 <cfset ArrayAppend(Current.Data.Fields, Current.Data.Field)>
                 
             </cfif>
         </cfloop>
         
         <cfif ArrayLen(Current.Data.Fields)>
             <cfset ret["Fields"] = Current.Data.Fields>
         </cfif>
     </cfif>
             
     <!-------------------------------------------------------------------------------->
             
     <cfif Compare(class.getName(), "java.lang.Object")>
         <cfset ret["Extends"] = getJavaMetadata(class.getSuperClass(), Arguments.AccessLimit, true)>
     </cfif>
             
     <!-------------------------------------------------------------------------------->
     
     <cfreturn ret/>
 </cffunction>

---

