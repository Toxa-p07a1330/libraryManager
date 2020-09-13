import React from "react";
import {UserContext} from "./Context";
import Book from "./Book";
import Storage from "./Storage";

class Books extends React.Component{
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
                    fetch(context.wayToApi+"book").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.books === undefined){
                                        this.setState({books:json})

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
                            this.state.books!==undefined?this.state.books.map((value, index)=>{
                                context.addToStack(value.id);
                                return <Book/>
                            }):""
                        }
                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Books