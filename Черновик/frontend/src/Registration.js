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
                               <button onClick={context.toggleAdmin}>Кнопка</button>        //todo remove debug code
                           </div>
                       )
                   }
               }
           </UserContext.Consumer>
        );
    }
}
export default Registration;