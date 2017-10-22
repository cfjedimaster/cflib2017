---
layout: udf
title:  QueryToXML
date:   2002-11-15T19:00:18.000Z
library: DataManipulationLib
argString: "query[, rootElement][, row][, nodeMode]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 2
cfVersion: CF6
shortDescription: Generates an XMLDoc object from a basic CF Query.
tagBased: false
description: |
 Sure, WDDX is great, but sometimes you want &quot;real&quot; XML for your query.  This function will create an XMLDoc object where the elements match the names of your columns.  You can choose the name of the root node (by default it's &quot;query&quot;) and each row (by default it's &quot;row&quot;)

returnValue: Returns a string.

example: |
 <!--- by default, use values nodeMode for queryToXML --->
 <cfparam name="nodeMode" default="values">
 
 
 <cfscript>
     //build a simple query
     q = queryNew("id,fname,lname");
     queryAddRow(q,3);
     querySetCell(q,"id",createUUID(),1);
     querySetCell(q,"fname","Nathan",1);
     querySetCell(q,"lname","Dintenfass",1);
     querySetCell(q,"id",createUUID(),2);
     querySetCell(q,"fname","Ben",2);
     querySetCell(q,"lname","Archibald",2);    
     querySetCell(q,"id",createUUID(),3);
     querySetCell(q,"fname","Raymond",3);
     querySetCell(q,"lname","Camden",3);        
     //make the query into an XML object
     xmlObj = queryToXML(q,"users","user",nodeMode);
     //make a string representation of the xml object
     xmlString = toString(xmlObj);
 </cfscript>
 
 <!--- make a simple form for choosing the nodeMode --->
 <cfoutput>
 <form action="#getFileFromPath(getBaseTemplatePath())#?#cgi.query_string#" method="post">
     NodeMode: <select name="nodeMode" onChange="this.form.submit();">
         <cfloop list="values,columns,rows" index="option">
             <option value="#option#"<cfif nodeMode is option> SELECTED</cfif>>#option#</option>
         </cfloop>
     </select>
 </form>
 </cfoutput>
 
 <strong>HERE IS A CFDUMP OF THE CF QUERY OBJECT</strong><br />
 <cfdump var="#q#">
 <hr />
 
 <strong>HERE IS A CFDUMP OF THE XML OBJECT</strong>
 <cfdump var="#xmlObj#">

args:
 - name: query
   desc: The query to transform.
   req: true
 - name: rootElement
   desc: Name of the root node. (Default is "query.")
   req: false
 - name: row
   desc: Name of each row. Default is "row."
   req: false
 - name: nodeMode
   desc: Defines the structure of the resulting XML.  Options are 1) "values" (default), which makes each value of each column mlText of individual nodes; 2) "columns", which makes each value of each column an attribute of a node for that column; 3) "rows", which makes each row a node, with the column names as attributes.
   req: false


javaDoc: |
 /**
  * Generates an XMLDoc object from a basic CF Query.
  * 
  * @param query      The query to transform. (Required)
  * @param rootElement      Name of the root node. (Default is "query.") (Optional)
  * @param row      Name of each row. Default is "row." (Optional)
  * @param nodeMode      Defines the structure of the resulting XML.  Options are 1) "values" (default), which makes each value of each column mlText of individual nodes; 2) "columns", which makes each value of each column an attribute of a node for that column; 3) "rows", which makes each row a node, with the column names as attributes. (Optional)
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 2, November 15, 2002 
  */

code: |
 function queryToXML(query){
     //the default name of the root element
     var root = "query";
     //the default name of each row
     var row = "row";
     //make an array of the columns for looping
     var cols = listToArray(query.columnList);
     //which mode will we use?
     var nodeMode = "values";
     //vars for iterating
     var ii = 1;
     var rr = 1;
     //vars for holding the values of the current column and value
     var thisColumn = "";
     var thisValue = "";
     //a new xmlDoc
     var xml = xmlNew();
     //if there are 2 arguments, the second one is name of the root element
     if(structCount(arguments) GTE 2)
         root = arguments[2];
     //if there are 3 arguments, the third one is the name each element
     if(structCount(arguments) GTE 3)
         row = arguments[3];        
     //if there is a 4th argument, it's the nodeMode
     if(structCount(arguments) GTE 4)
         nodeMode = arguments[4];     
     //create the root node
     xml.xmlRoot = xmlElemNew(xml,root);
     //capture basic info in attributes of the root node
     xml[root].xmlAttributes["columns"] = arrayLen(cols);
     xml[root].xmlAttributes["rows"] = query.recordCount;
     //loop over the recordcount of the query and add a row for each one
     for(rr = 1; rr LTE query.recordCount; rr = rr + 1){
         arrayAppend(xml[root].xmlChildren,xmlElemNew(xml,row)); 
         //loop over the columns, populating the values of this row
         for(ii = 1; ii LTE arrayLen(cols); ii = ii + 1){
             thisColumn = lcase(cols[ii]);
             thisValue = query[cols[ii]][rr];
             switch(nodeMode){
                 case "rows":
                     xml[root][row][rr].xmlAttributes[thisColumn] = thisValue;
                     break;
                 case "columns":
                     arrayAppend(xml[root][row][rr].xmlChildren,xmlElemNew(xml,thisColumn)); 
                     xml[root][row][rr][thisColumn].xmlAttributes["value"] = thisValue;
                     break;
                 default:
                     arrayAppend(xml[root][row][rr].xmlChildren,xmlElemNew(xml,thisColumn)); 
                     xml[root][row][rr][thisColumn].xmlText = thisValue;                        
             }
 
         }
     }
     //return the xmlDoc
     return xml;    
 }

---

