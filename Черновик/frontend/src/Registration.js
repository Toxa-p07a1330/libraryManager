import React from "react";
import {UserContext} from "./Context";

class Registration extends React.Component{
    render() {
        return (
           <UserContext.Consumer>
               {
                   (context)=>{
                       return (
                           <div>
                              <form>
                                  <input type={"text"} name="login"/>
                              </form>
                           </div>
                       )
                   }
               }
           </UserContext.Consumer>
        );
    }
}
export default Registration;