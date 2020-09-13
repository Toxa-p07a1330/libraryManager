import React from "react";
import {UserContext} from "./Context";

class Book extends React.Component{
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

    getFullAuthorName = (data)=>{

            return data.fName + " "+data.tName+" "+data.sName
        //data.fName + " "+data.sName?data.sName:""+" "+data.tName?data.tName:""
    }
    render() {

        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        {
                            let id = context.removeFromStack()
                            let wayToAPI =context.wayToApi+"book/&id="+id;
                            let newState  = {};
                            if (!this.state.isLoaded)
                            {
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                newState = {data: json[0], isLoaded: true};
                                                fetch(context.wayToApi+"author/&id="+newState.data.authorID).then(
                                                    (response)=>{
                                                        response.json().then(
                                                            (json)=>{
                                                                newState.author = json
                                                                this.setState(newState)
                                                            },
                                                            (reject)=>{
                                                                console.log(reject)
                                                            }
                                                        )
                                                    },
                                                    (reject)=>{
                                                        console.log(reject)
                                                    }
                                                )
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
                        let isLoaded = this.state.isLoaded;
                        return(

                            <div style={this.style}>
                                <div>
                                    Название: {isLoaded?this.state.data.name:""}
                                </div>
                                <div>
                                    Автор: {isLoaded?this.getFullAuthorName(this.state.author[0]):""}
                                </div>
                                <div>
                                    Номер отделения: {isLoaded?this.state.data.storageID:""}
                                </div>
                                <div>
                                    Год выпуска: {isLoaded?this.state.data.date:""}
                                </div>
                                <div>
                                    Жанр: {isLoaded?this.state.data.genre:""}
                                </div>
                                <div>
                                    рфтвдуЕфлштп
                                </div>
                            </div>
                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Book;

