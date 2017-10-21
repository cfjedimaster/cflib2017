---
layout: udf
title:  SQLBatcher
date:   2006-11-10T00:14:15.000Z
library: DataManipulationLib
argString: "BathCode, DSN[, sSep]"
author: Joseph Flanigan
authorEmail: joseph@switch-box.org
version: 2
cfVersion: CF6
shortDescription: Sends a SQL Batch script and reports results.
description: |
 Sends an SQL Batch script with 1 or more code blocks to a DSN. Reports results of each code block. Each code block seperated by a &quot;GO\r&quot; token is executed with a CFQuery.

returnValue: Returns a struct.

example: |
 <cfparam name="Form.BatchCode" default="">
 <cfparam name="Form.DSN" default="">
 <table><tr><td>
 <cfoutput>
 <form  method="post" >
 DSN:<input type="text" name="DSN" value="#FORM.DSN#">
 <br>SQL Batch:<br>
 <textarea cols="75" rows="20" name="BatchCode">#FORM.BatchCode#</textarea>
  <br>
 <input type="submit" name="Submit" value="Submit">
 </td></tr>
 </form>
 </cfoutput>
 </table>
 <cfif isDefined("FORM.Submit")>
 <cfdump var="#SQLBatcher(FORM.BatchCode,Form.DSN)#"> 
 </cfif>
 <p>Copy SQL like the following into the textarea. Make sure the last GO is followed by a carriage return.
 <hr>
 <pre> 
 if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[myContacts]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
 drop table [dbo].[myContacts]
 GO
 
 CREATE TABLE [dbo].[myContacts] (
     [ContactID] [int] IDENTITY (1, 1) NOT NULL ,
     [ContactTypesID] [smallint] NOT NULL ,
     [StatusID] [smallint] NOT NULL ,
     [Name] [varchar] (50) NOT NULL
 ) ON [PRIMARY]
 GO
 
 if exists (select * from dbo.sysobjects where id = object_id(N'[pr_myContacts_INS]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
 drop procedure [pr_myContacts_INS]
 GO
 
   IF OBJECT_ID('dbo.pr_myContacts_INS') IS NOT NULL
         SELECT '<<< FAILED DROPPING PROCEDURE pr_myContacts_INS >>>'
     ELSE
         SELECT  '<<< DROPPED PROCEDURE dbo.pr_myContacts_INS >>>'
 GO
 SET QUOTED_IDENTIFIER OFF 
 GO
 SET ANSI_NULLS ON 
 GO
 
 CREATE PROCEDURE pr_myContacts_INS
 (
      @ContactTypesID     [smallint],
      @StatusID           [smallint],
      @Name               [varchar](50)
 )
 AS
 BEGIN
 BEGIN TRANSACTION
   INSERT INTO  dbo.myContacts 
     (
      [ContactTypesID],
      [StatusID],
      [Name]
     )
   VALUES
     (
      @ContactTypesID,
      @StatusID,
      @Name
     )
 IF (@@error!=0)
   BEGIN
     RAISERROR  20000 'pr_myContacts_INS: Cannot insert data into dbo.myContacts'
     ROLLBACK TRAN
     RETURN(1)
   END
 
 COMMIT TRAN
 END
 
 SELECT SCOPE_IDENTITY() AS ContactID
 
 GO
 IF OBJECT_ID('dbo.pr_myContacts_INS') IS NOT NULL
     SELECT '<<< CREATED PROCEDURE dbo.pr_myContacts_INS >>>'
 ELSE
     SELECT '<<< FAILED CREATING PROCEDURE dbo.pr_myContacts_INS >>>'
 
 GO
 SET QUOTED_IDENTIFIER OFF 
 GO
 SET ANSI_NULLS ON 
 GO
 
 </pre>

args:
 - name: BathCode
   desc: Set of SQL statements.
   req: true
 - name: DSN
   desc: The Datasource.
   req: true
 - name: sSep
   desc: Separator. Defaults to GO.
   req: false


javaDoc: |
 <!---
  Sends a SQL Batch script and reports results.
  
  @param BathCode      Set of SQL statements. (Required)
  @param DSN      The Datasource. (Required)
  @param sSep      Separator. Defaults to GO. (Optional)
  @return Returns a struct. 
  @author Joseph Flanigan (joseph@switch-box.org) 
  @version 2, November 9, 2006 
 --->

code: |
 <cffunction name="SQLBatcher" access="public" returntype="string" hint="Runs a set of queries based on sql string" output="false">
     <cfargument name="BatchCode" type="string" required="yes">
     <cfargument name="theDSN" type="string" required="yes">
     <cfargument name="sSep" type="string" required="no" default="GO">
         
     <cfscript> 
     var CleanedBatchCode = ReReplaceNoCase(BatchCode, "--.*?\r", "", "all");// clean sql comments
     var arBatchBlocks = ArrayNew(1); // index of each block and it's SQL string
     var separator = REFindNoCase("#arguments.sSep#\r",CleanedBatchCode,1,1); // looks for separators
     var pos = separator.pos[1]; // 0 or position of first separator
     var oldpos = 1;
     var Batch = 0; // count of separator blocks
     var Block = ""; // Code block of SQL 
     var sSQL = ""; // string to be returned
     
     // make sure arguments have length
     if ( (Len(Trim(theDSN)) EQ 0) OR (Len(Trim(CleanedBatchCode)) EQ 0) ) {
         sSQL = "<<<ERROR>>> Invalid parameters";
         return sSQL; // if there is an error stop batcher and return to caller 
     }
         
     // if no separator blocks, just query on the one block
     if(not pos) arBatchBlocks[1] = CleanedBatchCode;
     // loop around the separator blocks to get the code block for each separator
     while(pos gt 0) {
         block = mid(CleanedBatchCode,oldpos,pos-oldpos);
         // only add a block if there are characters in it. 
         if (ReFind("[[:alnum:]]",block,1,"False")) arrayAppend(arBatchBlocks,block);
         oldpos = pos + separator.len[1];
         separator = REFindNoCase("#arguments.sSep#\r|$",CleanedBatchCode,oldpos+1,1);
         pos = separator.pos[1];
     }        
     </cfscript>
         
     <!--- build return string --->
     <cfsavecontent variable="sSQL">
     
     <cfoutput>#Chr(60)#cftransaction#Chr(62)##Chr(10)##Chr(10)#</cfoutput>
         <cfloop index="Batch" from="1" to="#ArrayLen(arBatchBlocks)#" step="1">
             <cfset Block = arBatchBlocks[Batch]>
             <cfif Len(Trim(Block))><cfoutput>#Chr(60)#cfquery name="q#BATCH#" datasource="#Arguments.theDSN#"#Chr(62)##Chr(10)##Trim(PreserveSingleQuotes(Block))##Chr(10)##Chr(60)#/cfquery#Chr(62)##Chr(10)##Chr(10)#</cfoutput></cfif> 
         </cfloop>
     <cfoutput>#Chr(60)#/cftransaction#Chr(62)#</cfoutput>
     </cfsavecontent>
         
     <cfreturn sSQL>
 </cffunction>

---

