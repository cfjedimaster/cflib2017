---
layout: udf
title:  IsCreditCard
date:   2004-08-17T11:21:24.000Z
library: StrLib
argString: "ccNo[, cardType]"
author: Nick de Voil
authorEmail: nick@devoil.com
version: 4
cfVersion: CF5
shortDescription: Returns TRUE if the string is a valid credit card number.
description: |
 Returns TRUE if the given credit card number is well-formed
 according to the industry-standard Luhn algorithm, and (optionally) conforms with basic
 formatting rules applicable to the specific card type, e.g. Visa, Mastercard.
 
 &lt;strong&gt;  CAUTION: Note that this does not prove that the card has not been revoked, stolen etc.&lt;/strong&gt;
 
 Non-numeric characters in the card number string are simply ignored.

returnValue: Returns a boolean.

example: |
 <CFOUTPUT>
 Is the card number 5418590012345679 valid? #IsCreditCard("5418590012345679")#
 <P>
 Is the card number 5418590012345679 a valid Mastercard? #IsCreditCard("5418590012345679", "MASTERCARD")#
 <P>
 Is 541A590012345679 valid? #IsCreditCard("541A590012345679")#
 <P>
 Is the card number 541 8590 01234 5679 valid? #IsCreditCard("541 8590 01234 5679")#
 
 </cfoutput>

args:
 - name: ccNo
   desc: The credit card number.
   req: true
 - name: cardType
   desc: One of&#58; AMEX, DINERS, DISCOVER, MASTERCARD, VISA
   req: false


javaDoc: |
 /**
  * Returns TRUE if the string is a valid credit card number.
  * Modded by RCamden - Check for any non numeric and return false.
  * Modded by Author - fixed mastercard checking
  * Updated to use [:digit:] and allow spaces
  * Corrected nondigit check
  * 
  * @param ccNo      The credit card number. (Required)
  * @param cardType      One of: AMEX, DINERS, DISCOVER, MASTERCARD, VISA (Optional)
  * @return Returns a boolean. 
  * @author Nick de Voil (nick@devoil.com) 
  * @version 4, August 17, 2004 
  */

code: |
 function IsCreditCard(ccNo)
 {
     var rv = "";
     var str = "";
     var chk = 0;
     var ccln = 0;
     var strln = 0;
     var i = 1;
 
     if(reFind("[^[:digit:]]",ccNo)) return FALSE;
         ccNo = replace(ccNo," ","","ALL");
     rv = Reverse(ccNo);
     ccln = Len(ccNo);
     if(ccln lt 12) return FALSE;
     for(i = 1; i lte ccln;  i = i + 1) {
         if(i mod 2 eq 0) {
             str = str & Mid(rv, i, 1) * 2;
         } else {
             str = str & Mid(rv, i, 1);
         }
     }
     strln = Len(str);
     for(i = 1; i lte strln; i = i + 1) chk = chk + Mid(str, i, 1);
     if((chk neq 0) and (chk mod 10 eq 0)) {
         if(ArrayLen(Arguments) lt 2) return TRUE;
         switch(UCase(Arguments[2])) {
         case "AMEX":        if ((ccln eq 15) and (((Left(ccNo, 2) is "34")) or ((Left(ccNo, 2) is "37")))) return TRUE; break;
         case "DINERS":        if ((ccln eq 14) and (((Left(ccNo, 3) gte 300) and (Left(ccNo, 3) lte 305)) or (Left(ccNo, 2) is "36") or (Left(ccNo, 2) is "38"))) return TRUE; break;
         case "DISCOVER":    if ((ccln eq 16) and (Left(ccNo, 4) is "6011")) return TRUE; break;
         case "MASTERCARD":    if ((ccln eq 16) and (Left(ccNo, 2) gte 51) and (Left(ccNo, 2) lte 55)) return TRUE; break;
         case "VISA":        if (((ccln eq 13) or (ccln eq 16)) and (Left(ccNo, 1) is "4")) return TRUE; break;
         default: return TRUE;
         }
     }
     return FALSE;
 }

---

