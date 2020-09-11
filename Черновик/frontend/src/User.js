import React from "react";
import {UserContext} from "./Context";


function block(){
    let reason = window.prompt("Причина?")
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
                                {this.state.isBanned?<div> Вы заблокированы. Причина { this.state.banReason}</div>:""}
                                <a><button onClick={block}>Заблокировать</button></a>
                            </div>
                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default User;

