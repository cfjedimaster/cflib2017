---
layout: udf
title:  createEndpoint
date:   2010-03-20T17:06:24.000Z
library: UtilityLib
argString: "channelId"
author: Marko Simic
authorEmail: marko.simic@gmail.com
version: 1
cfVersion: CF9
shortDescription: Create channel and endpoint at runtime
description: |
 Create channel which communicate with corresponding endpoints on the BlazeDS server.
 This is part we miss to complete &quot;BlazeDS dynamic configuration&quot; story we started with createDestination function. It takes single parameter:
 - channelId - Channel ID. Uniquely identify you channel definition. 
 
 Usually channel is defined in services-config.xml. In this specific case (see warning below) we would do that like this:
 &lt;channel-definition id=&quot;collyba-longpolling-amf&quot; class=&quot;mx.messaging.channels.AMFChannel&quot;&gt;
     &lt;endpoint uri=&quot;http://{server.name}:{server.port}{context.root}/flex2gateway/cfamflongpolling&quot; class=&quot;flex.messaging.endpoints.AMFEndpoint&quot;/&gt;
     &lt;properties&gt;
         &lt;enable-small-messages&gt;false&lt;/enable-small-messages&gt;
         &lt;add-no-cache-headers&gt;false&lt;/add-no-cache-headers&gt;
         &lt;polling-enabled&gt;true&lt;/polling-enabled&gt;
         &lt;polling-interval-seconds&gt;0&lt;/polling-interval-millis&gt;
         &lt;client-wait-interval-millis&gt;1&lt;/client-wait-interval-millis&gt;
         &lt;wait-interval-millis&gt;60000&lt;/wait-interval-millis&gt;
         &lt;max-waiting-poll-requests&gt;200&lt;/max-waiting-poll-requests&gt;
         &lt;serialization&gt;
             &lt;enable-small-messages&gt;false&lt;/enable-small-messages&gt;
         &lt;/serialization&gt;
     &lt;/properties&gt;
 &lt;/channel-definition&gt;
 
 IMPORTANT!
 This method create a channel and endpoint according to my specific needs. Anyhow, to adjust it to your needs is quite easy. That will be the subject of next upgrade of this function ;)
 
 For more information see my blog http://itreminder.blogspot.com/2010/03/blazeds-creating-endpoint-at-runtime.html 
 I'll be glad to help.

returnValue: Returns nothing.

example: |
 createEndpoint("collyba-longpolling-amf");

args:
 - name: channelId
   desc: Channel ID.
   req: true


javaDoc: |
 /**
  * Create channel and endpoint at runtime
  * 
  * @param channelId      Channel ID. (Required)
  * @return Returns nothing. 
  * @author Marko Simic (marko.simic@gmail.com) 
  * @version 1, March 20, 2010 
  */

code: |
 function createEndpoint(channelId){
         var local = structNew();
     
         local.brokerClass = createObject('java','flex.messaging.MessageBroker');
         local.broker = local.brokerClass.getMessageBroker( javacast('null','') );
         local.channelSets = local.broker.getAllChannelSettings();
         local.chennIds = local.broker.getChannelIds();
     
         //check if channel/endpoint is already created
         if (arrayContains(local.chennIds,arguments.channelId)){
             return;
         }
     
         //Channel definiton properties
         local.channelSettings = createObject('java','flex.messaging.config.ChannelSettings').init(arguments.channelId);
         local.channelProperties = createObject('java','flex.messaging.config.ConfigMap').init();
         local.chPropSerialize = createObject('java','flex.messaging.config.ConfigMap').init();  
     
         local.channelSettings.setClientType("mx.messaging.channels.AMFChannel");
         local.channelSettings.setEndpointType("coldfusion.flash.messaging.CFAMFEndPoint");
         local.channelSettings.setUri("http://{server.name}:{server.port}{context.root}/flex2gateway/cfamflongpolling");
     
         local.channelProperties.addProperty("add-no-cache-headers","false"); 
         local.channelProperties.addProperty("polling-enabled","true");
         local.channelProperties.addProperty("polling-interval-seconds","0");
         local.channelProperties.addProperty("client-wait-interval-millis","1");
         local.channelProperties.addProperty("wait-interval-millis","60000");
         local.channelProperties.addProperty("max-waiting-poll-requests","200");
     
         local.chPropSerialize.addProperty("enable-small-messages","false");
         local.channelProperties.addProperty("serialization",local.chPropSerialize); 
     
         local.channelSettings.addProperties(local.channelProperties);
     
         //Creates an Endpoint instance, sets its id and url
         local.endpoint = local.broker.createEndpoint(
                         arguments.channelId, 
                         "http://{server.name}:{server.port}{context.root}/flex2gateway/cfamflongpolling",
                         local.channelSettings.getEndpointType());
         // Initialize the endpoint with id and properties
         local.endpoint.initialize(arguments.channelId, local.channelSettings.getProperties());
         //Start the endpoint
         local.endpoint.start();
     
         local.channelSets[arguments.channelId] = local.channelSettings;
         local.broker.setChannelSettings(local.channelSets);
     }

---

