---
layout: udf
title:  genAESKeyFromPW
date:   2012-10-02T22:26:35.000Z
library: SecurityLib
argString: "password, salt64[, length]"
author: Justin Scott
authorEmail: leviathan@darktech.org
version: 1
cfVersion: CF9
shortDescription: Generates an AES encryption key from a provided password and salt.
tagBased: false
description: |
 Normally when using AES with encrypt() and decrypt() you would use generateSecretKey(&quot;AES&quot;) to generate an encryption key.  This key needs to be stored somewhere in order to decrypt the data encrypted with that key.  In some cases, you may not want to store the encryption key but generate one based on other data, such as a password provided by the user (which you would then not store, so not even you can decrypt the data without the user's decryption password).  This function provides a way to generate an AES key based on a provided password and salt.

returnValue: Returns a string that is the generated encryption key.

example: |
 <!--- Standard key generation method, generates a random AES key. --->
 <cfset generatedKey = generateSecretKey("AES") />
 
 
 <!--- Password method, generates an AES key based on a password and salt. --->
 
 <!--- User would provide their encryption password to the system. --->
 <!--- Password is case-sensitive and could be passed through LCase() or UCase() to negate case. --->
 <cfset myPassword = "secret password" />
 
 <!--- The system would generate a salt in Base64 for their account and store it along with their account information. --->
 <!--- The salt is used by the key generator to help mitigate against dictionary attacks and is required. --->
 <!--- It's recommended to use a salt generated based on Java's SecureRandom object. --->
 <cfset mySalt64 = toBase64("some salt value") />
 
 <!--- Call the password-based key generator with the password and salt. --->
 <cfset generatedKey = genAESKeyFromPW(myPassword, mySalt64) />
 
 <!--- The generated key drops right in where a key from generateSecretKey("AES) would go. ---> 
 <cfset encrypted = encrypt("Hello World!", generatedKey, "AES", "Base64") />
 
 <p><cfoutput>encrypted: #encrypted#</cfoutput></p>
 
 <!--- Decryption works the same way. --->
 <cfset decrypted = decrypt(encrypted, generatedKey, "AES", "Base64") />
 
 <p><cfoutput>decrypted: #decrypted#</cfoutput></p>

args:
 - name: password
   desc: Password to use for encryption key
   req: true
 - name: salt64
   desc: Salt  to use for encyption key
   req: true
 - name: length
   desc: Key length
   req: false


javaDoc: |
 /**
  * Generates an AES encryption key from a provided password and salt.
  * v1.0 by Justin Scott
  * v1.1 by Adam Cameron - converted to script, fixed trivial logic error with length argument
  * 
  * @param password      Password to use for encryption key (Required)
  * @param salt64      Salt  to use for encyption key (Required)
  * @param length      Key length (Optional)
  * @return Returns a string that is the generated encryption key. 
  * @author Justin Scott (leviathan@darktech.org) 
  * @version 1.1, October 2, 2012 
  */

code: |
 string function genAESKeyFromPW(required string password, required string salt64, numeric length=128){
     // Decode the salt value that was provided.
     var salt = toString(toBinary(arguments.salt64));
     
     // Go fetch Java's secret key factory so we can generate a key.
     var keyFactory = createObject("java", "javax.crypto.SecretKeyFactory").getInstance("PBKDF2WithHmacSHA1");
     
     // Define a key specification based on the password and salt that were provided.
     var keySpec = createObject("java", "javax.crypto.spec.PBEKeySpec").init(
         arguments.password.toCharArray(),    // Convert the password to a character array (char[])
         salt.getBytes(),                    // Convert the salt to a byte array (byte[])
         javaCast("int", 1024),                // Iterations as Java int
         javaCast("int", arguments.length)    // Key length as Java int (192 or 256 may be available depending on your JVM)
     );
     
     // Initialize the secret key based on the password/salt specification.
     var tempSecret = keyFactory.generateSecret(keySpec);
 
     // Generate the AES key based on our secret key.
     var secretKey = createObject("java", "javax.crypto.spec.SecretKeySpec").init(tempSecret.getEncoded(), "AES");
 
     // Return the generated key as a Base64-encoded string.
     return toBase64(secretKey.getEncoded());    
 }

---

