const {BrowserRouter, Link, Route, Switch} = ReactRouterDOM;//can be found in external library: ReactDOM
const Router = BrowserRouter;
const{useRouteMatch, useParams, useLocation} = ReactRouterDOM;
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiMTE1NTEzODY5NCIsImEiOiJja25zajBvNGIwNmNhMnlzMXd0bjIzdnlnIn0.Ap3eCLrjBNsVTQrGNo3tMg';


//LongLink is a function, will return ">" when the page is "activated"
//the useRouteMatch is to check whether the current URL is matched with the "to"
//from our external library: ReactDOM
function LongLink({label, to, activeOnlyWhenExact}){ 
    let match = useRouteMatch({     
      path: to,
      exact: activeOnlyWhenExact
    });
    return(
      <li className = {match ? "active" : ""}>
        {match && "> "}
        <Link to={to}>{label}</Link>
      </li>
    );
  }

function NoMatch(){
    let location = useLocation(); //from ReactRouterDOM
    return(
      <div>
        <h3>No match for <code>{location.pathname}</code></h3> {/*the pathname is the current URL we clicked, such as "/nowhere"*/}
      </div>
    );
}

class App extends React.Component{
    render(){
        return(
            <Router>
                <div>
                <ul>
                    <LongLink activeOnlyWhenExact={true} to = "/" label="Home"/> 
                    <LongLink to = "/mapBox" label="mapBox" />
                </ul>
                <hr/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/mapBox" component={mapBox}/>
                    <Route path="*" componenet={NoMatch} />
                </Switch>
                </div>
            </Router>
        );
    }
}

class Home extends React.Component {
    render() {
      return <h2>Home</h2>;
    }
  }

class Map extends React.Component{
    render(){
        return(
            <div className="map">
                document.write("Hello!")
            </div>
        );
    }
}

ReactDOM.render(<Map />, document.querySelector('map'));
// {ReactDOM.render(<App/>, document.querySelector("#map"));}