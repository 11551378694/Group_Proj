const {BrowserRouter, Link, Route, Switch} = ReactRouterDOM;//can be found in external library: ReactDOM
const Router = BrowserRouter;
const{useRouteMatch, useParams, useLocation} = ReactRouterDOM;

class Table extends React.Component{
        constructor(props){
                super(props);
                this.state = {places:[],sortkey:"locationId",order:"1"};
		this.handleOrderChange = this.handleOrderChange.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
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
		console.log("Y");
		this.setState({order:event.target.value});
		fetch("http://csci2720-g74.cse.cuhk.edu.hk/getplaces/"+this.state.sortkey+"/"+event.target.value)
                .then(res=>res.json())
                .then(placesList =>{
                        this.setState({places:placesList});
                });
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
                          <td><a href="#">{place.name}</a></td>
                          <td>{place.latitude}</td>
                          <td>{place.longitude}</td>
                </tr>
                ))
          }
         </table>

                </>
                );
        }
}

ReactDOM.render(<Table />, document.querySelector('#table'));
