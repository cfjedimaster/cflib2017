---
layout: udf
title:  verifyEmail
date:   2009-07-15T23:08:59.000Z
library: UtilityLib
argString: "emailAddress"
author: Craig Kaminsky
authorEmail: imageaid@gmail.com
version: 3
cfVersion: CF6
shortDescription: Validate an email existence using an external web service.
description: |
 This function validates the existence of an email address via the ValidateEmail Web Service at webservicex.net.

returnValue: Returns a structure.

example: |
 <cfset result = verifyEmail("myemail@thisisnotarealdomainihope.com")>
 <cfdump var="#result#">

args:
 - name: emailAddress
   desc: Address to validate.
   req: true


javaDoc: |
 /**
  * Validate an email existence using an external web service.
  * v2 mods by Raymond Camden
  * 
  * @param emailAddress      Address to validate. (Required)
  * @return Returns a structure. 
  * @author Craig Kaminsky (imageaid@gmail.com) 
  * @version 3, July 15, 2009 
  */

code: |
 function verifyEmail(emailAddress){
     // local variables
     var email_address = Trim( arguments.emailaddress );
     var results = StructNew();
     var validationResponse = "";
     var ws = "";
     // add the default keys and values for returned struct 
     results.wsdl = "http://www.webservicex.net/ValidateEmail.asmx?wsdl";
     results.attemptTime = Now();
     // setup the web service
     ws = createObject( "webservice", results.wsdl );
     // ensure, first, that we have a properly formatted email address
     if( IsValid( "email", email_address )) {
         // setup some exception handling just in case the Web Service is down, etc.
         try
         {
             validationResponse = ws.IsValidEmail( Email=email_address );
         }
         catch( Any err )
         {
             results.emailResult = false;
             results.message = "Web Service response error: " + err.Message;
             results.resultCode = "fail";
             // exit the function and return the results struct
             return results;
         }            
         // check the response from the web service
         if( Ucase(Trim( validationResponse )) is "YES" )
         {
             results.emailResult = true;
             results.message = "Email address passed validation and verification.";
             results.resultCode = "valid";
         }
         else
         {
             results.emailResult = false;
             results.message = "Email address passed validation but failed verification.";
             results.resultCode = "invalid";
         }
     }
     else
     {
         results.emailResult = false;
         results.message = "Email address failed validation. It is not properly formatted.";
         results.resultCode = "invalid";
     }
     return results;
 }

---

