import React from 'react';
import {UserContext} from "./Context";

let Header = (props)=>{
    let style = {
        width : "100%",
        height:"20%",
        display: "inline-block",
        backgroundColor : "",
        borderColor: "#cfc78c",
        borderStyle: "inset",
        borderWidth: "5px",
    }
    let imageStyle = {
        height: "100%",
        width: "20%",
        align: "left",
        display: "inline-block",
    }
    let textStyle = {
        fontSize:"50px",
        display: "inline-block",
        width: "70%"
        
    }
    let registrStyle = {
        display: "inline-block",
        width: "10%",
        marginRight: "0x"

    }
    return (
        <UserContext.Consumer>
            {(context)=>{
                return (
                    <div id={"header"} style={style}>
                        <div style={imageStyle}>
                            <img style={imageStyle} src={"https://parfumciel.ru/wp-content/uploads/2018/11/icon_Publications.png"} />
                        </div>
                        <div style={textStyle}>
                            Система управления книгами в библиотеке
                        </div>
                        <div style={registrStyle}>
                            {
                                context.isAuth?<a href="/profile"><button>Профиль: {context.login}</button></a>
                                    :<a href="/login"><button>Войти</button></a>
                            }
                        </div>
                    </div>
                )
            }}
        </UserContext.Consumer>
    );
}
export  default Header;