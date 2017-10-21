---
layout: udf
title:  DollarAsString
date:   2001-07-18T10:35:37.000Z
library: StrLib
argString: "dollaramount[, centsasdigits]"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF5
shortDescription: Returns a number converted into a string (i.e. 1 becomes "One Dollar").
description: |
 Generate a string representation of a dollar amount. For example, "2.56" generates "Two Dollars and Fifty Six Cents." This function will round cents to two spaces (so .329 is treated as .33). Optional parameter is a YES/NO flag specifying whether  or not cents should be displayed as digits ("Two Dollars
  and 56 Cents", for example), the default is NO.

returnValue: Returns a string.

example: |
 <CFSET X = 9321.21>
 <CFSET Y = 1>
 <CFSET Z = 432.21>
 <CFOUTPUT>
 #X# as a string is #DollarAsString(X)#<BR>
 #Y# as a string is #DollarAsString(Y)#<BR>
 #Z# as a string (and using cents as digits) is #DollarAsString(Z,True)#<BR>
 </CFOUTPUT>

args:
 - name: dollaramount
   desc: The number representing the dollar amount.
   req: true
 - name: centsasdigits
   desc: Boolean value (defaults to no) that specifies if cents should be displayed as digits.
   req: false


javaDoc: |
 /**
  * Returns a number converted into a string (i.e. 1 becomes "One Dollar").
  * 
  * @param dollaramount      The number representing the dollar amount. 
  * @param centsasdigits      Boolean value (defaults to no) that specifies if cents should be displayed as digits. 
  * @return Returns a string. 
  * @author Ben Forta (ben@forta.com) 
  * @version 1, July 18, 2001 
  */

code: |
 function DollarAsString(number)
 {
    VAR Result="";          // Generated result
    VAR Strs=StructNew();   // Strings structure
    VAR Str="";             // Temp string
    VAR n=0;                // Temp number
    VAR Dollars=0;          // Dollar amount
    VAR Cents=0;            // Cents amount
    VAR CentsAsDigits=0;    // Cents as digits flag
    
    // Initialize strings
    if (NOT IsDefined("REQUEST.DStrs"))
    {
       REQUEST.DStrs=StructNew();
       REQUEST.DStrs.space=" ";
       REQUEST.DStrs.and="and";
       REQUEST.DStrs.dollar="Dollar";
       REQUEST.DStrs.dollars="Dollars";
       REQUEST.DStrs.cent="Cent";
       REQUEST.DStrs.cents="Cents";
    }
    
    // Check for optional parameter
    if (ArrayLen(Arguments) GTE 2 AND IsBoolean(Arguments[2]))
       CentsAsDigits=Arguments[2];
    
    // Extract dollar and cent portions
    Dollars=Int(number);
    n=Find(".", number);
    if (n)
    {
       // There is a cents value
       Str=Trim(Mid(number, n+1, Len(number)-n));
       if (Len(Str) IS 1)
          Cents=Str&"0";
       else if (Len(Str) IS 2)
          Cents=Val(Str);
       else if (Len(Str) GTE 3)
       {
          Str=Left(Str, 2)&"."&Right(Str, Len(Str)-2);
          Cents=Round(Str);
       }
    }
       
    // Build result
    if (Dollars)
       Result=Result&NumberAsString(Dollars)&REQUEST.DStrs.space&IIf(Dollars IS 1, DE(REQUEST.DStrs.dollar), DE(REQUEST.DStrs.dollars));
    if (Cents)
    {
       if (Dollars)
          Result=Result&REQUEST.DStrs.space&REQUEST.DStrs.and&REQUEST.DStrs.space;
       if (CentsAsDigits)
          Str=Cents;
       else
          Str=NumberAsString(Cents);
       Result=Result&Str&REQUEST.DStrs.space&IIf(Cents IS 1, DE(REQUEST.DStrs.cent), DE(REQUEST.DStrs.cents));
    }
    
    return Result;
 }

---

