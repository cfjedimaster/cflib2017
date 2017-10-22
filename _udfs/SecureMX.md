---
layout: udf
title:  SecureMX
date:   2002-10-15T16:29:43.000Z
library: SecurityLib
argString: "mode, requiredPermission, userPermissions[, failureXFA]"
author: Rob Rusher
authorEmail: rob@robrusher.com
version: 1
cfVersion: CF6
shortDescription: This function validates user permissions against required permissions using either Bit, List or custom validation.
tagBased: false
description: |
 This function is based on the secure.cfm customtag used in FuseBox 3 and authored by Hal Helms. This function validates user permissions against required permissions for code execution using either Bit, List or custom validation.

returnValue: Returns a boolean.

example: |
 <!---
 <cfset objPermission="4">
 <cfset userPermissions="20">
 <p>
 <strong>Example 1: Bit Validation</strong><br />
 <cfif secureMX( "bit", objPermission, userPermissions )>
     Permission Granted. Execute some code...
 <cfelse>
     Permission Denied.
 </cfif>
 </p>
 <cfset objPermission="Admin">
 <cfset userPermissions="User">
 <p>
 <strong>Example 2: List Validation</strong><br />
 <cfif secureMX( "List", objPermission, userPermissions )>
     Permission Granted. Execute some code...
 <cfelse>
     Permission Denied.
 </cfif>
 </p>
 
 <cfset objPermission="objRights">
 <cfset userPermissions="stUserRights">
 <p>
 <strong>Example 3: Custom Validation</strong><br />
 <cfif secureMX( "customModel", objPermission, userPermissions )>
     Permission Granted. Execute some code...
 <cfelse>
     Permission Denied.
 </cfif>
 
 <cfset objPermission="Admin">
 <cfset userPermissions="User">
 <p>
 <strong>Example 4: Validation with XFA</strong><br />
 <cfif secureMX( "List", objPermission, userPermissions, "login.cfm" )>
     Permission Granted. Execute some code...
 <cfelse>
     Permission Denied.
 </cfif>
 --->

args:
 - name: mode
   desc: String, "bit" or "list"
   req: true
 - name: requiredPermission
   desc: Permissions required for access.
   req: true
 - name: userPermissions
   desc: Permissions of the user.
   req: true
 - name: failureXFA
   desc: Fusebox XFA
   req: false


javaDoc: |
 /**
  * This function validates user permissions against required permissions using either Bit, List or custom validation.
  * 
  * @param mode      String, "bit" or "list" (Required)
  * @param requiredPermission      Permissions required for access. (Required)
  * @param userPermissions      Permissions of the user. (Required)
  * @param failureXFA      Fusebox XFA (Optional)
  * @return Returns a boolean. 
  * @author Rob Rusher (rob@robrusher.com) 
  * @version 1, October 15, 2002 
  */

code: |
 function SecureMX(model, requiredPermission, userPermissions) {
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
         // Define custom validation here
         default:
         {
             include( model & ".cfm" );
             permitted = true;
         }
     }
     
     // If not permitted and an Exit FuseAction is defined
     if ( NOT permitted and isDefined( "attributes.failureXFA" ) ) {
         location( "#request.self#?fuseaction=#attributes.failureXFA#", 1 );
     }
     
     return (permitted);
 }

---

