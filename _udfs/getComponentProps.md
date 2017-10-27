---
layout: udf
title:  getComponentProps
date:   2012-05-18T14:56:47.000Z
library: DataManipulationLib
argString: "object"
author: Robby Lansaw
authorEmail: robby@ohsogooey.com
version: 3
cfVersion: CF6
shortDescription: Returns an array of all properties in cfc's metadata, inherited or not.
tagBased: false
description: |
 Pass in the result from getMetaData() and returns all properties within the cfc and those it extends. It is recursive. (I didn't find any true time difference and this seemed cleaner). This does not include the base 'component' tag in it's search. I couldn't see anyone putting properties there anyways. A special value will be added to each propery, foundIn, that represents which CFC a property was found in. This is useful in case both a child and parent CFC share the same property.

returnValue: Returns an array of structs.

example: |
 <cfset whatever = createobject('component', 'foo.bar')>
 <cfset dummyArray = getComponentProps( getMetaData( whatever ))>
 <cfdump var="#dummyArray#" />

args:
 - name: object
   desc: The metadata from a component.
   req: true


javaDoc: |
 /**
  * Returns an array of all properties in cfc's metadata, inherited or not.
  * v2 was submitted by salvatore fusto
  * v3 ditto
  * 
  * @param object      The metadata from a component. (Required)
  * @return Returns an array of structs. 
  * @author Robby Lansaw (robby@ohsogooey.com) 
  * @version 3, May 18, 2012 
  */

code: |
 function getComponentProps(object) {
        var propArray = arrayNew(1);
        if (structKeyExists(object,'properties')) {
                propArray = object.properties;
        }
        if (structKeyExists(object,'extends')) {
                propArray.addAll(getComponentProps(object.extends ));
        }
        return propArray;
 }

oldId: 1094
---

