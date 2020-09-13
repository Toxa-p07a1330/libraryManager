import React from "react";
import {UserContext} from "./Context";

class Book extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            manageBook: undefined,
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
    }
    defineManagement = (context, state)=>{
        let manager = "";
        if(context.id){
            if (state.data.takersID) {
                if (state.data.takersID == context.id)
                    manager = <button onClick={()=>{
                        this.giveBook(context)
                    }}>Сдать</button>
                else
                    manager = <div style={{color: "#8b0000"}}>Книга занята</div>
            }
            else
                manager = <button onClick={()=>{
                    this.takeBook(context)
                }}>Взять</button>
        }
        else
            manager = <a href={"/login"}>Войдите, что бы взять книгу</a>
        return {manageBook: manager};
    }
    takeBook = (context)=>{
        let wayToApi = context.wayToApi;
        let bookId = this.state.data.id;
        let request = wayToApi+"toggleBook/?id="+bookId+"&takersID="+context.id;
        fetch(request).then(
            (response)=>{
                response.json().then(
                    (json)=>{
                        let manager = <button onClick={()=>{
                            this.giveBook(context)
                        }}>Сдать</button>
                        this.setState(Object.assign(this.state, {manageBook: manager}))
                    },
                    (reject)=>{
                    console.log(reject)
                    }
                )
            },
            (reject)=>{
                console.log(reject)
            })
    }
    giveBook = (context)=>{
        let wayToApi = context.wayToApi;
        let bookId = this.state.data.id;
        let request = wayToApi+"toggleBook/?id="+bookId;
        fetch(request).then(
            (response)=>{
                response.json().then(
                    (json)=>{
                        let manager = <button onClick={()=>{
                            this.takeBook(context)
                        }}>Взять</button>
                        this.setState(Object.assign(this.state, {manageBook: manager}))
                    },
                    (reject)=>{
                        console.log(reject)
                    }
                )
        },
            (reject)=>{
                console.log(reject)
            })
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
                                                                Object.assign(newState, this.defineManagement(context, newState))
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
                                    {isLoaded?this.state.manageBook:""}
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

