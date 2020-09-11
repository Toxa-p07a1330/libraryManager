import React from "react";
import User from "./User";
import {UserContext} from "./Context";
 class Users extends   React.Component{
     constructor() {
         super();
         this.state = {
             isLoaded: false,
             users: [],
             wayToApi: "",
             setWayToApi:(way)=>{
                 this.wayToApi = way;
             }
         }

     }
     render(){

         return(
             <UserContext.Consumer>
                 {
                     (context)=>{
                         let users = [];
                         if (!this.state.isLoaded){
                             this.setState({isLoaded: true})
                             fetch(context.wayToApi+"user").then(
                                 (response)=>{
                                     response.json().then(
                                         (json)=>{
                                             let count=0;
                                             for (let i of json)
                                             {
                                                 i.key = i.id;
                                                 users[count++]=<User key = {i.key} data={JSON.stringify(i)}/>;
                                             }
                                             console.log(users);
                                             this.setState({users:users});
                                         },
                                         (reject)=>{
                                             console.log(reject);
                                         }
                                     )
                                 },
                                 (reject)=>{
                                     console.log(reject);
                                 }
                             )
                         }
                         return(<div>

                                </div>
                     )
                     }
                 }
             </UserContext.Consumer>
         )
     }
 }

 export default Users