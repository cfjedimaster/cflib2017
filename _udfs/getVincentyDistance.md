---
layout: udf
title:  getVincentyDistance
date:   2012-08-26T19:48:51.000Z
library: CFMLLib
argString: "lat1, lon1, lat2, lon2[, units]"
author: Stephen Withington
authorEmail: stephenwithington@gmail.com
version: 1
cfVersion: CF9
shortDescription: Calculates geodetic distance between two points specified by latitude/longitude using Vincenty inverse formula for ellipsoids&#58; http&#58;//www.movable-type.co.uk/scripts/latlong-vincenty.html
tagBased: false
description: |
 Vincenty Inverse Solution of Geodesics on the Ellipsoid
 Original formula found at http://www.movable-type.co.uk/scripts/latlong-vincenty.html
 This work is licensed under a Create Commons Attribution 3.0 Unported License.
 http://creativecommons.org/licenses/by/3.0/
 from: Vincenty inverse formula - T Vincenty, &quot;Direct and Inverse Solutions of Geodesics on the Ellipsoid with application of nested equations&quot;, Survey Review, vol XXII no 176, 1975 ( http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf )

returnValue: Returns a numeric value that is the distance between the two points

example: |
 getVincentyDistance( lat1 = 41.4994954, lon1 = -81.6954088, lat2 = 41.8781136, lon2 = -87.6297982, units = 'sm' )

args:
 - name: lat1
   desc: Latitude of first point as a decimal
   req: true
 - name: lon1
   desc: Longitude of first point as a decimal
   req: true
 - name: lat2
   desc: Latitude of second point as a decimal
   req: true
 - name: lon2
   desc: Longitude of second point as a decimal
   req: true
 - name: units
   desc: Units of measure, one of&#58; m (metres, default), km (kilometres),sm (statutory miles), nm (nautical miles), yd (yards), ft (feet), in (inches), cm (centimetres), mm (millimetres).
   req: false


javaDoc: |
 /**
  * Calculates geodetic distance between two points specified by latitude/longitude using Vincenty inverse formula for ellipsoids: http://www.movable-type.co.uk/scripts/latlong-vincenty.html
  * version 0.1 by Stephen Withington
  * version 1.0 by Adam Cameron: throwing exceptions for error conditions instead of returning invalid strings
  * 
  * @param lat1      Latitude of first point as a decimal (Required)
  * @param lon1      Longitude of first point as a decimal (Required)
  * @param lat2      Latitude of second point as a decimal (Required)
  * @param lon2      Longitude of second point as a decimal (Required)
  * @param units      Units of measure, one of: m (metres, default), km (kilometres),sm (statutory miles), nm (nautical miles), yd (yards), ft (feet), in (inches), cm (centimetres), mm (millimetres). (Optional)
  * @return Returns a numeric value that is the distance between the two points 
  * @author Stephen Withington (stephenwithington@gmail.com) 
  * @version 1, August 26, 2012 
  */

