import React from 'react';
import {UserContext} from "./Context";


class Header extends React.Component{
    style = {
        width : "100%",
        height:"20%",
        display: "inline-block",
        backgroundColor : "",
        borderColor: "#cfc78c",
        borderStyle: "inset",
        borderWidth: "5px",
        verticalAlign:"center",
    }
    imageStyle = {
        height: "100%",
        width: "20%",
        align: "left",
        display: "inline-block",
    }
    textStyle = {
        fontSize:"50px",
        display: "inline-block",
        width: "70%"
    }
    registrStyle = {
        display: "inline-block",
        width: "10%",
        marginRight: "0x",

    }

    constructor() {
        super();
        this.state = {
            isLoaded: false,
        }
    }

    render() {
        return (
            <UserContext.Consumer>
                {(context)=>{
                    if(!this.state.isLoaded){
                        fetch(context.wayToApi+"user/?id="+context.id).then(
                            (response)=>{
                                response.json().then(
                                    (json)=>{
                                        try {
                                            this.setState({isLoaded: true, login: json[0].login})
                                        }
                                        catch (e){

                                        }

                                    },
                                    reason => console.log(reason)
                                )
                            },
                            (reject)=>{
                                console.log(reject)
                            },
                        )
                    }
                    return (
                        <div id={"header"} style={this.style}>
                            <div style={this.imageStyle}>
                                <img style={this.imageStyle} src={"https://parfumciel.ru/wp-content/uploads/2018/11/icon_Publications.png"} />
                            </div>
                            <div style={this.textStyle}>
                                Система управления книгами в библиотеке
                            </div>
                            <div style={this.registrStyle}>
                                {
                                    context.isAuth?<a href="/profile"><button>Профиль: {this.state.login}</button></a>
                                        :<a href="/login"><button>Войти</button></a>
                                }
                            </div>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        );
    }
}



export  default Header;