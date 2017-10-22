---
layout: udf
title:  isInTransaction
date:   2012-09-25T00:39:56.000Z
library: DatabaseLib
argString: ""
author: Bilal Soylu
authorEmail: bilalsoylu@gmail.com
version: 1
cfVersion: CF9
shortDescription: Returns true if the call to it is within a CFTRANSACTION block
tagBased: false
description: |
 The function can be used within code to determine whether one is currently within a CFTRANSACTION or not. Credit for the technique must go to Bilal from boncode.blogspot.co.uk who wrote this article from which I lifted the concept: http://boncode.blogspot.co.uk/2009/02/cf-detecting-nested-transactions.html.  All I have done is turned it into a UDF.
 
 This calls an internal ColdFusion Java class, so will not work on Railo or OpenBD.  It has been tested to work on CFMX7, CF9 and CF10 (I have not tested on CF8 as I don't have a CF8 server to test with, but see no reason why it would not work on CF8 if it works on the version either side of it.

returnValue: Returns true if the call was within a CFTRANSACTION, otherwise false.

example: |
 <cfoutput>
 Before: #isInTransaction()#<br />
 <cftransaction>
     Within: #isInTransaction()#<br />
 </cftransaction>
 After: #isInTransaction()#<br />
 </cfoutput>

args:


javaDoc: |
 /**
  * Returns true if the call to it is within a CFTRANSACTION block
  * v0.1 by Bilal Soylu
  * v1.0 by Adam Cameron: simplifying logic &amp; converting to script
  * v1.1 by Adam Cameron: fixed bug causing potential false positives (as advised by Bilal)
  * 
  * @return Returns true if the call was within a CFTRANSACTION, otherwise false. 
  * @author Bilal Soylu (bilalsoylu@gmail.com) 
  * @version 1.1, September 24, 2012 
  */

code: |
 function isInTransaction(){
     var result = createObject("java", "coldfusion.tagext.sql.TransactionTag").getCurrent();
     return structKeyExists(local, "result");
 }

---

