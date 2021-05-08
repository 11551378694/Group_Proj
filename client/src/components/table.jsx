import React, { Component } from "react";
import {BrowserRouter as Router, Link, Route, Switch, useRouteMatch, useParams, useLocation} from "react-router-dom";//can be found in external library: ReactDOM
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import SearchIcon from '@material-ui/icons/Search';
mapboxgl.accessToken = 'pk.eyJ1IjoibGV1bmczMDEiLCJhIjoiY2tvNnl2dHppMHJxbDJxcXdteTRvNnU3ZyJ9.HVslWQ3-PqqIw-ReK2hUsQ';

export default class Table extends React.Component{
        constructor(props){
                super(props);
                this.state = {places:[],sortkey:"locationId",order:"1",searchKey:undefined,searchField:"locationId"};
		this.handleOrderChange = this.handleOrderChange.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
                this.handleSearch = this.handleSearch.bind(this);
        }

        componentDidMount(){
                fetch("http://csci2720-g74.cse.cuhk.edu.hk/getplaces/"+this.state.sortkey+"/"+this.state.order)
                .then(res=>res.json())
                .then(placesList =>{
                        this.setState({places:placesList});
                });
        }

        handleSearchKeyChange(event)
        {
                this.setState({searchKey:event.target.value});
                
                
        }

        handleSearchFieldChange(event)
        {
                this.setState({searchField:event.target.value});
                
        }

	handleSearch(event){
                console.log(this.state.searchKey);
                console.log(this.state.searchField);
		event.preventDefault();
                fetch('http://csci2720-g74.cse.cuhk.edu.hk/displaysearchresultintable/'+this.state.searchField+"/"+this.state.searchKey)
                .then(res=>res.json())
                .then(placeList =>{
                        this.setState({places:placeList});
                });
	}


	handleFieldChange(event){
		this.setState({sortkey:event.target.value});
		fetch("http://csci2720-g74.cse.cuhk.edu.hk/getplaces/"+event.target.value+"/"+this.state.order)
                .then(res=>res.json())
                .then(placesList =>{
                        this.setState({places:placesList});
                });
	}
	handleOrderChange(event){
		this.setState({order:event.target.value});
		fetch("http://csci2720-g74.cse.cuhk.edu.hk/getplaces/"+this.state.sortkey+"/"+event.target.value)
                .then(res=>res.json())
                .then(placesList =>{
                        this.setState({places:placesList});
                });
	}
	handleClick(longitude,latitude,name,locationId){
		this.props.changePlace(locationId,latitude,longitude,name);
	}




        render(){


        return(
                <>
                <div className="container">

                        <div className="table-input-area">
                                <form>
                                        <div className="table-input">Select field to Search: &nbsp;&nbsp;
                                        <select className="input-text-box" onChange={event=>{this.handleSearchFieldChange(event)}}>
                                                <option value="locationId">Location ID</option>
                                                <option value="name">Name</option>
                                                <option value="latitude">Latitude</option>
                                                <option value="longitude">Longitude</option>
                                        </select>
                                        </div>
                                        <div className="table-input">
                                        <input type="search" className="input-text-box" placeholder="Enter keyword" onChange={event=>{this.handleSearchKeyChange(event)}}/>&nbsp;&nbsp;
                                        <button type="button" className="input-text-button" onClick={event=>{this.handleSearch(event)}}><SearchIcon /></button>
                                        </div>
                                </form >
                                <div className="table-input">
                                <label className="d-inline" >
                                        Sort the places according to:&nbsp;&nbsp;
                                <select className="input-text-box" value={this.state.sortkey}  onChange={this.handleFieldChange}>
                                        <option value="locationId">Location ID</option>
                                        <option value="name">Name</option>
                                        <option value="latitude">Latitude</option>
                                        <option value="longitude">Longitude</option>
                                </select>
                                </label >
                        
                                <label className="d-inline">
                                &nbsp;&nbsp;in &nbsp;&nbsp;
                                <select className="input-text-box" value={this.state.order} onChange={this.handleOrderChange}>
                                        <option value="1">ascending</option>
                                        <option value="-1">descending</option>
                                </select>
                                &nbsp;&nbsp;order
                                </label>
                                </div>
                        </div>
			
                        <table className="table">
                        <thead>
                                <tr>
                                        <th>sort</th>
                                        <th>locationID</th>
                                        <th>name</th>
                                        <th>latitude</th>
                                        <th>longitude</th>
                                </tr>
                        </thead>
                        <tbody>
                                
                                {this.state.places.map((place,index) =>(
                                        <tr key={index}>
                                                <th>{index}</th>
                                                <td>{place.locationId}</td>
                                                <td><Link to="/singleplaceview" onClick={()=>this.handleClick(place.longitude,place.latitude,place.name,place.locationId)}>{place.name}</Link></td>
                                                <td>{place.latitude}</td>
                                                <td>{place.longitude}</td>
                                        </tr>
                                        ))
                                }
                                
                        </tbody>
                        </table>
		
                </div>
                </>
                );
        }
}



