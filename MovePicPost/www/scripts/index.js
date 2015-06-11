// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var jlat;
    var jlon;
    var map;
    var flightPlanCoordinates;

    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    var onSuccess = function (position) {
        jlat.text(position.coords.latitude);
        jlon.text(position.coords.longitude);

        var mapOptions = {
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            zoom: 13
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        flightPlanCoordinates = [
            new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        ];

        /*var flightPlanCoordinates = [
            new google.maps.LatLng(40.8720962, -98.0235384),
            new google.maps.LatLng(40.8716094, -97.9950856),
            new google.maps.LatLng(40.8552518, -97.9956435),
            new google.maps.LatLng(40.8555439, -98.0217789)
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);

        var center = new google.maps.LatLng(40.8555439, -98.0217789);
        // using global variable:
        map.panTo(center);*/

        /*  alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n');*/

        /* // 
         var coordinateObject = new Object();
         coordinateObject.lat = '40.8719988';
         coordinateObject.lng = '-98.023238'; //,
         geoLocationHandler.addLocation(coordinateObject);
         // 
         var coordinateObject = new Object();
         coordinateObject.lat = '40.8719015';
         coordinateObject.lng = '-97.9804085'; //,
         geoLocationHandler.addLocation(coordinateObject);
         // 
         var coordinateObject = new Object();
         coordinateObject.lat = '40.8583029';
         coordinateObject.lng = '-97.9941843';  //,,
         geoLocationHandler.addLocation(coordinateObject);
 
         var len = geoLocationHandler.arrLocations.length;
         for (var i = 0; i < len; i++) {
             if (i == 1) {
                 geoLocationHandler.distance += geoLocationHandler.calcDistance(geoLocationHandler.arrLocations[i - 1].lat, geoLocationHandler.arrLocations[i - 1].lng, geoLocationHandler.arrLocations[i].lat, geoLocationHandler.arrLocations[i].lng);
             }
         }
 
         alert(geoLocationHandler.distance);*/

    };

    var geoLocationHandler = {
        arrLocations: [],
        distance: 0,
        addLocation: function (obj) {
            geoLocationHandler.arrLocations.push(obj);
        },
        calcDistance: function (fromLat, fromLng, toLat, toLng) {
            return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
        }
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

    // onSuccess Geolocation
    //
    function onWatchSuccess(position) {
        var newLatLon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        flightPlanCoordinates.push(newLatLon);

        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);

       
        map.panTo(newLatLon);
    }

    // onError Callback receives a PositionError object
    //
    function onWatchError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

    var watchID = null;

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        jlat = $('#lat');
        jlon = $('#lon');

        //Initialize the map to current location
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        var options = { timeout: 30000 };
        watchID = navigator.geolocation.watchPosition(onWatchSuccess, onWatchError, options);

        




    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
})();