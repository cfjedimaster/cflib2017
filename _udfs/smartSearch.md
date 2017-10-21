---
layout: udf
title:  smartSearch
date:   2008-09-27T23:01:31.000Z
library: DatabaseLib
argString: "searchterm, field"
author: Craig McDonald
authorEmail: craig@neuralmotion.com.au
version: 0
cfVersion: CF5
shortDescription: Smart boolean searching in SQL queries.
description: |
 smartSearch improves keyword searching via SQL by generating a string that can be inserted into an SQL query.
 
 It supports parsing of full boolean search terms (AND,OR,NOT) as well as bracket matching and searching of multiple database fields.
 
 Perfect for solving issues such as searching of firstname and lastname fields in a table where the submitted keyword is one field.

returnValue: Returns a string.

example: |
 <cfset keywords = "Jimbo Jones">
 <cfset fieldname = "tbl_firstname,tbl_lastname">
 
 <cfset sqlSearch = smartSearch(keywords, fieldname, "OR")>
 
 <cfquery>
     SELECT * FROM table WHERE #PreserveSingleQuotes(sqlSearch)#
 </cfquery>

args:
 - name: searchterm
   desc: Search string.
   req: true
 - name: field
   desc: List of fields to search against.
   req: true


javaDoc: |
 /**
  * Smart boolean searching in SQL queries.
  * 
  * @param searchterm      Search string. (Required)
  * @param field      List of fields to search against. (Required)
  * @return Returns a string. 
  * @author Craig McDonald (craig@neuralmotion.com.au) 
  * @version 0, September 27, 2008 
  */

