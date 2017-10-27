---
layout: udf
title:  isImageCMYK
date:   2013-07-08T16:24:14.000Z
library: UtilityLib
argString: "image"
author: James Moberg
authorEmail: james@ssmedia.com
version: 1
cfVersion: CF10
shortDescription: Identifies CMYK images.
tagBased: true
description: |
 Pass a file path or image object and it will identify whether the image uses a CUSTOM (CMYK) color palette.

returnValue: Returns a boolean

example: |
 <cfset ImageFile = expandPath("logo.jpg")>
 <cfset ImageObject = ImageRead(ImageFile)>
 <cfoutput>
 fileOb = isImageCMYK(ImageFile)<br>
 ob = isImageCMYK(ImageObject)<br>
 </cfoutput>

args:
 - name: image
   desc: Either a path to an image or an image object.
   req: true


javaDoc: |
 <!---
  Identifies CMYK images.
  
  @param image      Either a path to an image or an image object. (Required)
  @return Returns a boolean 
  @author James Moberg (james@ssmedia.com) 
  @version 1, July 8, 2013 
 --->

code: |
 <cffunction name="isImageCMYK" returntype="boolean" output="false" hint="Returns a true/false indicator regarding if image uses CMYK (CUSTOM) palette.">
     <cfargument name="image" default="" required="true" hint="path w/file or image object" />
     <cfset local.testImage = "">
     <cfset local.isCMYK = 0>
     <cfif IsSimpleValue(arguments.image)>
         <cfif fileExists(arguments.image) and isImageFile(arguments.image)>
             <CFSET local.testImage = imageRead(arguments.image) />
         </cfif>
     <cfelseif isImage(arguments.image)>
         <cfset local.testImage = arguments.image />
     </cfif>
     <cfif isImage(local.testImage)>
         <cfif not val(imageGetBufferedImage(local.testImage).getType())>
             <cfset local.isCMYK = 1 />
         </cfif>
     </cfif>
     <cfreturn local.isCMYK />    
 </cffunction>

oldId: 2255
---

