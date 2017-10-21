---
layout: udf
title:  Secure
date:   2002-09-27T10:44:57.000Z
library: SecurityLib
argString: "model, requiredPermission, userPermissions"
author: Rob Rusher
authorEmail: rob@robrusher.com
version: 1
cfVersion: CF5
shortDescription: This function validates user permissions against required permissions using Bit, List or custom validation.
description: |
 This function is based on the secure.cfm customtag used in FuseBox 3 and authored by Hal Helms. This function validates user permissions against required permissions for code execution using either Bit, List or custom validation.

returnValue: Returns a boolean.

example: |
 <cfset objPermission="4">
 <cfset userPermissions="20">
 <cfoutput>
 <p>
 <strong>Example 1: Bit Validation</strong><br />
 <cfif secure( "bit", objPermission, userPermissions )>
     Permission Granted. Execute some code...
 <cfelse>
     Permission Denied.
 </cfif>
 </p>
 <cfset objPermission="Admin">
 <cfset userPermissions="User">
 <p>
 <strong>Example 2: List Validation</strong><br />
 <cfif secure( "List", objPermission, userPermissions )>
     Permission Granted. Execute some code...
 <cfelse>
     Permission Denied.
 </cfif>
 </p>
 
 <cfset objPermission="objRights">
 <cfset userPermissions="stUserRights">
 <p>
 <strong>Example 3: Custom Validation</strong><br />
 <cfif secure( "customModel", objPermission, userPermissions )>
     Permission Granted. Execute some code...
 <cfelse>
     Permission Denied.
 </cfif>
 
 </cfoutput>

args:
 - name: model
   desc: String, "bit" or "list"
   req: true
 - name: requiredPermission
   desc: Permissions required for access.
   req: true
 - name: userPermissions
   desc: Permissions of the user.
   req: true


javaDoc: |
 /**
  * This function validates user permissions against required permissions using Bit, List or custom validation.
  * 
  * @param model      String, "bit" or "list" (Required)
  * @param requiredPermission      Permissions required for access. (Required)
  * @param userPermissions      Permissions of the user. (Required)
  * @return Returns a boolean. 
  * @author Rob Rusher (rob@robrusher.com) 
  * @version 1, September 27, 2002 
  */

code: |
 function Secure(model, requiredPermission, userPermissions) {
     var permitted = false;
     // Switch to appropriate security model
     switch( model ) {
         // Bit Validation
         case "bit":
         {
             if ( BitAnd( userPermissions, requiredPermission ) ) {
                 permitted = true;
             }
             break;
         }
         // List Validation
         case "list":
         {
             if ( ListFindNoCase( userPermissions, requiredPermission ) ) {
                 permitted = true;
             }
             break;
         }
         default: {
             // Define custom validation here.
             permitted = true;
         }
     }
     
     return (permitted);
 }

---

