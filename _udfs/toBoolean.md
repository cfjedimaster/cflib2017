---
layout: udf
title:  toBoolean
date:   2012-08-26T16:38:17.000Z
library: StrLib
argString: "[arg]"
author: Steve Withington
authorEmail: stephenwithington@gmail.com
version: 1
cfVersion: CF9
shortDescription: I convert anything to boolean
description: |
 Pass me a value, expression, or anything you want and I'll give you back its boolean value (true || false).  I'm especially useful when mixing CFML with JavaScript and you need an actual 'true' or 'false' value to pass in as an argument to a js call.

returnValue: Returns a boolean&#58; true if arg was a boolean and true, otherwise false

example: |
 test = {a=[[],[]],b='1,2,3'};
 toBoolean(test); // returns false
 
 test = 'php is great';
 toBoolean(test); // returns false
 
 test = 'cfml is awesome' == 'cfml is awesome';
 toBoolean(test); // returns true

args:
 - name: arg
   desc: Any value
   req: false


javaDoc: |
 /**
  * I convert anything to boolean
  * version 0.1 by Steve Withington
  * version 1.0 by Adam Cameron: simplifying logic
  * 
  * @param arg      Any value (Optional)
  * @return Returns a boolean: true if arg was a boolean and true, otherwise false 
  * @author Steve Withington (stephenwithington@gmail.com) 
  * @version 1, August 26, 2012 
  */

code: |
 public boolean function toBoolean(any arg='') {
     return isBoolean(arg) && arg ? true : false;
 }

---

