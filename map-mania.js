var gMap;


/**function initMap() {
  gMap = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 13, lng: 121 },
    zoom: 5
  });
  // Marker for Batangas City, Philippines
  var marker = new google.maps.Marker({position:{lat:13.7565, lng:121.0583}, map:gMap});

  var marker2 = new google.maps.Marker({position:{lat:9.8349, lng:118.7384}, map:gMap});
  marker2.setIcon('https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png');
  var infoWindow = new google.maps.InfoWindow({content:'Palawan, Philippines'});
  marker2.addListener('click', function() {
      infoWindow.open(gMap, marker2);
  });

  google.maps.event.addListener(gMap, 'idle', function(){
      updateGame()
 
  });
  google.maps.event.addListener(gMap,'bounds_changed',function() {
      console.log("Bounds have changed.")
  }
  );
}

function updateGame(){
    console.log('function UpdateGame()!');
    var zoomLevel = gMap.getZoom()
    var inBounds = false;
    const loc1 = {lat: 13.7565, lng: 121.0583};
    if (gMap.getBounds().contains(loc1)){
        inBounds = true;
    }
    console.log("inBounds:" +inBounds+" zoomLevel:" + zoomLevel);
}


function initApplication() {
    console.log('Map Mania Lite - Starting!');
}
**/
var favoritePlaces = [
    {"content":"<strong>#1: Lombard, IL... Home Sweet Home!<strong>", "coordinates":{"lat":41.837546,"lng":-88.0146821}, "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
    {"content":"Wisconsin Dells, Wisconsin", "coordinates":{"lat":43.6275,"lng":-89.7710}, "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
    {"content":"Kyoto, Japan", "coordinates":{"lat":35.0116,"lng":135.7681}, "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
    {"content":"Chengdu, China", "coordinates":{"lat":30.5728,"lng":104.0668}, "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
    {"content":"Venice Beach, California", "coordinates":{"lat":33.9850,"lng":-118.4695}, "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
    {"content":"Honolulu, Hawaii", "coordinates":{"lat":21.3069,"lng":-157.8583}, "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
    {"content":"Batangas, Philippines", "coordinates":{"lat":13.7565,"lng":121.0583}, "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
    {"content":"Romeoville, Illinois; I live here now", "coordinates":{"lat":41.6475,"lng":-88.0895}, "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
    {"content":"Seoul, South Korea", "coordinates":{"lat":37.5665,"lng":126.9780}, "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
    {"content":"Manila, Philippines; I was born here", "coordinates":{"lat":14.5995,"lng":120.9842}, 
        "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"}
]; 
var currentPlaceIndex = favoritePlaces.length-1;
var currentPlace = favoritePlaces[currentPlaceIndex];
``
function initApplication() {
    console.log("Favorite Places - Starting!");
}

function initMap() {
    gMap = new google.maps.Map(document.getElementById("map"), {
        "center": {"lat": 0, "lng": 0}, "zoom": 1});

    // Note that several message boards suggested using 'idle' instead of 'bounds_changed' because 
    // 'bounds_changed' gets called over and over when the user drags the map.
    google.maps.event.addListener(gMap, 'idle', function() { updateGame()});

/*
    for (i=0; i<favoritePlaces.length; i++) { 
        addMarker(currentPlace);
        nextPlace();
    }
*/
}

var hint = document.getElementById('hint');
var score = 0;
var scoreOnPage = document.getElementById('score');
scoreOnPage.innerHTML = "Score: " + score; 
var instructions = document.getElementById('instruct')
instructions.innerHTML = "Getting Started: In this application, you will attempt to find 10 of my favorite places in the world. You will be given hints on whether or not the location is where you are looking at the map at the top. An icon will appear for each location found. You may click on the 'Click to Win!' button to win the game. Have Fun!"; 
var instructButton = document.getElementById('instructButton');
  instructButton.onclick = function() {
    instructions.innerHTML = "";
  }

function updateGame() {
    console.log("updateGame()");

    var zoomLevel = gMap.getZoom();
    console.log("Zoom Level:" + zoomLevel);

    var inBounds = false;
    console.log("coords:" + JSON.stringify(currentPlace.coordinates));
    if (gMap.getBounds().contains(currentPlace.coordinates)) {
        var inBounds = true;
        console.log("Inbounds");
       
        hint.innerHTML = "The location is inbounds, keep looking!";
    }
    else{
        hint.innerHTML = "The location is not in your current map, keep looking!";
    }

  
    if ((zoomLevel > 7) && (inBounds)) {
        console.log("Found!"); 
        score = score + 1;
        scoreOnPage.innerHTML = "Score: " + score; 
        addMarker(currentPlace);
        nextPlace();
        google.maps.event.addListenerOnce(map, 'bounds_changed', function(){
            map.setZoom(1);
        });
        
    }
//
    if (currentPlaceIndex == 0){
        console.log("You won!");
        addMarker(favoritePlaces[0]);
        addMarker(favoritePlaces[1]);
        addMarker(favoritePlaces[2]);
        addMarker(favoritePlaces[3]);
        addMarker(favoritePlaces[4]);
        addMarker(favoritePlaces[5]);
        addMarker(favoritePlaces[6]);
        addMarker(favoritePlaces[7]);
        addMarker(favoritePlaces[8]);
        addMarker(favoritePlaces[9]);
    }
    else {
        console.log("Keep going!");
    }


    
}

function nextPlace() {
    currentPlaceIndex--;
    currentPlace = favoritePlaces[currentPlaceIndex];
}

function addMarker(markerContent) {
    var marker = new google.maps.Marker({position:markerContent.coordinates, map:gMap});
    if (markerContent.iconImagePath) {
        marker.setIcon(markerContent.iconImagePath);
    }

    if (markerContent.content) {
        var infoWindow = new google.maps.InfoWindow({"content":markerContent.content});
        marker.addListener("click", function() { infoWindow.open(gMap, marker) });
    }
}

function printWin() {
    var win = document.getElementById('win');
    win.innerHTML = "You won! If you clicked the button, move the map to reveal all locations.";
  }

var button = document.getElementById('button');
  button.onclick = function() {
      currentPlaceIndex = 0;
      printWin();
  
  }; 