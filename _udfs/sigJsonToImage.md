---
layout: udf
title:  sigJsonToImage
date:   2011-10-07T16:53:32.000Z
library: UtilityLib
argString: "jsonData"
author: James Moberg
authorEmail: james@ssmedia.com
version: 1
cfVersion: CF9
shortDescription: A supplemental script for Signature Pad that generates an image of the signature's JSON output server-side.
description: |
 Signature to Image is a simple ColdFusion script that will take the JSON output of Signature Pad (jQuery/HTML5 canvas-based signature pad) and generate an image object to be saved or displayed inline.  (Useful when adding signatures via CFDocument since it doesn't render canvas elements.)
 
 Written to be consistent with the behavior of the original PHP script:
 http://thomasjbradley.ca/lab/signature-to-image
 
 More info on Signature Pad:
 http://thomasjbradley.ca/lab/signature-pad

returnValue: Returns an image object.

example: |
 <!--- Use Signature Pad to create a signature JSON packet
 http://thomasjbradley.ca/lab/signature-pad --->
 
 
 <CFSET TheImage = sigJsonToImage(Signature_Pad_JSON_Data)>
 
 <CFIF IsImage(TheImage)>
      <!--- Display Image inline --->
      <cfimage action = "writeToBrowser" source="#TheImage#">
 
      <!--- Save file --->
      <cfset ImageWrite(TheImage, "c:\signature.png")>
 </CFIF>

args:
 - name: jsonData
   desc: String (JSON) output from Signature Pad
   req: true


javaDoc: |
 /**
  * A supplemental script for Signature Pad that generates an image of the signature's JSON output server-side.
  * 
  * @param jsonData      String (JSON) output from Signature Pad (Required)
  * @return Returns an image object. 
  * @author James Moberg (james@ssmedia.com) 
  * @version 1, October 7, 2011 
  */

code: |
 function sigJsonToImage(jsonData){
     var options = structNew();
     var lineOptions = structNew();
     options["imagesize"] = listtoarray("198, 55");
     options["bgColour"] = '##ffffff';
     options["penWidth"] = 2;
     options["penColour"]  = '##145394';
     options["drawMultiplier"] = 12;
     if(ArrayLen(arguments) GTE 2 AND isStruct(arguments[2])) {
         structAppend(options, arguments[2], true);
     }
     if(NOT isarray(jsonData) AND isjson(jsonData)){
         jsonData = DeserializeJSON(jsonData);
     }
     if (NOT IsArray(jsonData)){
         return "";
     } else if (NOT isStruct(jsonData[1])){
         return "";
     } else if (NOT structKeyExists(jsonData[1], "lx")){
         return "";
     }
     img = ImageNew("", options["imagesize"][1] * val(options["drawMultiplier"]), options["imagesize"][2] * val(options["drawMultiplier"]), "ARGB");
     ImageSetBackgroundColor(img, options["bgColour"]);
     imageSetAntialiasing(img, "on");
     ImageSetDrawingColor(img, options["penColour"]);
         
     lineOptions["width"] = options["penWidth"] * (options["drawMultiplier"] / 2);
     lineOptions["endcaps"] = "round";
     lineOptions["lineJoins"] = "round";  /* use join for CF9 */
     ImageSetDrawingStroke(img, lineOptions);
 
     for (v=1;v LTE ArrayLen(jsonData);v=v+1) {
         ImageDrawLine(img, jsonData[v].lx * val(options["drawMultiplier"]), jsonData[v].ly * val(options["drawMultiplier"]), jsonData[v].mx * val(options["drawMultiplier"]), jsonData[v].my * val(options["drawMultiplier"]));
     }
 
     ImageResize(img, options["imagesize"][1], options["imagesize"][2], "highPerformance");
 
     return img;
 }

---