code: |
 function smartSearch(searchterm, field) {
     //init fields
     var fieldcount = 0;
     var currentfield = "";
     var searchstring = "";
     var startBracketCount = 0;
     var endBracketCount = 0;
     var bracketPoint = 0;
     var searchtermflag = "";
     var counter = "";
     var numchars = "";
     var preboolterm = "";
     var searchportion = "";
     var temp = "";
     var thisSearchTerm = "";
     
     arguments.booloperator = "OR";
     
     if(ArrayLen(arguments) GTE 3)
         arguments.booloperator = arguments[3];
         
     //trim leading and trailing spaces from the search term
     arguments.searchterm = trim(arguments.searchterm);
         
     //Count number of brackets for safety - if there is an uneven number
     //remove them all. Otherwise, it is safe to leave them.
     bracketPoint = Find("(", arguments.searchterm);
     while(bracketPoint IS NOT 0) {
         startBracketCount = startBracketCount + 1;
         bracketPoint = Find("(", arguments.searchterm, bracketPoint+1);
     }    
         
     bracketPoint = Find(")", arguments.searchterm);
     while(bracketPoint IS NOT 0) {
         endBracketCount = endBracketCount + 1;
         bracketPoint = Find(")", arguments.searchterm, bracketPoint+1);
     }
         
     if(startBracketCount IS NOT endBracketCount) {
         //Remove the brackets from the searchterm
         arguments.searchterm = Replace(arguments.searchterm, "(", "", "ALL");
         arguments.searchterm = Replace(arguments.searchterm, ")", "", "ALL");
     }
     
     if(arguments.booloperator IS "EXACT") {
         for (fieldcount = 1; fieldcount LTE ListLen(arguments.field); fieldcount = fieldcount + 1) {
             if(fieldcount IS 1)
                 searchstring = searchstring & "(";
             else
                 searchstring = searchstring & " OR ";
             
             currentfield = ListGetAt(arguments.field, fieldcount);
             searchstring = searchstring & "(" & currentfield & " Like '%" & arguments.searchterm & "%')";
         }
         
         if (Len(searchstring) GT 0)
             searchstring = searchstring & ")";
     }
     else {
         //init vars
         searchtermflag = 1;
         counter = 1;
         numchars = 0;
         prevboolterm = '';
         
         // Loop until there are no keywords left in the searchterm
         while (counter LTE Len(arguments.searchterm)) {
             //If this is the last searchterm, set the portion to the rest of the string
             if(counter IS Len(arguments.searchterm))
                 searchportion = Len(arguments.searchterm);
             else //otherwise find the next keyword
             {
                 searchportion = Find(" ", Right(arguments.searchterm, Len(arguments.searchterm) - counter));
                 //Check if there is a ( opening bracket at the start of the string and if there is a " directly following
                 if(Find("(", Mid(arguments.searchterm, counter, searchportion)) IS 1 AND Find('"', Mid(arguments.searchterm, counter, searchportion)) IS 2)
                 {
                     //Remove the start quote from the beginning
                     attributes.searchterm = RemoveChars(arguments.searchterm, counter + 1, 1);
                     searchportion = searchportion - 1;
 
                     //There is, so find the end quote.
                     searchportion = Find('"', Mid(arguments.searchterm, counter, Len(arguments.searchterm))) - 1;
                     
                     //Remove the end quote from the position found
                     arguments.searchterm = RemoveChars(arguments.searchterm, counter + searchportion, 1);
 
                     //Check if the last character after the " quote is a ) closing bracket. 
                     //If it is, extend the searchportion to include it.
                     if(Mid(arguments.searchterm, counter + searchportion, 1) IS ")")
                         searchportion = searchportion + 1;
                 }
                 
                 //otherwise find if there's just a quote at the start of the keyword
                 if(Find('"', Mid(arguments.searchterm, counter, searchportion)) IS 1)
                 {
                     //There is, so find the end quote.
                     counter = counter + 1;
                     temp = 1;
                     searchportion = Find('"', Mid(arguments.searchterm, counter, Len(arguments.searchterm))) - 1;
                     
                     //Remove the end quote from the position found
                     arguments.searchterm = RemoveChars(arguments.searchterm, counter + searchportion, 1);
                                     
                     //Check if the last character after the " quote is a ) closing bracket. 
                     //If it is, extend the searchportion to include it.
                     if(Mid(arguments.searchterm, counter + searchportion, 1) IS ")")
                         searchportion = searchportion + 1;                    
                 }
                 
                 //if there are no keywords left, set the portion to the rest of the string
                 if(searchportion IS 0)
                     searchportion = Len(arguments.searchterm);
             }
     
             // Check if this portion contains any boolean terms
             if ((Mid(arguments.searchterm, counter, searchportion) IS "OR" OR Mid(arguments.searchterm, counter, searchportion) IS "AND" OR Mid(arguments.searchterm, counter, searchportion) IS "NOT") AND counter IS NOT 1 AND searchportion IS NOT Len(arguments.searchterm)) {
                 // Check if the current boolean term is just a NOT by itself (no AND or OR preceding it)
                 if ((prevboolterm IS NOT "AND" AND prevboolterm IS NOT "OR") AND Mid(arguments.searchterm, counter, searchportion) IS "NOT") {
                     // Append AND and the boolean term to the SQL string
                     searchstring = searchstring & " AND " & Mid(arguments.searchterm, counter, searchportion) & " ";
                 }
                 else {
                     // Append this boolean term to the SQL string
                     searchstring = searchstring & " " & Mid(arguments.searchterm, counter, searchportion) & " ";
                 }
                 
                 // Set the previous boolean term to the current boolean term
                 prevboolterm = Mid(arguments.searchterm, counter, searchportion);
                 
                 // Set the search term set flag
                 searchtermflag = 1;
             }
             else {
                 // Loop through each of the fields to search on
                 for (fieldcount = 1; fieldcount LTE ListLen(arguments.field); fieldcount = fieldcount + 1) {
                     currentfield = ListGetAt(arguments.field, fieldcount);
                 
                     //if there were no boolean terms pre-existing, add some
                     if(searchtermflag LTE 0)
                     {
                         //if there's more than one field to search on, OR the keyword
                         if(fieldcount GT 1)
                             searchstring = searchstring & " OR ";
                         else //otherwise, AND the keyword (by default), or whatever the booloperator is set to
                             searchstring = searchstring & " " & arguments.booloperator & " ";
                     }
                     
                     //if this is the first field to search on, add an opening bracket
                     if(fieldcount IS 1)
                         searchstring = searchstring & "(";
                     
                     //Replace all ' single quotes with '' double quotes - safe parsing
                     thisSearchTerm = Replace(Mid(arguments.searchterm, counter, searchportion), "'", "''", "ALL");
                     
                     //init loop vars
                     startBrackets = "";
                     endBrackets = "";
                     
                     //Find any brackets at the start of the searchterm
                     bracketPoint = Find("(", thisSearchTerm);
                     while(bracketPoint IS NOT 0)
                     {
                         startBrackets = startBrackets & "(";
                         bracketPoint = Find("(", thisSearchTerm, bracketPoint+1);
                     }
 
                     //Find any brackets at the end of the searchterm                    
                     bracketPoint = Find(")", thisSearchTerm);
                     while(bracketPoint IS NOT 0)
                     {
                         endBrackets = endBrackets & ")";
                         bracketPoint = Find(")", thisSearchTerm, bracketPoint+1);
                     }
                     
                     //Remove the brackets from the searchterm
                     thisSearchTerm = Replace(thisSearchTerm, "(", "", "ALL");
                     thisSearchTerm = Replace(thisSearchTerm, ")", "", "ALL");
                     
                     //append this keyword to the SQL string
                     searchstring = searchstring & startBrackets & "(" & currentfield & " LIKE '%" & thisSearchTerm & "%')" & endBrackets;
                     //set the end of searchterm flag
                     searchtermflag = searchtermflag - 1;
                     
                     //clear the previous boolean term - should be reset for next word to be checked correctly
                     //Re: NOT's without AND's
                     prevboolterm = "";
                 }    
             }
             
             // If there are no search terms left then close the bracket
             if (searchtermflag LTE 0)
                 searchstring = searchstring & ")";
         
             // Move to the next search portion
             counter = counter + searchportion + 1;
         }
     }
     
     //Return the SQL string
     return searchstring;
 }

---

