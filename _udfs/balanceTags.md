---
layout: udf
title:  balanceTags
date:   2012-11-22T09:43:37.000Z
library: StrLib
argString: "string"
author: Chris Herdt
authorEmail: cherdt@gmail.com
version: 1
cfVersion: CF6
shortDescription: Given unbalanced or truncated XHTML, returns balanced XHTML
description: |
 Taking an XHTML excerpt based on character length can frequently produce broken tags and broken elements. This function removes trailing broken tags and adds end tags so that the excerpt is balanced.

returnValue: Returns a string with any unbalanced opening tags re-balanced with matching closing tags

example: |
 <cfset string = '<div><p>Here is some<br/><em>well-balanced</em><br /> <strong>XHTML</strong>'>
 <cfoutput>#balanceTags(string)#</cfoutput>
 <cfoutput>#balanceTags(Left(string,50))#</cfoutput>
 <cfoutput>#balanceTags(Left(string,65))#</cfoutput>
 <p>Additional text.</p>

args:
 - name: string
   desc: A string containing a fragment of XHTML
   req: true


javaDoc: |
 <!---
  Given unbalanced or truncated XHTML, returns balanced XHTML
  v1.0 by Chris Herdt
  
  @param string      A string containing a fragment of XHTML (Required)
  @return Returns a string with any unbalanced opening tags re-balanced with matching closing tags 
  @author Chris Herdt (cherdt@gmail.com) 
  @version 1.0, November 22, 2012 
 --->

code: |
 <cffunction name="balanceTags" access="public" output="false" returntype="string" hint="Takes (possibly truncated) XHTML content and balances the tags">
     <cfargument name="string" type="string" required="true" hint="The HTML string to balance">
     <cfset var returnString = arguments.string>
     <cfset var tagStack = arrayNew(1)>
     <cfset var tag = "">
     <cfset var tagString = "">
     <cfset var word = "">
     <cfset var startPosition = 1>
 
     <!--- First, find any broken tags (as opposed to broken elements) --->
     <!--- Loop backwards through text one char at a time --->
     <!--- If you find a < before a > then there is a broken tag --->
     <cfset startPosition = len(returnString)>
     <cfloop condition="startPosition GT 0">
         <cfif find("<",returnString,startPosition) GT 0>
             <!--- This represents a broken tag. Truncate the string at this position --->
             <cfset returnString = left(returnString,startPosition-1)>
             <cfbreak>
         <cfelseif find(">",returnString,startPosition) GT 0>
             <!--- Found the end of the tag (properly ended), so we can break the loop --->
             <cfbreak>
         <cfelse>
             <!--- Check the next char to the left --->
             <cfset startPosition = startPosition-1>
         </cfif>
     </cfloop>
 
     <!--- Reset start position to begin at the first char --->
     <cfset startPosition = 1>
 
     <!--- Next, find any broken elements (i.e. start tags without end tags --->
     <cfloop condition="startPosition GT 0 AND startPosition LT len(returnString)">
         <cfset startPosition = find("<",returnString,startPosition)>
         <cfset tag = REFind("</?[A-Za-z]+[^>]*>",returnString,startPosition,true)>
         <cfif tag.len[1] GT 0>
             <cfset tagString = mid(returnString,tag.pos[1],tag.len[1])>
             <!--- Check for self-closing tag --->
             <cfif REFind("\s*/\s*>",tagString) GT 0>
                 <!--- Do nothing --->
             <cfelse>
                 <cfset word = REFind("/?[A-Za-z]+",tagString,1,true)>
                 <cfif word.len[1] GT 0>
                     <!--- Is this a start tag or an end tag? --->
                     <cfif NOT find("/",mid(tagString,word.pos[1],word.len[1]))>
                         <!--- Start tag: Push the word (start tag) onto the stack --->
                         <cfset arrayAppend(tagStack,mid(tagString,word.pos[1],word.len[1]))>
                     <cfelse>
                         <!--- End tag: Pop word --->
                         <cfset arrayDeleteAt(tagStack,arrayLen(tagStack))>
                         <!--- TODO:
                         What if the tags are not only unbalanced, but not properly nested?
                         E.g. "<div><p>Here is <strong>some</p><p>text</strong></p></div>"
                         We could try to insert the end tag before the closing of the parent tag.
                         Although then we would have a stray end tag.
                         --->
                     </cfif>
                 </cfif>
             </cfif>
             <!--- Ignore everything that was part of the current tag --->
             <cfset startPosition = tag.pos[1]+tag.len[1]>
             <!--- Advance to next tag --->
             <cfset startPosition = find("<",returnString,startPosition)>
         </cfif>
     </cfloop>
 
     <!--- While the stack is not empty, pop items from the stack --->
     <cfloop condition="arrayLen(tagStack) GT 0">
         <!--- Add the popped word (top of stack) as an end tag --->
         <cfset returnString = returnString & "</" & tagStack[ArrayLen(tagStack)] & ">">
         <cfset arrayDeleteAt(tagStack,arrayLen(tagStack))>
     </cfloop>
 
     <cfreturn returnString>
 </cffunction>

---

