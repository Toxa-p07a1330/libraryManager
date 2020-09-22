import React from "react";
import {UserContext} from "./Context";


function toggleBlock(id, isBanned, wayToApi, _this){
    let reason="";
    if(!isBanned)
        reason = window.prompt("Причина?")
    let url = wayToApi+"toggleBlock/?id="+id+"&isBanned="+isBanned+"&reason="+reason;
    fetch(url).then(()=>{
        _this.setState({isBanned: !isBanned})
    }, (reject)=>{
        console.log(reject)
    })
}
function toggleAdmin(id, isAdmin, wayToApi, _this){

    let url = wayToApi+"toggleAdmin/?id="+id+"&isAdmin="+isAdmin;
    fetch(url).then(()=>{
        _this.setState({isAdmin: !isAdmin})
    }, (reject)=>{
        console.log(reject)
    })
}
class Author extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoaded: false,

        }

    }
    style = {
        display: "inline-block",
        minWidth: "30%",
        maxWidth:"30%",
        height: "40%",
        padding: "1%",
        borderColor: "#cfc78c",
        borderStyle: "inset",
        borderWidth: "2px",
    }



    render() {

        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        {
                            let id = context.removeFromStack()
                            let wayToAPI =context.wayToApi+"author/&id="+id;
                            let newState = {};
                            if (!this.state.isLoaded)
                            {
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                this.setState({isLoaded: true, data: json[0]});

                                            },
                                            (reject)=>{
                                                console.log(reject)
                                            }
                                        )
                                    },
                                    (reject)=>{
                                        console.log(reject)
                                    });
                            }
                        }

                        return(

                            <div style={this.style}>
                                <div>Псевдоним: {this.state.data?this.state.data.fName+" "+
                                    this.state.data.tName+" "+this.state.data.sName:""}
                                </div>
                                <div>Годы жизни: {this.state.data?this.state.data.wasBorn:""}-
                                    {this.state.data?this.state.data.diedAt:""}
                                </div>
                                <div>
                                    <a href={"books/?authorID="+(this.state.data?this.state.data.id:"")}>
                                        <button>
                                            Перейти к книгам
                                        </button>
                                    </a>
                                </div>
                            </div>

                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Author;