import React from "react";
import {UserContext} from "./Context";
import Storage from "./Storage";

class Storages extends React.Component{
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
                    fetch(context.wayToApi+"storage").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.users === undefined){
                                        this.setState({users:json})
                                        console.log(json)
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
                                return <Storage/>
                            }):""
                        }
                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Storages