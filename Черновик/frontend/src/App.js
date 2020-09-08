import React from 'react';
import Header from "./Header";
import Sidemenu from "./Sidemenu";
import Content from "./Content";


function getCookie ( cookieName )
{
    let results = document.cookie.match ( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );
    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            authorized: false,
            login: null,
            isAdmin:true,
        }
    }
    style = {
        backgroundColor:"#ddd8b1",
        fontFamily: "Courier monospace",
        minHeight: window.innerHeight,

    }
    render(){
        return(
            <div id={"app"} style={this.style}>
                <Header authorized={getCookie("login")} login={getCookie("login")}> </Header>
                <Sidemenu isAdmin={this.state.isAdmin}></Sidemenu>
                <Content ></Content>

            </div>
    )
    };
}

export default App;
