import React from 'react';
import Header from "./Header";
import Sidemenu from "./Sidemenu";

function get_cookie ( cookie_name )
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

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
        }
    }
    style = {
        backgroundColor:"#ddd8b1",
        fontFamily: "Courier monospace",

    }
    render(){
        return(
            <div id={"app"} style={this.style}>
                <Header authorized={get_cookie("login")} login={get_cookie("login")}> </Header>
                <Sidemenu></Sidemenu>
            </div>
    )
    };
}

export default App;
