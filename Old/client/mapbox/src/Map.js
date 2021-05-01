import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import data from './Location_Database.json';

mapboxgl.accessToken='pk.eyJ1IjoiMTE1NTEzODY5NCIsImEiOiJja25zajBvNGIwNmNhMnlzMXd0bjIzdnlnIn0.Ap3eCLrjBNsVTQrGNo3tMg';


class MapBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lng:114.1694,
            lat:22.3193,
            zoom: 10
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
        data.forEach((loc) => {
            console.log(loc) //testing
            var mark = new mapboxgl.Marker().setLngLat([loc.longitude, loc.latitude])
                                            .setPopup(new mapboxgl.Popup({offset:5})
                                            .setHTML('<h4>' + loc.locationId + '</h4>\n' + '<h4>'+ '<a href="www.facebook.com">' + loc.name + '</a>' + '</h4>'))
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