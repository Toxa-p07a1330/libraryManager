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
                            let wayToAPI = context.wayToApi+"user/?login="+context.login;
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
                                                wayToAPI = context.wayToApi+"book/?takersID="+newState.id;
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

                            <div>

                                <div>Фамилия: {this.state.sName}</div>
                                {this.state.fName?<div>Имя: {this.state.fName}</div>:""}
                                {this.state.tName?<div>Отчество: {this.state.tName}</div>:""}
                                <div>Дата рождения: {this.state.wasBorn}</div>
                                <div>Номер телефона: {this.state.mobilePhone}</div>
                                <div>email: {this.state.email}</div>
                                <div> Роль: {this.state.isAdmin?"Администратор":"Читатель"}</div>
                                <div>Число взятых книг: {this.state.booksInfo.length}</div>
                            </div>
                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Profile;

/*
* let wayToAPI = context.wayToApi+"/user/?login="+context.login;

                            * */