---
layout: udf
title:  savecontent
date:   2014-03-30T17:26:34.000Z
library: CFMLLib
argString: "content"
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF10
shortDescription: Implements CFSAVECONTENT as a function
description: |
 Best to just read this: http://cfmlblog.adamcameron.me/2014/03/how-about-this-for-savecontent.html

returnValue: A string containing the captured content

example: |
 days = ["R?hina","R?t?","R?apa","R?pare","R?mere","R?horoi","R?tapu"];
 contentViaFunction = savecontent(function(){
     var decoratedDays = days.map(function(v){
         return "<li>#v#</li>";
     });
     writeOutput("<ul>#decoratedDays.toList('')#</ul>");
 });
 writeOutput(contentViaFunction);

args:
 - name: content
   desc: A function containing the processing to capture the content of
   req: true


javaDoc: |
 /**
  * Implements CFSAVECONTENT as a function
  * v1.0 by Adam Cameron
  * 
  * @param content      A function containing the processing to capture the content of (Required)
  * @return A string containing the captured content 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.0, March 30, 2014 
  */

code: |
 string function saveContent(required function content){
     savecontent variable="local.saved" {
         content();
     }
     return local.saved;
 }

---

