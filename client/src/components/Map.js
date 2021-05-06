import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import data from './Location_Database.json';
import Singleplace from './singleplace.jsx';
import { buildQueries } from '@testing-library/dom';

mapboxgl.accessToken='pk.eyJ1IjoiMTE1NTEzODY5NCIsImEiOiJja25zajBvNGIwNmNhMnlzMXd0bjIzdnlnIn0.Ap3eCLrjBNsVTQrGNo3tMg';


class MapBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lng:114.1911,
            lat:22.3513,
            name:'Hong Kong',
            zoom: 10           
        }
        this.handleClick = this.handleClick.bind(this);
    }

    

    componentDidMount(){
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11', //style URL
            center:[this.state.lng, this.state.lat],
            zoom:this.state.zoom
        });
        
        // fetch("http://csci2720-g117.cse.cuhk.edu.hk")
        // .then(res => res.json())
        // .then(data => dataset = data)
        // .then(() => console.log(data))

        map.on("load", () => {
            console.log(data);
            const source = 
            {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            }
            data.forEach(loc => {
                const feature = {
                    type: "Feature",
                    properties: { 
                        description: loc,
                        'icon': 'embassy-15'
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [loc.longitude, loc.latitude]
                    }
                }
                source.data.features.push(feature)
            })
            console.log(source)
            map.addSource("places", source);
            // Add a layer showing the places.
            map.addLayer({
                id: "places",
                type: "symbol",
                source: "places",
                layout: {
                "icon-image": "{icon}",
                "icon-size": 2,
                
                "icon-allow-overlap": true,
                },
            });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on("click", "places", (e) => {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = JSON.parse(e.features[0].properties.description);

                const innerHtmlContent =`<div style="font-size: medium; color : black; text-align:center;">
                                            <h4 class="h4Class">${description.locationId}</h4>
                                            <h4 class="h4Class">${description.name} </h4> 
                                        </div>`;

                const divElement = document.createElement('div');
                const assignBtn = document.createElement('div');
                assignBtn.innerHTML = `<button class="btn btn-success btn-simple text-white" > ${description.name} </button>`;
                divElement.innerHTML = innerHtmlContent;
                divElement.appendChild(assignBtn);
                // btn.className = 'btn';
                assignBtn.addEventListener('click', (e) => {
                    this.handleClick(description.name, description.latitude, description.longitude);
                });
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup().setLngLat(coordinates).setDOMContent(divElement).addTo(map);
            });
        });

        //Source: Mapbox
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'bottom-right');

    }

    handleClick(name, latitude, longitude){
        console.log(name);
        this.setState({lng:longitude,lat:latitude,name:name});
    }


    //Source: Github
    render(){
        return(
            <div>
                <div ref={el => this.mapContainer = el} style={{width:'100%', height:'80vh'}} />
                <div key={this.state.name}>
                    <Singleplace lng={this.state.lng} lat={this.state.lat} name={this.state.name}/>
                </div>
            </div>
            
        );
    }
}


export default MapBox;