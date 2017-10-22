---
layout: udf
title:  QueryToSelectOptions
date:   2002-06-26T19:02:04.000Z
library: StrLib
argString: "theQuery, ValueField[, DisplayField][, Selected]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Creates a list of select-field option tags from the provided query.
tagBased: false
description: |
 Assists in constructing a drop-down list box form control from a query. Used within HTML &lt;select&gt; tags. Creates a list of option tags from the provided query, allowing separate fields for values and displayed text. Optionally a default (&quot;selected&quot;) DisplayField may be specified. Unlike &lt;cfselect&gt;, QueryToSelectOptions allows values which are not part of the query to be specified *above* the query-driven values. Additionally, potential HTML-breaking characters are automatically converted to HTML entities where necessary.

returnValue: Returns a string.

example: |
 <cfset test_query = QueryNew("ValueField, DisplayField")>
 <cfset QueryAddRow(test_query, 3)>
 <cfset QuerySetCell(test_query,"ValueField","blue", 1)>
 <cfset QuerySetCell(test_query,"DisplayField","my favorite color is blue", 1)>
 <cfset QuerySetCell(test_query,"ValueField","<b>note non-escaped html brackets in source</b>", 2)>
 <cfset QuerySetCell(test_query,"DisplayField","<b>note escaped html brackets in source</b>", 2)>
 <cfset QuerySetCell(test_query,"ValueField","Mickey ""The Mouse"" Disney", 3)>
 <cfset QuerySetCell(test_query,"DisplayField","Mickey ""The Mouse"" Disney", 3)>
 
 <cfoutput>
 <form action="" method="post">
     Custom value at the top of the list:<br>
     <select name="item" size="1">
         <option value="">Select an item...</option>
         <cfoutput>#QueryToSelectOptions("#test_query#", "ValueField", "DisplayField")#</cfoutput>
     </select><br>
     <br>
 
     Preselected default selection:<br>
     <select name="item" size="1">
         <option value="">Select an item...</option>
         <cfoutput>#QueryToSelectOptions("#test_query#", "ValueField", "DisplayField", "Mickey ""The Mouse"" Disney")#</cfoutput>
     </select>
 </form>
 </cfoutput>

args:
 - name: theQuery
   desc: The query to use.
   req: true
 - name: ValueField
   desc: The field to use for the value of the drop downs.
   req: true
 - name: DisplayField
   desc: The field to use for the display of the drop downs. Defaults to ValueField.
   req: false
 - name: Selected
   desc: The selected value.
   req: false


javaDoc: |
 /**
  * Creates a list of select-field option tags from the provided query.
  * 
  * @param theQuery      The query to use. (Required)
  * @param ValueField      The field to use for the value of the drop downs. (Required)
  * @param DisplayField      The field to use for the display of the drop downs. Defaults to ValueField. (Optional)
  * @param Selected      The selected value. (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function QueryToSelectOptions(theQuery, ValueField) {
     var out_string  = "";
     var row         = 1;
     var CR          = chr(13);
     var DisplayField = ValueField;
     var Selected    = "";
     
     if(ArrayLen(Arguments) gte 3) DisplayField = Arguments[3];
     
     if(ArrayLen(Arguments) GTE 4) Selected = Arguments[4];
 
     for(row=1; row LTE theQuery.recordCount; row=row+1){
         if ((Selected NEQ "") and (theQuery[DisplayField][row] EQ Selected)) {
             out_string  = out_string & "<option value=""#Replace(theQuery[ValueField][row], """", "&quot;", "ALL")#"" selected>#ReplaceList(theQuery[DisplayField][row], "<,>", "&lt;,&gt;")#</option>#CR#";
         } else {
             out_string  = out_string & "<option value=""#Replace(theQuery[ValueField][row], """", "&quot;", "ALL")#"">#ReplaceList(theQuery[DisplayField][row], "<,>", "&lt;,&gt;")#</option>#CR#";
         }
     }
 
     return out_string;
 }

---

