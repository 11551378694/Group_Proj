import React, { Component } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';

mapboxgl.accessToken = 'pk.eyJ1IjoibGV1bmczMDEiLCJhIjoiY2tvNnl2dHppMHJxbDJxcXdteTRvNnU3ZyJ9.HVslWQ3-PqqIw-ReK2hUsQ';


class Singleplace extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			lng: this.props.lng,
			lat: this.props.lat,
			zoom: 11
		};
	}	

	componentDidMount() {
	const { lng, lat, zoom } = this.state;
	const map = new mapboxgl.Map({
		container: this.mapContainer,
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [lng, lat],
		zoom: zoom
		});
	var marker = new mapboxgl.Marker()
			.setLngLat([lng, lat])	
			.setPopup(new mapboxgl.Popup({offset : 30}).setHTML('<h4>'+this.props.name+'</h4>'))
			.addTo(map);
	map.on('move', () => {
		this.setState({
			lng: map.getCenter().lng.toFixed(4),
			lat: map.getCenter().lat.toFixed(4),
			zoom: map.getZoom().toFixed(2)
		});
	});

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
				<div ref={el => this.mapContainer = el} className="map-container" style={{width:'50%',height:'50vh'}} />
			</div>
			</>
		);
	}
}

//ReactDOM.render(<Singleplace />, document.querySelector("#singleplace"));
