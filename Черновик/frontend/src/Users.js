import React from "react";
import {UserContext} from "./Context";
import User from "./User";

class Users extends React.Component{
    constructor() {
        super();
        this.state = {

        }
    }
    style = {
        display:"inline-block",
        align: "right",
        widths: "70%"
    }
    render() {
        return(<UserContext.Consumer>
                {(context)=>{
                    fetch(context.wayToApi+"user").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.users === undefined){
                                        this.setState({users:json})
                                    }
                                },
                                reason =>console.log(reason)
                            )
                        },
                        (reject)=>{
                            console.log(reject)
                        }
                    )
                    return(<div style={this.style}>
                        {
                            this.state.users!==undefined?this.state.users.map((value, index)=>{
                                context.addToStack(value.id);
                                return <User/>
                            }):""
                        }
                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Users