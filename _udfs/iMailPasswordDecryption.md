---
layout: udf
title:  iMailPasswordDecryption
date:   2002-06-26T19:04:26.000Z
library: SecurityLib
argString: "stAccountname , stEncryptedPassword"
author: Stephan Scheele
authorEmail: stephan@stephan-t-scheele.de
version: 1
cfVersion: CF5
shortDescription: Decryption of the Password for an IPSWITCH IMail-Account (Tested for IMail 6).
tagBased: false
description: |
 Decryption of the Password for an IPSWITCH IMail-Account (Tested for IMail 6). IMail is (among others) a POP3 daemon for Microsoft Windows NT.  Any user who can login to the machine with the IMail database can also retrieve the encrypted passwords for ANY user.  All they need to do is open a registry editor (i.e., regedit.exe).
  
 The IMail database is really just registry keys.  The IMail server stores all users in the registry under: HKEY_LOCAL_MACHINE\SOFTWARE\Ipswitch\IMail\Domains\&lt;DOMAINNAME&gt;\Users\&lt;USERNAME&gt;
 (Text from Mike Davis)
 
 The algorithm is from http://www.w00w00.org/advisories/imailpass.html.
 Thanks to Mike Davis who discovered this algorithem.

returnValue: Returns a string.

example: |
 <cfset Account = "beethoven">
 <cfset Password = "CEDAC9EBD1D6">
 
 <cfoutput>
 Account: #Account#<BR>
 Encrypted Password: #Password#<BR>
 Unencrypted Password:  #iMailPasswordDecryption(Account , Password)#
 </cfoutput>

args:
 - name: stAccountname 
   desc: iMail account name.
   req: true
 - name: stEncryptedPassword
   desc: iMail encryptes password.
   req: true


javaDoc: |
 /**
  * Decryption of the Password for an IPSWITCH IMail-Account (Tested for IMail 6).
  * The algorithm is from http://www.w00w00.org/advisories/imailpass.html.
  * Thanks to Mike Davis who discovered this algorithem.
  * 
  * @param stAccountname       iMail account name. (Required)
  * @param stEncryptedPassword      iMail encryptes password. (Required)
  * @return Returns a string. 
  * @author Stephan Scheele (stephan@stephan-t-scheele.de) 
  * @version 1, June 26, 2002 
  */

