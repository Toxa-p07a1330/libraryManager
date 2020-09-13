import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Authors from "./Authors";
import Home from "./Home";
import Registration from "./Registration";
import Books from "./Books";
import Login from "./Login";
import {UserContext} from "./Context";
import Profile from "./Profile";
import Storages from "./Storages";
import Users from "./Users";
import History from "./History";
import Error404 from "./Error404";
class Content extends React.Component{

    render() {
        let style = {
            display: "inline-block",
            align: "right",
            padding: "1%",
            width: "75%"

        }
        return (
           <UserContext.Consumer>
               {()=>{
                   return(
                       <div style={style}>
                           <BrowserRouter>
                               <Switch>
                                   <Route exact path="/" component={Home} />
                                   <Route exact path="/home" component={Home} />
                                   <Route exact path="/books" component={Books} />
                                   <Route exact path="/registration" component={Registration} />
                                   <Route exact path="/authors" component={Authors} />
                                   <Route exact path="/profile" component={Profile} />
                                   <Route exact path="/storages" component={Storages}/>
                                   <Route exact path= "/users" component={Users}/>
                                   <Route exact path="/login" component={Login}/>
                                   <Route exact path="/history" component={History}/>
                                   <Route path="/" component={Error404}/>
                               </Switch>
                           </BrowserRouter>
                       </div>
                   )
               }}
           </UserContext.Consumer>
        );
    }
}
export default Content;