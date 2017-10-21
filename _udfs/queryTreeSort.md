---
layout: udf
title:  queryTreeSort
date:   2006-03-28T13:04:52.000Z
library: DataManipulationLib
argString: "stuff[, parentid][, itemid][, basedepth][, depthname]"
author: Rick Osborne
authorEmail: deliver8r@gmail.com
version: 1
cfVersion: CF7
shortDescription: QueryTreeSort takes a query and efficiently (O(n)) resorts it hierarchically (parent-child), adding a Depth column that can then be used when displaying the data.
description: |
 Many datasets used in web programming are hierarchical, or parent-child.  Each item may have multiple subordinate items associated with it, and those subordinate items may have their own subordinate items, ad infinitum.  This sort of relationship is normally handled in a database by having a ParentID of one item point to the ID of another item.  The tricky part is getting the data out of the database in a way such that you can display it logically.  Most database engines do not offer native extensions for handling hierarchical data, so the easiest way is often to just have ColdFusion do the sorting.

returnValue: Returns a query.

example: |
 <cfquery datasource="#Request.DSN#" name="Stuff">
 SELECT ItemID, Name, ParentID
 FROM Stuff
 ORDER BY Name
 </cfquery>
     
 <cfset TreeStuff=queryTreeSort(Stuff)>

args:
 - name: stuff
   desc: Query to sort.
   req: true
 - name: parentid
   desc: Column containing parent id. Defaults to parentid.
   req: false
 - name: itemid
   desc: Column containing ID value. Defaults to itemid.
   req: false
 - name: basedepth
   desc: Base depth of data. Defaults to 0.
   req: false
 - name: depthname
   desc: Name for new column to use for depth. Defaults to TreeDepth.
   req: false


javaDoc: |
 <!---
  QueryTreeSort takes a query and efficiently (O(n)) resorts it hierarchically (parent-child), adding a Depth column that can then be used when displaying the data.
  
  @param stuff      Query to sort. (Required)
  @param parentid      Column containing parent id. Defaults to parentid. (Optional)
  @param itemid      Column containing ID value. Defaults to itemid. (Optional)
  @param basedepth      Base depth of data. Defaults to 0. (Optional)
  @param depthname      Name for new column to use for depth. Defaults to TreeDepth. (Optional)
  @return Returns a query. 
  @author Rick Osborne (deliver8r@gmail.com) 
  @version 1, April 9, 2007 
 --->

code: |
 <cffunction name="queryTreeSort" returntype="query" output="No">
     <cfargument name="Stuff" type="query" required="Yes">
     <cfargument name="ParentID" type="string" required="No" default="ParentID">
     <cfargument name="ItemID" type="string" required="No" default="ItemID">
     <cfargument name="BaseDepth" type="numeric" required="No" default="0">
     <cfargument name="DepthName" type="string" required="No" default="TreeDepth">
     <cfset var RowFromID=StructNew()>
     <cfset var ChildrenFromID=StructNew()>
     <cfset var RootItems=ArrayNew(1)>
     <cfset var Depth=ArrayNew(1)>
     <cfset var ThisID=0>
     <cfset var ThisDepth=0>
     <cfset var RowID=0>
     <cfset var ChildrenIDs="">
     <cfset var ColName="">
     <cfset var Ret=QueryNew(ListAppend(Stuff.ColumnList,Arguments.DepthName))>
     <!--- Set up all of our indexing --->
     <cfloop query="Stuff">
         <cfset RowFromID[Stuff[Arguments.ItemID][Stuff.CurrentRow]]=CurrentRow>
         <cfif NOT StructKeyExists(ChildrenFromID, Stuff[Arguments.ParentID][Stuff.CurrentRow])>
             <cfset ChildrenFromID[Stuff[Arguments.ParentID][Stuff.CurrentRow]]=ArrayNew(1)>
         </cfif>
         <cfset ArrayAppend(ChildrenFromID[Stuff[Arguments.ParentID][Stuff.CurrentRow]], Stuff[Arguments.ItemID][Stuff.CurrentRow])>
     </cfloop>
     <!--- Find parents without rows --->
     <cfloop query="Stuff">
         <cfif NOT StructKeyExists(RowFromID, Stuff[Arguments.ParentID][Stuff.CurrentRow])>
             <cfset ArrayAppend(RootItems, Stuff[Arguments.ItemID][Stuff.CurrentRow])>
             <cfset ArrayAppend(Depth, Arguments.BaseDepth)>
         </cfif>
     </cfloop>
     <!--- Do the deed --->
     <cfloop condition="ArrayLen(RootItems) GT 0">
         <cfset ThisID=RootItems[1]>
         <cfset ArrayDeleteAt(RootItems, 1)>
         <cfset ThisDepth=Depth[1]>
         <cfset ArrayDeleteAt(Depth, 1)>
         <cfif StructKeyExists(RowFromID, ThisID)>
             <!--- Add this row to the query --->
             <cfset RowID=RowFromID[ThisID]>
             <cfset QueryAddRow(Ret)>
             <cfset QuerySetCell(Ret, Arguments.DepthName, ThisDepth)>
             <cfloop list="#Stuff.ColumnList#" index="ColName">
                 <cfset QuerySetCell(Ret, ColName, Stuff[ColName][RowID])>
             </cfloop>
         </cfif>
         <cfif StructKeyExists(ChildrenFromID, ThisID)>
             <!--- Push children into the stack --->
             <cfset ChildrenIDs=ChildrenFromID[ThisID]>
             <cfloop from="#ArrayLen(ChildrenIDs)#" to="1" step="-1" index="i">
                 <cfset ArrayPrepend(RootItems, ChildrenIDs[i])>
                 <cfset ArrayPrepend(Depth, ThisDepth + 1)>
             </cfloop>
         </cfif>
     </cfloop>
     <cfreturn Ret>
 </cffunction>

---

