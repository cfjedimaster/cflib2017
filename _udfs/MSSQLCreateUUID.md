---
layout: udf
title:  MSSQLCreateUUID
date:   2002-06-27T17:37:26.000Z
library: DatabaseLib
argString: "[format]"
author: Chip Temm
authorEmail: chip@anthrologik.net
version: 1
cfVersion: CF5
shortDescription: Creates UUIDs safe for use in MSSQL UNIQUEIDENTIFIER fields.
description: |
 CF UUIDs are formatted differently than MSSQL UUIDs generated with the T-SQL function newid().  This can lead to problems when working with UUIDs. This function can return a UUID formatted like newid() in either string or binary format.  String values must be quoted when inserted into the database whereas binary values do not have to be quoted.  The latter is of help when one wants to have either a UUID or NULL inserted- neither of which is quoted. Takes an optional parameter indicating output format which can be either 'string' or 'binary'.

returnValue: Returns a string.

example: |
 <cfoutput>
 cfquery ....<BR>
    Insert into myTable<BR>
    (myTableID, name)<BR>
     VALUES<BR>
    (#MSSQL_createUUID('binary')#,'Joe Bloggs')<BR>
 /cfquery<BR><BR>
 <P>
 cfquery ....<BR>
    Insert into myTable<BR>
    (myTableID, name)<BR>
     VALUES<BR>
    ('#MSSQL_createUUID('string')#','Joe Bloggs')<BR>
 /cfquery<BR>
 <P>
 cfquery ....<BR>
    Insert into myTable<BR>
    (myTableID, name)<BR>
     VALUES<BR>
    ('#MSSQL_createUUID()#','Joe Bloggs')<BR>
 /cfquery
 </cfoutput>

args:
 - name: format
   desc: UUID format to generate.  Options are String or Binary.
   req: false


javaDoc: |
 /**
  * Creates UUIDs safe for use in MSSQL UNIQUEIDENTIFIER fields.
  * 
  * @param format      UUID format to generate.  Options are String or Binary. (Optional)
  * @return Returns a string. 
  * @author Chip Temm (chip@anthrologik.net) 
  * @version 1, June 27, 2002 
  */

code: |
 function MSSQL_createUUID(){
     var format = 'string';
     // uniqueidentifier wombat_createUUID([string FORMAT])
     //returns a UUID in the format specified.  
     //optional argument FORMAT defaults to string (MS-SQL uniqueidentifier safe)
     //accepts 'binary' or 'string'.  other values fail quietly to 'string'
     
     
     if(arraylen(Arguments)){
         if(arguments[1] eq 'binary' or arguments[1] eq 'string'){
             format = arguments[1];
         }
     }
     
     if(format eq 'string'){
         return Insert("-", CREATEuuid(), 23);
         /***   NOTE quoted usage is SQL statement:
         Insert into attribute (attributeID) values ('#wombat_createUUID()#')
         ***/
     
     }else{//must be raw binary
         return '0x' & Replace(CREATEuuid(),'-','','All'); 
         /***   NOTE UN-quoted usage is SQL statement:
         Insert into attribute (attributeID) values (#wombat_createUUID('binary')#)
         Good for cases where the value maybe either NULL or a UUID
         (neither of which should be quoted)
         ***/
     }
 }

---

