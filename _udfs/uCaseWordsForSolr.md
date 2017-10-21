---
layout: udf
title:  uCaseWordsForSolr
date:   2011-08-05T11:58:05.000Z
library: UtilityLib
argString: "string"
author: Sami Hoda
authorEmail: sami@bytestopshere.com
version: 1
cfVersion: CF9
shortDescription: Works with SolrClean UDF to UCASE Solr Keywords.
description: |
 Works with SolrClean UDF to UCASE Solr Keywords. Use in conjunction with SolrClean.

returnValue: Returns a string.

example: |
 Works in conjunction with SolrClean. See SolrClean UDF.

args:
 - name: string
   desc: String to run against
   req: true


javaDoc: |
 <!---
  Works with SolrClean UDF to UCASE Solr Keywords.
  
  @param string      String to run against (Required)
  @return Returns a string. 
  @author Sami Hoda (sami@bytestopshere.com) 
  @version 1, August 5, 2011 
 --->

code: |
 <cffunction name="uCaseWordsForSolr" access="public" output="false" returntype="Any" >
     <cfargument name="string" type="string" default="" required="true" hint="String to run against" />
     <cfargument name="listOfWords" type="string" default="AND,OR,NOT,TO" required="false" hint="Comma-delim list of words to uCase" />
 
     <cfset var sLocal = StructNew() />
 
     <cfset sLocal.newString = lcase(arguments.string) /> <!--- lcase by default. mixed-case treated as case-sensitive by Solr --->
     <cfset sLocal.i = "" />
 
     <cfloop list="#arguments.listOfWords#" index="sLocal.i">
 
         <cfset sLocal.newString = reReplaceNoCase(sLocal.newString, "([^a-z])(#sLocal.i#)([^a-z])", "\1#ucase(sLocal.i)#\3", "all")/>
 
     </cfloop>
 
     <cfreturn sLocal.newString />
 </cffunction>

---

