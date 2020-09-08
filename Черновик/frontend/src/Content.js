import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Authors from "./Authors";
import Home from "./Home";
import Registration from "./Registration";
import Books from "./Books";

class Content extends React.Component{

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/books" component={Books} />
                        <Route exact path="/registration" component={Registration} />
                        <Route exact path="/authors" component={Authors} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
export default Content;