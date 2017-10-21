---
layout: udf
title:  arrayofStructsToList
date:   2011-09-29T20:20:12.000Z
library: DataManipulationLib
argString: "arry, key[, delim][, dedup][, returnas]"
author: Jon Briccetti
authorEmail: jbriccetti@gmail.com
version: 1
cfVersion: CF5
shortDescription: Parses an array of consistent structs to return one key.
description: |
 Parses an array of consistent structs to return one key.

returnValue: Returns a list or array.

example: |
 test = {};
     test["stnd"] = [];
     arrayAppend(test["stnd"],{name="jon",skill="coldfusion",city="troy"});
     arrayAppend(test["stnd"],{name="sean",skill="java",city="albany"});
     arrayAppend(test["stnd"],{name="mike",skill="ant",city="schenectady"});
     arrayAppend(test["stnd"],{name="jerry",skill="flex",city="saratoga"});
     arrayAppend(test["stnd"],{name="jon",skill="jquery",city="troy"});
     arrayAppend(test["stnd"],{name="jerry",skill="coldfusion",city="saratoga"});
     arrayAppend(test["stnd"],{name="mike",skill="coldfusion",city="schenectady"});
     arrayAppend(test["stnd"],{names="look at my key name",skill="coldfusion",city="schenectady"});
 
     test["dbmeta"] = [];
     arrayAppend(test["dbmeta"],{name="course_id",isCaseSensititve="no",typeName="int"});
     arrayAppend(test["dbmeta"],{name="name",isCaseSensititve="no",typeName="varchar"});
     arrayAppend(test["dbmeta"],{name="description",isCaseSensititve="no",typeName="varchar"});
     arrayAppend(test["dbmeta"],{name="start_dt",isCaseSensititve="no",typeName="datetime"});
     arrayAppend(test["dbmeta"],{name="end_dt",isCaseSensititve="no",typeName="datetime"});
     arrayAppend(test["dbmeta"],{names="look at my key name",skill="coldfusion",city="schenectady"});
 
 
     writeoutput('<hr />');
     for(i in test){
         writedump(test[i]);
         writeoutput('<br /><strong>basic list from name struct</strong><br />');
         writedump(arrayofStuctsToList(test[i],"name"));
         writeoutput('<br /><strong>basic list from name struct</strong>, ";" as delim<br />');
         writedump(arrayofStuctsToList(test[i],"name",";"));
 
         writeoutput('<br /><strong>basic list from name struct</strong>, returned as an array<br />');
         writedump(arrayofStuctsToList(test[i],"name",",",false,"array"));
     
         writeoutput('<br /><strong>de-duped list from name struct</strong>, "||" as delim<br />');
         writedump(arrayofStuctsToList(test[i],"name","||",true));
     
         writeoutput('<br /><strong>de-duped list from name struct</strong>,returned as an array<br />');
         writedump(arrayofStuctsToList(test[i],"name",",",true,"array"));
     
     }
     writeoutput('<hr />');

args:
 - name: arry
   desc: The array of structs.
   req: true
 - name: key
   desc: Key value to return.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false
 - name: dedup
   desc: If true, dedupes the list. Defaults to false.
   req: false
 - name: returnas
   desc: Allows you to specify list or array for return type. Defaults to list.
   req: false


javaDoc: |
 <!---
  Parses an array of consistent structs to return one key.
  
  @param arry      The array of structs. (Required)
  @param key      Key value to return. (Required)
  @param delim      List delimiter. Defaults to a comma. (Optional)
  @param dedup      If true, dedupes the list. Defaults to false. (Optional)
  @param returnas      Allows you to specify list or array for return type. Defaults to list. (Optional)
  @return Returns a list or array. 
  @author Jon Briccetti (jbriccetti@gmail.com) 
  @version 1, September 29, 2011 
 --->

code: |
 <cffunction name="arrayofStuctsToList" output="true" access="public" returntype="any" hint="i return a list of values from a particular key in an array of structs. if the key doesnt exist in an element it is ignored">
     <cfargument name="arry" type="array" required="yes" hint="the array to search" />
     <cfargument name="key" type="string" required="yes" hint="the key name in the structure from which to pull a list value" />
     <cfargument name="delim" type="string" required="no" default="," hint="the list delim character(s)" />
     <cfargument name="dedup" type="boolean" required="no" default="false" hint="if you want me to de-dup the list, lemme know. dont expect any order coming back." />
     <cfargument name="returnas" type="string" required="no" default="list" hint="enum: list,array; you tell me what format you want your 'list' back" />
     <!--- KEEP IN MIND THAT WITH de-dup=true or in the event any key values are missing from struct elements, the order of the returned value may not correspond to the order of the original array --->        
     <cfset var local = {} />
     <cfset local.result = "" />
     <cfset local.str = "" />    
     <cfset local.dedup = {} />
 
     <cfset local.returnval = "" />
     <cfloop array="#arry#" index="local.i">
                 <cftry>
                     <cfif arguments.dedup>
                             <cfset local.dedup[local.i[key]] = "" />
           <cfelse>
             <cfset local.str = listAppend(local.str,local.i[key],delim) />
           </cfif>
             <cfcatch><!--- FAIL SILENTLY IF KEY DOESNT EXIST ---></cfcatch>
         </cftry>
     </cfloop>
         <cfif arguments.dedup>
             <cfset local.str = structKeyList(local.dedup,delim) />            
     </cfif>
     <cfif arguments.returnas EQ "array">
         <cfset local.result = listToArray(local.str,delim) />
     <cfelse>
         <cfset local.result = local.str />
     </cfif>
 
     <cfreturn local.result />
 </cffunction>

---

