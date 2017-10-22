---
layout: udf
title:  collectionExists
date:   2006-03-10T13:23:16.000Z
library: UtilityLib
argString: "collection"
author: Dan G. Switzer, II
authorEmail: dswitzer@pengoworks.com
version: 2
cfVersion: CF6
shortDescription: Call this function, passing in a collection name, to see if that named Verity colleciton exists.
tagBased: true
description: |
 Call this function, passing in a collection name, to see if that named Verity colleciton exists.
 
 The previous version of this UDF used the &lt;cfcollection action=&quot;list&quot; /&gt; tag to determine if the collection exists. The problem is, this action takes a very long time to return a result if there are a lot of collection registered (appx 1 second for every 3 collections.)

returnValue: Returns a boolean.

example: |
 <cfif NOT collectionExists("catalog")>
     <cfcollection
         action="create"
         collection="catalog"
         path="#pathToVerityCollection#"
         language="english"
             />
 </cfif>

args:
 - name: collection
   desc: Name of collection
   req: true


javaDoc: |
 <!---
  Call this function, passing in a collection name, to see if that named Verity colleciton exists.
  Version 1 by Pete Ruckelshaus, pruckelshaus@yahoo.com
  Raymond Camden modified version 2 a bit.
  
  @param collection      Name of collection (Required)
  @return Returns a boolean. 
  @author Dan G. Switzer, II (dswitzer@pengoworks.com) 
  @version 2, March 10, 2006 
 --->

code: |
 <cffunction name="collectionExists" returnType="boolean" output="false" hint="This returns a yes/no value that checks for the existence of a named collection.">
     <cfargument name="collection" type="string" required="yes">
 
     <!---// by default return true //--->
     <cfset var bExists = true />
     <cfset var searchItems = "">
     
     <!---// if you can't search the collection, then assume it doesn't exist //--->
     <cftry>
         <cfsearch
             name="searchItems"
             collection="#arguments.collection#"
             type="simple"
             criteria="#createUUID()#"
             />
         <cfcatch type="any">
             <!---// if the message contains the string "does not exist", then the collection can't be found //--->
             <cfif cfcatch.message contains "does not exist">
                 <cfset bExists = false />
             <cfelse>
                 <cfrethrow>
             </cfif>
         </cfcatch>
     </cftry>
 
     <!---// returns true if search was successful and false if an error occurred //--->
     <cfreturn bExists />
 
 </cffunction>

---

