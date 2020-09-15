import React from "react";
import {UserContext} from "./Context";

class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoaded: false,

        }

    }
    render() {
        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        {
                            let wayToAPI = context.wayToApi+"user/?id="+context.id;
                            let newState = {};
                            console.log(wayToAPI)
                            if (!this.state.isLoaded)
                            {
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                newState = json[0];
                                                wayToAPI = context.wayToApi+"book/?takersID="+newState.id;
                                                fetch(wayToAPI).then(
                                                    (response)=>{
                                                        response.json().then(
                                                            (json)=>{
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

                            <div>
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
                                <a href="/home"><button onClick={context.exit}>Выйти</button></a>
                            </div>
                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Profile;

