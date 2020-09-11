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
            exit:()=>{
                this.setState({isAuth: false, isAdmin: false});
                document.cookie = "isAdmin= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                document.cookie = "login= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            },
            clearDataOnExit: true,
            toggleClearDataOnExit: ()=>{
                this.setState({clearDataOnExit : !this.clearDataOnExit})
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