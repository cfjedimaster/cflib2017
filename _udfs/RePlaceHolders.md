---
layout: udf
title:  RePlaceHolders
date:   2004-09-20T12:21:07.000Z
library: StrLib
argString: "thisField, identifier[, query]"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: Replaces variable placeholders with values of said variables.
description: |
 The RePlaceHolders UDF returns a string of text with variable placeholders turned into the actual value of those variables. This has been useful in CFMAIL functions when sending user information, etc. In the email message you can include: %username% and when the mail is sent it replaces %username% with the actual username. You can specify your own placeholder identifier (%,!,@,$,etc).
 
 You can also pass an optional query. If passed, data replacements will be made from the query. (The data will come from the first row.)

returnValue: Returns a string.

example: |
 <cfset name="Mudd">
 <cfset myField="My name is %name%">
 <cfoutput>
 Name: Mudd<br>
 String: My name is %name%<br>
 Output: #RePlaceHolders(myField,'%')#
 </cfoutput>

args:
 - name: thisField
   desc: The string to check.
   req: true
 - name: identifier
   desc: The string used as a variable identifier.
   req: true
 - name: query
   desc: Query to retrive data from.
   req: false


javaDoc: |
 /**
  * Replaces variable placeholders with values of said variables.
  * 
  * @param thisField      The string to check. (Required)
  * @param identifier      The string used as a variable identifier. (Required)
  * @param query      Query to retrive data from. (Optional)
  * @return Returns a string. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, September 20, 2004 
  */

code: |
 // Replaces variable placeholders with variable values.
 function RePlaceHolders(thisField,identifier){
     var start=1;
     var st="";
     var end="";
     var temp="";
     var tempVar="";
         var query = "";
     if (ArrayLen(arguments) EQ 3) {
         query="#arguments[3]#.";
     }
     for(i=1;i lte Len(thisField);i=i+1){
         st=#Find(identifier,thisField,start)#;
         if(st gt 0){
             end=#Find(identifier,thisField,st+1)#+1;
             ct=end-st;
             temp=Mid(thisField,st,ct);
             tempVar=evaluate("###query##ReplaceNoCase(temp,identifier,"","ALL")###");
             thisField=ReplaceNoCase(thisField,temp,tempVar,"ALL");
             if(Len(temp) gt Len(tempVar)){
                 end=end-(Len(temp)-Len(tempVar));
             }else{
                 end=end+(Len(tempVar)-Len(temp));
             }
             start=end+1;
         }
     }
     return thisField;
 }

---

