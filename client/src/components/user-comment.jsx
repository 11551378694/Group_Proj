import React from "react";
import {BrowserRouter as Router, Link, Route, Switch, useRouteMatch, useParams, useLocation} from "react-router-dom";
import CommentIcon from '@material-ui/icons/Comment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
export default class UserComment extends React.Component{
    constructor(props){
        super(props)
        this.state = {locationId : this.props.locationId, comments : [], newComment:""};
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    }

    componentDidMount(){
        fetch('http://csci2720-g74.cse.cuhk.edu.hk/getusercomments/'+this.state.locationId)
        .then(res=>res.json())
        .then(data => {
            this.setState({comments:data})
            console.log(this.state.locationId);
            console.log(data);
        })
    }

    handleTextAreaChange(event){
        this.setState({newComment:event.target.value});
        console.log(event.target.value);
    }

    postCommentToDB(){

    }

    render(){
        return(
            <div>
                <div className="card">
                    <h5 className="card-header comment-header"><CommentIcon />&nbsp; Recent Comments</h5>
                    <ul className="list-group list-group-flush">
                        {
                            this.state.comments.map((comment,index)=>(
                                <li className="list-group-item" key={index}>
                                    <p className="comment-content">
                                        {comment.body}
                                    </p>
                                    <p className="comment-subscript">By &nbsp; 
                                    <span className="comment-username">{comment.username}</span>
                                    &nbsp; on
                                    <span className="text-muted"> {comment.date}</span>
                                </p>
                                </li>
                            ))
                        }
                        <li className="list-group-item">
                        <p className="comment-content">
                        I like this JIT!!!!!!!!!!!sdfasslkdmfksmefkloamlsmmdlkfmalsmmdfoajekefalskndfoansekfnlaksndflkamslkdmfoasjeoijfaskdlfkmsenfasdfnbasjndfkljsa
                        </p>
                        <p className="comment-subscript">By &nbsp; 
                        <span className="comment-username">ABC</span>
                        &nbsp; on
                        <span className="text-muted"> 20 May 2021</span>
                        </p>
                        </li>
                        <li className="list-group-item">
                        <p className="comment-content">
                        I like this JIT!!!!!!!!!!!sdfasslkdmfksmefkloamlsmmg sadfaswe asdfsdf ndflkamslkdmfofgdfgs dlfkmsenfasdfnbasjndfkljsa
                        </p>
                        <p className="comment-subscript">By &nbsp; 
                        <span className="comment-username">CCC</span>
                        &nbsp; on
                        <span className="text-muted"> 19 May 2021</span>
                        </p>
                        </li>
                        <li className="list-group-item">
                        <textarea className="input-text-box" placeholder="Leave your comment..." id="newComment" rows="2" style={{width:"50vw"}} onChange={event=>this.handleTextAreaChange(event)}/>
                        &nbsp;&nbsp;
                        <button type="button" className="input-text-button" onClick={this.postCommentToDB}><KeyboardReturnIcon /></button> 
                        </li>
                    </ul>
                </div>
                <Link to="/table"><ArrowBackIosIcon /> Table</Link>
            </div>
        );
    }
}