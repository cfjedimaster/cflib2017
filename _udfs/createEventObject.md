---
layout: udf
title:  createEventObject
date:   2013-12-05T17:00:23.000Z
library: CFMLLib
argString: ""
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF10
shortDescription: Creates functions for event-handling in CFML
description: |
 Returns a lightweight object (just a struct) containing on() / off() / trigger() functions to facilitate event-driven coding in CFML

returnValue: A struct containing functions on(), off() and trigger()

example: |
 event = createEventObject();
 
 event.on("TestEvent", function(){writeOutput("Hello World<br>");});
 event.trigger("TestEvent");

args:


javaDoc: |
 /**
  * Creates functions for event-handling in CFML
  * v1.0 by Adam Cameron
  * 
  * @return A struct containing functions on(), off() and trigger() 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.0, December 5, 2013 
  */

code: |
 function createEventObject(){
     var eventContainer = {};
     return {
         on = function(required string event, required function handler, struct data={}){
             if (!structKeyExists(eventContainer, event)){
                 eventContainer[event] = [];
             }
             arrayAppend(eventContainer[event], arguments);
         },
         trigger = function(required string event, struct additionalParameters={}){
             if (structKeyExists(eventContainer, event)){
                 for (eventEntry in eventContainer[event]){
                     var eventObj = {
                         event = event,
                         data = eventEntry.data
                     };
                     eventEntry.handler(event=eventObj, argumentCollection=additionalParameters);
                 }
             }
         },
         off = function(required string event){
             structDelete(eventContainer, event);
         }
     };
 }

---

