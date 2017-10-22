---
layout: udf
title:  DecimalFormatCorrectly
date:   2004-10-12T11:54:27.000Z
library: StrLib
argString: "number"
author: duncan cumming
authorEmail: duncan.cumming@alienationdesign.co.uk
version: 2
cfVersion: CF5
shortDescription: Corrects rounding bug in DecimalFormat.
tagBased: false
description: |
 DecimalFormat incorrectly rounds certain numbers, e.g. alterating between rounding up/down the same number at different times.  This UDF is an attempt to correct that.

returnValue: Returns a number.

example: |
 <cfset Total = 599>
 <cfset VAT = Total * 0.175>
 <cfset GrandTotal = Total + VAT>
 
 <cfoutput>
 Using DecimalFormat (proof of the bug): <br>
 Total: #DecimalFormat(Total)#<br>
 Vat: #DecimalFormat(VAT)#<br>
 Grand Total: #DecimalFormat(GrandTotal)#<br>
 #DecimalFormat(104.825)#<br>
 #DecimalFormat(703.825)#<br> 
 <br>
 Using DecimalFormatCorrectly:<br>
 Total: #DecimalFormatCorrectly(Total)#<br>
 Vat: #DecimalFormatCorrectly(VAT)#<br>
 Grand Total: #DecimalFormatCorrectly(GrandTotal)#<br>
 #DecimalFormatCorrectly(104.825)#<br>
 #DecimalFormatCorrectly(703.825)#<br>
 </cfoutput>

args:
 - name: number
   desc: The number to format.
   req: true


javaDoc: |
 /**
  * Corrects rounding bug in DecimalFormat.
  * Minor update.
  * 
  * @param number      The number to format. (Required)
  * @return Returns a number. 
  * @author duncan cumming (duncan.cumming@alienationdesign.co.uk) 
  * @version 2, October 12, 2004 
  */

code: |
 function DecimalFormatCorrectly(number) {
     var lhs=0;
     var rhs=0;
     var decLen = 0;
     var i = 0;
     
     if(ListLen(number, ".") EQ 2) {    //xxx.xxx
         lhs = ListFirst(number, ".");
         rhs = ListLast(number, ".");
     } else if (Find(".", Trim(number)) EQ 1) { // .xx
         rhs = number;
     } else if (Find(".", Trim(number)) EQ 0) {    // xx
         lhs = number;
     } else {
         return number;
     }
     
     if (NOT IsNumeric(lhs) OR NOT IsNumeric(rhs)) return number;
     
     for (i = 0; i LT 2; i=i+1) {
         if (Len(rhs) LT 2) rhs = rhs & "0";
     }
     
     // count how many digits > 2dp there are
     decLen = Len(rhs) - 2; 
 
     // divide by this number of zeroes
     for (i = 0; i LT decLen; i=i+1) {
         rhs = rhs / 10;
     } 
 
     // round it
     rhs = Round(rhs);
 
     if (rhs GTE 100) { 
         rhs = 0;
         lhs = lhs + 1;
     }
 
     // pad with zeros if necessary
     if (rhs LT 10) {
         rhs = "0" & rhs;
     }    
     
     lhs = NumberFormat(lhs);
     
     return (lhs & "." & rhs);
 }

---

