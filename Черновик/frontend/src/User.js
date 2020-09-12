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
class User extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoaded: false,

        }

    }
    style = {
        display: "inline-block",
        width: "31%",
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
                            let wayToAPI =context.wayToApi+"user/&id="+id;
                            let newState = {};
                            console.log(wayToAPI)
                            if (!this.state.isLoaded)
                            {
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                console.log(json)
                                                newState = json[0];
                                                console.log(newState)
                                                wayToAPI = context.wayToApi+"book/?takersID="+id;
                                                console.log(wayToAPI)
                                                fetch(wayToAPI).then(
                                                    (response)=>{
                                                        response.json().then(
                                                            (json)=>{
                                                                console.log(json)
                                                                let booksInfo = {booksInfo: json}
                                                                newState = Object.assign(newState, booksInfo);
                                                                this.setState( newState);
                                                            },
                                                            (reject)=>{
                                                                console.log(reject)
                                                            }
                                                        )
                                                    },
                                                    (reject)=>{
                                                        console.log(reject)
                                                    });
                                                this.setState({isLoaded: true});

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
                                <div>Фамилия: {this.state.sName}</div>
                                {this.state.fName?<div>Имя: {this.state.fName}</div>:""}
                                {this.state.tName?<div>Отчество: {this.state.tName}</div>:""}
                                <div>Дата рождения: {this.state.wasBorn}</div>
                                <div>Номер телефона: {this.state.mobilePhone}</div>
                                <div>email: {this.state.email}</div>
                                <div> Роль: {this.state.isAdmin?"Администратор":"Читатель"}</div>
                                <div>Число взятых книг: {this.state.booksInfo?this.state.booksInfo.length:0}</div>
                                {this.state.booksInfo?this.state.booksInfo.map((book)=>{return (
                                    <div style={{marginLeft:"10%"}}>
                                        {"\""+book.name+"\""}
                                    </div>
                                )}):""}
                                <div style={this.state.login===context.login?{display:"none"}:{display:"inherit"}}>
                                    <div>
                                        <a>
                                            <button onClick={
                                            ()=>{
                                                toggleBlock(this.state.id, this.state.isBanned, context.wayToApi, this)
                                            }
                                        }>
                                            {!this.state.isBanned?"Заблокировать":"Разблокировать"}
                                        </button>
                                        </a>
                                    </div>
                                    <a><button onClick={
                                        ()=>{
                                            toggleAdmin(this.state.id, this.state.isAdmin, context.wayToApi, this)
                                        }
                                    }>
                                        {!this.state.isAdmin?"Дать права администратора":"Забрать права администратора"}
                                    </button></a>
                                </div>
                                <div style={{color: "red"}}>
                                    {this.state.isBanned?"Заблокирован! Причина: "+this.state.banReason:""}
                                </div>
                            </div>

                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default User;

