---
layout: udf
title:  isDefinedValueMX
date:   2003-10-20T11:52:50.000Z
library: DataManipulationLib
argString: "varname[, value]"
author: Joseph Flanigan
authorEmail: joseph@switch-box.org
version: 1
cfVersion: CF6
shortDescription: Checks that a variable exists and has value. CFMX version.
tagBased: false
description: |
 Use like isDefined for variables plus confirm the variable has an assigned value. For a named variable,  if it is defined and has value returns 1,  if it is not defined returns 0; if it is defined and has empty value returns 0.  Optionally, allows specifying a check value to test the named variable for a specific value. This extends the function by, if it is defined and has this value, then return 1. A checked value must be a simple value or an empty string.
 isDefinedValueMX improves on the isDefinedValue CF5 version and built-in isDefined by returning a 0 on error conditions. 
 Usage Notes. 1) Array indexes, like myArray[1]. are checked by first removing the index to confirm the array is defined, then checks the indexed location for a simple value. If the index is missing or bogus, the function returns 0. 2) Query record set results, checks the first record?s value, not the entire record set. 3) Queries results with a zero record count return 0. 
 Example: &lt;cfparam name=&quot;url.test&quot; default=&quot;1&quot;&gt; isDefinedValue(&quot;url.test&quot;) returns 1 &lt;cfparam name=&quot;url.test&quot; default=&quot;&quot;&gt; isDefinedValue(&quot;url.test&quot;) returns 0 and isDefinedValue(&quot;url.test&quot;,??) returns 1

returnValue: 1 (yes, it is defined) or 0 (no, it is not defined)

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
 <cfif isDefinedValueMX("simplevalue")>
 <br> happy <cfdump var="#simplevalue#"> 
 <cfelse>
 <br> no joy simplevalue
 </cfif> 
 
 <br><br>Structure.Key
 <cfif isDefinedValueMX("request.box.side")>
 <br> happy <cfdump var="#request.box#"> 
 <cfelse>
 <br> no joy Structure Key
 </cfif> 
 
 <br><br>Structure 
 <cfif isDefinedMX("request.box" )>
 <br>happy <cfdump var="#request.box#"> 
 <cfelse>
 <br> no joy Structure
 </cfif> 
 
 
 <br><br> MyNewArray [1]
 <cfif isDefinedValueMX("MyNewArray[1]")>
 <br> happy <cfdump var="#MyNewArray#">
 
 <cfelse>
 <br> no joy MyNewArray
 </cfif> 
 
 <br><br> MyNewArray [2]
 <cfif isDefinedValueMX("MyNewArray[2]")>
 <br> happy <cfdump var="#MyNewArray#">
 <cfelse>
 <br> no joy MyNewArray
 </cfif> 
 
 <br><br> URL.name
 <cfif isDefinedValueMX("URL.name")>
 <br> happy <cfdump var="#URL.name#">
 <cfelse>
 <br> no joy URL.name
 </cfif> 
 <!--- make a query on the snippets datasource --->
 <br><br> With No Query
 <cfif IsDefinedValueMX("qGetEmployees")> 
 <br> <cfdump var="#qGetEmployees#"> 
 <cfelse>
 <br> no joy qGetEmployees
 </cfif> 
 
 <br><br> With Results Query
 <cfdirectory action="list" directory="#expandPath("/WEB-INF/debug/")#" name="getFiles">
 
 
 <P>
 <cfdump var="#getFiles#">
 
 <br><br> With Results Query<br>
 <cfif IsDefinedValueMX("getFiles")> 
 Yes, the query exists and is not empty
 </cfif> 
 
 <br><br> With Results Query on field
 <cfif IsDefinedValueMX("getFiles.size")> 
 <br> Yes, the field "size" is defined in the query "getFiles"
 </cfif> 
 
 <br><br> With No Results Query
 <cfquery name = "getFilesFiltered" dbType="query">
 SELECT *
 FROM getFiles
 WHERE name = 'IDoNotExist'
 </cfquery> 
 
 <cfif NOT IsDefinedValueMX("getFilesFiltered")> 
 <br> No, this query is empty
 </cfif>

args:
 - name: varname
   desc: The name of the variable to test for
   req: true
 - name: value
   desc: The value a simple variable should be to pass the test (optional)
   req: false


javaDoc: |
 /**
  * Checks that a variable exists and has value. CFMX version.
  * 
  * @param varname      The name of the variable to test for (Required)
  * @param value      The value a simple variable should be to pass the test (optional) (Optional)
  * @return 1 (yes, it is defined) or 0 (no, it is not defined) 
  * @author Joseph Flanigan (joseph@switch-box.org) 
  * @version 1, October 20, 2003 
  */

code: |
 function isDefinedValueMX(varname)
 {
   var varvalue = "";
     try{
     if (IsDefined(listfirst(Arguments[1],"[")))
      { 
      varvalue = evaluate(Arguments[1]);
 
      if (IsSimpleValue(varvalue))
         { 
             if (ArrayLen(Arguments) EQ 2 )
                 { if ( varvalue EQ Arguments[2]){return 1;}
                 else return 0; 
                 }
             else if ( find(varvalue,"" )) {return 0;}  
             else return 1;  // something is there, just not testing for it.
         } 
      else if (IsStruct(varvalue))
         { 
             if (StructIsEmpty(varvalue)) { return 0;} 
             else {return 1;}
         }
      else if (IsArray(varvalue))
         { 
             if (ArrayIsEmpty(varvalue)) {return 0;} 
             else {return 1;}
         }
      else if (IsQuery(varvalue))
         { 
             if (YesNoFormat(varvalue.recordcount)) {return 1;} 
             else {return 0;}
         }
     return 0; // not defined
       }
      } //try
      catch(Any excpt)
       { return 0;} // return excpt.Message;
 return 0; 
 }

oldId: 990
---

