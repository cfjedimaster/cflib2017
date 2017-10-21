---
layout: udf
title:  xmlMerge
date:   2008-10-15T14:38:30.000Z
library: DataManipulationLib
argString: "xml1, xml2[, overwriteNodes]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 2
cfVersion: CF7
shortDescription: Merges one xml document into another
description: |
 Given two XML documents, merge (superimpose) the second into the first.  You can choose to either overwrite existing nodes with the new values (default behavior) or add the nodes even if they duplicate the existing document.  This UDF is particularly handy when you have a default set of configurations in an XML file and want to be able to override some of them with an second XML file but want to have the second file contain only the nodes you are overriding.

returnValue: void (changes the first XML object)

example: |
 <cfxml variable="xmlDoc1"><?xml version="1.0" encoding="UTF-8"?>
 <settings>
     <system>
         <datasource value="myDSN"/>
         <home value="index.cfm"/>
     </system>
     <instance>
         <timeZone>
             <offset 
                 value="0"/>
             <label
                 value="GMT"/>
         </timeZone>
         <skin value="default"/>
     </instance>
     <custom />            
 </settings>
 </cfxml>
 
 
 <cfxml variable="xmlDoc2"><?xml version="1.0" encoding="UTF-8"?>
 <settings>
     <instance>
         <timeZone>
             <offset
                 value="-7"/>
             <label
                 value="PST"/>
         </timeZone>        
     </instance>                
     <custom>
         <excludeFromLogging>
             <page value="hidden.cfm"/>
             <page value="logreport.cfm"/>
         </excludeFromLogging>
     </custom>
 </settings>
 </cfxml>
 
 
 <h2>XMLMerge With Overwriting of Nodes (Default)</h2>
 <cfoutput>
 <table border="1">
     <tr>
         <th>Original</th>
     </tr>
     <tr>
         <td valign="top" style="font-size:x-small;">#htmlCodeFormat(toString(xmlDoc1))#</td>
     </tr>    
     <tr>
         <th>To Merge</th>
     </tr>    
     <tr>
         <td valign="top" style="font-size:x-small;">#htmlCodeFormat(toString(xmlDoc2))#</td>
         <cfset xmlMerge(xmlDoc1,xmlDoc2)>
     </tr>
     <tr>    
         <th>Merged</th>
     </tr>    
     <tr>
         <td valign="top" style="font-size:x-small;">#htmlCodeFormat(toString(xmlDoc1))#</td>
     </tr>
 </table>
 </cfoutput>
 
 
 <cfxml variable="xmlDoc3">
 <bloggers>
     <blogger firstName="Ben" lastName="Forta" blog="http://forta.com/blog/"/>
     <blogger firstName="Sean" lastName="Corfield" blog="http://www.corfield.org/blog/"/>
 </bloggers>
 </cfxml>
 
 <cfxml variable="xmlDoc4">
 <bloggers>
     <blogger firstName="Christian" lastName="Cantrell" blog="http://www.markme.com/cantrell/"/>
     <blogger firstName="Brandon" lastName="Purcell" blog="http://www.bpurcell.org"/>
 </bloggers>
 </cfxml>
 
 <h2>XMLMerge Without Overwrite of Nodes</h2>
 
 <cfoutput>
 <table border="1">
     <tr>
         <th>Original</th>
     </tr>
     <tr>
         <td valign="top" style="font-size:x-small;">#htmlCodeFormat(toString(xmlDoc3))#</td>
     </tr>    
     <tr>
         <th>To Merge</th>
     </tr>    
     <tr>
         <td valign="top" style="font-size:x-small;">#htmlCodeFormat(toString(xmlDoc4))#</td>
         
     </tr>
     <tr>    
         <th>Merged</th>
     </tr>    
     <tr>
         <cfset xmlMerge(xmlDoc3,xmlDoc4,false)>
         <td valign="top" style="font-size:x-small;">#htmlCodeFormat(toString(xmlDoc3))#</td>
     </tr>
 </table>
 </cfoutput>

args:
 - name: xml1
   desc: The XML object into which you want to merge
   req: true
 - name: xml2
   desc: The XML object from which you want to merge
   req: true
 - name: overwriteNodes
   desc: Boolean value for whether you want to overwrite (default is true)
   req: false


