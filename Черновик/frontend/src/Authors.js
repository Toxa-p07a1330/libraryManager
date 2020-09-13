import React from "react";
import {UserContext} from "./Context";
import Author from "./Author";

class Authors extends React.Component{
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
                    fetch(context.wayToApi+"author").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.authors === undefined){
                                        this.setState({authors:json})
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
                            this.state.authors!==undefined?this.state.authors.map((value, index)=>{
                                context.addToStack(value.id);
                                return <Author/>
                            }):""
                        }
                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Authors