code: |
 numeric function getVincentyDistance(required numeric lat1, required numeric lon1, required numeric lat2, required numeric lon2, string units="m" ) {
     // WGS-84 ellipsoid params
     var a = 6378137;
     var b = 6356752.314245;
     var f = 1 / 298.257223563;
 
     var L = ( lon2 - lon1 ) * pi() / 180;
     var U1 = atn( ( 1 - f ) * tan( lat1 * pi() / 180 ) );
     var U2 = atn( ( 1 - f ) * tan( lat2 * pi() / 180 ) );
     var sinU1 = sin( U1 );
     var cosU1 = cos( U1 );
     var sinU2 = sin( U2 );
     var cosU2 = cos( U2 );
     var lambda = L;
     var lambdaP = '';
     var iterLimit = 100;
     var sinLambda = '';
     var cosLambda = '';
     var sinSigma = '';
     var cosSigma = '';
     var sigma = '';
     var sinAlpha = '';
     var cosSqAlpha = '';
     var cos2SigmaM = '';
     var C = '';
     var uSq = '';
     var AA = '';
     var BB = '';
     var deltaSigma = '';
     var s = '';
     var Math = createObject( 'java', 'java.lang.Math' );
 
     if ( lat1 > 90 || lat1 < -90 || lon1 > 180 || lon1 < -180 || lat2 > 90 || lat2 < -90 || lon2 > 180 || lon2 < -180 ) {
         throw(
             type    = "InvalidCoordinatesException",
             message    = "Invalid coordinates",
             detail    = "Latitude must be between 0deg and +/-90deg. (south latitude is negative). Longitude must be between 0deg and +/-180deg. (west longitude is negative)"
         );
     };
 
     if ( not structKeyExists( arguments, 'units' ) or not listFindNoCase( 'm,km,sm,nm,yd,ft,in,cm,mm', arguments.units ) ) {
         arguments.units = 'sm'; // default to statute miles
     };
 
     do {
         sinLambda = sin( lambda );
         cosLambda = cos( lambda );
         sinSigma = sqr( ( cosU2 * sinLambda ) * ( cosU2 * sinLambda ) + ( cosU1 * sinU2 - sinU1 * cosU2 * cosLambda ) * ( cosU1 * sinU2 - sinU1 * cosU2 * cosLambda ) );
         if ( sinSigma == 0 ) { return 0; };  // co-incident points
         cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
         sigma = Math.ATan2( JavaCast( 'double', sinSigma ), javaCast( 'double', cosSigma ) ); // CFML doesn't have a native ATan2() method avail.
         sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
         cosSqAlpha = 1 - sinAlpha * sinAlpha;
         cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
         if ( not IsNumeric( cos2SigmaM ) ) { cos2SigmaM = 0; }; // equatorial line: cosSqAlpha=0 (§6)
         C = f / 16 * cosSqAlpha * ( 4 + f * ( 4 - 3 * cosSqAlpha ) );
         lambdaP = lambda;
         lambda = L + ( 1 - C ) * f * sinAlpha * ( sigma + C * sinSigma * ( cos2SigmaM + C * cosSigma * ( -1 + 2 * cos2SigmaM * cos2SigmaM ) ) );
     } while ( abs( lambda - lambdaP ) > 0.000000000001 and --iterLimit > 0 );
 
     if ( iterLimit == 0 ) {
         throw(
             type    = "FormulaFailureException",
             message    = "Formula failed to converge",
             detail    = "Nearly-antipodal points may fail to give a solution"
         );
     };
 
     uSq = cosSqAlpha * ( a * a - b * b ) / ( b * b );
     AA = 1 + uSq / 16384 * ( 4096 + uSq * ( -768 + uSq * ( 320 - 175 * uSq ) ) );
     BB = uSq / 1024 * ( 256 + uSq * ( -128 + uSq * ( 74 - 47 * uSq ) ) );
     deltaSigma = BB * sinSigma * ( cos2SigmaM + BB / 4 * ( cosSigma * ( -1 + 2 * cos2SigmaM * cos2SigmaM ) - BB / 6 * cos2SigmaM * ( -3 + 4 * sinSigma * sinSigma ) * ( -3 + 4 * cos2SigmaM * cos2SigmaM ) ) );
     s = b * AA * ( sigma - deltaSigma );
     s = NumberFormat( s, .999 ); // round to 1mm precision
     
     switch( arguments.units ) {
         case 'm' : // meters 
             break;
         case 'km' : s = s * 0.001; // kilometers
             break;
         case 'nm' : s = s * 0.000539956803; // nautical miles
             break;
         case 'yd' : s = s * 1.0936133; // yards
             break;
         case 'ft' : s = s * 3.2808399; // feet
             break;
         case 'in' : s = s * 39.3700787; // inches
             break;
         case 'cm' : s = s * 100; // centimeters
             break;
         case 'mm' : s = s * 1000; // millimeters
             break;
         default : s = s * 0.000621371192; // statute miles
     };
 
     return s;
 };

---

