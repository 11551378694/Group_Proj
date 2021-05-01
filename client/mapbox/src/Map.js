import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
//var MapboxDirections = require('mapbox-gl');

mapboxgl.accessToken='pk.eyJ1IjoiMTE1NTEzODY5NCIsImEiOiJja25zajBvNGIwNmNhMnlzMXd0bjIzdnlnIn0.Ap3eCLrjBNsVTQrGNo3tMg';

// Sample data 
const dataset = [
  {
    "location_id": "H1",
    "location_name_en": "Gloucester Road eastbound near the Revenue Tower",
    "location_name_tc": "告士打道東行近稅務大樓",
    "location_latitude": 22.279311622,
    "location_longitude": 114.172101664,
  },
  {
    "location_id": "H11",
    "location_name_en": "Island Eastern Corridor westbound near Lei King Wan",
    "location_name_tc": "東區走廊西行近鯉景灣",
    "location_latitude": 22.285235888,
    "location_longitude": 114.221346549,
  },
  {
    "location_id": "K04",
    "location_name_en": "Princess Margaret Road southbound near Oi Man Estate",
    "location_name_tc": "公主道南行近愛民邨",
    "location_latitude": 22.31331063,
    "location_longitude": 114.176931903,
  },
  {
    "location_id": "SJ1",
    "location_name_en": "Tai Po Road – Sha Tin near the Racecourse",
    "location_name_tc": "大埔公路近沙田馬場",
    "location_latitude": 22.404797024,
    "location_longitude": 114.20734796,
  }
]

class MapBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lng:114.1694,
            lat:22.3193,
            zoom: 11.5
        }
    }

    componentDidMount(){
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11', //style URL
            center:[this.state.lng, this.state.lat],
            zoom:this.state.zoom
        });

        //test for 1 location point
        // var mark = new mapboxgl.Marker().setLngLat([-73.9882730001973,40.718207001246554])
        //                                 .setPopup(new mapboxgl.Popup({offset:30})
        //                                 .setHTML('<h3>' + 'Manhattan' + '</h3>'))
        //                                 .addTo(map);

        //display multiple locations
        dataset.forEach((loc) => {
            console.log(loc) //testing
            var mark = new mapboxgl.Marker().setLngLat([loc.location_longitude, loc.location_latitude])
                                            .setPopup(new mapboxgl.Popup({offset:50})
                                            .setHTML('<h2>' + loc.location_id + '</h2>\n' + '<h2>'+ loc.location_name_tc + '</h2>'))
                                            .addTo(map);
        })

        //Source: Mapbox
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'bottom-right');

    }

    //Source: Github
    render(){
        return(
            <div>
                <div ref={el => this.mapContainer = el} style={{width:'100%', height:'100vh'}} />
            </div>
        );
    }
}

export default MapBox;