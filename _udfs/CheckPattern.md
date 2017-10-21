---
layout: udf
title:  CheckPattern
date:   2003-01-15T13:05:56.000Z
library: StrLib
argString: "checkWhat, str"
author: Chris Chay
authorEmail: itadept@earthlink.net
version: 2
cfVersion: CF5
shortDescription: This UDF is an extensible, easy to use pattern validator using regular expressions.
description: |
 RPV uses regular expressions to check and match the string to a predefined pattern.  For instance, date, phone number, credit card and so on.  2 parameters are required for using RPV, name of the pattern to check (see code), and the string to validate.  If a patter is not found, the UDF will return false.
 
 Using UDF, you can extend the functionality by including your own patterns.  Just add another case towards the bottom (above the default).
 Usage: #CheckPattern(PatternToCheck,stringToCheck)#
 
 Note:  Many of these patterns are off of the internet.  In the next version, I'll try to include as many credits to the original authors as possible, including specific example of pattern matches and non-matches.  I can really only take credit for the UDF and not the patterns.

returnValue: Returns a boolean.

example: |
 <cfif CheckPattern("isIP","10.10.10.10")>
 The IP you supplied will be ...
 <cfelse>
 Please provide a valid IP address
 </cfif>

args:
 - name: checkWhat
   desc: Name of the pattern to use.
   req: true
 - name: str
   desc: String to check.
   req: true


javaDoc: |
 /**
  * This UDF is an extensible, easy to use pattern validator using regular expressions.
  * Rewrites by rcamden.
  * 
  * @param checkWhat      Name of the pattern to use. (Required)
  * @param str      String to check. (Required)
  * @return Returns a boolean. 
  * @author Chris Chay (itadept@earthlink.net) 
  * @version 2, January 15, 2003 
  */

code: |
 function CheckPattern(checkWhat, str) {
     var rePattern=""; // Assign RE pattern to this variable
     switch (checkWhat){
         case "isEmail":
             rePattern="^([\w\d\-\.]+)@{1}(([\w\d\-]{1,67})|([\w\d\-]+\.[\w\d\-]{1,67}))\.(([a-zA-Z\d]{2,4})(\.[a-zA-Z\d]{2})?)$";
             break;
         case "isIP":
             rePattern="^(((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|0?[0-9]?[0-9])\.){3,3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|0?[0-9]?[0-9]))$";
             break;
         case "isFloat":
             rePattern="^[-+]?\d*\.?\d*$";
             break;
         case "isInteger":
             rePattern="^[+-]?\d+$";
             break;
         case "isUSPhone":
             rePattern="^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$";
             break;
         case "isUSCurrency":
             rePattern="^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$";
             break;
         case "isDate":
             rePattern="^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$";
             break;
         case "isCreditCard":
             rePattern="^((4\d{3})|(5[1-5]\d{2})|(6011))-?\d{4}-?\d{4}-?\d{4}|3[4,7]\d{13}$";
             break;
         case "isSSN":
             rePattern="^\d{3}-\d{2}-\d{4}$";
             break;
         case "isZipCode":
             rePattern="^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$";
             break;
         default:
             return("That pattern check is not available");
             break;
     }
     return reFindNoCase(rePattern,str);
 }

---

