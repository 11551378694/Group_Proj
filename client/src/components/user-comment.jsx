import React from "react";
import {BrowserRouter as Router, Link, Route, Switch, useRouteMatch, useParams, useLocation} from "react-router-dom";
import CommentIcon from '@material-ui/icons/Comment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import AuthService from "../services/auth.service";
export default class UserComment extends React.Component{
    constructor(props){
        super(props)
        this.state = {locationId : this.props.locationId, comments : [], newComment:"",currentUser:"guest"};
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
        this.postCommentToDB = this.postCommentToDB.bind(this);
    }

    componentDidMount(){
        fetch('http://csci2720-g74.cse.cuhk.edu.hk/getusercomments/'+this.state.locationId)
        .then(res=>res.json())
        .then(comments => {
            comments.forEach(comment => {
                let tmpStinrg = comment.date.split("T");
                comment.date = tmpStinrg[0];
            });
            this.setState({"comments":comments});
            
            
        });
        let user = AuthService.getCurrentUser();
        if(user){
            this.setState({
                currentUser: user.username,
                showAdminBoard : user.roles.includes("ROLE_ADMIN")
            })
        }
        
    }

    handleTextAreaChange(event){
        this.setState({newComment:event.target.value});
        console.log(event.target.value);
    }

    postCommentToDB(){
        let timeNow = new Date();
        
        let newData={
            body : this.state.newComment,
            username : this.state.currentUser,
            date : timeNow
        };
    
        fetch('http://csci2720-g74.cse.cuhk.edu.hk/postusercomments/'+this.state.locationId,{
            method: "POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newData)
        }).then()
        .catch(err=>{console.log("There is error : "+err)});
        setTimeout(()=>{
            fetch('http://csci2720-g74.cse.cuhk.edu.hk/getusercomments/'+this.state.locationId)
                    .then(res=>res.json())
                    .then(comments => {
                        comments.forEach(comment => {
                            let tmpStinrg = comment.date.split("T");
                            comment.date = tmpStinrg[0];
                        });
            this.setState({"comments":comments});
            });
        },500);
        
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
                                    <span className="text-muted"> {comment.date}</span>&nbsp; 
                                    
                                </p>
                                </li>
                            ))
                        }
                        <li className="list-group-item">
                        <textarea className="input-text-box" placeholder="Leave your comment..." id="newComment" rows="2" style={{width:"50vw"}} onChange={event=>this.handleTextAreaChange(event)}/>
                        &nbsp;&nbsp;
                        <button type="button" className="input-text-button comment-button" onClick={this.postCommentToDB}><KeyboardReturnIcon /></button> 
                        </li>
                    </ul>
                </div>
                <Link to="/table"><ArrowBackIosIcon /> Table</Link>
            </div>
        );
    }
}
