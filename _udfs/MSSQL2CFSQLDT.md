---
layout: udf
title:  MSSQL2CFSQLDT
date:   2009-05-10T01:34:19.000Z
library: DatabaseLib
argString: "dataType"
author: C. Jason Wilson
authorEmail: cjwilson@cf-developer.net
version: 0
cfVersion: CF6
shortDescription: Convert Microsoft SQL Server Data Type to equivilent CFSQLType
tagBased: false
description: |
 Convert Microsoft SQL Server Data Type to equivilent CFSQLType. Most usefull when querying MS SQL Server sys tables to return data type from the table structure 
  and converting to a CF data type for use within the &lt;cfqueryparam&gt; tag.

returnValue: returns a string

example: |
 #MSSQL2CFSQLDT('nvarchar')#  returns  CF_SQL_VARCHAR

args:
 - name: dataType
   desc: String of datatype to use
   req: true


javaDoc: |
 /**
  * Convert Microsoft SQL Server Data Type to equivilent CFSQLType
  * Most useful when querying MS SQL Server sys tables to return data type from the table structure and converting to a CF data type for use within the &lt;cfqueryparam&gt; tag.
  * 
  * Example Usage
  * #MSSQL2CFSQLDT('nvarchar')#  returns  CF_SQL_VARCHAR
  * 
  * Author C. Jason Wilson (cjwilson@cf-developer.net) 
  * version 1, January 13, 2009
  * 
  * @param dataType      String of datatype to use (Required)
  * @return returns a string 
  * @author C. Jason Wilson (cjwilson@cf-developer.net) 
  * @version 0, May 9, 2009 
  */

code: |
 function MSSQL2CFSQLDT (DataType) {
     var MSSQLType = 'int,bigint,smallint,tinyint,numeric,money,smallmoney,bit,decimal,float,real,datetime,smalldatetime,char,nchar,varchar,nvarchar,text,ntext';
     var CFSQLType = 'CF_SQL_INTEGER,CF_SQL_BIGINT,CF_SQL_SMALLINT,CF_SQL_TINYINT,CF_SQL_NUMERIC,CF_SQL_MONEY4,CF_SQL_MONEY,CF_SQL_BIT,CF_SQL_DECIMAL,CF_SQL_FLOAT,CF_SQL_REAL,CF_SQL_TIMESTAMP,CF_SQL_DATE,CF_SQL_CHAR,CF_SQL_CHAR,CF_SQL_VARCHAR,CF_SQL_VARCHAR,CF_SQL_LONGVARCHAR,CF_SQL_LONGVARCHAR';
     
     if(ListFind(MSSQLType,DataType)) {
         return ListGetAt(CFSQLType,ListFind(MSSQLType,DataType));
     } else { return 'NULL'; }
 }

oldId: 1942
---

