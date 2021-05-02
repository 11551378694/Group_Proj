const {BrowserRouter, Link, Route, Switch} = ReactRouterDOM;//can be found in external library: ReactDOM
const Router = BrowserRouter;
const{useRouteMatch, useParams, useLocation} = ReactRouterDOM;


class Table extends React.Component{
        constructor(props){
                super(props);
                this.state = {places:[],sortkey:"locationId",order:"1",lng:114.172101664 ,lat:22.279311622, location:'JTI at Gloucester Road eastbound near the Revenue Tower'};
		this.handleOrderChange = this.handleOrderChange.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
        }

        componentDidMount(){
                fetch("http://csci2720-g74.cse.cuhk.edu.hk/getplaces/"+this.state.sortkey+"/"+this.state.order)
                .then(res=>res.json())
                .then(placesList =>{
                        this.setState({places:placesList});
                });
        }
	handleSubmit(event){
		event.preventDefault();
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
	handleClick(longitude,latitude,name){
		console.log(name);
		this.setState({lng:longitude,lat:latitude,location:name});
	}




        render(){


        return(
                <>
                <p>This is a table</p>
		
			<label>
				Sort the places according to:
			<select value={this.state.sortkey}  onChange={this.handleFieldChange}>
				<option value="locationId">Location ID</option>
				<option value="name">Name</option>
				<option value="latitude">Latitude</option>
				<option value="longitude">Longitude</option>
			</select>
			</label>
		
			<label>
			in 
			<select value={this.state.order} onChange={this.handleOrderChange}>
				<option value="1">ascending</option>
				<option value="-1">descending</option>
			</select>
				order
			</label>

			
        <table>
          <tr>
                <th>sort</th>
                <th>locationID</th>
                <th>name</th>
                <th>latitude</th>
                <th>longitude</th>
          </tr>
          {this.state.places.map((place,index) =>(
                  <tr key={index}>
                          <th>{index}</th>
                          <td>{place.locationId}</td>
                          <td><a href="#" onClick={()=>this.handleClick(place.longitude,place.latitude,place.name)}>{place.name}</a></td>
                          <td>{place.latitude}</td>
                          <td>{place.longitude}</td>
                </tr>
                ))
          }
         </table>
		<div key={this.state.location}>
		<Singleplace lng={this.state.lng} lat={this.state.lat} name={this.state.location}/>
		</div>

                </>
                );
        }
}

mapboxgl.accessToken = 'pk.eyJ1IjoibGV1bmczMDEiLCJhIjoiY2tvNnl2dHppMHJxbDJxcXdteTRvNnU3ZyJ9.HVslWQ3-PqqIw-ReK2hUsQ';


class Singleplace extends React.Component{
	render(){
		return(<></>);
	}
}


ReactDOM.render(<Table />, document.querySelector('#table'));
