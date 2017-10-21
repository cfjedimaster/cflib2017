---
layout: udf
title:  bhImgInfo
date:   2007-09-17T04:28:41.000Z
library: UtilityLib
argString: "imgfile"
author: Bobby Hartsfield
authorEmail: bobby@acoderslife.com
version: 1
cfVersion: CF6
shortDescription: Image function to return Height, Width and file size.
description: |
 javax.imageio.ImageIO based image function to gather and return basic info about an image such as Height, width, and file Size (B, KB and MB)

returnValue: Returns a struct.

example: |
 <cfset img = bhImgInfo("c:\inetpub\wwwroot\image.jpg") />
 <cfdump var="#img#" />

args:
 - name: imgfile
   desc: Absolute path to image file.
   req: true


javaDoc: |
 /**
  * Image function to return Height, Width and file size.
  * 
  * @param imgfile      Absolute path to image file. (Required)
  * @return Returns a struct. 
  * @author Bobby Hartsfield (bobby@acoderslife.com) 
  * @version 1, September 16, 2007 
  */

code: |
 function bhimginfo(imgfile) {
     var jFileIn = createObject("java","java.io.File").init(imgfile);
     var ImageObject = createObject("java","javax.imageio.ImageIO").read(jFileIn);
     var ImageInfo = StructNew();
     
     var imageFile = CreateObject("java", "java.io.File").init(imgfile); 
     var sizeb = imageFile.length();
     var sizekb = numberformat(sizeb / 1024, "999999999.99");
     var sizemb = numberformat(sizekb / 1024, "99999999.99");
     var bhImageInfo = StructNew();
 
     bhImageInfo.ImgWidth = ImageObject.getWidth();
     bhImageInfo.ImgHeight = ImageObject.getHeight();
     bhImageInfo.SizeB = sizeb;
     bhImageInfo.SizeKB = sizekb;
     bhImageInfo.SizeMB = sizemb;
     
     return bhImageInfo;
 }

---

