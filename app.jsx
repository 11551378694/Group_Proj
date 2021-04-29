const {BrowserRouter, Link, Route, Switch} = ReactRouterDOM;//can be found in external library: ReactDOM
const Router = BrowserRouter;
const{useRouteMatch, useParams, useLocation} = ReactRouterDOM;
const{TransitionGroup, CSSTransition} = ReactTransitionGroup;

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