code: |
 function iMailPasswordDecryption(stAccountname, stEncryptedPassword){
   /** Building the ASCII-Encryted - Structure */
   var stASCII_Encrypted=structNew();
     /** Build the Account-Array */
   var aAccount=ArrayNew(2);  
     /** Convert every letter to ASCII */
     var stTempAccountname=LCase(stAccountname);  
      /** Build the Password-Encryped Array */    
     var aPassword=ArrayNew(1);
 
   var    stTEMPEncryptedPassword=stEncryptedPassword;    
     var aASCIIResult = ArrayNew(1);
     var zaehler=1;  
   var Loop=1;
   var intASCII_difference="";
   var stringPassword="";
   
   StructInsert(stASCII_Encrypted, "00", -97); 
   StructInsert(stASCII_Encrypted, "01", -96); 
   StructInsert(stASCII_Encrypted, "02", -95); 
   StructInsert(stASCII_Encrypted, "03", -94); 
   StructInsert(stASCII_Encrypted, "04", -93); 
   StructInsert(stASCII_Encrypted, "05", -92); 
   StructInsert(stASCII_Encrypted, "06", -91); 
   StructInsert(stASCII_Encrypted, "07", -90); 
   StructInsert(stASCII_Encrypted, "08", -89); 
   StructInsert(stASCII_Encrypted, "09", -88); 
   StructInsert(stASCII_Encrypted, "0A", -87); 
   StructInsert(stASCII_Encrypted, "0B", -86); 
   StructInsert(stASCII_Encrypted, "0C", -85); 
   StructInsert(stASCII_Encrypted, "0D", -84); 
   StructInsert(stASCII_Encrypted, "0E", -83); 
   StructInsert(stASCII_Encrypted, "0F", -82); 
     StructInsert(stASCII_Encrypted, "10", -81); 
   StructInsert(stASCII_Encrypted, "11", -80); 
   StructInsert(stASCII_Encrypted, "12", -79); 
   StructInsert(stASCII_Encrypted, "13", -78); 
   StructInsert(stASCII_Encrypted, "14", -77); 
   StructInsert(stASCII_Encrypted, "15", -76); 
   StructInsert(stASCII_Encrypted, "16", -75); 
   StructInsert(stASCII_Encrypted, "17", -74); 
   StructInsert(stASCII_Encrypted, "18", -73); 
   StructInsert(stASCII_Encrypted, "19", -72); 
   StructInsert(stASCII_Encrypted, "1A", -71); 
   StructInsert(stASCII_Encrypted, "1B", -70); 
   StructInsert(stASCII_Encrypted, "1C", -69); 
   StructInsert(stASCII_Encrypted, "1D", -68); 
   StructInsert(stASCII_Encrypted, "1E", -67); 
   StructInsert(stASCII_Encrypted, "1F", -66); 
     StructInsert(stASCII_Encrypted, "20", -65); 
   StructInsert(stASCII_Encrypted, "21", -64); 
   StructInsert(stASCII_Encrypted, "22", -63); 
   StructInsert(stASCII_Encrypted, "23", -62); 
   StructInsert(stASCII_Encrypted, "24", -61); 
   StructInsert(stASCII_Encrypted, "25", -60); 
   StructInsert(stASCII_Encrypted, "26", -59); 
   StructInsert(stASCII_Encrypted, "27", -58); 
   StructInsert(stASCII_Encrypted, "28", -57); 
   StructInsert(stASCII_Encrypted, "29", -56); 
   StructInsert(stASCII_Encrypted, "2A", -55); 
   StructInsert(stASCII_Encrypted, "2B", -54); 
   StructInsert(stASCII_Encrypted, "2C", -53); 
   StructInsert(stASCII_Encrypted, "2D", -52); 
   StructInsert(stASCII_Encrypted, "2E", -51); 
   StructInsert(stASCII_Encrypted, "2F", -50); 
     StructInsert(stASCII_Encrypted, "30", -49); 
   StructInsert(stASCII_Encrypted, "31", -48); 
   StructInsert(stASCII_Encrypted, "32", -47); 
   StructInsert(stASCII_Encrypted, "33", -46); 
   StructInsert(stASCII_Encrypted, "34", -45); 
   StructInsert(stASCII_Encrypted, "35", -44); 
   StructInsert(stASCII_Encrypted, "36", -43); 
   StructInsert(stASCII_Encrypted, "37", -42); 
   StructInsert(stASCII_Encrypted, "38", -41); 
   StructInsert(stASCII_Encrypted, "39", -40); 
   StructInsert(stASCII_Encrypted, "3A", -39); 
   StructInsert(stASCII_Encrypted, "3B", -38); 
   StructInsert(stASCII_Encrypted, "3C", -37); 
   StructInsert(stASCII_Encrypted, "3D", -36); 
   StructInsert(stASCII_Encrypted, "3E", -35); 
   StructInsert(stASCII_Encrypted, "3F", -34); 
     StructInsert(stASCII_Encrypted, "40", -33); 
   StructInsert(stASCII_Encrypted, "41", -32); 
   StructInsert(stASCII_Encrypted, "42", -31); 
   StructInsert(stASCII_Encrypted, "43", -30); 
   StructInsert(stASCII_Encrypted, "44", -29); 
   StructInsert(stASCII_Encrypted, "45", -28); 
   StructInsert(stASCII_Encrypted, "46", -27); 
   StructInsert(stASCII_Encrypted, "47", -26); 
   StructInsert(stASCII_Encrypted, "48", -25); 
   StructInsert(stASCII_Encrypted, "49", -24); 
   StructInsert(stASCII_Encrypted, "4A", -23); 
   StructInsert(stASCII_Encrypted, "4B", -22); 
   StructInsert(stASCII_Encrypted, "4C", -21); 
   StructInsert(stASCII_Encrypted, "4D", -20); 
   StructInsert(stASCII_Encrypted, "4E", -19); 
   StructInsert(stASCII_Encrypted, "4F", -18); 
     StructInsert(stASCII_Encrypted, "50", -17); 
   StructInsert(stASCII_Encrypted, "51", -16); 
   StructInsert(stASCII_Encrypted, "52", -15); 
   StructInsert(stASCII_Encrypted, "53", -14); 
   StructInsert(stASCII_Encrypted, "54", -13); 
   StructInsert(stASCII_Encrypted, "55", -12); 
   StructInsert(stASCII_Encrypted, "56", -11); 
   StructInsert(stASCII_Encrypted, "57", -10); 
   StructInsert(stASCII_Encrypted, "58", -9); 
   StructInsert(stASCII_Encrypted, "59", -8); 
   StructInsert(stASCII_Encrypted, "5A", -7); 
   StructInsert(stASCII_Encrypted, "5B", -6); 
   StructInsert(stASCII_Encrypted, "5C", -5); 
   StructInsert(stASCII_Encrypted, "5D", -4); 
   StructInsert(stASCII_Encrypted, "5E", -3); 
   StructInsert(stASCII_Encrypted, "5F", -2); 
     StructInsert(stASCII_Encrypted, "60", -1); 
   StructInsert(stASCII_Encrypted, "61", 0); 
   StructInsert(stASCII_Encrypted, "62", 1); 
   StructInsert(stASCII_Encrypted, "63", 2); 
   StructInsert(stASCII_Encrypted, "64", 3); 
   StructInsert(stASCII_Encrypted, "65", 4); 
   StructInsert(stASCII_Encrypted, "66", 5); 
   StructInsert(stASCII_Encrypted, "67", 6); 
   StructInsert(stASCII_Encrypted, "68", 7); 
   StructInsert(stASCII_Encrypted, "69", 8); 
   StructInsert(stASCII_Encrypted, "6A", 9); 
   StructInsert(stASCII_Encrypted, "6B", 10); 
   StructInsert(stASCII_Encrypted, "6C", 11); 
   StructInsert(stASCII_Encrypted, "6D", 12); 
   StructInsert(stASCII_Encrypted, "6E", 13); 
   StructInsert(stASCII_Encrypted, "6F", 14); 
     StructInsert(stASCII_Encrypted, "70", 15); 
   StructInsert(stASCII_Encrypted, "71", 16); 
   StructInsert(stASCII_Encrypted, "72", 17); 
   StructInsert(stASCII_Encrypted, "73", 18); 
   StructInsert(stASCII_Encrypted, "74", 19); 
   StructInsert(stASCII_Encrypted, "75", 20); 
   StructInsert(stASCII_Encrypted, "76", 21); 
   StructInsert(stASCII_Encrypted, "77", 22); 
   StructInsert(stASCII_Encrypted, "78", 23); 
   StructInsert(stASCII_Encrypted, "79", 24); 
   StructInsert(stASCII_Encrypted, "7A", 25); 
   StructInsert(stASCII_Encrypted, "7B", 26); 
   StructInsert(stASCII_Encrypted, "7C", 27); 
   StructInsert(stASCII_Encrypted, "7D", 28); 
   StructInsert(stASCII_Encrypted, "7E", 29); 
   StructInsert(stASCII_Encrypted, "7F", 30); 
     StructInsert(stASCII_Encrypted, "80", 31); 
   StructInsert(stASCII_Encrypted, "81", 32); 
   StructInsert(stASCII_Encrypted, "82", 33); 
   StructInsert(stASCII_Encrypted, "83", 34); 
   StructInsert(stASCII_Encrypted, "84", 35); 
   StructInsert(stASCII_Encrypted, "85", 36); 
   StructInsert(stASCII_Encrypted, "86", 37); 
   StructInsert(stASCII_Encrypted, "87", 38); 
   StructInsert(stASCII_Encrypted, "88", 39); 
   StructInsert(stASCII_Encrypted, "89", 40); 
   StructInsert(stASCII_Encrypted, "8A", 41); 
   StructInsert(stASCII_Encrypted, "8B", 42); 
   StructInsert(stASCII_Encrypted, "8C", 43); 
   StructInsert(stASCII_Encrypted, "8D", 44); 
   StructInsert(stASCII_Encrypted, "8E", 45); 
   StructInsert(stASCII_Encrypted, "8F", 46); 
     StructInsert(stASCII_Encrypted, "90", 47); 
   StructInsert(stASCII_Encrypted, "91", 48); 
   StructInsert(stASCII_Encrypted, "92", 49); 
   StructInsert(stASCII_Encrypted, "93", 50); 
   StructInsert(stASCII_Encrypted, "94", 51); 
   StructInsert(stASCII_Encrypted, "95", 52); 
   StructInsert(stASCII_Encrypted, "96", 53); 
   StructInsert(stASCII_Encrypted, "97", 54); 
   StructInsert(stASCII_Encrypted, "98", 55); 
   StructInsert(stASCII_Encrypted, "99", 56); 
   StructInsert(stASCII_Encrypted, "9A", 57); 
   StructInsert(stASCII_Encrypted, "9B", 58); 
   StructInsert(stASCII_Encrypted, "9C", 59); 
   StructInsert(stASCII_Encrypted, "9D", 60); 
   StructInsert(stASCII_Encrypted, "9E", 61); 
   StructInsert(stASCII_Encrypted, "9F", 62); 
     StructInsert(stASCII_Encrypted, "A0", 63); 
   StructInsert(stASCII_Encrypted, "A1", 64); 
   StructInsert(stASCII_Encrypted, "A2", 65); 
   StructInsert(stASCII_Encrypted, "A3", 66); 
   StructInsert(stASCII_Encrypted, "A4", 67); 
   StructInsert(stASCII_Encrypted, "A5", 68); 
   StructInsert(stASCII_Encrypted, "A6", 69); 
   StructInsert(stASCII_Encrypted, "A7", 70); 
   StructInsert(stASCII_Encrypted, "A8", 71); 
   StructInsert(stASCII_Encrypted, "A9", 72); 
   StructInsert(stASCII_Encrypted, "AA", 73); 
   StructInsert(stASCII_Encrypted, "AB", 74); 
   StructInsert(stASCII_Encrypted, "AC", 75); 
   StructInsert(stASCII_Encrypted, "AD", 76); 
   StructInsert(stASCII_Encrypted, "AE", 77); 
   StructInsert(stASCII_Encrypted, "AF", 78); 
     StructInsert(stASCII_Encrypted, "B0", 79); 
   StructInsert(stASCII_Encrypted, "B1", 80); 
   StructInsert(stASCII_Encrypted, "B2", 81); 
   StructInsert(stASCII_Encrypted, "B3", 82); 
   StructInsert(stASCII_Encrypted, "B4", 83); 
   StructInsert(stASCII_Encrypted, "B5", 84); 
   StructInsert(stASCII_Encrypted, "B6", 85); 
   StructInsert(stASCII_Encrypted, "B7", 86); 
   StructInsert(stASCII_Encrypted, "B8", 87); 
   StructInsert(stASCII_Encrypted, "B9", 88); 
   StructInsert(stASCII_Encrypted, "BA", 89); 
   StructInsert(stASCII_Encrypted, "BB", 90); 
   StructInsert(stASCII_Encrypted, "BC", 91); 
   StructInsert(stASCII_Encrypted, "BD", 92); 
   StructInsert(stASCII_Encrypted, "BE", 93); 
   StructInsert(stASCII_Encrypted, "BF", 94); 
     StructInsert(stASCII_Encrypted, "C0", 95); 
   StructInsert(stASCII_Encrypted, "C1", 96); 
   StructInsert(stASCII_Encrypted, "C2", 97); 
   StructInsert(stASCII_Encrypted, "C3", 98); 
   StructInsert(stASCII_Encrypted, "C4", 99); 
   StructInsert(stASCII_Encrypted, "C5", 100);
   StructInsert(stASCII_Encrypted, "C6", 101); 
   StructInsert(stASCII_Encrypted, "C7", 102); 
   StructInsert(stASCII_Encrypted, "C8", 103); 
   StructInsert(stASCII_Encrypted, "C9", 104); 
   StructInsert(stASCII_Encrypted, "CA", 105); 
   StructInsert(stASCII_Encrypted, "CB", 106); 
   StructInsert(stASCII_Encrypted, "CC", 107); 
   StructInsert(stASCII_Encrypted, "CD", 108);   
   StructInsert(stASCII_Encrypted, "CE", 109); 
   StructInsert(stASCII_Encrypted, "CF", 110); 
     StructInsert(stASCII_Encrypted, "D0", 111); 
   StructInsert(stASCII_Encrypted, "D1", 112); 
   StructInsert(stASCII_Encrypted, "D2", 113); 
   StructInsert(stASCII_Encrypted, "D3", 114); 
   StructInsert(stASCII_Encrypted, "D4", 115); 
   StructInsert(stASCII_Encrypted, "D5", 116); 
   StructInsert(stASCII_Encrypted, "D6", 117); 
   StructInsert(stASCII_Encrypted, "D7", 118); 
   StructInsert(stASCII_Encrypted, "D8", 119); 
   StructInsert(stASCII_Encrypted, "D9", 120); 
   StructInsert(stASCII_Encrypted, "DA", 121); 
   StructInsert(stASCII_Encrypted, "DB", 122); 
   StructInsert(stASCII_Encrypted, "DC", 123); 
   StructInsert(stASCII_Encrypted, "DD", 124); 
   StructInsert(stASCII_Encrypted, "DE", 125); 
   StructInsert(stASCII_Encrypted, "DF", 126); 
     StructInsert(stASCII_Encrypted, "E0", 127); 
   StructInsert(stASCII_Encrypted, "E1", 128); 
   StructInsert(stASCII_Encrypted, "E2", 129); 
   StructInsert(stASCII_Encrypted, "E3", 130); 
   StructInsert(stASCII_Encrypted, "E4", 131); 
   StructInsert(stASCII_Encrypted, "E5", 132); 
   StructInsert(stASCII_Encrypted, "E6", 133); 
   StructInsert(stASCII_Encrypted, "E7", 134); 
   StructInsert(stASCII_Encrypted, "E8", 135); 
   StructInsert(stASCII_Encrypted, "E9", 136); 
   StructInsert(stASCII_Encrypted, "EA", 137); 
   StructInsert(stASCII_Encrypted, "EB", 138); 
   StructInsert(stASCII_Encrypted, "EC", 139); 
   StructInsert(stASCII_Encrypted, "ED", 140); 
   StructInsert(stASCII_Encrypted, "EE", 141); 
   StructInsert(stASCII_Encrypted, "EF", 142); 
     StructInsert(stASCII_Encrypted, "F0", 143); 
   StructInsert(stASCII_Encrypted, "F1", 144); 
   StructInsert(stASCII_Encrypted, "F2", 145);
   StructInsert(stASCII_Encrypted, "F3", 146); 
   StructInsert(stASCII_Encrypted, "F4", 147); 
   StructInsert(stASCII_Encrypted, "F5", 148); 
   StructInsert(stASCII_Encrypted, "F6", 149); 
   StructInsert(stASCII_Encrypted, "F7", 150); 
   StructInsert(stASCII_Encrypted, "F8", 151); 
   StructInsert(stASCII_Encrypted, "F9", 152); 
   StructInsert(stASCII_Encrypted, "FA", 153); 
   StructInsert(stASCII_Encrypted, "FB", 154); 
   StructInsert(stASCII_Encrypted, "FC", 155); 
   StructInsert(stASCII_Encrypted, "FD", 156); 
   StructInsert(stASCII_Encrypted, "FE", 157); 
   StructInsert(stASCII_Encrypted, "FF", 158); 
             
     for(Loop=1; Loop LT val((Len(stAccountname)+1)); Loop = Loop + 1){
         aAccount[1][Loop]=Asc(Left(stTempAccountname, 1));
         stTempAccountname=RemoveChars(stTempAccountname, 1, 1);
     }
             
   /** Calculate differences between the each letter and the first letter */
     for(Loop=1; Loop LT val((Len(stAccountname)+1)); Loop = Loop + 1){
         aAccount[2][Loop]=aAccount[1][1]-aAccount[1][Loop];
     }
         
     /** Calculate differences between the ASCII-value of the first letter and ASCII-value of a*/
     intASCII_difference= aAccount[1][1] - 97;
         
     /** Convert every letter to ASCII */
     for(Loop=1; Loop LT val((Len(stEncryptedPassword)/2)+1); Loop = Loop + 1){
         aPassword[Loop]=stASCII_Encrypted[Left(stTEMPEncryptedPassword, 2)];
         stTEMPEncryptedPassword=RemoveChars(stTEMPEncryptedPassword, 1, 2);
     }
     
   /** Add Differences to password-ASCII-Values AND take off intASCII_difference*/  
     for(Loop=1; Loop LT val((Len(stEncryptedPassword)/2)+1); Loop = Loop + 1){
       aASCIIResult[Loop] = aPassword[Loop] + aAccount[2][zaehler] - intASCII_difference;
             
         /** If the AccountName is shorter then the Password the Account_Counter is put to 1 again            */
         if (zaehler LT Val(Len(stAccountname))) zaehler = zaehler + 1;
           else zaehler = 1;
         }
     
       /** Write the Passwort*/
         stringPassword="";
     
         for(Loop=1; Loop LT val((Len(stEncryptedPassword)/2)+1); Loop = Loop + 1){
           stringPassword = stringPassword & CHR(aASCIIResult[Loop]);
         }
         
   return stringPassword;
 }

oldId: 679
---

