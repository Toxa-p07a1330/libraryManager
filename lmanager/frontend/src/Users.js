import React from "react";
import {UserContext} from "./Context";
import User from "./User";

class Users extends React.Component{
    constructor() {
        super();
        this.state = {

        }
    }
    style = {
        display:"inline-block",
        align: "right",
        widths: "70%"
    }
    sendAll = (context)=>{
        if (!this.state.users)
            return null;
        else {
            let text = prompt("Введите текст рассылки");
            if (!text)
                alert("Сообщение не должно быть пустым!")
            else
            {
                for (let i of this.state.users)
                {
                    let email = i.email;
                    let wayToApi = context.wayToApi+"sendMail/?email="+email+"&message="+text;
                    fetch(wayToApi);
                }
            }
        }
    }
    render() {
        return(<UserContext.Consumer>
                {(context)=>{
                    fetch(context.wayToApi+"user").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.users === undefined){
                                        this.setState({users:json})
                                    }
                                },
                                reason =>console.log(reason)
                            )
                        },
                        (reject)=>{
                            console.log(reject)
                        }
                    )
                    return(<div style={this.style}>
                        <div align={"center"}>
                            <button onClick={()=>{this.sendAll(context)}}>Разослать всем</button>
                        </div>
                        <div>
                            {
                                this.state.users!==undefined?this.state.users.map((value, index)=>{
                                    context.addToStack(value.id);
                                    return <User/>
                                }):""
                             }
                        </div>
                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Users