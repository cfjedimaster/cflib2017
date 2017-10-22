---
layout: udf
title:  isDefinedValue
date:   2013-10-30T09:48:22.000Z
library: DataManipulationLib
argString: "varname[, value]"
author: Joseph Flanigan
authorEmail: joseph@switch-box.org
version: 1
cfVersion: CF5
shortDescription: Checks that a variable is defined and  that the variable  is not an empty value.  Optionally lets you check that the variable is a specific value.
tagBased: false
description: |
 Checks that a variable is defined and  that  the variable  is not an empty value.  Optionally allows you to specify the &quot;correct&quot; value of the variable.
  
 Use like isDefined function to confirm the variable has a value that is not empty. 
 For a variable name:
 - if defined and has value returns true
 - if not defined returns false
 - if is defined and has empty value returns false
 
 varname is a string value like isDefined. 
 
  Checks arrays, structures, queries and simple variables.
   A checked value must be a simple value.
   A &quot;&quot; value will return false
 
 Usage Notes. 
 1) Array indexes, like myArray[1]. are checked by first removing the index to confirm the array is defined, then checks the indexed location for a simple value.    If  the index  is missing or bogus, the function throws an error.
 2) Query record set results, like qGetEmployees.FirstName,  check the first record?s value, not the entire record  set.
 3) Queries results with a zero record count return false.
 
  Simple Example: 
  &lt;cfparam name=&quot;url.test&quot; type=&quot;boolean&quot; default=&quot;1&quot;&gt;
      isDefinedValue(&quot;url.test&quot;) returns 1
           
   &lt;cfparam name=&quot;url.test&quot; type=&quot;string&quot; default=&quot;&quot;&gt;
    isDefinedValue(&quot;url.test&quot;) returns 0

returnValue: boolean - 1 or 0

example: |
 <cfset request.box = structnew()>
 <cfset MyNewArray[1] = "test"> 
 <cfset MyNewArray[2] = ""> 
 <CFPARAM name = "request.box.side" DEFAULT = "">
 <CFPARAM name = "simplevalue" DEFAULT = "#Now()#">
 <cfparam name="URL.name" default="">
  <cfparam name="url.test" type="boolean" default="1">
      <cfoutput>#isDefinedValue("url.test")# </cfoutput>
 
 <br><br> simplevalue
 <cfif isDefinedValue("simplevalue")>
   <br> happy <cfdump var="#simplevalue#"> 
 <cfelse>
  <br> no joy simplevalue
 </cfif> 
 
 <br><br>Structure.Key
  <cfif isDefinedValue("request.box.side")>
   <br> happy <cfdump var="#request.box#"> 
 <cfelse>
   <br> no joy Structure Key
 </cfif> 
 
 <br><br>Structure 
 <cfif isDefined("request.box" )>
  <br>happy  <cfdump var="#request.box#"> 
 <cfelse>
   <br> no joy Structure
 </cfif> 
 
 
 
 <br><br> MyNewArray [1]
 <cfif isDefinedValue("MyNewArray[1]")>
  <br> happy <cfdump var="#MyNewArray#">
 
 <cfelse>
   <br> no joy MyNewArray
 </cfif> 
 
 <br><br> MyNewArray [2]
 <cfif isDefinedValue("MyNewArray[2]")>
  <br> happy <cfdump var="#MyNewArray#">
 <cfelse>
   <br> no joy MyNewArray
 </cfif> 
 
 <br><br> URL.name
 <cfif isDefinedValue("URL.name")>
  <br> happy <cfdump var="#URL.name#">
 <cfelse>
   <br> no joy URL.name
 </cfif> 
 <!--- make a query on the snippets datasource --->
 <br><br> With No Query
 <cfif IsDefinedValue("qGetEmployees")> 
    <br> <cfdump var="#qGetEmployees#"> 
 <cfelse>
   <br> no joy qGetEmployees
 </cfif> 
 
 <br><br> With Results Query
 <cfdirectory action="list" directory="#expandPath("/WEB-INF/debug/")#" name="getFiles">
 
 
 <P>
 <cfdump var="#getFiles#">
 
 <br><br> With Results Query<br>
 <cfif IsDefinedValue("getFiles")> 
    Yes, the query exists and is not empty
 </cfif>  
 
 <br><br> With Results Query on field
 <cfif IsDefinedValue("getFiles.size")> 
    <br> Yes, the field "size" is defined in the query "getFiles"
 </cfif>  
 
 <br><br> With No Results Query
 <cfquery name = "getFilesFiltered" dbType="query">
     SELECT *
     FROM getFiles
     WHERE name = 'IDoNotExist'
 </cfquery> 
 
 <cfif NOT IsDefinedValue("getFilesFiltered")> 
    <br> No, this query is empty
 </cfif>

args:
 - name: varname
   desc: Name of the variable to check for
   req: true
 - name: value
   desc: The value a simple variable should be to pass the test (optional)
   req: false


javaDoc: |
 /**
  * Checks that a variable is defined and  that the variable  is not an empty value.  Optionally lets you check that the variable is a specific value.
  * See also: isEmpty() -- http://cflib.org/udf.cfm?id=420
  * 
  * @param varname      Name of the variable to check for (Required)
  * @param value      The value a simple variable should be to pass the test (optional) (Optional)
  * @return boolean - 1 or 0 
  * @author Joseph Flanigan (joseph@switch-box.org) 
  * @version 1, October 30, 2013 
  */

code: |
 function isDefinedValue(varname)
 {
   var value = "";
     if (IsDefined(listfirst(Arguments[1],"[")))
      { 
      value = evaluate(Arguments[1]);
      if (IsSimpleValue(value))
         { 
             if (ArrayLen(Arguments) EQ 2 )
                 { if ( value EQ Arguments[2]){return 1;}
                 else return 0; 
                 }
             else if ( find(value,"" )) {return 0;}  
             else return 1;  // something is there, just not testing for it.
         } 
      else if (IsStruct(value))
         { 
             if (StructIsEmpty(value)) { return 0;} 
             else {return 1;}
         }
      else if (IsArray(value))
         { 
             if (ArrayIsEmpty(value)) {return 0;} 
             else {return 1;}
         }
      else if (IsQuery(value))
         { 
             if (YesNoFormat(value.recordcount)) {return 1;} 
             else {return 0;}
         }
     return 0;
       }
 return 0;
 }

---

