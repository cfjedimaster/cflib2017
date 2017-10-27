---
layout: udf
title:  listCompare
date:   2009-06-26T03:45:30.000Z
library: StrLib
argString: "List1, List2[, Delim1][, Delim2][, Delim3]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 2
cfVersion: CF6
shortDescription: Compares one list against another to find the elements in the first list that don't exist in the second list.
tagBased: true
description: |
 Compares one list against another to find the elements in the first list that don't exist in the second list.  Performs the same funciton as the custom tag of the same name.

returnValue: Returns a delimited list of values.

example: |
 <CFSET FullList = "1;2;3;4;5;6;7;8;9;10">
 <CFSET PartialList = "1,3,5,7,9">
 <CFSET FullList2 = "1,2,3,4,5,6,7,8,9,10">
 <CFSET PartialList2 = "1,3,5,7,9">
 <CFSET FullList3 = "a,b,c,d,e,f,g">
 <CFSET PartialList3 = "a,c">
 
 <CFOUTPUT>
 #ListCompare(FullList, PartialList, ";", ",", "|")#<BR>
 #ListCompare(FullList2, PartialList2)#<BR>
 #ListCompare(FullList3, PartialList3)#<BR>
 </CFOUTPUT>

args:
 - name: List1
   desc: Full list of delimited values.
   req: true
 - name: List2
   desc: Delimited list of values you want to compare to List1.
   req: true
 - name: Delim1
   desc: Delimiter used for List1.  Default is the comma.
   req: false
 - name: Delim2
   desc: Delimiter used for List2.  Default is the comma.
   req: false
 - name: Delim3
   desc: Delimiter to use for the list returned by the function.  Default is the comma.
   req: false


javaDoc: |
 <!---
  Compares one list against another to find the elements in the first list that don't exist in the second list.
  v2 mod by Scott Coldwell
  
  @param List1      Full list of delimited values. (Required)
  @param List2      Delimited list of values you want to compare to List1. (Required)
  @param Delim1      Delimiter used for List1.  Default is the comma. (Optional)
  @param Delim2      Delimiter used for List2.  Default is the comma. (Optional)
  @param Delim3      Delimiter to use for the list returned by the function.  Default is the comma. (Optional)
  @return Returns a delimited list of values. 
  @author Rob Brooks-Bilson (rbils@amkor.com) 
  @version 2, June 25, 2009 
 --->

code: |
 <cffunction name="listCompare" output="false" returnType="string">
        <cfargument name="list1" type="string" required="true" />
        <cfargument name="list2" type="string" required="true" />
        <cfargument name="delim1" type="string" required="false" default="," />
        <cfargument name="delim2" type="string" required="false" default="," />
        <cfargument name="delim3" type="string" required="false" default="," />
 
        <cfset var list1Array = ListToArray(arguments.List1,Delim1) />
        <cfset var list2Array = ListToArray(arguments.List2,Delim2) />
 
        <!--- Remove the subset List2 from List1 to get the diff --->
        <cfset list1Array.removeAll(list2Array) />
 
        <!--- Return in list format --->
        <cfreturn ArrayToList(list1Array, Delim3) />
 </cffunction>

oldId: 149
---

