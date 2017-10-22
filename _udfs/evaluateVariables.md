---
layout: udf
title:  evaluateVariables
date:   2005-07-13T23:16:25.000Z
library: StrLib
argString: "thisstring[, identifiers]"
author: Steven Van Gemert
authorEmail: svg2@placs.net
version: 1
cfVersion: CF5
shortDescription: Replaces variable placeholders with values of said variables using any list of possible identifiers.
tagBased: false
description: |
 The EvaluateVariables UDF returns a string of text with variable placeholders turned into the actual value of those variables. This is useful in CFMAIL functions when sending user information, etc. In the email message you can include %thisusername% and when the mail is sent it replaces %thisusername% with the actual username. You can specify your own list of placeholder identifiers (%,!,@,$,etc).
 
 Based on Joshua Millers RePlaceHolders UDF. This version is a more streamlined version of his code. Plus, it allows for multiple identifiers. I took out the query name functionality. That can more appropriately be done outside the function by scoping the necessary query variable into the local scope using the columnlist key of the query. I also made the identifiers optional, with a pound sign being the default identifier, as is most common with ColdFusion variables. Thus, if you create your string using pound signs as the identifiers, you can call this UDF with the string as it's only parameter.

returnValue: Returns a string.

example: |
 <CFSet name = "Mudd">
 <CFSet string = "My name is '~name~'. Did you hear me? @name@! ##name##! |name|!">
 <CFSet output = evaluatevariables(string,"~@|##")>

args:
 - name: thisstring
   desc: The string to parse.
   req: true
 - name: identifiers
   desc: Characters to use as identifiers.
   req: false


javaDoc: |
 /**
  * Replaces variable placeholders with values of said variables using any list of possible identifiers.
  * 
  * @param thisstring      The string to parse. (Required)
  * @param identifiers      Characters to use as identifiers. (Optional)
  * @return Returns a string. 
  * @author Steven Van Gemert (svg2@placs.net) 
  * @version 1, July 13, 2005 
  */

code: |
 function evaluateVariables(thisstring) {
     var poundsign = "##";
     var poundsignplaceholder = "";
     var identifiers = poundsign; //Default identifier.
     var thisdelimiter = "!"; //Default delimiter.
     var i = 1;
     
     if (ArrayLen(arguments) EQ 2){ //If we were passed a list of identifiers...
         identifiers = arguments[2]; //...then use them.
     }
     while(findnocase(thisdelimiter,identifiers & poundsign)){ //If we were passed the same identifier as we chose for our delimiter, or it's a pound sign or single quote...
         thisdelimiter = chr(asc(thisdelimiter) + 1); //...then use a different delimiter.
     }
     poundsignplaceholder = repeatstring(thisdelimiter,3) & "PoundSign" & repeatstring(thisdelimiter,3); //Create the pound sign placeholder to preserve existing pound signs in the string.
     
     if(not findnocase(poundsign,identifiers)){ //If the pound sign is not one of the identifiers...
         thisstring = replace(thisstring,poundsign,poundsignplaceholder,"ALL"); //...then replace any existing pound signs with a place holder to preserve them.
     }
 
     for(i=1; i LTE len(identifiers); i = i + 1){ //For each identifier...
         if(listlen(thisdelimiter & thisstring & thisdelimiter,mid(identifiers,i,1)) mod 2){ //If there is an odd number of items in the list (cursory check - not definitive - to verify that the evaluate statement will function properly).
             thisstring = replace(thisstring,mid(identifiers,i,1),poundsign,"ALL"); //...replace it with pound signs.
         }
     }
 
     thisstring = evaluate(de(thisstring)); //Evaluate the variables.
     
     if(not findnocase(poundsign,identifiers)){ //If the pound sign is not one of the identifiers...
         thisstring = replace(thisstring,poundsignplaceholder,poundsign,"ALL"); //...then re-instate the preserved pound signs.
     }
 
     return thisstring; //Return the evaluated string.
 }

---

