import React from "react";
const UserContext = React.createContext();


function getCookie ( cookieName )
{
    let results = document.cookie.match ( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );
    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}


class Context extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuth: !!getCookie("login"),
            isAdmin: getCookie("isAdmin"),
            login: getCookie("login"),
            toggleAdmin: ()=>{
                this.setState({isAdmin: !this.isAdmin})
                console.log("isAdmin: "+this.isAdmin)

            },
            setAuth: (login)=>{
                this.setState({isAuth: !!login});
                this.setState({login: login});
                console.log(login+ " logged");
            },
            wayToApi:document.location.protocol+"//"+document.location.host.replace('3000', '3001')+"/api/"
        }
    }
    render() {
        return(
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

}

export  default Context;
export {UserContext}