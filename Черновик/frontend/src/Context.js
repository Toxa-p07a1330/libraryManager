import React from "react";
const UserContext = React.createContext();

class Context extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            isAdmin: false,
            login: 'admin',
            toggleAdmin: ()=>{
                this.isAdmin = ! this.isAdmin;
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