---
layout: udf
title:  TranslateFuture
date:   2002-01-07T19:38:19.000Z
library: FinancialLib
argString: "Future"
author: Mark Kruger
authorEmail: Mkruger@cfwebtools.com
version: 1
cfVersion: CF5
shortDescription: Translates a Cryptic Futures symbol into a descriptive structure.
tagBased: false
description: |
 This tag is for developers struggling with commodity quotes.  A given commodity symbol has an indicator for the year and month of the contract it represents.  The month in particular cooresponds to codes dictated by commodity exchanges.  This UDF unpacks a futures symbol into it's root, descriptive month, and year, and hands the values back as a structure.

returnValue: Returns a structure.

example: |
 <cfset futuretest = "SPU2,CH2,OH2,NGK2">
 <cfloop index="future" list="#futuretest#">
     <cfset FutSym = TranslateFuture(future)>
     <cfoutput>
     Contract Root:  #futSym.Root# <br>
     Contract Month:  #futSym.Month# <br>
     Contract Year:   #FutSym.Year# <br>
     <p>
     </cfoutput>
 </cfloop>

args:
 - name: Future
   desc: The futures symbol.
   req: true


javaDoc: |
 /**
  * Translates a Cryptic Futures symbol into a descriptive structure.
  * 
  * @param Future      The futures symbol. 
  * @return Returns a structure. 
  * @author Mark Kruger (Mkruger@cfwebtools.com) 
  * @version 1, January 29, 2002 
  */

code: |
 function TranslateFuture(Symbol) {
     var    TheYear                =    '';
     var    TheMonth            =    '';
     var SymbolStruct        =    StructNew();
     
     if(Symbol IS NOT '') {
         Symbol                =    replace(Symbol,'0','');
         TheYear                =    '200' &  val(Reverse(Symbol));
         Symbol                =    Replace(symbol,val(reverse(symbol)),'');
         TheMonth            =    right(symbol,1);
         switch(TheMonth)
         {
             case 'F':    {    TheMonth    =    'January';        break;        }
             case 'G':    {    TheMonth    =    'February';        break;        }
             case 'H':    {    TheMonth    =    'March';        break;        }
             case 'J':    {    TheMonth    =    'April';        break;        }
             case 'K':    {    TheMonth    =    'May';            break;        }
             case 'M':    {    TheMonth    =    'June';            break;        }
             case 'N':    {    TheMonth    =    'July';            break;        }
             case 'Q':    {    TheMonth    =    'August';        break;        }
             case 'U':    {    TheMonth    =    'September';    break;        }
             case 'V':    {    TheMonth    =    'October';        break;        }
             case 'X':    {    TheMonth    =    'November';        break;        }
             case 'Z':    {    TheMonth    =    'December';        break;        }                
         }
         
         
         Symbol                =    left(symbol,len(symbol)-1);
         SymbolStruct.Year    =    TheYear;
         SymbolStruct.Root    =    Symbol;
         SymbolStruct.Month    =    TheMonth;
     }
     else {
         SymbolStruct        =    structnew();    
         SymbolStruct.Year    =    '';
         SymbolStruct.Root    =    '';
         SymbolStruct.Month    =    '';
     }
     return(symbolStruct);
 }

oldId: 386
---

