---
layout: udf
title:  NumberAsString
date:   2002-08-20T11:06:36.000Z
library: StrLib
argString: "number"
author: Ben Forta
authorEmail: ben@forta.com
version: 2
cfVersion: CF5
shortDescription: Returns a number converted into a string (i.e. 1 becomes &quot;One&quot;).
description: |
 Generate a string representation of a number. 
 For example, &quot;123&quot; generates &quot;One Hundred and Twenty Three&quot;, and &quot;12.45&quot; generates &quot;Twelve Point Forty Five&quot;.

returnValue: Returns a string.

example: |
 <CFSET X = 9321>
 <CFSET Y = 1>
 <CFSET Z = 9999999.99>
 <CFOUTPUT>
 #X# as a string is #NumberAsString(X)#<BR>
 #Y# as a string is #NumberAsString(Y)#<BR>
 #Z# as a string is #NumberAsString(Z)#<BR>
 </CFOUTPUT>

args:
 - name: number
   desc: The number to translate.
   req: true


javaDoc: |
 /**
  * Returns a number converted into a string (i.e. 1 becomes &quot;One&quot;).
  * Added catch for number=0. Thanks to Lucas for finding it.
  * 
  * @param number      The number to translate. (Required)
  * @return Returns a string. 
  * @author Ben Forta (ben@forta.com) 
  * @version 2, August 20, 2002 
  */

