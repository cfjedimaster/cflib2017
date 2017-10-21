---
layout: udf
title:  excelColumnNameToColumnNumber
date:   2011-08-22T20:40:03.000Z
library: UtilityLib
argString: "columnNamePassIn"
author: Nolan Erck
authorEmail: nolan.erck@gmail.com
version: 1
cfVersion: CF5
shortDescription: Converts an Excel Column Name to its numeric column position.
description: |
 Converts an Excel Column Name (AB) to its numeric column position (i.e. 28). Assumes column numbers are indexed starting from 1 (1=A,2=B,...)

returnValue: Returns a number.

example: |
 excelColumnNametoColumnNumber( "AB" );
 
 excelColumnNametoColumnNumber( "CC" );
 
 excelColumnNametoColumnNumber( "F" );

args:
 - name: columnNamePassIn
   desc: Column name (as string) to convert.
   req: true


javaDoc: |
 <!---
  Converts an Excel Column Name to its numeric column position.
  
  @param columnNamePassIn      Column name (as string) to convert. (Required)
  @return Returns a number. 
  @author Nolan Erck (nolan.erck@gmail.com) 
  @version 1, August 22, 2011 
 --->

code: |
 function excelColumnNameToColumnNumber( columnNamePassedIn ) {
     var columnName = UCase( Trim( arguments.columnNamePassedIn ) ); // clean up our data a bit to make some ASCII math easier...
     var colLength  = Len( Trim( columnName ) );
     var cur_Char   = "";
     var index      = colLength;
     var columnNumber = 0;
     var expBase    = 26;
     var digitPlaceHolder = 0;
     var subTotal   = 0;
 
     while( index gt 0 )
     {
         cur_Char     = Mid( columnName, index, 1 );
         columnNumber = ( ( Asc( cur_Char ) - 64 ) * ( expBase ^ digitPlaceHolder ) );
         subTotal    += columnNumber;
 
         index--;        
         digitPlaceHolder++;
     }
 
     return subTotal;
 }

---

