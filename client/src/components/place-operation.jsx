import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useRouteMatch, useParams, useLocation} from "react-router-dom";
import Table from './table';
import Singleplace from './singleplace'
import PlaceDetails from './place-detail'
import UserComment from './user-comment'
export default class PlaceOperation extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            placeId : undefined,
            placeLat: undefined,
            placeLng:undefined,
            placeName:undefined
        }

        this.changePlace = this.changePlace.bind(this);
    }

    changePlace(placeId,placeLat,placeLng,placeName)
    {
        this.setState({
            placeId : placeId,
            placeLat: placeLat,
            placeLng: placeLng,
            placeName: placeName
        });
    }

    render(){
        return(
            <div>
            
                <Router >
                        
                        <Switch>
                        <Route exact path="/singleplaceview">
                            <Singleplace lat={this.state.placeLat} lng={this.state.placeLng} name={this.state.placeName} />
                            <PlaceDetails lat={this.state.placeLat} lng={this.state.placeLng} name={this.state.placeName} locationId = {this.state.placeId} />
                            <UserComment locationId = {this.state.placeId} />
                        </Route>
                        <Route path="/">
                        <Table changePlace={this.changePlace} />
                        </Route>
                        </Switch>
                    
                </Router>
            </div>
        );
    }


}