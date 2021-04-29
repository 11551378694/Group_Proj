mapboxgl.accessToken = 'pk.eyJ1IjoiMTE1NTEzODY5NCIsImEiOiJja25zajBvNGIwNmNhMnlzMXd0bjIzdnlnIn0.Ap3eCLrjBNsVTQrGNo3tMg';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true})

function successLocation(position){
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation(){
    document.write("Get Location Failed!");
}

function setupMap(center){
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 14
});

//Source: Mapbox
const nav = new mapboxgl.NavigationControl();
map.addControl(nav);

//source: Github
var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });

  map.addControl(directions, "top-left")
  
}
