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
                            console.log(wayToAPI)
                            if (!this.state.isLoaded)
                            {
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                console.log(json)
                                                this.setState( json[0]);

                                            },
                                            (reject)=>{
                                                console.log(reject)
                                            }
                                        )
                                    },
                                    (reject)=>{
                                        console.log(reject)
                                    });
                                wayToAPI = context.wayToApi+"book/?takersID="+this.state.id;
                                console.log(wayToAPI)
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                console.log(json)
                                                this.setState( {booksInfo: json[0]});
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
                                <div>Число взятых книг: {JSON.stringify(this.state)}</div>
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