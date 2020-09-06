import React from 'react';

let Header = (props)=>{
    let style = {
        width : "100%",
        height:"20%",
        display: "inline-block",
        backgroundColor : "",
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
        
    }
    return (
        <div id={"header"} style={style}>
            <div style={imageStyle}>
                <img style={imageStyle} src={"https://parfumciel.ru/wp-content/uploads/2018/11/icon_Publications.png"} />
            </div>
            <div style={textStyle}>
                Система управления книгами в библиотеке
            </div>
        </div>
    );
}
export  default Header;