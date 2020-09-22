import React from "react";
import {UserContext} from "./Context";

class History extends React.Component{
    constructor() {
        super();
        this.state = {
            history: undefined
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
                    fetch(context.wayToApi+"history").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.history === undefined){
                                        this.setState({history:json})
                                        console.log(this.state)
                                    }
                                },
                                reason =>console.log(reason)
                            )
                        },
                        (reject)=>{
                            console.log(reject)
                        }
                    )
                    let styleID = {
                        display: "inline-block",
                        margin: "1%",
                    }
                    let styleOP = {
                        display: "inline-block",
                        align: "center",
                        paddingRight: "5%",
                        float: "center"
                    }
                    let styleData  ={
                        align :"right",
                        display: "inline-block",
                        float: "right",
                        margin: "1%",

                    }
                    return(<div style={this.style}>
                        {
                            this.state.history!==undefined?this.state.history.map((value, index)=>{
                                return (
                                    <div style={{
                                        borderColor: "#cfc78c",
                                        borderStyle: "inset",
                                        borderWidth: "3px",
                                        minWidth: "200%"
                                    }}>
                                        <div style={styleID}>
                                            {value.id}
                                        </div>
                                        <div style={styleOP}>
                                            {value.operation}
                                        </div>
                                        <div style={styleData}>
                                            {value.date?value.date.substring(4, value.date.indexOf("GMT")):""}
                                        </div>
                                    </div>
                                )
                            }):""
                        }
                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default History