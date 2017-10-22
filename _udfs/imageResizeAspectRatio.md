---
layout: udf
title:  imageResizeAspectRatio
date:   2006-02-22T12:39:14.000Z
library: UtilityLib
argString: "originalWidth, originalHeight, target"
author: Christopher Jordan
authorEmail: cjordan@placs.net
version: 1
cfVersion: CF5
shortDescription: Returns the proper dimensions of an image resized to a certain maximum size.
tagBased: false
description: |
 This function will give you the properly resized dimensions of an image. In other words, you give it the original dimensions, the new maximum size, and the UDF returns the new size numbers while maintaining the aspect ratio.
 
 This could be very handy to use with the ImageSize UDF already published on CFLib.org which returns an image's width and height.

returnValue: Returns a structure.

example: |
 <CFSet Image = imageResizeAspectRatio(400,300,300)>
 <CFOutput>
     #Image.width#<br>
     #Image.height#<br>
 </CFOutput>
 
 or... using the ImageSize UDF...
 
 <CFSet OriginalSize = imageSize("c:\inetpub\wwwroot\sample.jpg")>
 <CFSet NewImageSize = imageResizeAspectRatio(OriginalSize.width,OriginalSize.height,150)>
 <CFOutput>
     #NewImageSize.width#<br>
     #NewImageSize.height#<br>
 </CFOutput>

args:
 - name: originalWidth
   desc: Width of image.
   req: true
 - name: originalHeight
   desc: Height of image.
   req: true
 - name: target
   desc: New target size.
   req: true


javaDoc: |
 /**
  * Returns the proper dimensions of an image resized to a certain maximum size.
  * 
  * @param originalWidth      Width of image. (Required)
  * @param originalHeight      Height of image. (Required)
  * @param target      New target size. (Required)
  * @return Returns a structure. 
  * @author Christopher Jordan (cjordan@placs.net) 
  * @version 1, February 22, 2006 
  */

code: |
 function imageResizeAspectRatio(originalWidth,originalHeight,target){
     var width        = 0;
     var height        = 0;
     var percentage    = 0;
     var imageProperties    = structnew();
 
     percentage = (target / originalHeight);
     if (originalWidth gt originalHeight) { 
         percentage = (target / originalWidth);
     }
     
     newWidth                = round(originalWidth * percentage);
     newHeight                = round(originalHeight * percentage);
     imageProperties.width    = newWidth;
     imageProperties.height    = newHeight;
     
     return imageProperties;        
 }

---

