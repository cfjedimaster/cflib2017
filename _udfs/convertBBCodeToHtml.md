---
layout: udf
title:  convertBBCodeToHtml
date:   2014-06-19T09:02:27.000Z
library: StrLib
argString: "text[, substitutions]"
author: Marcus Fernstrom
authorEmail: Marcus@MarcusFernstrom.com
version: 1
cfVersion: CF10
shortDescription: BBCode in, HTML out
description: |
 It takes a BBCoded string of text, and returns an HTML version, it contains the basics and is easy to expand on.

returnValue: A string with BBCode substituted out for HTML

example: |
 // TestConvertBBCodeToHtml.cfc
 component extends="testbox.system.BaseSpec" {
 
     function run(){
         include "udfs/convertBBCodeToHtml.cfm";
 
         describe("Tests for convertBBCodeToHtml()", function(){
             it("is handles an empty string", function(){
                 expect(
                     convertBBCodeToHtml("")
                 ).toBe("");
             });
             it("handles an isolated substitution", function(){
                 expect(
                     convertBBCodeToHtml("[i]italicised[/i]")
                 ).toBe("<i>italicised</i>");
             });
             it("handles multiple same substitutions", function(){
                 expect(
                     convertBBCodeToHtml("[i]italicised[/i][i]italicised again[/i]")
                 ).toBe("<i>italicised</i><i>italicised again</i>");
             });
             it("handles different substitutions", function(){
                 expect(
                     convertBBCodeToHtml("[i]italicised[/i][b]bold[/b]")
                 ).toBe("<i>italicised</i><strong>bold</strong>");
             });
             it("handles leading, embedded and trailing text", function(){
                 expect(
                     convertBBCodeToHtml("text before[code]code[/code]text between[quote]quote[/quote]text after")
                 ).toBe('text before<pre>code</pre>text between<blockquote><p>"quote"</p></blockquote>text after');
             });
             it("handles complex substitution", function(){
                 expect(
                     convertBBCodeToHtml("[list][*] item 1[*] item 2[/list]")
                 ).toMatch("\s*<ul>\s*<li>\s*item 1</li>\s*<li>\s*item 2</li></ul>\s*");
             });
             it("handles multi-line substitution", function(){
                 expect(
                     convertBBCodeToHtml("
                         [list]
                             [*] item 1
                             [*] item 2
                         [/list]
                     ")
                 ).toMatch("\s*<ul>\s*<li>\s*item 1\s*</li>\s*<li>\s*item 2\s*</li></ul>\s*");
             });
             it("handles custom substitution", function(){
                 expect(
                     convertBBCodeToHtml("[foo]moo[/foo]", [{match="\[foo\](.*?)\[\/foo\]",replace="<foo>\1</foo>"}])
                 ).toMatch("<foo>moo</foo>");
             });
         });
     }
 
 }

args:
 - name: text
   desc: Text upon which to perform substitutions
   req: true
 - name: substitutions
   desc: Array of substitution structs. Each struct should contain keys match and replace
   req: false


javaDoc: |
 /**
  * BBCode in, HTML out
  * v0.9 by Marcus Fernstrom
  * v1.0 by Adam Cameron (simplified logic, fixed a couple of small bugs, added substitutions as an argument so it can be extended)
  * 
  * @param text      Text upon which to perform substitutions (Required)
  * @param substitutions      Array of substitution structs. Each struct should contain keys match and replace (Optional)
  * @return A string with BBCode substituted out for HTML 
  * @author Marcus Fernstrom (Marcus@MarcusFernstrom.com) 
  * @version 1.0, June 19, 2014 
  */

code: |
 public string function convertBBCodeToHtml(required string text, array substitutions){
     param array substitutions = [
         {match="\[i\](.*?)\[\/i\]", replace="<i>\1</i>"},
         {match="\[b\](.*?)\[\/b\]", replace="<strong>\1</strong>"},
         {match="\[u\](.*?)\[\/u\]", replace="<u>\1</u>"},
         {match="\[s\](.*?)\[\/s\]", replace="<strike>\1</strike>"},
         {match="\[code\](.*?)\[\/code\]", replace="<pre>\1</pre>"},
         {match="\[img\](.*?)\[\/img\]", replace='<img src="\1" alt="" />'},
         {match="\[quote\](.*?)\[\/quote\]", replace='<blockquote><p>"\1"</p></blockquote>'},
         {match='\[quote="(.*?)"\](.*?)\[\/quote\]', replace="<blockquote><p>\2<br /> - \1</p></blockquote>"},
         {match='\[style size="(.*?)"\](.*?)\[\/style\]', replace='<span style="font-size:\1">\2</span>'},
         {match='\[style color="(.*?)"\](.*?)\[\/style\]', replace='<span style="color:\1;">\2</span>'},
         {match="\[list\]\s*\[\*\]", replace="<ul><li>"},
         {match="\[\*\]", replace="</li> <li>"},
         {match="\[\/list\]", replace="</li></ul>"},
         {match="\[table\]", replace='<table style="border:1px solid black;">'},
         {match="\[\/table\]", replace="</table>"},
         {match="\[tr\]", replace="<tr>"},
         {match="\[\/tr\]", replace="</tr>"},
         {match="\[td\]", replace="<td>"},
         {match="\[\/td\]", replace="</td>"},
         {match="\[url\](?:http(s)?:\/\/)?(.*?)\[\/url\]", replace='<a href="http\1://\2" target="_blank">http\1://\2</a>'}
     ];
     
     for(var substitution in substitutions){
         text = reReplaceNoCase(text, substitution.match, substitution.replace, "All");
     }
     return text;
 }

---

