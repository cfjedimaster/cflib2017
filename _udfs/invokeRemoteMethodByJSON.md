---
layout: udf
title:  invokeRemoteMethodByJSON
date:   2013-03-10T16:41:47.000Z
library: UtilityLib
argString: "url, method[, args]"
author: Henry Ho
authorEmail: henryho167@gmail.com
version: 1
cfVersion: CF9
shortDescription: Invoke a remote method using cfhttp and JSON proxy
tagBased: false
description: |
 WSDL is heavy and slow.  JSON is much faster but cfinvoke does not supporting invoking cfc method that way.

returnValue: Any data returned by remote method call.

example: |
 ans = invokeRemoteMethodByJSON("http://domain.com/remote.cfc", "sum", {arr=[1,2,3]});

args:
 - name: url
   desc: The URL of the remote component
   req: true
 - name: method
   desc: The name of the remote method to call
   req: true
 - name: args
   desc: Any arguments to pass to the method
   req: false


javaDoc: |
 /**
  * Invoke a remote method using cfhttp and JSON proxy
  * v1.0 by Henry Ho
  * 
  * @param url      The URL of the remote component (Required)
  * @param method      The name of the remote method to call (Required)
  * @param args      Any arguments to pass to the method (Optional)
  * @return Any data returned by remote method call. 
  * @author Henry Ho (henryho167@gmail.com) 
  * @version 1.0, March 10, 2013 
  */

code: |
 function invokeRemoteMethodByJSON(required string url, required string method, struct args){
     var httpService = new http(url=url, method="post");
 
     httpService.addParam(type="formfield", name="method", value=method);
     httpService.addParam(type="formfield", name="returnformat", value="json");
     httpService.addParam(type="formfield", name="argumentCollection", value=serializeJSON(args));
     
     var result = httpService.send().GetPrefix();
     
     if (len(result.fileContent)) {
         if (!isJson(result.fileContent)){
             throw(message="Non-json string returned", detail=result.fileContent);
         }
             
         return deserializeJSON(result.fileContent);
     }
 }

oldId: 2168
---

