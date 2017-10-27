---
layout: udf
title:  createDestination
date:   2010-03-20T17:05:36.000Z
library: UtilityLib
argString: "destname, channelId"
author: Marko Simic
authorEmail: marko.simic@gmail.com
version: 1
cfVersion: CF9
shortDescription: Creates BlazeDS destination at runtime
tagBased: false
description: |
 In case you want to physically  separate communication between certain groups of users, best way to do that is to create new destination and to direct messages on it. One way to do that is to define destination in messaging-config.xml or dynamically at runtime using this function. 
 It takes 2 arguments: 
 - destname - Destination name
 - channelId - Channel ID. Channel is either defined in services-config.xml or you may use createChannel method to do it at runtime

returnValue: Returns a destination object.

example: |
 local.newdestination = createDestination('classRoom_1','collyba-longpolling-amf');

args:
 - name: destname
   desc: Destination name.
   req: true
 - name: channelId
   desc: Channel ID.
   req: true


javaDoc: |
 /**
  * Creates BlazeDS destination at runtime
  * 
  * @param destname      Destination name. (Required)
  * @param channelId      Channel ID. (Required)
  * @return Returns a destination object. 
  * @author Marko Simic (marko.simic@gmail.com) 
  * @version 1, March 20, 2010 
  */

code: |
 function createDestination(destname, channelId){
     var local = structNew();
     
     local.brokerClass = createObject('java','flex.messaging.MessageBroker');
     local.broker = local.brokerClass.getMessageBroker( javacast('null','') );
     local.service = local.broker.getService('message-service');
     local.destinations = local.service.getDestinations();
     
     //check if destination already exists. If it does just return it
     if (structKeyExists(local.destinations,arguments.destname)){ //check if destination already exist
         return local.destinations[arguments.destname];    
     }
     
     // Creates a ServiceAdapter instance and sets its id, sets if destination  is manageable
     local.destination = local.service.createDestination(arguments.destname);
     local.destination.createAdapter('cfgateway');
     
     local.configMap = createObject('java','flex.messaging.config.ConfigMap').init();
     local.configMap.addProperty('gatewayid',application.CFEventGatewayId);
     
     local.ss = createObject("java","flex.messaging.config.ServerSettings");
     local.ss.setAllowSubtopics(true); 
     local.ss.setSubtopicSeparator('.');
     local.ss.setDurable(false);
     
     local.destination.setServerSettings(ss);
     
     local.adapter = local.destination.getAdapter();
     
     //Initializes the adapter with the properties.
     local.adapter.initialize('cfgateway',configMap);
             
     local.destination.addChannel(arguments.channelId);
     
     //Starts the destination if its associated Service is started and if the destination is not already running. 
     local.destination.start();
     
     return local.destination;
 }

oldId: 2059
---

