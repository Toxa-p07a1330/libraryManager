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
            id: getCookie("id"),
            isAuth: !!getCookie("id"),
            isAdmin: getCookie("isAdmin"),
            login: getCookie("login"),
            toggleAdmin: ()=>{
                this.setState({isAdmin: !this.isAdmin})
                console.log("isAdmin: "+this.isAdmin)

            },
            setAuth: (id)=>{
                this.setState({isAuth: !!id});
                this.setState({id: id});
                console.log(id+ " logged");
            },
            exit:()=>{
                this.setState({isAuth: false, isAdmin: false, login:null, id: null});
                document.cookie = "isAdmin= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                document.cookie = "id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            },
            clearDataOnExit: true,
            toggleClearDataOnExit: ()=>{
                this.setState({clearDataOnExit : !this.clearDataOnExit})
            },
            wayToApi:document.location.protocol+"//"+document.location.host.replace('3000', '3001')+"/api/",
            stack: {
                size:0,
            },
            addToStack: (push)=>{
                this.state.stack.size++;
                this.state.stack["id_"+(this.state.stack.size-1)]=push
            },
            removeFromStack: ()=>{
                let reterner = this.state.stack["id_"+(this.state.stack.size-1)];
                this.state.stack["id_"+(this.state.stack.size-1)] = null;
                this.state.stack.size--;
                return reterner;
            },
            bookFilter: "",
            setBookFilter: (filter)=>{
                this.state.bookFilter = filter;
            }

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