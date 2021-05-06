import React, { Component } from "react";
import {BrowserRouter as Router, Link, Route, Switch, useRouteMatch, useParams, useLocation} from "react-router-dom";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoibGV1bmczMDEiLCJhIjoiY2tvNnl2dHppMHJxbDJxcXdteTRvNnU3ZyJ9.HVslWQ3-PqqIw-ReK2hUsQ';


export default class Singleplace extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			lng: this.props.lng,
			lat: this.props.lat,
			zoom: 14
		};
		this.mapContainer = React.createRef();
	}	

	componentDidMount() {
	const { lng, lat, zoom } = this.state;
	const map = new mapboxgl.Map({
		container: this.mapContainer,
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [lng, lat],
		zoom: zoom,
		attributionControl :false
		});
		
		map.on('move', () => {
			this.setState({
				lng: map.getCenter().lng.toFixed(4),
				lat: map.getCenter().lat.toFixed(4),
				zoom: map.getZoom().toFixed(2)
			});
		});
		var popUpMessage = new mapboxgl.Popup().setHTML("<h6>"+this.props.name+"</h6>");
		var marker = new mapboxgl.Marker()
		.setLngLat([lng,lat])
		.setPopup(popUpMessage)
		.addTo(map);
	}
		

	render()
	{
		const { lng, lat, zoom } = this.state;
		return(
			<>
			<div className="sidebar">
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div>
				<div ref={el => this.mapContainer = el} className="map-container" style={{height:"50vh"}} />
				
			</div>
			
			</>
		);
	}
}
