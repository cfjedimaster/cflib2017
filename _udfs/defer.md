---
layout: udf
title:  defer
date:   2013-10-21T09:10:48.000Z
library: UtilityLib
argString: "job[, onSuccess][, onFailure][, onError][, onTerminate]"
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF10
shortDescription: A function to hand of a job to a separate thread
description: |
 Hands-off a job to a thread and upon completion / failure / etc calls the provided event handlers.

returnValue: A struct containing functions getStatus(), getThreadId() and terminate()

example: |
 bigFileToProcess = "path/to/file";
 
 deferredJob = defer(
     job        = function(){
         var someResult = "";
         var fileHandle = fileOpen(bigFileToProcess, "read");
         while (!fileIsEof(fileHandle)){
             var line = fileReadLine(fileHandle);
             // etc
         }
         fileClose(fileHandle); 
         return someResult;
     },
     onSuccess    = function(result){
         // will receive someResult, so do something with it
     },
     onFailure    = function(e){
         writeLog(file="someLogFIle", text="It didnae work because of #e.message#");
     }
 );

args:
 - name: job
   desc: The code to defer
   req: true
 - name: onSuccess
   desc: Handler to run if job code completes without error
   req: false
 - name: onFailure
   desc: Handler to run if job code errors
   req: false
 - name: onError
   desc: Handler to run if defer() code errors
   req: false
 - name: onTerminate
   desc: Handler to run if terminate is called
   req: false


javaDoc: |
 /**
  * A function to hand of a job to a separate thread
  * v1.0 by Adam Cameron
  * v1.1 by Adam Cameron (added getThreadId(), made thread names unique, fixed logic error around onError())
  * 
  * @param job      The code to defer (Required)
  * @param onSuccess      Handler to run if job code completes without error (Optional)
  * @param onFailure      Handler to run if job code errors (Optional)
  * @param onError      Handler to run if defer() code errors (Optional)
  * @param onTerminate      Handler to run if terminate is called (Optional)
  * @return A struct containing functions getStatus(), getThreadId() and terminate() 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.1, October 21, 2013 
  */

code: |
 public struct function defer(required function job, function onSuccess, function onFailure, function onError, function onTerminate){
     var threadId = "deferredThread_#createUuid()#";
 
     local[threadId] = "";
 
     try {
         cfthread.status = "Running";
         thread name=threadId action="run" attributecollection=arguments {
             try {
                 successData.result = job();
                 cfthread.status = "Completed";
                 if (structKeyExists(attributes, "onSuccess")){
                     onSuccess(successData);
                 }
             } catch (any e){
                 cfthread.status = "Failed";
                 if (structKeyExists(attributes, "onFailure")){
                     onFailure(e);
                 }else{
                     rethrow;
                 }
             }
         }
     } catch (any e){
         cfthread.status = "Errored";
         if (structKeyExists(arguments, "onError")){
             onError(e);
         }else{
             rethrow;
         }
     }
     return {
         getStatus = function(){
             return cfthread.status;
         },
         getThreadId = function(){
             return threadId;
         },
         terminate = function(){
             if (cfthread.status == "Running"){
                 thread name=threadId action="terminate";
                 cfthread.status = "Terminated";
                 if (isDefined("onTerminate")){
                     onTerminate();
                 }
             }
         }
     };
 }

---

