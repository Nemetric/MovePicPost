// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var jlat;
    var jlon;

    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    var onSuccess = function (position) {
        jlat.text(position.coords.latitude);
        jlon.text(position.coords.longitude);

        var mapOptions = {
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

         alert('Latitude: ' + position.coords.latitude + '\n' +
               'Longitude: ' + position.coords.longitude + '\n' +
               'Altitude: ' + position.coords.altitude + '\n' +
               'Accuracy: ' + position.coords.accuracy + '\n' +
               'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
               'Heading: ' + position.coords.heading + '\n' +
               'Speed: ' + position.coords.speed + '\n' +
               'Timestamp: ' + position.timestamp + '\n');

       /* // Chicago
        var coordinateObject = new Object();
        coordinateObject.lat = '41.83682786072714';
        coordinateObject.lng = '-87.626953125';
        geoLocationHandler.addLocation(coordinateObject);
        // New York
        var coordinateObject = new Object();
        coordinateObject.lat = '40.58058466412761';
        coordinateObject.lng = '-74.00390625';
        geoLocationHandler.addLocation(coordinateObject);
        // Toronto
        var coordinateObject = new Object();
        coordinateObject.lat = '43.70759350405294';
        coordinateObject.lng = '-79.365234375';
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

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        jlat = $('#lat');
        jlon = $('#lon');

        navigator.geolocation.getCurrentPosition(onSuccess, onError);


       
      


    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
})();