javaDoc: |
 /**
  * Merges one xml document into another
  * Fix sent in by Scott Talmsa
  * 
  * @param xml1      The XML object into which you want to merge (Required)
  * @param xml2      The XML object from which you want to merge (Required)
  * @param overwriteNodes      Boolean value for whether you want to overwrite (default is true) (Optional)
  * @return void (changes the first XML object) 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 2, October 15, 2008 
  */

code: |
 function xmlMerge(xml1,xml2){
     var readNodeParent = arguments.xml2;
     var writeNodeList = arguments.xml1;
     var writeNodeDoc = arguments.xml1;
     var readNodeList = "";
     var writeNode = "";
     var readNode = "";
     var nodeName = "";
     var ii = 0;
     var writeNodeOffset = 0;
     var toAppend = 0;
     var nodesDone = structNew();
     //by default, overwrite nodes
     var overwriteNodes = true;
     //if there's a 3rd arguments, that's the overWriteNodes flag
     if(structCount(arguments) GT 2)
         overwriteNodes = arguments[3];
     //if there's a 4th argument, it's the DOC of the writeNode -- not a user provided argument -- just used when doing recursion, so we know the original XMLDoc object
     if(structCount(arguments) GT 3)
         writeNodeDoc = arguments[4];
     //if we are looking at the whole document, get the root element
     if(isXMLDoc(arguments.xml2))
         readNodeParent = arguments.xml2.xmlRoot;
     //if we are looking at the whole Doc for the first element, get the root element
     if(isXMLDoc(arguments.xml1))
         writeNodeList = arguments.xml1.xmlRoot;    
     //loop through the readNodeParent (recursively) and override all xmlAttributes/xmlText in the first document with those of elements that match in the second document
     for(nodeName in readNodeParent){
         writeNodeOffset = 0;
         //if we haven't yet dealt with nodes of this name, do it
         if(NOT structKeyExists(nodesDone,nodeName)){
             readNodeList = readNodeParent[nodeName];
             //if there aren't any of this node, we need to append however many there are
             if(NOT structKeyExists(writeNodeList,nodeName)){
                 toAppend = arrayLen(readNodeList);
             }
             //if there are already at least one node of this name
             else{
                 //if we are overwriting nodes, we need to append however many there are minus however many there were (if there none new, it will be 0)
                 if(overWriteNodes){
                     toAppend = arrayLen(readNodeList) - arrayLen(writeNodeList[nodeName]);
                 }
                 //if we are not overwriting, we need to add however many there are
                 else{
                     toAppend = arrayLen(readNodeList);
                     //if we are not overwriting, we need to make the offset of the writeNode equal to however many there already are
                     writeNodeOffset = arrayLen(writeNodeList[nodeName]);
                 }
             }
             //append however many nodes necessary of the name
             for(ii = 1;  ii LTE toAppend; ii = ii + 1){
                 arrayAppend(writeNodeList.xmlChildren,xmlElemNew(writeNodeDoc,nodeName));
             }
             //loop through however many of this nodeName there are, writing them to the writeNodes
             for(ii = 1; ii LTE arrayLen(readNodeList); ii = ii + 1){
                 writeNode = writeNodeList[nodeName][ii + writeNodeOffset];
                 readNode = readNodeList[ii];
                 //set the xmlAttributes and xmlText to this child's values
                 writeNode.xmlAttributes = readNode.xmlAttributes;                
                 //deal with the CDATA scenario to properly preserve (though, if it contains CDATA and text nodes, this won't work!!
                 if(arrayLen(readNode.xmlNodes) AND XmlGetNodeType(readNode.xmlNodes[1]) is "CDATA_SECTION_NODE"){
                     writeNode.xmlCData = readNode.xmlcdata;
                 }
                 else{
                     //modify to check to see if it's cData or not
                     writeNode.xmlText = readNode.xmlText;
                 }
                 //if this element has any children, recurse
                 if(arrayLen(readNode.xmlChildren)){
                     xmlMerge(writeNode,readNode,overwriteNodes,writeNodeDoc);
                 }
             }
             //add this node name to those nodes we have done -- we need to do this because an XMLDoc object can have duplicate keys
             nodesDone[nodeName] = true;
         }
     }
 }

---