code: |
 function NumberAsString(number)
 {
    VAR Result="";          // Generated result
    VAR Str1="";            // Temp string
    VAR Str2="";            // Temp string
    VAR n=number;           // Working copy
    VAR Billions=0;
    VAR Millions=0;
    VAR Thousands=0;
    VAR Hundreds=0;
    VAR Tens=0;
    VAR Ones=0;
    VAR Point=0;
    VAR HaveValue=0;        // Flag needed to know if to process "0"
 
    // Initialize strings
    // Strings are "externalized" to simplify
    // changing text or translating
    if (NOT IsDefined("REQUEST.Strs"))
    {
       REQUEST.Strs=StructNew();
       REQUEST.Strs.space=" ";
       REQUEST.Strs.and="and";
       REQUEST.Strs.point="Point";
       REQUEST.Strs.n0="Zero";
       REQUEST.Strs.n1="One";
       REQUEST.Strs.n2="Two";
       REQUEST.Strs.n3="Three";
       REQUEST.Strs.n4="Four";
       REQUEST.Strs.n5="Five";
       REQUEST.Strs.n6="Six";
       REQUEST.Strs.n7="Seven";
       REQUEST.Strs.n8="Eight";
       REQUEST.Strs.n9="Nine";
       REQUEST.Strs.n10="Ten";
       REQUEST.Strs.n11="Eleven";
       REQUEST.Strs.n12="Twelve";
       REQUEST.Strs.n13="Thirteen";
       REQUEST.Strs.n14="Fourteen";
       REQUEST.Strs.n15="Fifteen";
       REQUEST.Strs.n16="Sixteen";
       REQUEST.Strs.n17="Seventeen";
       REQUEST.Strs.n18="Eighteen";
       REQUEST.Strs.n19="Nineteen";
       REQUEST.Strs.n20="Twenty";
       REQUEST.Strs.n30="Thirty";
       REQUEST.Strs.n40="Forty";
       REQUEST.Strs.n50="Fifty";
       REQUEST.Strs.n60="Sixty";
       REQUEST.Strs.n70="Seventy";
       REQUEST.Strs.n80="Eighty";
       REQUEST.Strs.n90="Ninety";
       REQUEST.Strs.n100="Hundred";
       REQUEST.Strs.nK="Thousand";
       REQUEST.Strs.nM="Million";
       REQUEST.Strs.nB="Billion";
    }
    
    // Save strings to an array once to improve performance
    if (NOT IsDefined("REQUEST.StrsA"))
    {
       // Arrays start at 1, to 1 contains 0
       // 2 contains 1, and so on
       REQUEST.StrsA=ArrayNew(1);
       ArrayResize(REQUEST.StrsA, 91);
       REQUEST.StrsA[1]=REQUEST.Strs.n0;
       REQUEST.StrsA[2]=REQUEST.Strs.n1;
       REQUEST.StrsA[3]=REQUEST.Strs.n2;
       REQUEST.StrsA[4]=REQUEST.Strs.n3;
       REQUEST.StrsA[5]=REQUEST.Strs.n4;
       REQUEST.StrsA[6]=REQUEST.Strs.n5;
       REQUEST.StrsA[7]=REQUEST.Strs.n6;
       REQUEST.StrsA[8]=REQUEST.Strs.n7;
       REQUEST.StrsA[9]=REQUEST.Strs.n8;
       REQUEST.StrsA[10]=REQUEST.Strs.n9;
       REQUEST.StrsA[11]=REQUEST.Strs.n10;
       REQUEST.StrsA[12]=REQUEST.Strs.n11;
       REQUEST.StrsA[13]=REQUEST.Strs.n12;
       REQUEST.StrsA[14]=REQUEST.Strs.n13;
       REQUEST.StrsA[15]=REQUEST.Strs.n14;
       REQUEST.StrsA[16]=REQUEST.Strs.n15;
       REQUEST.StrsA[17]=REQUEST.Strs.n16;
       REQUEST.StrsA[18]=REQUEST.Strs.n17;
       REQUEST.StrsA[19]=REQUEST.Strs.n18;
       REQUEST.StrsA[20]=REQUEST.Strs.n19;
       REQUEST.StrsA[21]=REQUEST.Strs.n20;
       REQUEST.StrsA[31]=REQUEST.Strs.n30;
       REQUEST.StrsA[41]=REQUEST.Strs.n40;
       REQUEST.StrsA[51]=REQUEST.Strs.n50;
       REQUEST.StrsA[61]=REQUEST.Strs.n60;
       REQUEST.StrsA[71]=REQUEST.Strs.n70;
       REQUEST.StrsA[81]=REQUEST.Strs.n80;
       REQUEST.StrsA[91]=REQUEST.Strs.n90;
    }
 
    //zero shortcut
    if(number is 0) return "Zero";
 
    // How many billions?
    // Note: This is US billion (10^9) and not
    // UK billion (10^12), the latter is greater
    // than the maximum value of a CF integer and
    // cannot be supported.
    Billions=n\1000000000;
    if (Billions)
    {
       n=n-(1000000000*Billions);
       Str1=NumberAsString(Billions)&REQUEST.Strs.space&REQUEST.Strs.nB;
       if (Len(Result))
          Result=Result&REQUEST.Strs.space;
       Result=Result&Str1;
       Str1="";
       HaveValue=1;
    }
 
    // How many millions?
    Millions=n\1000000;
    if (Millions)
    {
       n=n-(1000000*Millions);
       Str1=NumberAsString(Millions)&REQUEST.Strs.space&REQUEST.Strs.nM;
       if (Len(Result))
          Result=Result&REQUEST.Strs.space;
       Result=Result&Str1;
       Str1="";
       HaveValue=1;
    }
 
    // How many thousands?
    Thousands=n\1000;
    if (Thousands)
    {
       n=n-(1000*Thousands);
       Str1=NumberAsString(Thousands)&REQUEST.Strs.space&REQUEST.Strs.nK;
       if (Len(Result))
          Result=Result&REQUEST.Strs.space;
       Result=Result&Str1;
       Str1="";
       HaveValue=1;
    }
 
    // How many hundreds?
    Hundreds=n\100;
    if (Hundreds)
    {
       n=n-(100*Hundreds);
       Str1=NumberAsString(Hundreds)&REQUEST.Strs.space&REQUEST.Strs.n100;
       if (Len(Result))
          Result=Result&REQUEST.Strs.space;
       Result=Result&Str1;
       Str1="";
       HaveValue=1;
    }   
 
    // How many tens?
    Tens=n\10;
    if (Tens)
       n=n-(10*Tens);
     
    // How many ones?
    Ones=n\1;
    if (Ones)
       n=n-(Ones);
    
    // Anything after the decimal point?
    if (Find(".", number))
       Point=Val(ListLast(number, "."));
    
    // If 1-9
    Str1="";
    if (Tens IS 0)
    {
       if (Ones IS 0)
       {
          if (NOT HaveValue)
             Str1=REQUEST.StrsA[0];
       }
       else
          // 1 is in 2, 2 is in 3, etc
          Str1=REQUEST.StrsA[Ones+1];
    }
    else if (Tens IS 1)
    // If 10-19
    {
       // 10 is in 11, 11 is in 12, etc
       Str1=REQUEST.StrsA[Ones+11];
    }
    else
    {
       // 20 is in 21, 30 is in 31, etc
       Str1=REQUEST.StrsA[(Tens*10)+1];
       
       // Get "ones" portion
       if (Ones)
          Str2=NumberAsString(Ones);
       Str1=Str1&REQUEST.Strs.space&Str2;
    }
    
    // Build result   
    if (Len(Str1))
    {
       if (Len(Result))
          Result=Result&REQUEST.Strs.space&REQUEST.Strs.and&REQUEST.Strs.space;
       Result=Result&Str1;
    }
 
    // Is there a decimal point to get?
    if (Point)
    {
       Str2=NumberAsString(Point);
       Result=Result&REQUEST.Strs.space&REQUEST.Strs.point&REQUEST.Strs.space&Str2;
    }
     
    return Result;
 }

---

