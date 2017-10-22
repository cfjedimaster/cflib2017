---
layout: udf
title:  getCardType
date:   2005-11-03T23:55:12.000Z
library: UtilityLib
argString: "cardNumber"
author: Dave Cordes
authorEmail: dcordes@apoktechnology.com
version: 1
cfVersion: CF5
shortDescription: Returns the card type of a card number.
tagBased: false
description: |
 Returns the card type of a card number. Will return &quot;Unknown&quot; if the card type cannot be detected.

returnValue: Returns a string.

example: |
 <cfoutput>
 What card type is 4111111111111111? #GetCardType(4111111111111111)#
 </cfoutput>

args:
 - name: cardNumber
   desc: The credit card number.
   req: true


javaDoc: |
 /**
  * Returns the card type of a card number.
  * 
  * @param cardNumber      The credit card number. (Required)
  * @return Returns a string. 
  * @author Dave Cordes (dcordes@apoktechnology.com) 
  * @version 1, November 3, 2005 
  */

code: |
 function getCardType(cardNumber) {
     var CardType = "Unknown";
     var CardLength = Len(cardNumber);
     
     if ((CardLength eq 15) and (((Left(cardNumber, 2) is "34")) or ((Left(cardNumber, 2) is "37")))) CardType = "American Express";
     if ((CardLength eq 14) and (((Left(cardNumber, 3) gte 300) and (Left(cardNumber, 3) lte 305)) or (Left(cardNumber, 2) is "36") or (Left(cardNumber, 2) is "38"))) CardType =  "Diner's Club";
     if ((CardLength eq 16) and (Left(cardNumber, 4) is "6011")) CardType =  "Discover Card";
     if ((CardLength eq 16) and (Left(cardNumber, 2) gte 51) and (Left(cardNumber, 2) lte 55)) CardType =  "MasterCard";
     if (((CardLength eq 13) or (CardLength eq 16)) and (Left(cardNumber, 1) is "4")) CardType =  "Visa";
     
     return CardType;
 }

---

