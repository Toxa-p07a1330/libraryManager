import React from 'react';
import Header from "./Header";
import Sidemenu from "./Sidemenu";
import Content from "./Content";
import {UserContext} from "./Context";



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
            <div style={this.style}>
                 <Header/>
                 <Sidemenu/>
                 <Content/>
            </div>
    )
    };
}
export default App;
